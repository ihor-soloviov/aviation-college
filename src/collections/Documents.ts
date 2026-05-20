import path from 'path'
import { fileURLToPath } from 'url'
import type { CollectionConfig } from 'payload'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export const Documents: CollectionConfig = {
    slug: 'documents',
    labels: {
        singular: 'Документ',
        plural: 'Документи',
    },
    access: {
        read: () => true,
    },
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'category', 'publishedAt'],
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            label: 'Назва',
        },
        {
            name: 'description',
            type: 'textarea',
            label: 'Короткий опис',
        },
        {
            name: 'category',
            type: 'text',
            label: 'Категорія',
            index: true,
            admin: {
                description: 'Напр.: Положення, Накази, Програми, Розклади',
            },
        },
        {
            name: 'publishedAt',
            type: 'date',
            required: true,
            label: 'Дата публікації',
            defaultValue: () => new Date(),
            admin: {
                date: {
                    pickerAppearance: 'dayOnly',
                    displayFormat: 'dd.MM.yyyy',
                },
            },
        },
    ],
    upload: {
        staticDir: path.resolve(dirname, '../../data/uploads/payload/documents'),
        mimeTypes: [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ],
    },
}
