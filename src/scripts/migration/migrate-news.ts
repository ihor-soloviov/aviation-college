import path from 'path'
import fs from 'fs'
import mysql from 'mysql2/promise'
import { getPayload, type Payload } from 'payload'
import config from '../../../payload.config'

import { parseHtml, type ExtractedImage, type ParsedBlock } from './parse-html'

interface LegacyNewsRow {
    id: number
    old_id: number
    title: string | null
    tags: string | null
    add_date: Date | null
    content_type: 'html' | 'pdf'
    content_path: string
}

const UPLOADS_DIR = process.env.MIGRATION_UPLOADS_DIR ?? '/var/www/uploads'
const IMAGES_OUT_DIR = process.env.MIGRATION_IMAGES_OUT_DIR ?? path.join(UPLOADS_DIR, 'news-images')
const IMAGES_URL_PREFIX = process.env.MIGRATION_IMAGES_URL_PREFIX ?? '/uploads/news-images'
const LIMIT = process.env.MIGRATION_LIMIT ? Number(process.env.MIGRATION_LIMIT) : undefined
const DRY_RUN = process.env.MIGRATION_DRY_RUN === '1'

export function slugify(input: string): string {
    return input
        .toLowerCase()
        .trim()
        .replace(/['"`]/g, '')
        .replace(/[^a-z0-9Ѐ-ӿ]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 200)
}

export function rewriteImageUrl(url: string, oldId: number): string {
    const m = /^__IMG_(\d+)__\.(\w+)$/.exec(url)
    if (!m) return url
    return `${IMAGES_URL_PREFIX}/${oldId}/${m[1]}.${m[2]}`
}

export function rewriteBlocks(blocks: ParsedBlock[], oldId: number): ParsedBlock[] {
    return blocks.map((b) => {
        if (b.blockType === 'image') {
            return { ...b, externalUrl: rewriteImageUrl(b.externalUrl, oldId) }
        }
        if (b.blockType === 'gallery') {
            return {
                ...b,
                images: b.images.map((im) => ({
                    ...im,
                    externalUrl: rewriteImageUrl(im.externalUrl, oldId),
                })),
            }
        }
        return b
    })
}

export function saveImagesToDisk(images: ExtractedImage[], oldId: number, baseDir = IMAGES_OUT_DIR) {
    if (images.length === 0) return
    const dir = path.join(baseDir, String(oldId))
    fs.mkdirSync(dir, { recursive: true })
    for (const im of images) {
        fs.writeFileSync(path.join(dir, `${im.index}.${im.ext}`), im.data)
    }
}

export async function findFreeSlug(payload: Payload, baseSlug: string, oldId: number): Promise<string> {
    let slug = baseSlug || `news-${oldId}`
    for (let n = 0; n < 10; n++) {
        const existing = await payload.find({
            collection: 'news',
            where: { slug: { equals: slug } },
            limit: 1,
        })
        if (existing.docs.length === 0) return slug
        slug = `${baseSlug}-${n + 2}`
    }
    return `${baseSlug || 'news'}-${oldId}`
}

export interface MigrateOptions {
    dryRun?: boolean
    imagesOutDir?: string
}

export interface MigrateResult {
    status: 'ok' | 'skipped' | 'failed'
    reason?: string
    imagesCount?: number
    blocksCount?: number
    warnings?: string[]
}

export async function migrateOneNews(
    payload: Payload,
    row: LegacyNewsRow,
    html: string,
    opts: MigrateOptions = {},
): Promise<MigrateResult> {
    const oldId = row.old_id

    const existing = await payload.find({
        collection: 'news',
        where: { legacyId: { equals: oldId } },
        limit: 1,
    })
    if (existing.docs.length > 0) {
        return { status: 'skipped', reason: 'already-migrated' }
    }

    const parsed = parseHtml(html)

    if (!opts.dryRun) {
        saveImagesToDisk(parsed.images, oldId, opts.imagesOutDir)
    }

    const blocks = rewriteBlocks(parsed.blocks, oldId)

    const title = row.title?.trim() || `Новина ${oldId}`
    const baseSlug = slugify(title)
    const slug = await findFreeSlug(payload, baseSlug, oldId)

    const publishedAt = row.add_date ? new Date(row.add_date) : new Date()
    publishedAt.setHours(0, 0, 0, 0)

    const tags = row.tags
        ? row.tags
              .split(/[,;]/)
              .map((t) => t.trim())
              .filter(Boolean)
              .map((tag) => ({ tag }))
        : []

    if (opts.dryRun) {
        return {
            status: 'ok',
            blocksCount: blocks.length,
            imagesCount: parsed.images.length,
            warnings: parsed.warnings,
        }
    }

    await payload.create({
        collection: 'news',
        // Payload's generated types don't cover all variants; trust runtime shape.
        data: {
            legacyId: oldId,
            title,
            slug,
            publishedAt: publishedAt.toISOString(),
            tags,
            content: blocks,
            _status: 'published',
        } as never,
        draft: false,
    })

    return {
        status: 'ok',
        blocksCount: blocks.length,
        imagesCount: parsed.images.length,
        warnings: parsed.warnings,
    }
}

async function main() {
    const conn = await mysql.createConnection({
        host: process.env.MYSQL_HOST ?? 'localhost',
        port: Number(process.env.MYSQL_PORT ?? 3306),
        user: process.env.MYSQL_USER ?? 'aviation',
        password: process.env.MYSQL_PASSWORD ?? '',
        database: process.env.MYSQL_DATABASE ?? 'kknau',
    })
    console.log(`✓ MySQL connected`)

    const payload = await getPayload({ config })
    console.log(`✓ Payload initialised`)

    const sql = LIMIT
        ? `SELECT id, old_id, title, tags, add_date, content_type, content_path FROM news_v2 ORDER BY old_id ASC LIMIT ${LIMIT}`
        : `SELECT id, old_id, title, tags, add_date, content_type, content_path FROM news_v2 ORDER BY old_id ASC`

    const [rows] = await conn.execute(sql)
    const newsRows = rows as LegacyNewsRow[]
    console.log(`Found ${newsRows.length} legacy news rows${LIMIT ? ` (LIMIT=${LIMIT})` : ''}`)
    if (DRY_RUN) console.log(`*** DRY RUN — no writes ***`)

    const stats = { ok: 0, skipped: 0, failed: 0, images: 0 }
    const failures: Array<{ oldId: number; reason: string }> = []

    for (const row of newsRows) {
        const oldId = row.old_id
        try {
            if (row.content_type !== 'html') {
                stats.skipped++
                failures.push({ oldId, reason: `non-html (${row.content_type})` })
                continue
            }

            const htmlPath = path.join(UPLOADS_DIR, row.content_path)
            if (!fs.existsSync(htmlPath)) {
                stats.failed++
                failures.push({ oldId, reason: `missing file: ${htmlPath}` })
                continue
            }

            const html = fs.readFileSync(htmlPath, 'utf8')
            const result = await migrateOneNews(payload, row, html, { dryRun: DRY_RUN })

            if (result.status === 'ok') {
                stats.ok++
                stats.images += result.imagesCount ?? 0
                if (stats.ok % 25 === 0) {
                    console.log(`  Progress: ${stats.ok} ok, ${stats.skipped} skip, ${stats.failed} fail`)
                }
                if (result.warnings && result.warnings.length > 0) {
                    console.warn(`[old_id=${oldId}] warnings: ${result.warnings.join('; ')}`)
                }
            } else if (result.status === 'skipped') {
                stats.skipped++
            } else {
                stats.failed++
                failures.push({ oldId, reason: result.reason ?? 'unknown' })
            }
        } catch (err) {
            stats.failed++
            const msg = err instanceof Error ? err.message : String(err)
            failures.push({ oldId, reason: msg })
            console.error(`[old_id=${oldId}] failed: ${msg}`)
        }
    }

    await conn.end()

    console.log(`\n=== Migration ${DRY_RUN ? 'DRY-RUN ' : ''}complete ===`)
    console.log(`OK:       ${stats.ok}`)
    console.log(`Skipped:  ${stats.skipped}`)
    console.log(`Failed:   ${stats.failed}`)
    console.log(`Images:   ${stats.images}`)
    if (failures.length > 0) {
        console.log(`\nFailures:`)
        failures.slice(0, 20).forEach((f) => console.log(`  old_id=${f.oldId}: ${f.reason}`))
        if (failures.length > 20) console.log(`  ... and ${failures.length - 20} more`)
    }

    process.exit(stats.failed > 0 ? 1 : 0)
}

if (process.argv[1]?.endsWith('migrate-news.ts') || process.argv[1]?.endsWith('migrate-news.js')) {
    main().catch((err) => {
        console.error('Fatal:', err)
        process.exit(1)
    })
}
