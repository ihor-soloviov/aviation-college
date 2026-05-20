import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
    slug: 'users',
    labels: {
        singular: 'Користувач',
        plural: 'Користувачі',
    },
    auth: true,
    admin: {
        useAsTitle: 'email',
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            label: 'Ім’я',
        },
    ],
}
