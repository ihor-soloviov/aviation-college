import type { Block } from 'payload'

export const Heading: Block = {
    slug: 'heading',
    labels: {
        singular: 'Заголовок',
        plural: 'Заголовки',
    },
    fields: [
        {
            name: 'text',
            type: 'text',
            required: true,
        },
        {
            name: 'level',
            type: 'select',
            defaultValue: 'h2',
            required: true,
            options: [
                { label: 'H2', value: 'h2' },
                { label: 'H3', value: 'h3' },
                { label: 'H4', value: 'h4' },
            ],
        },
    ],
}
