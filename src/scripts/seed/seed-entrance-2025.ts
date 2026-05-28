/**
 * Seed бібліотеки документів для сторінки /entrants/entrance-2025.
 * Імпортує дерево з src/lib/entrants/entrance-2025-documents.ts у documentTrees + treeNodes.
 *
 * Ідемпотентний: знаходить або створює корінь зі slug='entrance-2025', потім видаляє
 * всі існуючі вузли цього дерева і пересіває з нуля. Зв'язки /api/articles/N/file
 * мапляться у documents.legacyId → targetDoc; зовнішні URL і не-знайдені — у targetUrl.
 *
 * Запуск: node_modules/.bin/tsx src/scripts/seed/seed-entrance-2025.ts
 */

import { getPayload } from 'payload'
import config from '../../../payload.config'
import { documents as legacyTree, type DocumentItem } from '../../lib/entrants/entrance-2025-documents'

const SLUG = 'entrance-2025'
const TITLE = 'Вступ 2025 — документи'
const DESCRIPTION = 'Бібліотека документів вступної кампанії 2025 (сторінка /entrants/entrance-2025).'

async function main() {
    const payload = await getPayload({ config })

    // 1. Find or create root
    const treesFound = await payload.find({
        collection: 'documentTrees',
        where: { slug: { equals: SLUG } },
        limit: 1,
        depth: 0,
    })
    let treeId = treesFound.docs[0]?.id
    if (treeId == null) {
        const created = await payload.create({
            collection: 'documentTrees',
            data: { slug: SLUG, title: TITLE, description: DESCRIPTION },
        })
        treeId = created.id
        console.log(`✓ Створено бібліотеку «${TITLE}» (id=${treeId})`)
    } else {
        console.log(`Бібліотека «${SLUG}» вже існує (id=${treeId}) — оновлюю наповнення`)
    }

    // 2. Wipe existing nodes for this tree
    const existing = await payload.find({
        collection: 'treeNodes',
        where: { tree: { equals: treeId } },
        limit: 10000,
        depth: 0,
    })
    if (existing.docs.length > 0) {
        console.log(`  очищаю ${existing.docs.length} існуючих пунктів...`)
        for (const n of existing.docs) {
            await payload.delete({ collection: 'treeNodes', id: n.id })
        }
    }

    // 3. Build legacyId → document.id map (single batch query)
    const legacyArticleIds = new Set<number>()
    function collect(items: DocumentItem[]) {
        for (const item of items) {
            const m = item.pdfUrl?.match(/^\/api\/articles\/(\d+)\/file/)
            if (m) legacyArticleIds.add(Number(m[1]))
            if (item.children) collect(item.children)
        }
    }
    collect(legacyTree)

    const docByLegacy = new Map<number, number | string>()
    if (legacyArticleIds.size > 0) {
        const docsFound = await payload.find({
            collection: 'documents',
            where: { legacyId: { in: Array.from(legacyArticleIds) } },
            limit: legacyArticleIds.size,
            depth: 0,
        })
        for (const d of docsFound.docs) {
            const lid = (d as { legacyId?: number }).legacyId
            if (typeof lid === 'number') docByLegacy.set(lid, d.id)
        }
        console.log(`  знайдено ${docByLegacy.size}/${legacyArticleIds.size} legacy-документів у Payload`)
    }

    // 4. Walk tree, create nodes
    let created = 0
    let folders = 0
    let withDoc = 0
    let withUrl = 0

    async function createSubtree(items: DocumentItem[], parentId: number | string | null) {
        for (let i = 0; i < items.length; i++) {
            const item = items[i]
            const hasChildren = (item.children?.length ?? 0) > 0
            const isFolder = hasChildren

            let targetDoc: number | string | null = null
            let targetUrl: string | null = null

            if (!isFolder && item.pdfUrl) {
                const m = item.pdfUrl.match(/^\/api\/articles\/(\d+)\/file/)
                if (m) {
                    const docId = docByLegacy.get(Number(m[1]))
                    if (docId != null) targetDoc = docId as number
                    else targetUrl = item.pdfUrl
                } else {
                    targetUrl = item.pdfUrl
                }
            }

            const node = await payload.create({
                collection: 'treeNodes',
                data: {
                    title: item.title,
                    isFolder,
                    tree: treeId as number,
                    order: i,
                    ...(parentId != null ? { parent: parentId as number } : {}),
                    ...(targetDoc != null ? { targetDoc } : {}),
                    ...(targetUrl ? { targetUrl } : {}),
                },
            })
            created++
            if (isFolder) folders++
            else if (targetDoc != null) withDoc++
            else if (targetUrl) withUrl++

            if (hasChildren) {
                await createSubtree(item.children!, node.id)
            }
        }
    }

    await createSubtree(legacyTree, null)

    console.log(`✓ Створено пунктів: ${created}`)
    console.log(`  — папок:           ${folders}`)
    console.log(`  — з документом:    ${withDoc}`)
    console.log(`  — з URL:           ${withUrl}`)
    process.exit(0)
}

main().catch((err) => {
    console.error('FAIL:', err.message)
    console.error(err.stack?.slice(0, 800))
    process.exit(1)
})
