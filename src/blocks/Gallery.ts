import type { Block } from 'payload'

export const Gallery: Block = {
    slug: 'gallery',
    labels: {
        singular: 'Галерея',
        plural: 'Галереї',
    },
    fields: [
        {
            name: 'images',
            type: 'array',
            minRows: 1,
            labels: { singular: 'Картинка', plural: 'Картинки' },
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
                        description: 'Використовується, якщо Медіа не вибрано.',
                    },
                },
                {
                    name: 'caption',
                    type: 'text',
                    label: 'Підпис',
                },
            ],
        },
    ],
}
