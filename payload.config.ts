import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { en } from '@payloadcms/translations/languages/en'
import { uk } from '@payloadcms/translations/languages/uk'

import { Documents } from './src/collections/Documents'
import { Media } from './src/collections/Media'
import { News } from './src/collections/News'
import { Users } from './src/collections/Users'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default buildConfig({
    secret: process.env.PAYLOAD_SECRET || 'CHANGE_ME_BEFORE_PROD',
    admin: {
        user: Users.slug,
    },
    i18n: {
        supportedLanguages: { uk, en },
        fallbackLanguage: 'uk',
    },
    collections: [Users, Media, News, Documents],
    editor: lexicalEditor({}),
    db: sqliteAdapter({
        client: {
            url: process.env.DATABASE_URI || 'file:./data/payload/cms.sqlite',
        },
        push: true,
    }),
    typescript: {
        outputFile: path.resolve(dirname, 'src/payload-types.ts'),
    },
    routes: {
        api: '/api/payload',
        admin: '/admin',
    },
})
