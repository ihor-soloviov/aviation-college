import path from 'path'
import { fileURLToPath } from 'url'
import type { CollectionConfig } from 'payload'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export const Media: CollectionConfig = {
    slug: 'media',
    labels: {
        singular: 'Медіафайл',
        plural: 'Медіа',
    },
    access: {
        read: () => true,
    },
    admin: {
        useAsTitle: 'alt',
    },
    fields: [
        {
            name: 'alt',
            type: 'text',
            required: true,
            label: 'Alt текст',
        },
        {
            name: 'caption',
            type: 'text',
            label: 'Підпис (опціонально)',
        },
    ],
    upload: {
        staticDir: path.resolve(dirname, '../../data/uploads/payload'),
        mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'],
        imageSizes: [
            {
                name: 'thumbnail',
                width: 400,
                height: 300,
                position: 'centre',
            },
            {
                name: 'card',
                width: 768,
                height: 512,
                position: 'centre',
            },
            {
                name: 'feature',
                width: 1600,
                height: 900,
                position: 'centre',
            },
        ],
    },
}
