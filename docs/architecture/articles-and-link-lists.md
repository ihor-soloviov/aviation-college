# Articles + LinkLists — design

Стан: **Phase 1 MVP + Phase 2 §1.1-§1.2 задеплоєно** (12 linkLists на проді, commit `b4d91d6`). **Стадія A (page-builder) + Live Preview + Стадія B (Navigation-global + root catch-all, чисті URL `/<slug>`) — зібрано й верифіковано локально, ще НЕ задеплоєно**. Останнє оновлення: 2026-05-27.

> **Зміна напряму (2026-05-27).** Початковий план §1.3 — «мігрувати ~500 легасі-статей у `articles`». Після обговоренння переосмислено: справжня ціль — **no-code page-builder**, щоб адміністрація сама збирала *нові* сторінки з курованих блоків (анти-WordPress: палітра блоків = дизайн-система як огорожа). Міграція легасі стає лише одним зі способів наповнення. Стратегія: **two-tier** (bespoke-сторінки лишаються кодом; CMS-`articles` приймає лише сироти) + **demand-driven** (мігрувати тільки те, на що реально посилаються — стартовий набір ≈8 ID, не 500). Деталі — у новому розділі «Лог рішень Стадія A».

Базується на: `audit/coverage.md`, `audit/native-hubs.md`, `audit/clusters.json`.

## Лог рішень (що сталося після фактичної реалізації)

- **Назва nested arrays:** Drizzle не дозволяє два рівні з однаковим іменем `children`. Тому L1 = `items`, L2 = `children`, L3 = `entries`. Це різні поля з однаковим shape.
- **Сторінки з `getLinkListBySlug` мусять бути `export const dynamic = 'force-dynamic'`** — Next.js prerender під час `npm run build` не має доступу до SQLite bind-mount.
- **HTML legacy hubs у seed:** для self-governance 3 з 5 IDs виявилися HTML-сторінками (не PDFs). Поки articles ще не мігровані — seed їх як `kind: external, targetUrl: /article/<legacyId>`. Існуючий `/article/:id` route їх обробляє через MySQL fallback. Замінити на `kind: article` після Phase 2.
- **payload-types.ts** локально не генерується автоматично через next 16 + payload bin incompat. Helper працює з ad-hoc типами в `src/lib/link-lists.ts`. Не блокує — type-check проходить.
- **Drafts увімкнено** для обох колекцій (підтверджено в обговоренні).
- **Max-depth 3 у схемі обґрунтована аудитом** (`audit/tree-depth.md`): 96% legacy hubs мають фактичну глибину ≤3 (81% — depth=1, 11% — depth=2, 4% — depth=3). Решта 4% — гігантські навігаційні центри типу "Навчальний відділ" (depth=8), які повинні бути окремими сторінками, а не inline.
- **DAG-структура легасі-навігації.** Один sub-hub часто входить у кілька parents (наприклад "Співпраця з підприємствами" — у 12). У CMS це обробляємо через окремі linkLists records + `LinkListRef` block; не дублюємо.
- **UX inline subgroup — accordion з chevron.** Card з `kind:group` стає кнопкою з ▾/▴ chevron'ом. Клік розкриває children всередині того ж grid-cell (`grid items-start` дозволяє ріст без впливу на сусідів). Children рендеряться як compact rows: icon + title + ↗. PoC: SelfGovernance "Звітність" з 15 PDFs (`HubItemCard.tsx`).

### Лог рішень Phase 2 §1.1-§1.2 (2026-05-25)

