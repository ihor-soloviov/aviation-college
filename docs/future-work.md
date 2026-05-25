# Наступні роботи

Перелік того, що ще треба зробити, з контекстом і конкретними кроками. Кожен пункт можна закривати окремо — порядок не критичний, окрім явних залежностей.

Стан на **2026-05-25**.

---

## 1. Articles + LinkLists — Phase 2

**Phase 1 (MVP) завершена 2026-05-22.** Створено три колекції: `articles` (контент-сторінки з блоками, drafts), `linkLists` (структурні списки посилань, 3 рівні вкладеності, polymorphic target). PoC: `SelfGovernancePage` тягне дані з linkList "self-governance" — дизайн зберігся, редактор керує з адмінки.

**Розширення PoC 2026-05-22:** додано accordion-UX для inline subgroup ("Звітність" з 15 PDFs у hub-картці, `HubItemCard.tsx`). Аудит підтвердив, що max-depth 3 у схемі покриває 96% legacy hubs.

### ✅ §1.1 + §1.2 ЗАВЕРШЕНО і ЗАДЕПЛОЄНО на прод (2026-05-25, commit `b4d91d6`)

Усі native-компоненти, що лягають у патерн, переведено на CMS-driven `getLinkListBySlug` + `export const dynamic = 'force-dynamic'`. **12 linkLists** засіяно у прод (`src/scripts/seed/seed-link-lists.ts`, ідемпотентний upsert by slug). Редактор керує списками з `/admin` → «Списки посилань». Дизайн кожного компонента збережено.

| linkList slug | Компонент | Структура |
|---|---|---|
| `self-governance` | SelfGovernance (PoC) | tree-2 + accordion |
| `anti-bullying` | AntiBullying | flat, 6 docs |
| `attestation-mon` / `attestation-orders` | teachers/attestation/mon, /orders | flat 4 / 5 |
| `social-scholarships` | SocialScholarships | 8 `info`-карток |
| `practical-training` + `practice-bases` | PracticalTraining | 2 docs + 2 групи (30 баз) |
| `code-of-conduct` | CodeOfConduct | flat, 1 doc |
| `scholarship-rating` | ScholarshipRating | **tree-3** (відділення→рік→семестр) |
| `science` | Science | tree-2, 4 секції, 11 docs |
| `elective-courses` | ElectiveCourses | flat, 1 doc |
| `teachers-nav` | **усе меню «Викладачам»** (`lib/teachers.tsx` → `getTeachersCategories()`) | tree-2, 6 категорій, 38 docs |

**Нова інфраструктура (під час §1.1/§1.2):**
- `LinkLists.icon`: `text` input → **`select`** з курованим ICON_OPTIONS (~70 Lucide-іконок, укр. підписи). На запит замовника.
- Новий `kind: 'info'` — картка без посилання (для контент-карток типу пільгових категорій). Зачеплено `LinkLists.ts`, `lib/link-lists.ts` (`LinkListItemKind`), seed.
- `COLOR_OPTIONS` розширено: + `emerald`, `sky`, `cyan`, `violet`, `rose`.
- Виправлено баг seed для tree-3: L3-вкладеність пишеться у поле `entries` (L2 — `children`); `buildItemForPayload` отримав параметр `depth`.

**Лишається native свідомо:** `entrance-2025` (tree-4 інтерактивний DocumentSidebar/Viewer, 910 рядків — занадто складний, за рішенням).

**Прибрано:** невживаний `attestationPdfUrls` з `lib/teachers/attestation.data.ts`; `practiceBases`/`*Url` з PracticalTraining/data.ts; hardcoded масиви в усіх перелічених компонентах.

**⚠️ Data-quality (перевірити в адмінці):**
- `3274` (science «Козацтво») — відсутній у legacy `articles_v2`, зламаний лінк ще до міграції → поки `kind:external` `/article/3274`.
- `4551`, `4793` (scholarship-rating) — HTML зі сторонніми заголовками («Програми вступних випробувань», «анкетування»), позначені як семестрові рейтинги → поки `kind:external` `/article/N`.
- Усі `external→/article/N` чекають §1.5 (переключення на `kind:article` після §1.3).

**Деплой-нотатка:** seed на проді запускається one-off контейнером (runner-образ не містить `src/`, тож монтуємо з git-pulled хоста):
```bash
ssh aviation 'cd /home/deploy/aviation && docker compose --env-file .env.production run --rm \
  -v $(pwd)/src:/app/src -v $(pwd)/payload.config.ts:/app/payload.config.ts \
  -v $(pwd)/tsconfig.json:/app/tsconfig.json \
  next node_modules/.bin/tsx src/scripts/seed/seed-link-lists.ts'
```
Порядок безпечного деплою: бекап cms.sqlite → `git pull` → **seed** (дані в живу БД до нового коду — інакше мігровані сторінки `notFound()`) → `docker compose up -d --build` → `restart nginx` → health-check.

Повний дизайн і лог рішень: [`docs/architecture/articles-and-link-lists.md`](architecture/articles-and-link-lists.md).
Дослідницькі дані: [`audit/coverage.md`](../audit/coverage.md), [`audit/tree-depth.md`](../audit/tree-depth.md), [`audit/clusters.json`](../audit/clusters.json).

### Що залишилось (Phase 2 backlog, у порядку залежностей)

**~~1.1. Розширити seed на решту native компонентів.~~ ✅ ЗРОБЛЕНО (2026-05-25).** Усі засіяно (див. таблицю вище). Відмінності від початкового плану:
- `teachers-pedagogical-treasure` → розширено до **всього меню «Викладачам»** (`teachers-nav`, 6 категорій, 38 docs) — рендериться через `ExpandableNavigation` з `getTeachersCategories()`.
- `teachers-attestation` → два окремі списки `attestation-mon` (4) + `attestation-orders` (5); наративні підсторінки (general-info, qualification-requirements, email) лишились у коді.
- `social-scholarships` → виявилось контент-сторінкою без лінків → 8 `info`-карток (категорії); чек-лист/контакт лишились у коді.
- `practical-training` → 2 docs + окремий список `practice-bases` (30 баз як 2 групи `info`).
- `entrants-2025-licenses` → **НЕ зроблено**: `entrance-2025` лишається native (tree-4 viewer, занадто складний).

**~~1.2. Рефакторити native у server-component.~~ ✅ ЗРОБЛЕНО (2026-05-25).** Винесення спільного `LinkListRenderer` (з початкового плану) **не знадобилось** — жоден компонент, крім SelfGovernance, не перевикористовує grid+accordion патерн; кожен має унікальний дизайн. `HubItemCard` лишається локальним для SelfGovernance.

**1.2a. Уніфікувати legacy inline link styling.** ⏳ НЕ зроблено. `src/components/news/BlocksRenderer.tsx → LinkListBlock` ще використовує "синій-underlined" pattern. Перевести на compact-row design (як `ChildRow` у `HubItemCard.tsx`).

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

**Стан (2026-05-25):** ✅ практично покрито через §1.2. Усі мігровані компоненти (anti-bullying, attestation, social-scholarships, practical-training, code-of-conduct, scholarship-rating, science, elective-courses, teachers-nav) тепер рендерять `/documents/<id>` замість `/api/articles/X/file` (resolver у `src/lib/link-lists.ts`). Лишкові прямі refs можуть бути лише в `entrance-2025` (стало native) та інших не-hub компонентах — перевірити `grep -rn "/api/articles" src/` перед видаленням роута.

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
