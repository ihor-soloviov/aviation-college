import type { CollectionConfig } from 'payload'

import { Gallery } from '../blocks/Gallery'
import { Heading } from '../blocks/Heading'
import { ImageBlock } from '../blocks/ImageBlock'
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

export const Articles: CollectionConfig = {
    slug: 'articles',
    labels: {
        singular: 'Стаття',
        plural: 'Статті',
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
            blocks: [Paragraph, Heading, ImageBlock, Gallery, Youtube, LinkList, LinkListRef],
        },
    ],
}