- **`icon` — `select`, не `text`.** На запит замовника поле іконки стало випадайкою з курованим `ICON_OPTIONS` (~70 Lucide, укр. підписи `"Документ — FileText"`). Стовпець у БД лишається TEXT → schema-push безпечний. Значення = точна назва Lucide-компонента.
- **Новий `kind: 'info'`** — картка без посилання. Виник на social-scholarships (8 пільгових категорій — це контент, не лінки). `resolveHref` повертає null; рендериться як неклікабельна картка. Дозволяє редактору керувати й контент-картками (бази практики, категорії).
- **Кожен компонент — власний дизайн, спільного рендерера немає.** `LinkListRenderer` НЕ виносили: anti-bullying (border-l картки), scholarship-rating (tree-3 відділення→рік→badge-кнопки), science (4 секції), teachers-nav (ExpandableNavigation) — усі різні. Спільний лише helper `getLinkListBySlug` + `LinkListItem` тип. HubItemCard локальний для SelfGovernance.
- **teachers-nav — ціле меню в CMS.** Замість лише «педагогічної скарбниці» мігрували всю навігацію «Викладачам» (6 категорій) в один linkList. `lib/teachers.tsx` тепер `getTeachersCategories()` — async-адаптер CMS→`NavigationCategory[]` (мапить group→category, icon-рядок→JSX `<Icon/>`, children→links). `ExpandableNavigation` без змін.
- **Bug fix: tree-3 seed.** Drizzle/Payload nest L2 під `children`, L3 під `entries`. `buildItemForPayload` писав усе під `children` → L3 губився. Додано `depth`-параметр: nestedKey = `children` (depth 1) або `entries` (depth 2+). Виявлено на scholarship-rating.
- **Прод-seed через one-off контейнер.** Runner-образ (standalone-style) не містить `src/`/`payload.config.ts`/`tsconfig.json`. Seed на проді: `docker compose run --rm` з bind-mount цих файлів з git-pulled хоста; node_modules+tsx беруться з образу. Порядок деплою: backup → pull → **seed** (до нового коду, бо мігровані сторінки роблять `notFound()` без даних) → build → nginx → health-check.
- **HTML/missing legacy IDs → `kind:external /article/N` (тимчасово).** 28 (practical-training бази — HTML), 3274 (science Козацтво — відсутній у legacy), 4551/4793 (scholarship-rating — HTML зі сторонніми заголовками). Переключити на `kind:article` у §1.5 після §1.3.

### Лог рішень Стадія A — page-builder + Live Preview (2026-05-27)

