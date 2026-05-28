import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { en } from '@payloadcms/translations/languages/en'
import { uk } from '@payloadcms/translations/languages/uk'

import { Articles } from './src/collections/Articles'
import { Documents } from './src/collections/Documents'
import { DocumentTrees } from './src/collections/DocumentTrees'
import { LinkLists } from './src/collections/LinkLists'
import { Media } from './src/collections/Media'
import { News } from './src/collections/News'
import { TreeNodes } from './src/collections/TreeNodes'
import { Users } from './src/collections/Users'
import { Navigation } from './src/globals/Navigation'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default buildConfig({
    secret: process.env.PAYLOAD_SECRET || 'CHANGE_ME_BEFORE_PROD',
    admin: {
        user: Users.slug,
        livePreview: {
            // Відносний URL → працює і в dev, і на проді без env. Можна задати
            // NEXT_PUBLIC_SERVER_URL, щоб зробити абсолютним.
            url: ({ data }) =>
                `${process.env.NEXT_PUBLIC_SERVER_URL || ''}/${data?.slug ?? ''}?preview=true`,
            collections: ['articles'],
            breakpoints: [
                { label: 'Телефон', name: 'mobile', width: 390, height: 844 },
                { label: 'Планшет', name: 'tablet', width: 768, height: 1024 },
                { label: 'Десктоп', name: 'desktop', width: 1440, height: 900 },
            ],
        },
    },
    i18n: {
        supportedLanguages: { uk, en },
        fallbackLanguage: 'uk',
    },
    collections: [Users, Media, News, Documents, Articles, LinkLists, DocumentTrees, TreeNodes],
    globals: [Navigation],
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
