/**
 * Демонстрація no-code звʼязку: додає у список 'science' пункт-посилання
 * на сторінку, збудовану через page-builder (slug 'demo-page-builder').
 * Це програмний еквівалент того, що редактор робить в адмінці:
 *   LinkLists → science → items → +Add → Тип=Сторінка коледжу → Сторінка=...
 *
 * Ідемпотентний: пропускає, якщо пункт із таким title уже є.
 * Запуск: node_modules/.bin/tsx src/scripts/seed/demo-link-to-page.ts
 */

import { getPayload } from 'payload'
import config from '../../../payload.config'

const ITEM_TITLE = 'Демо: сторінка з page-builder'

async function main() {
    const payload = await getPayload({ config })

    const page = await payload.find({
        collection: 'articles',
        where: { slug: { equals: 'demo-page-builder' } },
        limit: 1,
        depth: 0,
    })
    const pageId = page.docs[0]?.id
    if (!pageId) {
        console.error('Демо-сторінку не знайдено. Спершу запусти seed-demo-page.ts')
        process.exit(1)
    }

    const lists = await payload.find({
        collection: 'linkLists',
        where: { slug: { equals: 'science' } },
        limit: 1,
        depth: 0, // relationship-поля лишаються id — безпечно пересейвити
    })
    const list = lists.docs[0] as { id: number | string; items?: Array<Record<string, unknown>> } | undefined
    if (!list) {
        console.error("Список 'science' не знайдено")
        process.exit(1)
    }

    const items = Array.isArray(list.items) ? list.items : []
    // SciencePage — bespoke-дизайн: рендерить лише items[0..3].children у 4 секції.
    // Тому додаємо пункт у дітей першої групи ("Загальна інформація"), а не top-level.
    const firstGroup = items[0] as { children?: Array<Record<string, unknown>> } | undefined
    if (!firstGroup) {
        console.error("Список science не має очікуваної структури (порожній items[0])")
        process.exit(1)
    }
    const children = Array.isArray(firstGroup.children) ? firstGroup.children : []
    if (children.some((it) => it.title === ITEM_TITLE)) {
        console.log('Пункт уже існує — пропускаю (ідемпотентно).')
        process.exit(0)
    }

    children.push({
        title: ITEM_TITLE,
        description: 'Доданий no-code: посилання на сторінку, зібрану в конструкторі.',
        icon: 'Lightbulb',
        color: 'emerald',
        kind: 'article',
        targetArticle: pageId,
    })
    firstGroup.children = children

    await payload.update({
        collection: 'linkLists',
        id: list.id,
        data: { items, _status: 'published' },
    })

    console.log(`✓ Додано пункт "${ITEM_TITLE}" → /articles/demo-page-builder у список science (#${list.id})`)
    process.exit(0)
}

main().catch((err) => {
    console.error(err)
    process.exit(1)
})
