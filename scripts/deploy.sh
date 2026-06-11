#!/usr/bin/env bash
# Local deploy: SSH в aviation, бекап Payload-БД (PG + SQLite), синк коду з GitHub,
# перебудова стека, health-check для next.
#
# Деплоїться ТЕ, що лежить в origin (fetch + reset --hard, НЕ pull) — сервер
# завжди дзеркалить GitHub і переживає переписану історію (force-push).
# Untracked-файли (.env.production, data/) reset не чіпає; git clean свідомо
# не викликаємо. Секрети живуть ТІЛЬКИ в .env.production на сервері (chmod 600).
#
# Перед запуском: git push гілки в origin.

set -euo pipefail

BRANCH="${1:-main}"
HOST=aviation
REMOTE_DIR=/home/deploy/aviation

ssh "$HOST" bash -s <<REMOTE
set -euo pipefail
cd "$REMOTE_DIR"

ts=\$(date +%F-%H%M%S)

# 1a. Backup Payload Postgres (жива CMS-база).
# Пишемо в data/backups/ (належить deploy) — data/payload/ chown-нута під
# контейнерного юзера next (100:101), туди без sudo не записати.
mkdir -p data/backups
if docker compose --env-file .env.production ps --status running postgres -q | grep -q .; then
  # </dev/null обов'язково: скрипт приходить у bash -s через stdin, і docker exec
  # без редіректу з'їдає його решту — деплой тихо обривається після бекапу.
  docker compose --env-file .env.production exec -T postgres \
    pg_dump -U aviation payload </dev/null | gzip > "data/backups/pg-payload-\$ts.sql.gz"
  echo "=== backup: data/backups/pg-payload-\$ts.sql.gz ==="
  # Тримаємо останні 10 дампів, старіші видаляємо.
  ls -1t data/backups/pg-payload-*.sql.gz 2>/dev/null | tail -n +11 | xargs -r rm
fi

# 1b. Backup Payload SQLite (legacy, поки файл існує)
if [ -f data/payload/cms.sqlite ]; then
  sudo cp data/payload/cms.sqlite "data/payload/cms.sqlite.bak-\$ts"
  echo "=== backup: data/payload/cms.sqlite.bak-\$ts ==="
fi

# 2. Синк коду з GitHub + rebuild (reset --hard: дзеркало origin, без merge-станів)
git fetch origin "${BRANCH}"
git checkout "${BRANCH}" 2>/dev/null || git checkout -b "${BRANCH}" "origin/${BRANCH}"
git reset --hard "origin/${BRANCH}"
docker compose --env-file .env.production up -d --build

# nginx тримає DNS-резолв upstream'ів у пам'яті — при перебудові next
# (новий внутрішній IP) лишається висіти 502, поки nginx не рестартонути.
docker compose --env-file .env.production restart nginx

# 3. Health check (next через nginx на localhost)
echo
echo "=== waiting for next ==="
ok=0
for i in 1 2 3 4 5 6 7 8 9 10; do
  if curl -fsS -o /dev/null http://localhost/; then
    echo "=== next OK (try \$i) ==="
    ok=1
    break
  fi
  sleep 3
done
if [ \$ok -ne 1 ]; then
  echo "!!! next not responding after 30s, last logs:" >&2
  docker compose --env-file .env.production logs --tail=80 next >&2
  exit 1
fi

# 4. Status
echo
echo "=== status ==="
docker compose --env-file .env.production ps
REMOTE
