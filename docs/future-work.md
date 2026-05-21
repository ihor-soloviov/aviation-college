# Наступні роботи

Перелік того, що ще треба зробити, з контекстом і конкретними кроками. Кожен пункт можна закривати окремо — порядок не критичний, окрім явних залежностей.

Стан на **2026-05-21**.

---

## 1. Legacy HTML-статті (1328) — рішення

**Контекст.** `articles_v2` зберігає 6506 рядків. PDF-частина (5178) уже в Payload `documents`. Залишилось **1328 HTML-статей** (`view_mode IN ('html','docx_to_html')`), які досі рендеряться через `getArticleById` з MySQL + читання HTML-файлів з `/var/www/uploads/articles/*.html`.

Із цих 1328 приблизно **592 — це "hub-сторінки"** (контент = переважно список `<a href="/article/X">` на інші статті). Hub-сторінки сенсу мігрувати **немає**: у новому коді ми відтворюємо ці навігаційні розділи нативно (приклад: `src/components/Students/SelfGovernance/`).

Реально цінного "новинного" контенту в legacy HTML — приблизно **736 сторінок**.

**Варіанти (треба обрати один):**

1. **Pages collection у Payload.** Створити нову колекцію `pages` з блоковою структурою (схожою на `news`). Адаптувати `migrate-articles.ts` під HTML-флоу (перевикористати `parse-html.ts`). Це найчистіше — все в одній CMS, можна редагувати в адмінці.
2. **Спалити.** Видалити `articles_v2` + HTML-файли, прибрати `lib/articles.ts` і `/article/:id` фолбек. Старі URL віддають 404. Прийнятно якщо у браузерах/Google нема цінних посилань.
3. **Hybrid forever.** Залишити як зараз. `/article/:id` назавжди має фолбек на MySQL. Просто.

Рекомендація — **варіант 1**, якщо є ресурс на ~1-2 дні роботи. Інакше **3** не критично, бо все працює.

**Якщо обрано варіант 1:**

- Нова колекція `src/collections/Pages.ts` з блоками `paragraph`, `heading`, `image`, `gallery`, `youtube`, `linkList` (готові з News).
- Скрипт `migrate-pages.ts` за зразком `migrate-articles.ts`, але парсить HTML через `parse-html.ts`.
- Нова сторінка `/pages/:id/page.tsx` (або `/article/:id` повністю переписана).
- Hub-сторінки **пропускати** (heuristic: `≥3 href="/article/N"` link-density).

**Якщо обрано варіант 2:**

- Видалити `src/lib/articles.ts`, `src/app/(frontend)/article/`, `src/app/api/articles/`.
- Перед цим — звільнити простір на сервері: `rm -rf data/uploads/articles/*.html` (1.6 GB).
- Окремо подбати про cross-links з мігрованих новин/документів — пошукати в БД грепом і поправити вручну.

---

## 2. Static pages з hardcoded `/api/articles/X/file`

**Контекст.** Кілька статичних сторінок мають hardcoded URL до legacy file API:

```bash
$ grep -rn "/api/articles/.*/file" src/components/
src/components/Students/CodeOfConduct/CodeOfConductPage.tsx
src/components/Students/SelfGovernance/SelfGovernancePage.tsx   # 5 покликань
src/components/Students/AntiBullying/AntiBullyingPage.tsx
```

Усі вони покликаються на PDF, які тепер у Payload `documents`. Зараз вони працюють завдяки тому, що `data/uploads/articles/*.pdf` ще на диску.

**Що зробити:**

1. Для кожного `/api/articles/X/file` запитати Payload: який Document має `legacyId=X`?
   ```bash
   curl "http://204.168.161.68/api/payload/documents?where%5BlegacyId%5D%5Bequals%5D=3898&depth=0" | jq '.docs[0].filename'
   ```
2. Замінити URL у компоненті на `/uploads/payload/documents/<filename>` (або на `/documents/<newId>`, якщо краще показати сторінку).
3. Після того як **усі покликання переведені** — можна:
   - Видалити `src/app/api/articles/[id]/file/route.ts`.
   - Видалити `getArticleContent` з `src/lib/articles.ts`.
   - Видалити `data/uploads/articles/*.pdf` на сервері (звільнить ~5.9 GB).
   - Видалити `services/files-api/` — він обслуговує лише `/api/articles/*/file` тепер (та `/api/news/*/file`, який теж не потрібен бо новини в Payload). Перевірити чи інші покликання залишились.

---

## 3. MySQL очищення

**Контекст.** Після всіх міграцій таблиці `news_v2` (1268) і `news` (BLOB-варіант) — orphan, ніхто не читає. `articles_v2` ще потрібна для legacy HTML фолбеку (пункт 1).

**Що зробити:**

