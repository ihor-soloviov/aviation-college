import type { Block } from 'payload'

export const Youtube: Block = {
    slug: 'youtube',
    labels: {
        singular: 'YouTube',
        plural: 'YouTube',
    },
    fields: [
        {
            name: 'url',
            type: 'text',
            required: true,
            label: 'URL відео',
            admin: {
                description: 'Повне посилання на YouTube (https://www.youtube.com/watch?v=... або https://youtu.be/...)',
            },
        },
        {
            name: 'caption',
            type: 'text',
            label: 'Підпис',
        },
    ],
}
