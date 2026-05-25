import type { CollectionConfig, Field } from 'payload'

function slugify(input: string): string {
    return input
        .toLowerCase()
        .trim()
        .replace(/['"`]/g, '')
        .replace(/[^a-z0-9Ѐ-ӿ]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

const COLOR_OPTIONS = [
    { label: 'Синій', value: 'blue' },
    { label: 'Індиго', value: 'indigo' },
    { label: 'Фіолетовий', value: 'purple' },
    { label: 'Рожевий', value: 'pink' },
    { label: 'Червоний', value: 'red' },
    { label: 'Оранжевий', value: 'orange' },
    { label: 'Жовтий', value: 'amber' },
    { label: 'Зелений', value: 'green' },
    { label: 'Смарагдовий', value: 'emerald' },
    { label: 'Бірюзовий', value: 'teal' },
    { label: 'Блакитний', value: 'sky' },
    { label: 'Ціановий', value: 'cyan' },
    { label: 'Фіалковий', value: 'violet' },
    { label: 'Трояндовий', value: 'rose' },
    { label: 'Сірий', value: 'slate' },
]

// Курований список Lucide-іконок для випадаючого вибору в адмінці.
// value === точна назва Lucide-компонента (резолвиться у LinkListRenderer/HubItemCard).
// Усі назви перевірені проти lucide-react. Щоб додати нову — додай рядок тут.
const ICON_OPTIONS = [
    // Документи / файли
    { label: 'Документ — FileText', value: 'FileText' },
    { label: 'Файл — File', value: 'File' },
    { label: 'Файли — Files', value: 'Files' },
    { label: 'Документ ✓ — FileCheck', value: 'FileCheck' },
    { label: 'Папка — Folder', value: 'Folder' },
    { label: 'Папка відкрита — FolderOpen', value: 'FolderOpen' },
    { label: 'Сувій — ScrollText', value: 'ScrollText' },
    { label: 'Завантажити — Download', value: 'Download' },
    { label: 'Друк/печатка — Stamp', value: 'Stamp' },
    // Списки / звіти
    { label: 'Список — ClipboardList', value: 'ClipboardList' },
    { label: 'Список ✓ — ClipboardCheck', value: 'ClipboardCheck' },
    { label: 'Чек-лист — ListChecks', value: 'ListChecks' },
    { label: 'Діаграма — BarChart3', value: 'BarChart3' },
    // Освіта / наука
    { label: 'Книга — BookOpen', value: 'BookOpen' },
    { label: 'Книга з закладкою — BookMarked', value: 'BookMarked' },
    { label: 'Випускник — GraduationCap', value: 'GraduationCap' },
    { label: 'Школа/заклад — School', value: 'School' },
    { label: 'Бібліотека — Library', value: 'Library' },
    { label: 'Презентація — Presentation', value: 'Presentation' },
    { label: 'Мікроскоп — Microscope', value: 'Microscope' },
    { label: 'Калькулятор — Calculator', value: 'Calculator' },
    { label: 'Історія — History', value: 'History' },
    { label: 'Колба — FlaskConical', value: 'FlaskConical' },
    { label: 'Ідея — Lightbulb', value: 'Lightbulb' },
    { label: 'Олівець — Pencil', value: 'Pencil' },
    { label: 'Нотатки — NotebookPen', value: 'NotebookPen' },
    // Люди
    { label: 'Люди — Users', value: 'Users' },
    { label: 'Людина — User', value: 'User' },
    { label: 'Людина ✓ — UserCheck', value: 'UserCheck' },
    { label: 'Контакт — Contact', value: 'Contact' },
    { label: 'Портфель — Briefcase', value: 'Briefcase' },
    { label: 'Дитина — Baby', value: 'Baby' },
    { label: 'Доступність — Accessibility', value: 'Accessibility' },
    // Нагороди
    { label: 'Нагорода — Award', value: 'Award' },
    { label: 'Кубок — Trophy', value: 'Trophy' },
    { label: 'Медаль — Medal', value: 'Medal' },
    { label: 'Зірка — Star', value: 'Star' },
    // Право / безпека
    { label: 'Терези — Scale', value: 'Scale' },
    { label: 'Молоток судді — Gavel', value: 'Gavel' },
    { label: 'Щит — Shield', value: 'Shield' },
    { label: 'Щит ✓ — ShieldCheck', value: 'ShieldCheck' },
    { label: 'Щит ! — ShieldAlert', value: 'ShieldAlert' },
    { label: 'Увага — AlertTriangle', value: 'AlertTriangle' },
    // Фінанси
    { label: 'Гроші — Banknote', value: 'Banknote' },
    { label: 'Гаманець — Wallet', value: 'Wallet' },
    { label: 'Картка — CreditCard', value: 'CreditCard' },
    // Зв'язок / навігація
    { label: 'Телефон — Phone', value: 'Phone' },
    { label: 'Пошта — Mail', value: 'Mail' },
    { label: 'Локація — MapPin', value: 'MapPin' },
    { label: 'Мапа — Map', value: 'Map' },
    { label: 'Глобус/сайт — Globe', value: 'Globe' },
    { label: 'Зовнішнє посилання — ExternalLink', value: 'ExternalLink' },
    { label: 'Посилання — Link', value: 'Link' },
    // Інше
    { label: 'Календар — Calendar', value: 'Calendar' },
    { label: 'Годинник — Clock', value: 'Clock' },
    { label: 'Дзвоник — Bell', value: 'Bell' },
    { label: 'Гучномовець — Megaphone', value: 'Megaphone' },
    { label: 'Новини — Newspaper', value: 'Newspaper' },
    { label: 'Зображення — Image', value: 'Image' },
    { label: 'Камера — Camera', value: 'Camera' },
    { label: 'Серце — Heart', value: 'Heart' },
    { label: 'Інфо — Info', value: 'Info' },
    { label: 'Увага (коло) — AlertCircle', value: 'AlertCircle' },
    { label: 'Дім — Home', value: 'Home' },
    { label: 'Заклад — Building2', value: 'Building2' },
    { label: 'Літак — Plane', value: 'Plane' },
    { label: 'Вантажівка — Truck', value: 'Truck' },
    { label: 'Монітор — Monitor', value: 'Monitor' },
    { label: 'Рукостискання — Handshake', value: 'Handshake' },
    { label: 'Мета — Target', value: 'Target' },
]

const KIND_OPTIONS = [
    { label: 'Документ (PDF)', value: 'document' },
    { label: 'Стаття (HTML контент)', value: 'article' },
    { label: 'Зовнішній URL', value: 'external' },
    { label: 'Група (з підпунктами)', value: 'group' },
    { label: 'Інфо-картка (без посилання)', value: 'info' },
]

type SiblingShape = { kind?: string }

const baseItemFields: Field[] = [
    {
        name: 'title',
        type: 'text',
        required: true,
        label: 'Заголовок',
    },
    {
        name: 'description',
        type: 'textarea',
        label: 'Опис',
    },
    {
        name: 'icon',
        type: 'select',
        label: 'Іконка',
        options: ICON_OPTIONS,
        admin: {
            description: 'Іконка пункту. Список курований; щоб додати нову — звернись до розробника.',
        },
    },
    {
        name: 'color',
        type: 'select',
        label: 'Акцентний колір',
        options: COLOR_OPTIONS,
    },
    {
        name: 'badge',
        type: 'text',
        label: 'Бейдж',
        admin: {
            description: 'Короткий текст-бейдж біля пункту, напр. "Новий", "2025".',
        },
    },
    {
        name: 'kind',
        type: 'select',
        required: true,
        defaultValue: 'document',
        label: 'Тип пункту',
        options: KIND_OPTIONS,
    },
    {
        name: 'targetDoc',
        type: 'relationship',
        relationTo: 'documents',
        hasMany: false,
        label: 'Документ',
        admin: {
            condition: (_data, sibling: SiblingShape) => sibling?.kind === 'document',
        },
    },
    {
        name: 'targetArticle',
        type: 'relationship',
        relationTo: 'articles',
        hasMany: false,
        label: 'Стаття',
        admin: {
            condition: (_data, sibling: SiblingShape) => sibling?.kind === 'article',
        },
    },
    {
        name: 'targetUrl',
        type: 'text',
        label: 'URL',
        admin: {
            condition: (_data, sibling: SiblingShape) => sibling?.kind === 'external',
            description: 'Зовнішнє посилання (https://...) або внутрішнє (/students/...).',
        },
    },
]

// Level 3 — листок дерева, без children.
const itemFieldsLevel3: Field[] = baseItemFields

// Level 2 — може мати leaf-entries (рівень 3 без подальшої вкладеності).
const itemFieldsLevel2: Field[] = [
    ...baseItemFields,
    {
        name: 'entries',
        type: 'array',
        label: 'Кінцеві пункти',
        labels: { singular: 'Кінцевий пункт', plural: 'Кінцеві пункти' },
        admin: {
            condition: (_data, sibling: SiblingShape) => sibling?.kind === 'group',
        },
        fields: itemFieldsLevel3,
    },
]

// Level 1 — top-level items, можуть мати children на level 2.
const itemFieldsLevel1: Field[] = [
    ...baseItemFields,
    {
        name: 'children',
        type: 'array',
        label: 'Підпункти',
        labels: { singular: 'Підпункт', plural: 'Підпункти' },
        admin: {
            condition: (_data, sibling: SiblingShape) => sibling?.kind === 'group',
        },
        fields: itemFieldsLevel2,
    },
]

export const LinkLists: CollectionConfig = {
    slug: 'linkLists',
    labels: {
        singular: 'Список посилань',
        plural: 'Списки посилань',
    },
    access: {
        read: () => true,
    },
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'slug', '_status'],
    },
    versions: {
        drafts: true,
    },
    fields: [
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            index: true,
            label: 'Slug',
            admin: {
                description: 'Ключ для звернення з коду, напр. "self-governance".',
            },
            hooks: {
                beforeValidate: [
                    ({ value, data }) => {
                        if (value && typeof value === 'string' && value.trim()) return value
                        if (data?.title) return slugify(String(data.title))
                        return value
                    },
                ],
            },
        },
        {
            name: 'title',
            type: 'text',
            required: true,
            label: 'Заголовок',
        },
        {
            name: 'description',
            type: 'textarea',
            label: 'Опис',
            admin: {
                description: 'Короткий опис, який рендериться у hero-блоці на сторінці.',
            },
        },
        {
            name: 'intro',
            type: 'richText',
            label: 'Вступ',
            admin: {
                description: 'Опційний вступний блок перед списком (rich text).',
            },
        },
        {
            name: 'items',
            type: 'array',
            required: true,
            minRows: 1,
            label: 'Пункти списку',
            labels: { singular: 'Пункт', plural: 'Пункти' },
            fields: itemFieldsLevel1,
        },
    ],
}
