import type { CollectionConfig } from 'payload'

import { CardGrid } from '../blocks/CardGrid'
import { Gallery } from '../blocks/Gallery'
import { Heading } from '../blocks/Heading'
import { Hero } from '../blocks/Hero'
import { ImageBlock } from '../blocks/ImageBlock'
import { InfoBanner } from '../blocks/InfoBanner'
import { LinkList } from '../blocks/LinkList'
import { LinkListRef } from '../blocks/LinkListRef'
import { Paragraph } from '../blocks/Paragraph'
import { Youtube } from '../blocks/Youtube'

function slugify(input: string): string {
    return input
        .toLowerCase()
        .trim()
        .replace(/['"`]/g, '')
        .replace(/[^a-z0-9Ѐ-ӿ]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

// Колекція "Сторінки" — no-code page-builder. Slug колекції лишається 'articles'
// для сумісності з наявною таблицею на проді та звʼязком LinkLists.targetArticle.
// Публічний роут: /articles/<slug>.
export const Articles: CollectionConfig = {
    slug: 'articles',
    labels: {
        singular: 'Сторінка',
        plural: 'Сторінки',
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
            name: 'legacyId',
            type: 'number',
            unique: true,
            index: true,
            label: 'Legacy ID',
            admin: {
                position: 'sidebar',
                readOnly: true,
                description: 'Оригінальний old_id з articles_v2 (заповнюється тільки при міграції).',
            },
        },
        {
            name: 'title',
            type: 'text',
            required: true,
            label: 'Заголовок',
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            index: true,
            label: 'Slug',
            admin: {
                description: 'URL-частина: /articles/<slug>. Якщо лишити пустим — згенерується із заголовка.',
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
            name: 'parent',
            type: 'relationship',
            relationTo: 'articles',
            hasMany: false,
            label: 'Батьківська сторінка',
            admin: {
                position: 'sidebar',
                description: 'Необовʼязково. Для breadcrumbs (хлібних крихт). URL лишається пласким /articles/<slug>.',
            },
        },
        {
            name: 'excerpt',
            type: 'textarea',
            label: 'Короткий опис',
        },
        {
            name: 'coverImage',
            type: 'upload',
            relationTo: 'media',
            label: 'Головне зображення',
        },
        {
            name: 'tags',
            type: 'array',
            label: 'Теги',
            labels: { singular: 'Тег', plural: 'Теги' },
            fields: [
                {
                    name: 'tag',
                    type: 'text',
                    required: true,
                },
            ],
        },
        {
            name: 'publishedAt',
            type: 'date',
            label: 'Дата публікації',
            defaultValue: () => new Date(),
            admin: {
                position: 'sidebar',
                date: {
                    pickerAppearance: 'dayAndTime',
                    displayFormat: 'dd.MM.yyyy HH:mm',
                },
            },
        },
        {
            name: 'content',
            type: 'blocks',
            label: 'Контент',
            blocks: [Hero, Paragraph, Heading, ImageBlock, Gallery, Youtube, CardGrid, InfoBanner, LinkList, LinkListRef],
        },
        {
            name: 'seo',
            type: 'group',
            label: 'SEO',
            admin: {
                position: 'sidebar',
            },
            fields: [
                {
                    name: 'metaTitle',
                    type: 'text',
                    label: 'Meta title',
                    admin: {
                        description: 'Якщо пусто — використається заголовок сторінки.',
                    },
                },
                {
                    name: 'metaDescription',
                    type: 'textarea',
                    label: 'Meta description',
                },
            ],
        },
    ],
}