- **`articles` стала колекцією-page-builder «Сторінки» (злиття, без перейменування slug).** Slug колекції лишився `'articles'` — задля сумісності з прод-таблицею, звʼязком `LinkLists.targetArticle → articles` та `resolveHref → /articles/<slug>`. Змінено лише labels («Сторінка/Сторінки»), додано `parent` (relationship→articles, для breadcrumbs), SEO-group (`metaTitle`/`metaDescription`).
- **MVP-палітра «Lean +3».** Свідомо мінімальний набір, щоб не закопатись у 15 блоків: `Hero` (gradient/image/minimal), `CardGrid` (icon+color+href, 2–4 кол.), `InfoBanner` (info/warning/success). Разом із наявними (Paragraph, Heading, ImageBlock, Gallery, Youtube, LinkList, LinkListRef) — 10 блоків. `DocumentList` відкладено (потребує тегування Documents, `coverage.md §6.4`).
- **Спільні опції винесено.** `src/blocks/shared-options.ts` (`COLOR_OPTIONS`, `ICON_OPTIONS`) — єдине джерело правди для linkLists і блоків (раніше дублювалось у `LinkLists.ts`). `src/lib/cms-colors.ts` — color→**літеральні** Tailwind-класи (динамічні `bg-${c}-600` Tailwind вирізає при purge; патерн узятий з наявних hub-компонентів).
- **`BlocksRenderer` тепер спільний для News і Сторінок** + дороблено `linkListRef` (раніше падав у `default → null` — прихований баг). Рендер reuse'ить `getLucideIcon`-патерн із `HubItemCard`.
- **Роут `/articles/[slug]`** (`force-dynamic`) + helper `src/lib/pages.ts` (`getPageBySlug` — резолв, breadcrumbs з ланцюга `parent`, підвантаження резолвлених linkLists для блоків `linkListRef`). SEO через `generateMetadata`. Заголовок-h1 ховається, якщо сторінка починається з Hero.
- **Live Preview** (`@payloadcms/live-preview-react`). `admin.livePreview` у конфігу для колекції `articles` + breakpoints (Телефон/Планшет/Десктоп). `LivePreviewListener` (client, `RefreshRouteOnSave`) робить `router.refresh()` на зміни. Прев'ю тягне **чернетку** через `?preview=true` → `getPageBySlug(slug, { draft: true })`.
- **Push-глюк індексу (відома вада drizzle-sqlite `push:true`).** Додавання `parent` у versioned-колекцію спричиняє разовий `CREATE INDEX _articles_v_parent_idx already exists` під час *переходу схеми*. Перший push (seed) чистий; повторний init може раз кинути помилку й відновитись (відтворено: усталений рестарт — 0 помилок). На проді перший init після цього деплою може раз дати 500 → health-check ретраїть. Нуль-ризику = перехід з `push` на міграції (окремо).
- **No-code звʼязок page→list залежить від дизайну споживача.** Generic-споживачі (`linkListRef`-блок, self-governance grid) рендерять усі items/children → лінк можна додати будь-куди. Bespoke-споживачі (`SciencePage` = 4 фіксовані секції з `items[0..3].children`, scholarship-rating = дерево) приймають лінк **лише в наявну групу**; нова секція/top-level потребує коду. Підтверджено демонстрацією (`src/scripts/seed/demo-link-to-page.ts`). Висновок: щоб **будь-яке** місце (зокрема верхнє меню) стало no-code — потрібен Navigation-global + узагальнений рендер.
- **Relabel після злиття.** `kind` опція `article`: «Стаття (HTML контент)» → «Сторінка коледжу (page-builder)»; поле `targetArticle`: «Стаття» → «Сторінка».
- **Не зроблено навмисно (наступні стадії):** `DocumentList`-блок, demand-driven міграція легасі, `?preview=true` hardening через Next `draftMode()`, кеш `getPageBySlug`. *(Root catch-all + Navigation-global — закрито у Стадії B, див. нижче.)*

### Лог рішень Стадія B — Navigation-global + root catch-all (2026-05-27)

- **No-code меню через Payload-global `Navigation`.** Пласка структура `items[]` = `{ label, type(page|url), page→articles, url }` (як поточний хедер, без дропдаунів — підтверджено замовником). `getNavigation()` (`src/lib/get-navigation.ts`, server-only) резолвить href (`page → /<slug>`, `url → as-is`) із fallback на статичний `src/lib/navigation.ts`, щоб хедер ніколи не лишився без меню. `RootLayout` став async → фетчить меню → передає пропсом у `Header`/`MobileMenuDrawer` (обидва client, отримали проп `links` зі статичним default).
- **Канонічний URL сторінок = `/<slug>`** (рішення замовника). Root catch-all `app/(frontend)/[...slug]/page.tsx` — канонічний рендер (той самий, що був у `/articles/[slug]`). Next пріоритезує статичні роути, тож наявні сторінки не зачіпаються; catch-all ловить лише невідомі шляхи й 404-ить, якщо сторінки нема. Пласка схема: рендер лише для одного сегмента (`slug.length === 1`).
- **`/articles/[slug]` → `permanentRedirect('/<slug>')`** (308). Старі лінки/закладки не ламаються. `resolveHref` (link-lists) і breadcrumbs (pages) переведено на `/<slug>`. `livePreview.url` → `/<slug>?preview=true`.
- **Весь frontend → `export const dynamic = 'force-dynamic'`** (у `(frontend)/layout.tsx`). Причина: layout читає меню з CMS — інакше ~29 раніше-статичних сторінок запікали б меню на build-time (зміна меню не видна без редеплою) + prod-build падав би на пререндері без SQLite. Тредофф: втрата статичної оптимізації; для low-traffic коледжу прийнятно й узгоджується з тим, що хаб-сторінки вже force-dynamic. Альтернатива на майбутнє (якщо треба статика): `unstable_cache(nav)` + `revalidateTag('navigation')` на зміну global.
- **Колізія slug ↔ статичний роут.** Сторінка зі slug, що збігається зі статичним роутом (напр. `students`), затіниться статичним роутом (Next пріоритет). Малоймовірно; не блокуємо, але треба знати.
- **Seed:** `src/scripts/seed/seed-navigation.ts` — заповнює global із поточних 9 пунктів (усі `type:url`).

