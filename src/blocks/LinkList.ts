import type { Block } from 'payload'

export const LinkList: Block = {
    slug: 'linkList',
    labels: {
        singular: 'Список посилань',
        plural: 'Списки посилань',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            label: 'Заголовок (опціонально)',
        },
        {
            name: 'links',
            type: 'array',
            minRows: 1,
            labels: { singular: 'Посилання', plural: 'Посилання' },
            fields: [
                {
                    name: 'label',
                    type: 'text',
                    required: true,
                    label: 'Текст посилання',
                },
                {
                    name: 'href',
                    type: 'text',
                    required: true,
                    label: 'URL',
                },
            ],
        },
    ],
}
