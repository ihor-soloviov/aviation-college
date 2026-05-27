import type { Block } from 'payload'

export const InfoBanner: Block = {
    slug: 'infoBanner',
    labels: {
        singular: 'Інфо-банер',
        plural: 'Інфо-банери',
    },
    fields: [
        {
            name: 'variant',
            type: 'select',
            label: 'Тип',
            defaultValue: 'info',
            required: true,
            options: [
                { label: 'Інформація', value: 'info' },
                { label: 'Попередження', value: 'warning' },
                { label: 'Успіх', value: 'success' },
            ],
        },
        {
            name: 'title',
            type: 'text',
            label: 'Заголовок',
        },
        {
            name: 'content',
            type: 'richText',
            required: true,
            label: 'Текст',
        },
    ],
}
