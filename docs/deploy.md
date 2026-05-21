# Деплой на власний сервер

Робочий зошит з міграції з Vercel + старого SiteNodeJS на власний Docker-стек.
Стан на **2026-05-21**.

---

## Поточний стан

| Етап | Що зроблено | Стан |
|---|---|---|
| 1. Безпека сервера | sudo-юзер `deploy`, SSH-ключ, `ufw`, `fail2ban`, swap 2GB, hostname, TZ, root-password locked | ✅ |
| 2. Docker-стек | docker + compose, образи MySQL 8.4 / Next.js / nginx, bind-mount data, перший білд | ✅ |
| 3. Переніс даних | dump БД `kknau` (8.9 GB gz), uploads (7.4 GB), legacy resources (1.9 GB), імпорт у MySQL | ✅ |
| 4. Домен + SSL | DNS A-запис, certbot, HTTP→HTTPS redirect, renew cron | ⏳ |

**IP:** `204.168.161.68`, **alias:** `ssh aviation` (ключ `~/.ssh/id_ed25519_aviation`).
**Прод-гілка:** `main` (з 2026-05-20; раніше була `chore/docker-deploy`, тепер не використовується). Сайт зараз працює на `http://204.168.161.68/`.

---

## Структура на сервері

```
/home/deploy/aviation/
├── .git/                                  # репо
├── .env.production                        # secrets (chmod 600, НЕ в git)
├── docker-compose.yml
├── Dockerfile
├── nginx/conf.d/aviation.conf
├── data/                                  # bind mounts (в .gitignore + .dockerignore)
│   ├── mysql/                             # MySQL data dir
│   ├── uploads/{news,articles}/           # рознесена статика
│   ├── legacy/                            # SiteNodeJS resources (1.9 GB)
│   ├── letsencrypt/                       # сертифікати (Етап 4)
│   ├── certbot-webroot/                   # ACME challenge (Етап 4)
│   └── payload/                           # PayloadCMS SQLite (cms.sqlite, chown 100:101)
└── build.log, migration.log
```

---

## PayloadCMS на проді

Розгорнуто 2026-05-20. Admin доступний на `/admin`, дані в `data/payload/cms.sqlite` (bind-mount у `next` контейнер).

**Перший запуск на новому хості** (вже зроблено, тримати як шпаргалку):
```bash
ssh aviation
cd /home/deploy/aviation
sudo mkdir -p data/payload data/uploads/news-images
sudo chown 100:101 data/payload data/uploads/news-images   # uid/gid юзера nextjs у контейнері
docker compose --env-file .env.production up -d --build
# One-shot schema push (sqlite-адаптер пушить схему тільки коли NODE_ENV != production):
docker compose --env-file .env.production exec -e NODE_ENV=development next \
  node_modules/.bin/tsx -e "import config from './payload.config'; import { getPayload } from 'payload'; getPayload({ config }).then(() => process.exit(0))"
```

**Schema push gotcha.** `@payloadcms/db-sqlite` пушить схему ТІЛЬКИ коли `NODE_ENV !== 'production'`. У звичайному деплої прод-контейнер не оновить таблиці навіть якщо додалось нове поле. Сценарії:
- Тільки поля, які не блокують стартап → задеплоїти, потім окремо запустити exec-команду вище.
- Зміни, що ламають існуючі дані → перейти на `payload migrate` (відкритий пункт у [[project_admin_flow]]).

**Перший адмін** створюється через `/admin` (GUI) одразу після першого вдалого пушу схеми.

**Міграція новин зі старої БД у Payload:**
```bash
ssh aviation
cd /home/deploy/aviation
# Dry-run (без запису):
docker compose --env-file .env.production exec -e MIGRATION_DRY_RUN=1 -e MIGRATION_LIMIT=20 next \
  node_modules/.bin/tsx src/scripts/migration/migrate-news.ts
# Повний прогін (1248 рядків залишається після 20 у тестовому батчі, ~кілька ГБ зображень):
nohup docker compose --env-file .env.production exec -T next \
  node_modules/.bin/tsx src/scripts/migration/migrate-news.ts \
  > /tmp/aviation-migrate.log 2>&1 &
```

Env-vars для `migrate-news.ts`: `MIGRATION_LIMIT`, `MIGRATION_DRY_RUN`, `MIGRATION_UPLOADS_DIR`, `MIGRATION_IMAGES_OUT_DIR`, `MIGRATION_IMAGES_URL_PREFIX`. Повторний прогін безпечний — `legacyId` юнік-індекс пропускає вже мігровані.

**Бекап SQLite перед ризикованими операціями:**
```bash
cp /home/deploy/aviation/data/payload/cms.sqlite \
   /home/deploy/aviation/data/payload/cms.sqlite.bak-$(date +%F-%H%M)
```

---

## Етап 4 — домен + SSL (TODO)

Виконувати коли:
1. вирішено який домен використовувати;
2. є доступ до DNS-провайдера.

### A. DNS

1. У DNS-провайдері створити (або оновити) запис:
   - `A` `your-domain.tld` → `204.168.161.68`
   - `A` `www.your-domain.tld` → `204.168.161.68`  *(якщо потрібно)*
2. Перевірити з локальної машини:
   ```bash
   dig +short your-domain.tld
   ```
   Має повернути `204.168.161.68`. Зачекати поки пошириться (зазвичай 5–30 хв).

