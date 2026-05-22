import type { Block } from 'payload'

export const LinkListRef: Block = {
    slug: 'linkListRef',
    labels: {
        singular: 'Список з колекції',
        plural: 'Списки з колекції',
    },
    fields: [
        {
            name: 'linkList',
            type: 'relationship',
            relationTo: 'linkLists',
            required: true,
            hasMany: false,
            label: 'Список посилань',
        },
        {
            name: 'displayMode',
            type: 'select',
            label: 'Спосіб відображення',
            defaultValue: 'grid',
            options: [
                { label: 'Картки (grid)', value: 'grid' },
                { label: 'Список (list)', value: 'list' },
                { label: 'Акордеон', value: 'accordion' },
            ],
        },
        {
            name: 'showTitle',
            type: 'checkbox',
            label: 'Показати заголовок списку',
            defaultValue: false,
        },
    ],
}