---

## 1. Контекст і цілі

Дві задачі, які закриваємо одночасно:

- **Content pages** — 400-500 цінних legacy HTML статей (з 736) у CMS, з блоковою структурою як `news`.
- **Hub-конструктор** — заміна hard-coded `sections = [...]` у native React компонентах на CMS-driven списки. Адмінка повинна редагувати ці списки без редагування коду.

Реалізуємо **три колекції** замість двох: окремо `articles` (контент), окремо `linkLists` (структура посилань). Native React-дизайни **зберігаються** — змінюється лише джерело даних.

---

## 2. Архітектура

```
┌────────────────┐    ┌────────────────┐    ┌────────────────┐
│   documents    │    │    articles    │    │   linkLists    │
│   існує: 5178  │    │  плануємо: ~500│    │  плануємо: ~30 │
│   PDFs         │    │  HTML контент  │    │  структурні    │
│                │    │  з блоками     │    │  списки лінків │
└───────▲────────┘    └───────▲────────┘    └───────┬────────┘
        │                     │                     │
        └─────────────────────┴─── polymorphic target
                              │
                              │  (relation "items[].target")
```

**Articles** і **documents** — кінцеві контентні сутності. **LinkLists** — це структура навігації, що посилається на них.

---

## 3. Колекція `articles`

Майже копія `News`, з відмінністю в семантиці (статичний контент vs новини за датою). `legacyId` для міграції з `articles_v2 WHERE view_mode IN ('html','docx_to_html')`.

### Поля

| Поле | Тип | Required | Сидбар | Коментар |
|------|-----|----------|--------|----------|
| `legacyId` | number, unique, index | — | yes | original `old_id`, заповнюється при міграції |
| `title` | text | yes | — | заголовок |
| `slug` | text, unique, index | yes | — | URL-частина; auto-generate hook (як у News) |
| `excerpt` | textarea | — | — | короткий опис для cards/preview |
| `coverImage` | upload→media | — | — | опційне зображення-обкладинка |
| `tags` | array→{tag:text} | — | — | вільні теги |
| `publishedAt` | date | — | yes | дата (для articles менш критично, ніж для news) |
| `content` | blocks | — | — | `Paragraph`, `Heading`, `ImageBlock`, `Gallery`, `Youtube`, `LinkList`, **`LinkListRef`** |

### Блок `LinkListRef` (новий)

Інлайн в content можна вставити посилання на `linkLists` за slug:

```ts
{
  blockType: 'linkListRef',
  linkList: { relationTo: 'linkLists', value: <id> }
}
```

Це дозволяє переписувати legacy hub-style сторінки як `articles`, де body — короткий вступ + ембед лінк-листа.

### Drafts

`versions.drafts: true` — для перегляду перед публікацією (як News).

### Admin

```ts
admin: {
  useAsTitle: 'title',
  defaultColumns: ['title', 'slug', '_status'],
}
```

---

## 4. Колекція `linkLists`

Це ядро hub-конструктора. Кожен запис = структурований список лінків з опційною ієрархією.

### Top-level поля

| Поле | Тип | Required | Коментар |
|------|-----|----------|----------|
| `slug` | text, unique, index | yes | ключ для fetch з коду (`'self-governance'`, `'attestation-2025'`) |
| `title` | text | yes | заголовок списку (для admin + опційно hero) |
| `description` | textarea | — | опис для hero/preview |
| `intro` | richText (Lexical) | — | вільний вступ перед списком (опційний) |
| `items` | array (max-depth 3) | yes | сам список — див. нижче |

