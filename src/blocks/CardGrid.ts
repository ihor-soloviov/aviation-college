import type { Block } from 'payload'

import { COLOR_OPTIONS, ICON_OPTIONS } from './shared-options'

export const CardGrid: Block = {
    slug: 'cardGrid',
    labels: {
        singular: 'Сітка карток',
        plural: 'Сітки карток',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            label: 'Заголовок секції',
        },
        {
            name: 'description',
            type: 'textarea',
            label: 'Опис секції',
        },
        {
            name: 'columns',
            type: 'select',
            label: 'Колонок',
            defaultValue: '3',
            options: [
                { label: '2', value: '2' },
                { label: '3', value: '3' },
                { label: '4', value: '4' },
            ],
        },
        {
            name: 'cards',
            type: 'array',
            label: 'Картки',
            labels: { singular: 'Картка', plural: 'Картки' },
            minRows: 1,
            fields: [
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
                },
                {
                    name: 'color',
                    type: 'select',
                    label: 'Колір',
                    defaultValue: 'blue',
                    options: COLOR_OPTIONS,
                },
                {
                    name: 'href',
                    type: 'text',
                    label: 'Посилання',
                    admin: {
                        description: 'Необов’язково. Напр. /documents/12 або https://...',
                    },
                },
            ],
        },
    ],
}
