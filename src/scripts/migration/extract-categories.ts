import path from 'path'
import fs from 'fs'
import mysql from 'mysql2/promise'

interface ArticleRow {
    old_id: number
    title: string | null
    view_mode: 'html' | 'docx_to_html' | 'pdf'
    content_path: string
}

const UPLOADS_DIR = process.env.UPLOADS_DIR ?? '/var/www/uploads'
const OUT_DIR = process.env.CATEGORY_OUT_DIR ?? '/app/data/category-analysis'
const HUB_THRESHOLD = Number(process.env.HUB_THRESHOLD ?? 3)

async function main() {
    fs.mkdirSync(OUT_DIR, { recursive: true })

    const conn = await mysql.createConnection({
        host: process.env.MYSQL_HOST ?? 'mysql',
        port: Number(process.env.MYSQL_PORT ?? 3306),
        user: process.env.MYSQL_USER ?? 'aviation',
        password: process.env.MYSQL_PASSWORD ?? '',
        database: process.env.MYSQL_DATABASE ?? 'kknau',
    })
    console.log('✓ MySQL connected')

    const [rows] = await conn.execute(
        'SELECT old_id, title, view_mode, content_path FROM articles_v2'
    )
    const articles = rows as ArticleRow[]
    const byOldId = new Map<number, ArticleRow>()
    for (const a of articles) byOldId.set(a.old_id, a)
    console.log(`Found ${articles.length} articles total`)

    const hubs: Array<{ oldId: number; title: string; linksTo: number[] }> = []
    const linkRe = /href=["']\/article\/(\d+)["']/g

    for (const a of articles) {
        if (a.view_mode === 'pdf') continue
        const filePath = path.join(UPLOADS_DIR, a.content_path)
        if (!fs.existsSync(filePath)) continue
        const html = fs.readFileSync(filePath, 'utf8')
        const ids = new Set<number>()
        let m: RegExpExecArray | null
        while ((m = linkRe.exec(html))) {
            const n = Number(m[1])
            if (!Number.isNaN(n) && n !== a.old_id) ids.add(n)
        }
        if (ids.size >= HUB_THRESHOLD) {
            hubs.push({
                oldId: a.old_id,
                title: a.title ?? '',
                linksTo: Array.from(ids).sort((x, y) => x - y),
            })
        }
    }
    hubs.sort((a, b) => b.linksTo.length - a.linksTo.length)
    console.log(`Identified ${hubs.length} hubs (≥${HUB_THRESHOLD} article-links)`)

    const articleToCategories = new Map<number, Array<{ category: string; hubOldId: number }>>()
    for (const hub of hubs) {
        for (const linkedId of hub.linksTo) {
            if (!byOldId.has(linkedId)) continue
            const list = articleToCategories.get(linkedId) ?? []
            list.push({ category: hub.title, hubOldId: hub.oldId })
            articleToCategories.set(linkedId, list)
        }
    }

    const categories = new Map<string, { articleCount: number; pdfCount: number; hubOldIds: Set<number> }>()
    for (const [linkedId, hits] of articleToCategories) {
        const article = byOldId.get(linkedId)
        const isPdf = article?.view_mode === 'pdf'
        for (const { category, hubOldId } of hits) {
            const entry = categories.get(category) ?? { articleCount: 0, pdfCount: 0, hubOldIds: new Set() }
            entry.articleCount++
            if (isPdf) entry.pdfCount++
            entry.hubOldIds.add(hubOldId)
            categories.set(category, entry)
        }
    }

    const pdfTotal = articles.filter((a) => a.view_mode === 'pdf').length
    const pdfCovered = Array.from(articleToCategories.keys()).filter(
        (id) => byOldId.get(id)?.view_mode === 'pdf',
    ).length

    const categoriesList = Array.from(categories.entries())
        .map(([title, v]) => ({
            title,
            articleCount: v.articleCount,
            pdfCount: v.pdfCount,
            hubOldIds: Array.from(v.hubOldIds).sort((a, b) => a - b),
        }))
        .sort((a, b) => b.pdfCount - a.pdfCount || b.articleCount - a.articleCount)

    const mapOut: Record<string, Array<{ category: string; hubOldId: number }>> = {}
    for (const [linkedId, hits] of articleToCategories) {
        mapOut[String(linkedId)] = hits
    }

    fs.writeFileSync(
        path.join(OUT_DIR, 'categories.json'),
        JSON.stringify(
            {
                summary: {
                    totalArticles: articles.length,
                    totalPdfs: pdfTotal,
                    pdfsWithCategory: pdfCovered,
                    pdfsOrphan: pdfTotal - pdfCovered,
                    hubCount: hubs.length,
                    uniqueCategories: categoriesList.length,
                },
                categories: categoriesList,
            },
            null,
            2,
        ),
    )
    fs.writeFileSync(
        path.join(OUT_DIR, 'category-map.json'),
        JSON.stringify(mapOut, null, 2),
    )

    console.log('=== Done ===')
    console.log(`PDFs total:       ${pdfTotal}`)
    console.log(`PDFs categorised: ${pdfCovered}`)
    console.log(`PDFs orphan:      ${pdfTotal - pdfCovered}`)
    console.log(`Unique categories: ${categoriesList.length}`)
    console.log(`Output: ${OUT_DIR}/categories.json + category-map.json`)

    await conn.end()
    process.exit(0)
}

main().catch((err) => {
    console.error(err)
    process.exit(1)
})