### Item — структура (max-depth 3 через nested arrays)

Один елемент списку — це або **leaf** (з target), або **group** (з children).

**Спільні поля:**

| Поле | Тип | Коментар |
|------|-----|----------|
| `title` | text, required | заголовок пункту |
| `description` | textarea | опційний пояснювальний текст |
| `icon` | text | назва Lucide-іконки (`"FileText"`, `"Calendar"`) — необов'язково |
| `color` | select | accent (`blue`, `purple`, `green`, `orange`, `pink`...) — для дизайну |
| `badge` | text | опційний badge-text (`"Новий"`, `"2025"`) |

**Один з двох наборів:**

A. **Leaf-target:**

| Поле | Тип | Коментар |
|------|-----|----------|
| `targetType` | select [`document`,`article`,`external`] | discriminator |
| `targetDoc` | relationship→documents (conditional) | якщо `targetType=document` |
| `targetArticle` | relationship→articles (conditional) | якщо `targetType=article` |
| `targetUrl` | text (conditional) | якщо `targetType=external` |

B. **Group-children:**

| Поле | Тип | Коментар |
|------|-----|----------|
| `children` | array | нащадки (теж item, до 2-х рівнів далі) |

### Чому не polymorphic relationship прямо

Payload підтримує `relationTo: ['documents', 'articles']`. Це працює, але:
- зовнішні URL все одно треба окремим полем
- conditional UI (admin) виходить чистішим з явним `targetType` discriminator

Тому: один select + три conditional relationship/text — це більш explicit і дружнє редактору.

### Max-depth 3 у Payload

Payload не підтримує `recursive` array. Тому схема буде задана трьома вкладеними `array` полями з однаковою формою — об'єднано через спільний helper-export.

Псевдо-структура:

```ts
const linkItemFields = (allowChildren: boolean): Field[] => [
  { name: 'title', type: 'text', required: true },
  { name: 'description', type: 'textarea' },
  { name: 'icon', type: 'text' },
  { name: 'color', type: 'select', options: [...] },
  { name: 'badge', type: 'text' },
  { name: 'targetType', type: 'select', options: ['document', 'article', 'external', 'group'] },
  { name: 'targetDoc', type: 'relationship', relationTo: 'documents', admin: { condition: (_, s) => s.targetType === 'document' } },
  { name: 'targetArticle', type: 'relationship', relationTo: 'articles', admin: { condition: (_, s) => s.targetType === 'article' } },
  { name: 'targetUrl', type: 'text', admin: { condition: (_, s) => s.targetType === 'external' } },
  ...(allowChildren ? [{ name: 'children', type: 'array', fields: linkItemFields(false) }] : []),
]

// Top-level:
{ name: 'items', type: 'array', fields: linkItemFields(true) }   // depth 1, дозволяє level 2
// Внутри Level 2:
// children: linkItemFields(true)  → level 3 (тут вкладений children без рекурсії)
```

Фактично — три явні вкладені arrays, але через helper-функцію код DRY.

### Slug auto-hook

Як у News:

```ts
hooks: {
  beforeValidate: [({ value, data }) => {
    if (value?.trim()) return value
    if (data?.title) return slugify(String(data.title))
    return value
  }],
}
```

---

## 5. Polymorphic target — приклад поведінки

В адмінці редактор бачить:

```
Section item:
  Title: [Положення про самоврядування         ]
  Description: [Нормативний документ...        ]
  Icon: [FileText]    Color: [blue ▾]   Badge: [   ]
  Target type: [(•) Document  ( ) Article  ( ) External URL  ( ) Group]
  Target document: [ Положення про самоврядування ▾ ]   (з пошуку)
```

Зміна Target type → інші поля приховуються/показуються через `admin.condition`.

Якщо `targetType=group` → з'являється `children` репітер.

---

## 6. Native компоненти — pattern consumption

