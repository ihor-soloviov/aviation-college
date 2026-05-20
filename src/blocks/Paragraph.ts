import type { Block } from 'payload'

export const Paragraph: Block = {
    slug: 'paragraph',
    labels: {
        singular: 'Параграф',
        plural: 'Параграфи',
    },
    fields: [
        {
            name: 'content',
            type: 'richText',
            required: true,
        },
    ],
}
