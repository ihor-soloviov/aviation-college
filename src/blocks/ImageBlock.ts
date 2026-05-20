import type { Block } from 'payload'

export const ImageBlock: Block = {
    slug: 'image',
    labels: {
        singular: 'Зображення',
        plural: 'Зображення',
    },
    fields: [
        {
            name: 'media',
            type: 'upload',
            relationTo: 'media',
            label: 'Медіа',
        },
        {
            name: 'externalUrl',
            type: 'text',
            label: 'Зовнішній URL',
            admin: {
                description: 'Використовується, якщо Медіа не вибрано (для legacy новин).',
            },
        },
        {
            name: 'caption',
            type: 'text',
            label: 'Підпис',
        },
    ],
}
