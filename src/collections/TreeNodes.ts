import type { CollectionConfig } from 'payload'

type SiblingShape = { isFolder?: boolean; tree?: number | string }

export const TreeNodes: CollectionConfig = {
    slug: 'treeNodes',
    dbName: 'treenodes',
    labels: {
        singular: 'Пункт бібліотеки',
        plural: 'Пункти бібліотек',
    },
    access: {
        read: () => true,
    },
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'tree', 'parent', 'isFolder', 'order'],
        listSearchableFields: ['title'],
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            label: 'Назва',
        },
        {
            name: 'isFolder',
            type: 'checkbox',
            defaultValue: true,
            label: 'Папка (з вкладеними пунктами)',
            admin: {
                description: 'Зніми галочку, якщо це окремий файл/документ без вкладень.',
            },
        },
        {
            name: 'tree',
            type: 'relationship',
            relationTo: 'documentTrees',
            required: true,
            hasMany: false,
            label: 'Бібліотека',
            admin: {
                description: 'До якої бібліотеки належить цей пункт.',
            },
        },
        {
            name: 'parent',
            type: 'relationship',
            relationTo: 'treeNodes',
            hasMany: false,
            label: 'Батьківська папка',
            admin: {
                description: 'Залиш порожнім — пункт буде на верхньому рівні. Інакше — обери папку з тієї самої бібліотеки.',
            },
            filterOptions: ({ siblingData }) => {
                const sibling = siblingData as SiblingShape
                if (!sibling?.tree) return false
                return {
                    tree: { equals: sibling.tree },
                    isFolder: { equals: true },
                }
            },
        },
        {
            name: 'order',
            type: 'number',
            defaultValue: 0,
            label: 'Порядок',
            admin: {
                description: 'Сортування серед сиблінгів (менше — вище).',
                step: 1,
            },
        },
        {
            name: 'targetDoc',
            type: 'relationship',
            relationTo: 'documents',
            hasMany: false,
            label: 'Документ',
            admin: {
                condition: (_data, sibling: SiblingShape) => sibling?.isFolder === false,
                description: 'Файл з бібліотеки документів.',
            },
        },
        {
            name: 'targetUrl',
            type: 'text',
            label: 'Зовнішня URL',
            admin: {
                condition: (_data, sibling: SiblingShape) => sibling?.isFolder === false,
                description: 'Використовуй якщо PDF ще не залитий у Documents (напр. зовнішній сайт).',
            },
        },
    ],
}
