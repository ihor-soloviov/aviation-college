import type { GlobalConfig } from 'payload'

// Головне меню сайту (хедер + мобільна шухляда). No-code: редактор керує пунктами
// в адмінці. Пласка структура (без дропдаунів) — як поточний хедер.
export const Navigation: GlobalConfig = {
    slug: 'navigation',
    label: 'Навігація (меню)',
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'items',
            type: 'array',
            label: 'Пункти меню',
            labels: { singular: 'Пункт', plural: 'Пункти' },
            fields: [
                {
                    name: 'label',
                    type: 'text',
                    required: true,
                    label: 'Назва',
                },
                {
                    name: 'type',
                    type: 'select',
                    required: true,
                    defaultValue: 'url',
                    label: 'Тип',
                    options: [
                        { label: 'Сторінка коледжу (page-builder)', value: 'page' },
                        { label: 'URL / шлях', value: 'url' },
                    ],
                },
                {
                    name: 'page',
                    type: 'relationship',
                    relationTo: 'articles',
                    hasMany: false,
                    label: 'Сторінка',
                    admin: {
                        condition: (_data, sibling) => sibling?.type === 'page',
                    },
                },
                {
                    name: 'url',
                    type: 'text',
                    label: 'URL / шлях',
                    admin: {
                        description: 'Внутрішній шлях (напр. /students) або зовнішній https://...',
                        condition: (_data, sibling) => sibling?.type === 'url',
                    },
                },
            ],
        },
    ],
}
