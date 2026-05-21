import path from 'path'
import { fileURLToPath } from 'url'
import type { CollectionConfig } from 'payload'
import { getDocumentCategoryOptions } from '../lib/document-categories'

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
            name: 'legacyId',
            type: 'number',
            unique: true,
            index: true,
            label: 'Legacy ID',
            admin: {
                position: 'sidebar',
                readOnly: true,
                description: 'Оригінальний old_id з articles_v2 (заповнюється лише при міграції).',
            },
        },
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
            type: 'select',
            hasMany: true,
            required: true,
            index: true,
            label: 'Категорії',
            options: getDocumentCategoryOptions(),
        },
        {
            name: 'subcategory',
            type: 'text',
            label: 'Підкатегорія (legacy hub titles)',
            index: true,
            admin: {
                description: 'Оригінальні назви розділів зі старого сайту, через "; ". Для пошуку.',
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
