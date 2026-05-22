# Articles + LinkLists — design

Стан: **draft** (потребує схвалення). Дата: 2026-05-22.

Базується на: `audit/coverage.md`, `audit/native-hubs.md`, `audit/clusters.json`.

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

| # | Етап | Залежить | Опис |
|---|------|----------|------|
| 1 | LinkLists schema + push | — | створити `src/collections/LinkLists.ts`, додати в `payload.config.ts`, push на прод |
| 2 | Articles schema + push | — | створити `src/collections/Articles.ts`, новий блок `LinkListRef`, push |
| 3 | `lib/link-lists.ts` helper | 1 | server-side fetch + resolve |
| 4 | PoC: SelfGovernance CMS-driven | 1, 3 | створити запис вручну в admin, переписати компонент |
| 5 | Migration script для linkLists | 1 | автонаповнення з 11 native файлів (опційно — можна руками) |
| 6 | Перенос решти native компонентів | 4 | по 1-2 на тиждень |
| 7 | Migration script articles | 2 | `migrate-articles-content.ts` — 736 content rows → articles |
| 8 | Оновити `/article/:id` route | 2, 7 | додати articles lookup |
| 9 | Прибрати MySQL fallback | 7, 8 | видалити `getArticleById`, `articles_v2` |

Етапи 1-4 — **MVP** (один тиждень роботи). Решта — поступово.

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

## 10. Відкриті питання / попередня перевірка

1. **Conditional fields в Payload-arrays.** Треба перевірити, що `admin.condition` працює всередині `array.fields` так як ми хочемо (показ/прих окремих полів за `targetType` siblings'а). У документації Payload — підтверджено для standalone, у nested — треба тестувати локально.
2. **Migration linkLists з native файлів.** Робити одним скриптом, чи створити запис руками у admin (швидше для 11 файлів)? **Рекомендація:** руками — це швидше і дає змогу одразу вичистити legacy mess (icon-mapping, color-mapping).
3. **Чи `intro` потрібен як Lexical?** Може textarea вистачить. Lexical — overkill для 1-2 параграфів, але дозволяє лінки/жирний у вступі.
4. **Slug uniqueness across articles vs documents.** Зараз: `/articles/<slug>` і `/documents/<id>`. Слаги не перетинаються. Якщо колись робимо `/documents/<slug>` — треба check.
5. **Cache.** `getLinkListBySlug` має бути cached (Next `unstable_cache` або revalidateTag). Інакше кожна сторінка тригерить DB. План: додати в helper.
6. **Drafts для linkLists?** Корисно якщо редактор хоче готувати новий список без публікації. Рекомендую: yes, з drafts.

---

## 11. Що очікую від тебе перед start coding

- [ ] Підтвердити структуру item-полів (поля A/B vs щось інше)
- [ ] Підтвердити порядок етапів (стартуємо з LinkLists, не Articles)
- [ ] Назви полів: `targetType` vs `kind` vs `type`; `targetDoc` vs `document`; `items` vs `entries`
- [ ] Опційно: розширити color/icon options згідно з фактичним вжитком у native компонентах
- [ ] Drafts для linkLists — yes/no