### B. nginx з доменом (поки HTTP)

Замінити `server_name _;` у `nginx/conf.d/aviation.conf` на:
```nginx
server_name your-domain.tld www.your-domain.tld;
```
Запушити в `main`, на сервері `git pull && docker compose --env-file .env.production restart nginx`.

Перевірити: `curl -sS -I http://your-domain.tld/` має повернути 200.

### C. Сертифікат через certbot (через docker, без установки на хост)

Одноразово отримати сертифікат:

```bash
ssh aviation
cd /home/deploy/aviation

docker run --rm \
  -v $PWD/data/letsencrypt:/etc/letsencrypt \
  -v $PWD/data/certbot-webroot:/var/www/certbot \
  certbot/certbot certonly \
    --webroot -w /var/www/certbot \
    -d your-domain.tld -d www.your-domain.tld \
    --email igor.musson.55@gmail.com \
    --agree-tos --no-eff-email
```

Перевірити: `ls data/letsencrypt/live/your-domain.tld/` — має бути `fullchain.pem`, `privkey.pem`.

### D. nginx — додати 443 і redirect

Замінити `nginx/conf.d/aviation.conf` на двосерверний конфіг (HTTP → redirect, HTTPS — основний):

```nginx
server {
    listen 80;
    server_name your-domain.tld www.your-domain.tld;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    http2 on;
    server_name your-domain.tld www.your-domain.tld;

    ssl_certificate     /etc/letsencrypt/live/your-domain.tld/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.tld/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_session_cache shared:SSL:10m;

    client_max_body_size 25m;

    location /uploads/ {
        alias /var/www/uploads/;
        expires 30d;
        add_header Cache-Control "public, immutable" always;
        try_files $uri =404;
    }

    location / {
        proxy_pass http://next:3000;
        proxy_http_version 1.1;
        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade           $http_upgrade;
        proxy_set_header Connection        "upgrade";
        proxy_read_timeout 60s;
    }
}
```

Запушити, `docker compose ... restart nginx`. Перевірити `https://your-domain.tld/` у браузері.

### E. Авто-продовження сертифіката

Додати cron для `deploy`-юзера:
```bash
ssh aviation
crontab -e
```
Додати рядок (продовжує + перезавантажує nginx що 12 годин):
```
0 */12 * * * docker run --rm -v /home/deploy/aviation/data/letsencrypt:/etc/letsencrypt -v /home/deploy/aviation/data/certbot-webroot:/var/www/certbot certbot/certbot renew --quiet && docker exec aviation-nginx-1 nginx -s reload
```

### F. Оновити NEXT_PUBLIC_SITE_URL

У `.env.production`:
```
NEXT_PUBLIC_SITE_URL=https://your-domain.tld
```
Перебілдити next: `docker compose --env-file .env.production up -d --build next`.

---

## Daily ops cheat sheet

```bash
ssh aviation                                                  # alias
cd /home/deploy/aviation

# Деплой нової версії з гілки
git pull
docker compose --env-file .env.production up -d --build

# Логи
docker compose --env-file .env.production logs -f next
docker compose --env-file .env.production logs -f nginx
docker compose --env-file .env.production logs --tail=100 mysql

# Стан
docker compose --env-file .env.production ps
docker stats --no-stream
df -h /; du -sh data/*

# Зайти в БД
set -a; source .env.production; set +a
docker exec -it aviation-mysql-1 mysql -uroot -p"$MYSQL_ROOT_PASSWORD" kknau

# Бекап БД
docker exec aviation-mysql-1 mysqldump -uroot -p"$MYSQL_ROOT_PASSWORD" \
  --single-transaction --routines --triggers kknau \
  | gzip > backups/kknau-$(date +%F).sql.gz

# Перезапуск окремого сервісу
docker compose --env-file .env.production restart next
docker compose --env-file .env.production restart nginx
```

---

## Відомі компроміси

- **MySQL + Payload SQLite гібрид.** Новини (1268) і документи (5178 PDF) повністю в Payload SQLite. Legacy HTML-статті (1328) досі в MySQL `articles_v2` — `/article/:id` має фолбек. Старі BLOB-таблиці (`articles`, `news`) — orphan, не читаються. План доміграції — у [`future-work.md`](future-work.md).
- **`next.config.ts` досі має rewrite** `/api/*` → `http://38.242.201.228`. Це інший IP, не той що `195.54.163.114`. Поки старі бекенди живі — нічого не ламається. Прибрати rewrite коли всі API перенесені у Next.
- **`FILES_API_URL` у `.env.production`** дивиться на `195.54.163.114`. Поки потрібен для `lib/files-url.ts`. Коли резолвимо всі файлові посилання локально — прибрати.
- **`feature/colors`** UI-зміни висять у локальному stash (`stash@{0}: On feature/colors: feature/colors UI WIP (auto-stash for deploy branch)`). `git stash pop` коли захочете повернутись.

---

## Що залишилось після Етапу 4

- Прибрати legacy rewrite з `next.config.ts` (коли API повністю мігровано).
- Список залишкових міграцій і покращень — у [`future-work.md`](future-work.md).
- Зарядити регулярні бекапи БД у cron (вище є команда).
- Подумати про моніторинг (uptime ping, disk alerts).
