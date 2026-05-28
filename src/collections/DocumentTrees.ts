import type { CollectionConfig } from 'payload'

function slugify(input: string): string {
    return input
        .toLowerCase()
        .trim()
        .replace(/['"`]/g, '')
        .replace(/[^a-z0-9Ѐ-ӿ]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

export const DocumentTrees: CollectionConfig = {
    slug: 'documentTrees',
    dbName: 'doctrees',
    labels: {
        singular: 'Бібліотека документів',
        plural: 'Бібліотеки документів',
    },
    access: {
        read: () => true,
    },
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'slug'],
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
                description: 'Ключ для звернення з коду, напр. "entrance-2025".',
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
        },
    ],
}