### `src/lib/link-lists.ts` (новий helper)

```ts
import { getPayload } from 'payload'
import config from '@payload-config'

export type LinkListItem = {
  title: string
  description?: string
  icon?: string
  color?: string
  badge?: string
  href: string | null              // вже resolved з targetDoc/targetArticle/targetUrl
  children?: LinkListItem[]
}

export type LinkList = {
  slug: string
  title: string
  description?: string
  intro?: SerializedLexicalState | null
  items: LinkListItem[]
}

export async function getLinkListBySlug(slug: string): Promise<LinkList | null> {
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'linkLists',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,    // підвантажить targetDoc/targetArticle
  })
  const raw = res.docs[0]
  if (!raw) return null

  return {
    slug: raw.slug,
    title: raw.title,
    description: raw.description,
    intro: raw.intro ?? null,
    items: resolveItems(raw.items),
  }
}

function resolveItems(rawItems: any[]): LinkListItem[] {
  return rawItems.map((it) => ({
    title: it.title,
    description: it.description,
    icon: it.icon,
    color: it.color,
    badge: it.badge,
    href: resolveHref(it),
    children: it.children ? resolveItems(it.children) : undefined,
  }))
}

function resolveHref(it: any): string | null {
  if (it.targetType === 'document' && it.targetDoc) {
    const doc = typeof it.targetDoc === 'object' ? it.targetDoc : null
    return doc ? `/documents/${doc.id}` : null
  }
  if (it.targetType === 'article' && it.targetArticle) {
    const art = typeof it.targetArticle === 'object' ? it.targetArticle : null
    return art ? `/articles/${art.slug ?? art.id}` : null
  }
  if (it.targetType === 'external' && it.targetUrl) return it.targetUrl
  return null
}
```

### Native компонент `SelfGovernancePage` — після перетворення

```tsx
// Server component (RSC)
import { getLinkListBySlug } from '@/lib/link-lists'
import { notFound } from 'next/navigation'

export default async function SelfGovernancePage() {
  const list = await getLinkListBySlug('self-governance')
  if (!list) notFound()

  return (
    <div className="space-y-10">
      <HubHero title={list.title} description={list.description} />
      <SectionsGrid items={list.items} />     {/* колишній dom-mapping */}
      <InfoBanner description={list.description /* або з settings */} />
    </div>
  )
}
```

`SectionsGrid` стає окремим compoenntом, що вже сьогодні існує у формі layout-mapping. Підгрузка з list — і все.

---

## 7. Маршрут `/article/:id`

Поточна логіка: знайти у `documents.legacyId` → redirect; інакше fallback MySQL.

**Нова логіка:**

```ts
export default async function ArticlePage({ params }: Props) {
  const { id } = await params
  const numericId = Number(id)
  if (!Number.isFinite(numericId)) notFound()

  const payload = await getPayload({ config })

  // 1. Спробувати як документ
  const docResult = await payload.find({
    collection: 'documents',
    where: { legacyId: { equals: numericId } },
    limit: 1, depth: 0,
  })
  if (docResult.docs[0]) redirect(`/documents/${docResult.docs[0].id}`)

  // 2. Спробувати як article
  const artResult = await payload.find({
    collection: 'articles',
    where: { legacyId: { equals: numericId } },
    limit: 1, depth: 0,
  })
  if (artResult.docs[0]) redirect(`/articles/${artResult.docs[0].slug}`)

  // 3. MySQL fallback залишається тимчасово, поки articles не мігрує
  const legacy = await getArticleById(numericId)
  if (!legacy) notFound()
  return <LegacyArticleRenderer article={legacy} />
}
```

Коли вся міграція articles завершиться — MySQL fallback видаляємо разом з `src/lib/articles.ts` і `articles_v2` таблицею.

---

## 8. Етапи реалізації

