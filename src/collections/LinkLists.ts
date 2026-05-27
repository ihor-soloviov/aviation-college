import type { CollectionConfig, Field } from 'payload'

import { COLOR_OPTIONS, ICON_OPTIONS } from '../blocks/shared-options'

function slugify(input: string): string {
    return input
        .toLowerCase()
        .trim()
        .replace(/['"`]/g, '')
        .replace(/[^a-z0-9Ѐ-ӿ]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

const KIND_OPTIONS = [
    { label: 'Документ (PDF)', value: 'document' },
    { label: 'Сторінка коледжу (page-builder)', value: 'article' },
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
        label: 'Сторінка',
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
