/**
 * Seed демо-сторінки для page-builder (Стадія A).
 * Задіює всі нові блоки: hero, paragraph, cardGrid, infoBanner, linkListRef.
 * Ідемпотентний — upsert by slug 'demo-page-builder'.
 *
 * Запуск:  node_modules/.bin/tsx src/scripts/seed/seed-demo-page.ts
 */

import { getPayload } from 'payload'
import config from '../../../payload.config'

function richText(text: string) {
    return {
        root: {
            type: 'root',
            children: [
                {
                    type: 'paragraph',
                    children: [
                        { type: 'text', text, format: 0, version: 1, detail: 0, mode: 'normal', style: '' },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    textFormat: 0,
                    textStyle: '',
                    version: 1,
                },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
        },
    }
}

async function main() {
    const payload = await getPayload({ config })

    // Знаходимо будь-який наявний linkList, щоб показати блок linkListRef.
    const lists = await payload.find({ collection: 'linkLists', limit: 1, depth: 0 })
    const sampleList = lists.docs[0] as { id: number | string; title?: string } | undefined

    const content: Array<Record<string, unknown>> = [
        {
            blockType: 'hero',
            variant: 'gradient',
            accentColor: 'blue',
            title: 'Демо page-builder',
            subtitle: 'Ця сторінка зібрана повністю з блоків CMS — без жодного коду.',
            ctaLabel: 'Контакти',
            ctaHref: '/contacts',
        },
        {
            blockType: 'paragraph',
            content: richText(
                'Перевірка стадії A: Hero, Параграф, Сітка карток, Інфо-банер та Список з колекції рендеряться через спільний BlocksRenderer у єдиній стилістиці сайту.',
            ),
        },
        {
            blockType: 'cardGrid',
            title: 'Напрямки',
            description: 'Приклад сітки карток із іконками, кольорами та посиланнями.',
            columns: '3',
            cards: [
                { title: 'Документи', description: 'Перейти до бази PDF', icon: 'FileText', color: 'blue', href: '/documents' },
                { title: 'Новини', description: 'Останні події коледжу', icon: 'Newspaper', color: 'emerald', href: '/news' },
                { title: 'Без посилання', description: 'Контент-картка (info)', icon: 'Info', color: 'amber' },
            ],
        },
        {
            blockType: 'infoBanner',
            variant: 'warning',
            title: 'Зверніть увагу',
            content: richText('Це демонстраційна сторінка. Її можна вільно редагувати або видалити в адмінці.'),
        },
    ]

    if (sampleList) {
        content.push({
            blockType: 'linkListRef',
            linkList: sampleList.id,
            displayMode: 'grid',
            showTitle: true,
        })
        console.log(`linkListRef → linkList #${sampleList.id} (${sampleList.title ?? '?'})`)
    } else {
        console.log('linkListRef пропущено — у БД немає жодного linkList')
    }

    const slug = 'demo-page-builder'
    const existing = await payload.find({ collection: 'articles', where: { slug: { equals: slug } }, limit: 1 })

    const data = {
        title: 'Демо page-builder',
        slug,
        excerpt: 'Демонстрація всіх блоків MVP-палітри.',
        content,
        _status: 'published' as const,
    }

    if (existing.docs[0]) {
        await payload.update({ collection: 'articles', id: existing.docs[0].id, data })
        console.log(`✓ Оновлено сторінку #${existing.docs[0].id} → /articles/${slug}`)
    } else {
        const created = await payload.create({ collection: 'articles', data })
        console.log(`✓ Створено сторінку #${created.id} → /articles/${slug}`)
    }

    process.exit(0)
}

main().catch((err) => {
    console.error(err)
    process.exit(1)
})
