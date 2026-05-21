import path from 'path'
import fs from 'fs'
import mysql from 'mysql2/promise'
import { getPayload, type Payload } from 'payload'
import config from '../../../payload.config'
import { resolveDocumentCategory } from '../../lib/document-categories'

interface ArticleRow {
    old_id: number
    title: string | null
    view_mode: 'html' | 'docx_to_html' | 'pdf'
    content_path: string
}

const UPLOADS_DIR = process.env.UPLOADS_DIR ?? '/var/www/uploads'
const LIMIT = process.env.MIGRATION_LIMIT ? Number(process.env.MIGRATION_LIMIT) : undefined
const DRY_RUN = process.env.MIGRATION_DRY_RUN === '1'
const IDS = process.env.MIGRATION_IDS
    ? process.env.MIGRATION_IDS.split(',').map((s) => Number(s.trim())).filter((n) => !Number.isNaN(n))
    : undefined
const HUB_THRESHOLD = Number(process.env.HUB_THRESHOLD ?? 3)

interface ArticleTagging {
    categories: string[]
    subcategory: string
}

async function buildTagging(conn: mysql.Connection): Promise<Map<number, ArticleTagging>> {
    const [rows] = await conn.execute(
        'SELECT old_id, title, view_mode, content_path FROM articles_v2'
    )
    const articles = rows as ArticleRow[]
    const linkRe = /href=["']\/article\/(\d+)["']/g
    const hubs: Array<{ title: string; linksTo: number[] }> = []

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
            hubs.push({ title: a.title ?? '', linksTo: Array.from(ids) })
        }
    }

    const accum = new Map<number, { categories: Set<string>; subs: string[] }>()
    for (const hub of hubs) {
        const cat = resolveDocumentCategory(hub.title)
        for (const linkedId of hub.linksTo) {
            const entry = accum.get(linkedId) ?? { categories: new Set(), subs: [] }
            entry.categories.add(cat.value)
            if (!entry.subs.includes(hub.title)) entry.subs.push(hub.title)
            accum.set(linkedId, entry)
        }
    }

    const result = new Map<number, ArticleTagging>()
    for (const [id, e] of accum) {
        result.set(id, {
            categories: Array.from(e.categories).sort(),
            subcategory: e.subs.join('; '),
        })
    }
    return result
}

async function loadExistingLegacyIds(payload: Payload): Promise<Set<number>> {
    const res = await payload.find({
        collection: 'documents',
        where: { legacyId: { exists: true } },
        limit: 100000,
        depth: 0,
        pagination: false,
    })
    const ids = new Set<number>()
    for (const doc of res.docs) {
        const lid = (doc as Record<string, unknown>).legacyId
        if (typeof lid === 'number') ids.add(lid)
    }
    return ids
}

type MigrateResult =
    | { status: 'ok' }
    | { status: 'skipped'; reason: string }
    | { status: 'failed'; reason: string }

async function migrateOne(
    payload: Payload,
    row: ArticleRow,
    tagging: Map<number, ArticleTagging>,
    opts: { dryRun: boolean },
): Promise<MigrateResult> {
    const filePath = path.join(UPLOADS_DIR, row.content_path)
    if (!fs.existsSync(filePath)) {
        return { status: 'failed', reason: `missing file: ${filePath}` }
    }
    const stat = fs.statSync(filePath)
    const publishedAt = stat.mtime.toISOString()

    const tag = tagging.get(row.old_id)
    const categories = tag && tag.categories.length > 0 ? tag.categories : ['bez_katehorii']
    const subcategory = tag ? tag.subcategory : ''
    const title = row.title?.trim() || `Документ ${row.old_id}`

    if (opts.dryRun) return { status: 'ok' }

    const data = fs.readFileSync(filePath)
    await payload.create({
        collection: 'documents',
        data: {
            legacyId: row.old_id,
            title,
            category: categories,
            subcategory,
            publishedAt,
        } as never,
        file: {
            data,
            name: `${row.old_id}.pdf`,
            size: stat.size,
            mimetype: 'application/pdf',
        },
    })
    return { status: 'ok' }
}

async function main() {
    const conn = await mysql.createConnection({
        host: process.env.MYSQL_HOST ?? 'mysql',
        port: Number(process.env.MYSQL_PORT ?? 3306),
        user: process.env.MYSQL_USER ?? 'aviation',
        password: process.env.MYSQL_PASSWORD ?? '',
        database: process.env.MYSQL_DATABASE ?? 'kknau',
    })
    console.log('✓ MySQL connected')

    console.log('Building category tagging from hub HTML files...')
    const tagging = await buildTagging(conn)
    console.log(`✓ Tagged ${tagging.size} articles via hub-links`)

    const payload = await getPayload({ config })
    console.log('✓ Payload initialised')

    const existingIds = await loadExistingLegacyIds(payload)
    console.log(`✓ Existing documents with legacyId: ${existingIds.size}`)

    const baseSelect = `SELECT old_id, title, view_mode, content_path FROM articles_v2 WHERE view_mode = 'pdf'`
    let sql: string
    let params: number[] = []
    if (IDS && IDS.length > 0) {
        const placeholders = IDS.map(() => '?').join(',')
        sql = `${baseSelect} AND old_id IN (${placeholders}) ORDER BY old_id ASC`
        params = IDS
    } else if (LIMIT) {
        sql = `${baseSelect} ORDER BY old_id ASC LIMIT ${LIMIT}`
    } else {
        sql = `${baseSelect} ORDER BY old_id ASC`
    }

    const [rows] = await conn.execute(sql, params)
    const pdfRows = rows as ArticleRow[]
    const filterLabel = IDS ? ` (IDS=${IDS.join(',')})` : LIMIT ? ` (LIMIT=${LIMIT})` : ''
    console.log(`Found ${pdfRows.length} PDF rows${filterLabel}`)
    if (DRY_RUN) console.log('*** DRY RUN — no writes ***')

    const stats = { ok: 0, skipped: 0, failed: 0 }
    const failures: Array<{ oldId: number; reason: string }> = []
    const startedAt = Date.now()

    for (let i = 0; i < pdfRows.length; i++) {
        const row = pdfRows[i]
        if (existingIds.has(row.old_id)) {
            stats.skipped++
            continue
        }
        try {
            const result = await migrateOne(payload, row, tagging, { dryRun: DRY_RUN })
            if (result.status === 'ok') {
                stats.ok++
                if (stats.ok > 0 && stats.ok % 100 === 0) {
                    const elapsed = Math.round((Date.now() - startedAt) / 1000)
                    console.log(`  Progress: ${stats.ok} ok, ${stats.skipped} skip, ${stats.failed} fail (${elapsed}s)`)
                }
            } else if (result.status === 'skipped') {
                stats.skipped++
            } else {
                stats.failed++
                failures.push({ oldId: row.old_id, reason: result.reason })
            }
        } catch (err) {
            stats.failed++
            const msg = err instanceof Error ? err.message : String(err)
            failures.push({ oldId: row.old_id, reason: msg })
        }
    }

    console.log('\n=== Migration complete ===')
    console.log(`OK:       ${stats.ok}`)
    console.log(`Skipped:  ${stats.skipped}`)
    console.log(`Failed:   ${stats.failed}`)
    if (failures.length > 0) {
        console.log('\nFailures (first 20):')
        for (const f of failures.slice(0, 20)) {
            console.log(`  old_id=${f.oldId}: ${f.reason}`)
        }
    }

    await conn.end()
    process.exit(stats.failed > 0 ? 0 : 0)
}

main().catch((err) => {
    console.error(err)
    process.exit(1)
})
