# Наступні роботи

Перелік того, що ще треба зробити, з контекстом і конкретними кроками. Кожен пункт можна закривати окремо — порядок не критичний, окрім явних залежностей.

Стан на **2026-05-22**.

---

## 1. Articles + LinkLists — Phase 2 (Phase 1 завершена)

**Phase 1 (MVP) завершена 2026-05-22.** Створено три колекції: `articles` (контент-сторінки з блоками, drafts), `linkLists` (структурні списки посилань, 3 рівні вкладеності, polymorphic target). PoC: `SelfGovernancePage` тягне дані з linkList "self-governance" — дизайн зберігся, редактор керує з адмінки.

Повний дизайн і лог рішень: [`docs/architecture/articles-and-link-lists.md`](architecture/articles-and-link-lists.md).
Дослідницькі дані: [`audit/coverage.md`](../audit/coverage.md), [`audit/clusters.json`](../audit/clusters.json).

### Що залишилось (Phase 2 backlog, у порядку залежностей)

**1.1. Розширити seed на решту 10 native компонентів.** Додати до `SEEDS` у `src/scripts/seed/seed-link-lists.ts`:

- `anti-bullying` (6 items, 100% match з legacy hub #530)
- `code-of-conduct` (1 doc + 4 narrative sections — narrative залишити в коді)
- `social-scholarships` (1 doc + 8 категорій)
- `science` (12 items)
- `elective-courses` (1 catalog doc + 8 спеціальностей)
- `practical-training` (2 docs + 30 баз — бази як окремий список)
- `scholarship-rating` (16 items, tree-3 — використати `kind: group` з `children`)
- `teachers-pedagogical-treasure` (38 items, 68% match з #3255)
- `teachers-attestation` (13 items)
- `entrants-2025-licenses` (1 doc мінімум; повний tree-4 entrance-2025 залишається native — занадто складний)

**1.2. Рефакторити решту 10 native компонентів у server-component з `getLinkListBySlug`.** Patternalready proven (SelfGovernance):

- Видалити hard-coded `sections = [...]`
- Додати `export const dynamic = 'force-dynamic'` у відповідний `page.tsx`
- Рендер з `list.items.map(...)`
- Зберегти унікальний дизайн hero/banner

**1.3. Міграція legacy HTML content у `articles`.**

Контекст: з 1328 HTML-сторінок ~589 — hub-сторінки (replaceable through linkLists), 737 — content. З 737 фактично цінних (word_count ≥ 50) — ~400.

- Адаптувати `migrate-articles.ts` (PDF-only) → `migrate-articles-content.ts` (HTML-only).
- Перевикористати `parse-html.ts` (вже є, used by `migrate-news.ts`).
- Зображення: base64 → Media, external URLs (`/uploads/...`) → теж завантажити в Media.
- Фільтр: пропускати `kind in ('pure_hub','mixed_hub')` і `word_count < 50`.

**1.4. Маршрут `/article/:id` — додати articles lookup.**

Поточна логіка: documents.legacyId → redirect; інакше MySQL fallback.

Додати між ними: articles.legacyId → redirect to `/articles/<slug>`.

**1.5. Замінити в linkLists `kind: external → /article/X` на `kind: article → targetArticle`.**

Після міграції articles запустити one-shot скрипт що пройдеться по linkLists і для кожного item з `targetUrl=/article/N` знайде `articles.legacyId=N` і переключить на `kind: article + targetArticle=<id>`.

**1.6. Видалити MySQL-fallback.**

Після того як §1.3-1.5 завершені і нема broken-links:

- Видалити `src/lib/articles.ts`, `src/app/api/articles/`, `services/files-api/` (якщо тільки articles обслуговував — перевірити пункт 2 з future-work, §2).
- `DROP TABLE articles_v2` у MySQL.
- `rm -rf data/uploads/articles/*.html` на проді (1.6 GB free).

---

## 2. Static pages з hardcoded `/api/articles/X/file`

**Стан:** SelfGovernance вже не використовує цей URL (Phase 1 PoC, замість нього — `/documents/<id>`). Залишилось 10 native компонентів з ~91 hardcoded ref (`grep` у `src/components/` + `src/lib/`).

**Шлях покриття:** автоматично через §1.2 (рефакторинг native на CMS-driven). Після того як кожен компонент тягне дані з linkList — він рендерить `/documents/<id>` замість `/api/articles/X/file` (resolver у `src/lib/link-lists.ts` робить це централізовано).

**Після того як усі 11 native переписано:**

- Видалити `src/app/api/articles/[id]/file/route.ts` + `src/app/api/articles/[id]/file-remote/route.ts`.
- Видалити `getArticleContent` з `src/lib/articles.ts`.
- Видалити `data/uploads/articles/*.pdf` на сервері (звільнить ~5.9 GB).
- Видалити `services/files-api/` — перевірити чи інші покликання залишились (можливо `/api/news/*/file` ще десь є).

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