| # | Етап | Стан | Опис |
|---|------|------|------|
| 1 | LinkLists schema + push | ✅ | `src/collections/LinkLists.ts`, push'нуто на прод, smoke-test 3-level CRUD passed |
| 2 | Articles schema + push | ✅ | `src/collections/Articles.ts` + новий блок `LinkListRef`, push'нуто на прод |
| 3 | `lib/link-lists.ts` helper | ✅ | server-only, polymorphic href resolver, flatten L2/L3 |
| 4 | PoC: SelfGovernance CMS-driven | ✅ | seed-script + рефакторинг компонента, prod віддає 200 з 5 пунктів |
| 4a | Аналіз hub-tree depth | ✅ | `audit/tree-depth.md`: 96% покриття з max-depth 3, DAG-структура, deepest hubs |
| 4b | Accordion subgroup UX | ✅ | `HubItemCard.tsx` (client) з chevron+toggle; pilot — "Звітність" #674 (15 PDFs) як `kind:group` |
| 5 | Розширити seed на решту native | ✅ | 11 нових SEEDS (anti-bullying, attestation-mon/orders, social-scholarships, practical-training, practice-bases, code-of-conduct, scholarship-rating, science, elective-courses, teachers-nav). Entrants-2025 лишився native. |
| 6 | Перенос решти native компонентів | ✅ | SelfGovernance pattern повторено для кожного; дизайн збережено |
| 6a | Винести `HubItemCard` у спільний `LinkListRenderer` | ❌ не потрібно | жоден інший компонент не перевикористовує grid+accordion — кожен має унікальний дизайн. HubItemCard лишається локальним |
| 6b | Уніфікувати стилі inline links (BlocksRenderer.LinkListBlock) | ⏳ | замінити синій-underlined стиль на compact-row pattern як у ChildRow (§1.2a) |
| 6c | `icon` text→select; новий `kind: 'info'`; +5 кольорів | ✅ | додано під час §1.2 (запит замовника + контент-картки) |
| 6d | Fix seed для tree-3 (L3 → `entries`) | ✅ | `buildItemForPayload` отримав `depth`; виявлено на scholarship-rating |
| 7 | ~~Migration script articles (~500 rows)~~ → **переосмислено в demand-driven** | 🔁 | замість масової міграції — мігруємо лише посилані HTML-таргети без native-еквівалента (≈8 ID на старті). Див. «Зміна напряму» вгорі |
| 8 | Оновити `/article/:id` route | ⏳ | додати articles.legacyId lookup + mapping legacy→native-роут перед MySQL fallback |
| 9 | Замінити в linkLists `external→/article/X` на `article→targetArticle` | ⏳ | пройти всі linkLists, де kind=external + targetUrl починається з `/article/` — переключити (вкл. 28, 3274, 4551, 4793) |
| 10 | Прибрати MySQL fallback | ⏳ | видалити `getArticleById`, `src/lib/articles.ts`, `articles_v2` таблицю (depends on §7-8 завершених) |
| A1 | `articles`→page-builder «Сторінки» | ✅ лок. | `parent`, SEO-group, повна палітра; slug колекції лишився `articles` |
| A2 | MVP-палітра Lean +3 | ✅ лок. | `Hero`, `CardGrid`, `InfoBanner` + `shared-options.ts` + `cms-colors.ts` |
| A3 | Рендер + роут | ✅ лок. | `BlocksRenderer` розширено (+ fix `linkListRef`), `lib/pages.ts`, `/articles/[slug]` |
| A4 | Live Preview | ✅ лок. | `admin.livePreview` + `LivePreviewListener`; прев'ю-чернетка через `?preview=true` |
| A5 | Relabel kind/target після злиття | ✅ лок. | «Сторінка коледжу (page-builder)» / «Сторінка» |
| A6 | Navigation-global + root catch-all (no-code меню) | ✅ лок. | global `Navigation` + `getNavigation()` у layout; catch-all `/[...slug]`, `/articles/<slug>`→308; URL = `/<slug>` |
| A6.1 | `force-dynamic` на всьому frontend | ✅ лок. | щоб CMS-меню було live скрізь; прибирає prod-build пререндер зі SQLite |
| A7 | `DocumentList`-блок | ⏳ | фільтрований листинг documents (`coverage.md §6.4`) |
| A8 | Hardening прев'ю через `draftMode()` | ⏳ | щоб `?preview=true` не віддавав чернетку публічно |

