import type { Block } from 'payload'

import { COLOR_OPTIONS } from './shared-options'

export const Hero: Block = {
    slug: 'hero',
    labels: {
        singular: 'Героблок (банер)',
        plural: 'Героблоки',
    },
    fields: [
        {
            name: 'variant',
            type: 'select',
            label: 'Вигляд',
            defaultValue: 'gradient',
            required: true,
            options: [
                { label: 'Градієнт', value: 'gradient' },
                { label: 'Зображення', value: 'image' },
                { label: 'Мінімалістичний', value: 'minimal' },
            ],
        },
        {
            name: 'title',
            type: 'text',
            required: true,
            label: 'Заголовок',
        },
        {
            name: 'subtitle',
            type: 'textarea',
            label: 'Підзаголовок',
        },
        {
            name: 'accentColor',
            type: 'select',
            label: 'Колір-акцент',
            defaultValue: 'blue',
            options: COLOR_OPTIONS,
            admin: {
                description: 'Для вигляду «Градієнт» — колір фону.',
                condition: (_, siblingData) => siblingData?.variant !== 'image',
            },
        },
        {
            name: 'backgroundImage',
            type: 'upload',
            relationTo: 'media',
            label: 'Фонове зображення',
            admin: {
                description: 'Тільки для вигляду «Зображення».',
                condition: (_, siblingData) => siblingData?.variant === 'image',
            },
        },
        {
            name: 'ctaLabel',
            type: 'text',
            label: 'Текст кнопки',
        },
        {
            name: 'ctaHref',
            type: 'text',
            label: 'Посилання кнопки',
            admin: {
                description: 'Напр. /contacts або https://...',
                condition: (_, siblingData) => Boolean(siblingData?.ctaLabel),
            },
        },
    ],
}