1. **Зараз можна:** `DROP TABLE news_v2` (повністю мігровано в Payload, нема consumers).
2. **Зараз можна:** `DROP TABLE news` (legacy BLOB, не використовується).
3. **Після пункту 1 (варіант 1 або 2):** `DROP TABLE articles_v2` + старі BLOB-таблиці статей.
4. Перевірити dump-stash на сервері (`du -sh /home/deploy/aviation/data/mysql`). Якщо MySQL стає малим — розглянути міграцію Payload з SQLite на MySQL для єдиної БД. Не критично.

Команда для перевірки:
```sql
SHOW TABLES;
SELECT COUNT(*) FROM news_v2;
SELECT COUNT(*) FROM news;
```

---

## 4. Перехід зі schema-push трюку на `payload migrate`

**Контекст.** Зараз ми оновлюємо Payload-схему на проді через one-shot `NODE_ENV=development` push (Drizzle pull-then-push). Це працює, але має проблеми:

- При ambiguous renames Drizzle питає інтерактивно — у non-TTY SSH сесії висне. Workaround: дропати порожню таблицю перед push (як для `documents`).
- Зміни схеми не версіонуються в git. Немає історії "що було applied коли".
- Можливі data loss warnings, які треба підтвердити вручну.

**Що зробити:**

Перейти на стандартний Payload migrate-workflow:

1. Згенерувати міграцію: `payload migrate:create --name <description>` локально.
2. Закомітити файл міграції в `migrations/` директорію.
3. На проді запускати `payload migrate` під час деплою (можна додати у `scripts/deploy.sh`).
4. Відключити `push: true` у `payload.config.ts` навіть для dev — повністю на міграціях.

Документація: <https://payloadcms.com/docs/database/migrations>.

**Складність:** середня. Треба правильно налаштувати `drizzle.config.ts` (або payload config), згенерувати **першу** baseline-міграцію зі snapshot поточного стану.

---

## 5. Домен + SSL (Etap 4)

**Контекст.** Сайт зараз на `http://204.168.161.68/`. DNS не прив'язаний, HTTPS нема. Детальна інструкція у [`deploy.md → Етап 4`](deploy.md#етап-4--домен--ssl-todo) — все вже розписано: DNS A-records, certbot через Docker, оновлення nginx-конфігу на HTTPS + redirect 80→443, cron-renewal.

**Передумова:** рішення про домен та доступ до DNS-провайдера.

---

## 6. `multer@1.x` CVE

**Контекст.** `services/files-api/package.json` тримає `multer@^1.4.5-lts.1`. У вересні 2024 з'явився `multer@2.x` з критичним фіксом для DoS через resource exhaustion. Деталі: <https://github.com/expressjs/multer/security/advisories/GHSA-g5hg-p3ph-g8qg>.

**Що зробити:**

```bash
cd services/files-api
npm install multer@^2.0.0
# Перевірити сумісність API (2.x може мати breaking changes у обробці помилок)
npm test 2>/dev/null   # або вручну smoke-test upload через curl
```

Після оновлення може взагалі стати непотрібним (див. пункт 2 — `files-api` може зникнути).

---

## 7. Local dev → live prod data

**Контекст.** Зараз `npm run dev` працює з локальним порожнім SQLite (схема є, даних нема). Щоб бачити реальні новини/документи — треба руками rsync'ити snapshot з прода. Описано в README.md, але це manual-процес.

**Можливі покращення (нижчий пріоритет):**

- `scripts/pull-prod-data.sh` — обгортка над VACUUM INTO + rsync (SQLite + uploads).
- Або — якщо часто треба live — переписати `payload-news.ts` на fetch-через-REST в dev-режимі (читати з `http://204.168.161.68/api/payload/news?...` замість локального getPayload). Працюватиме без знятого snapshot. Trade-off: SSR-залежний від мережі та від доступності прода.

---

## 8. Решта дрібниць

- **`sharp` для resize.** У `payload.config.ts` нема `sharp` в `buildConfig`. У логах warning. Картинки новин зараз — single-size original. Якщо потрібні thumbnail/card/feature розміри для оптимізації — додати `sharp` у `buildConfig`.
- **Email adapter.** Аналогічний warning. Якщо плануємо notifications/forgot-password — додати, напр., `@payloadcms/email-resend` або nodemailer.
- **Cron бекапи.** Зараз `scripts/deploy.sh` робить snapshot SQLite перед кожним деплоєм, але регулярних бекапів MySQL і Payload — нема. Розглянути `cron + mysqldump --single-transaction` + `sqlite3 VACUUM INTO` через ніч.
- **Моніторинг.** Uptime ping, alerts на disk full / контейнер впав — поки нічого нема.
- **Legacy rewrite у `next.config.ts`.** Перевірити чи ще потрібен `/api/*` rewrite на старий IP. Якщо всі API вже на новому стеці — прибрати.