**Завершено й задеплоєно:** Phase 1 MVP (#1-4) + аудит глибини + accordion (#4a-4b) + **Phase 2 §1.1-§1.2 (#5, #6, #6c, #6d) — 2026-05-25**.
**Зібрано локально, НЕ задеплоєно:** **Стадія A (#A1-A5) + Live Preview** + **Стадія B (#A6, A6.1) — 2026-05-27** (commits `660cbc6`, `5454db6`, + Stage B).
**Залишилось:** #6b, #8-10 (demand-driven), #A7 (`DocumentList`), #A8 (preview hardening).

---

## 9. Майбутні розширення (Phase 2+)

### Documents — додаткові поля

З `coverage.md` § 6.4: ~70% uncovered legacy hubs — це **listings of documents by filter**. Додавання тегування у `documents` (+ generic listing route) автоматично покриває їх:

| Поле | Значення | Покриває |
|------|----------|----------|
| `department` | "Авіоніка", "Транспорт"... | "Заходи ЦК X" (56 hubs) |
| `specialty` | 073, 141, 173... | "Спеціальність N" (15+15=30 hubs) |
| `year` | "2023-2024" | "Розклад YYYY" (7 hubs) |
| `eventType` | "семінар", "тренінг", "захід"... | "Семінари за спеціальністю" (2 hubs з ~140 links) |
| `cycleCommission` | "КСМ", "ПОД та ПЗ", "ФПД"... | "Здобутки ЦК" / "Циклова комісія" |
| `kind` | "положення", "наказ", "розклад"... | "Положення коледжу", "Накази" |

Поки **не реалізуємо** в Phase 1. Окреме рішення коли дійдемо до 70%-кейсу.

### Generic documents-listing route

`/documents?department=avionics&kind=event` — рендерить cards. Можна використовувати з `LinkListRef`-style блоком "DocumentListByFilter".

### Articles → blocks → LinkListRef → CMS-pages

Замість 1 = 1 native React = 1 linkList, дозволити **CMS-only pages**: article з пустим contentом + один LinkListRef = вже сторінка-хаб, без жодного React-компонента. Це Phase 2-3.

---

## 10. Відкриті питання — поточний стан

| # | Питання | Стан |
|---|---------|------|
| 1 | Conditional fields у nested arrays (Payload `admin.condition`) | ✅ Працює. Smoke-test підтвердив для 3-х рівнів. |
| 2 | Seed-script vs ручне створення linkLists | ✅ Seed-script (`src/scripts/seed/seed-link-lists.ts`) обраний — ідемпотентний (upsert by slug), легко розширити. |
| 3 | `intro` як Lexical vs textarea | ✅ Lexical (richText) — реалізовано. У PoC не використовується, але доступно. |
| 4 | Slug uniqueness across articles vs documents | ⚠️ Поки `/articles/<slug>` і `/documents/<id>` не перетинаються. Якщо колись робимо `/documents/<slug>` — додати crossсcollection check. |
| 5 | Cache helper'у `getLinkListBySlug` | ⏳ TODO. На SQLite-rеад без cache незначний overhead, але на масштабі додати `unstable_cache` + revalidateTag('linkLists'). |
| 6 | Drafts для linkLists | ✅ Увімкнено. |
| 7 | Type generation (payload-types.ts) | ⏳ `payload generate:types` падає на next 16. Helper працює з ad-hoc типами. Окрема задача — або patch'нути bin, або генерувати в build-step. |
| 8 | Як обробляти кольори/іконки в admin UI | ⚠️ `color` — select з 10 опцій (Tailwind). `icon` — text input з Lucide name. Перевірити UX після того як редактор спробує. |
