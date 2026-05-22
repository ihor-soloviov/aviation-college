/**
 * Audit script: classify every HTML article from articles_v2 as
 *   pure_hub | mixed_hub | content_with_links | content_pure | missing
 *
 * Output: single JSON document on stdout. Redirect to a file.
 *
 * Run on prod:
 *   docker compose --env-file .env.production exec -T next \
 *     node_modules/.bin/tsx src/scripts/audit/audit-legacy-hubs.ts \
 *     > audit-legacy-hubs.json
 *
 * Env vars:
 *   HUB_THRESHOLD    minimum number of /article/N links to qualify as hub (default 3)
 *   SNIPPET_LEN      length of plain-text snippet per record (default 300)
 *   UPLOADS_DIR      where legacy HTML files live (default /var/www/uploads)
 *   MYSQL_HOST/PORT/USER/PASSWORD/DATABASE — connection (defaults match prod compose)
 */

import path from 'path'
import fs from 'fs'
import mysql from 'mysql2/promise'
import * as cheerio from 'cheerio'

interface ArticleRow {
    old_id: number
    title: string | null
    view_mode: 'html' | 'docx_to_html' | 'pdf'
    content_path: string
}

type RecordKind =
    | 'pure_hub'
    | 'mixed_hub'
    | 'content_with_links'
    | 'content_pure'
    | 'missing'

interface AuditRecord {
    old_id: number
    title_db: string
    title_h1: string | null
    view_mode: ArticleRow['view_mode']
    content_path: string
    file_exists: boolean
    file_size_bytes: number | null
    file_mtime: string | null
    kind: RecordKind
    linked_article_ids: number[]
    upload_refs_count: number
    external_links_count: number
    image_count: number
    iframe_youtube_count: number
    word_count: number
    text_snippet: string
}

const UPLOADS_DIR = process.env.UPLOADS_DIR ?? '/var/www/uploads'
const HUB_THRESHOLD = Number(process.env.HUB_THRESHOLD ?? 3)
const SNIPPET_LEN = Number(process.env.SNIPPET_LEN ?? 300)
const PURE_HUB_WORD_MAX = 120 // hubs з <120 слів — pure-nav; інакше mixed

function classify(linkCount: number, wordCount: number, fileExists: boolean): RecordKind {
    if (!fileExists) return 'missing'
    if (linkCount >= HUB_THRESHOLD) {
        return wordCount < PURE_HUB_WORD_MAX ? 'pure_hub' : 'mixed_hub'
    }
    if (linkCount > 0) return 'content_with_links'
    return 'content_pure'
}

function isYoutube(url: string): boolean {
    return /(?:youtube\.com|youtu\.be)/i.test(url)
}

function analyse(html: string, oldId: number): {
    linkedIds: number[]
    uploadsRefs: number
    externalLinks: number
    images: number
    iframeYoutube: number
    wordCount: number
    snippet: string
    titleH1: string | null
} {
    const $ = cheerio.load(html, null, false)
    $('style, script, noscript, head, meta, link, button, input, select, textarea, svg').remove()

    const linkedSet = new Set<number>()
    let uploadsRefs = 0
    let externalLinks = 0

    $('a[href]').each((_, el) => {
        const href = ($(el).attr('href') ?? '').trim().split(/[\s"']/)[0]
        if (!href) return
        const articleMatch = href.match(/^\/article\/(\d+)/)
        if (articleMatch) {
            const n = Number(articleMatch[1])
            if (Number.isFinite(n) && n !== oldId) linkedSet.add(n)
            return
        }
        if (href.startsWith('/uploads/')) {
            uploadsRefs++
            return
        }
        if (/^https?:\/\//i.test(href)) externalLinks++
    })

    let images = 0
    $('img').each((_, el) => {
        const src = ($(el).attr('src') ?? '').trim()
        if (src) images++
        if (src.startsWith('/uploads/')) uploadsRefs++
    })

    let iframeYoutube = 0
    $('iframe').each((_, el) => {
        const src = ($(el).attr('src') ?? '').trim()
        if (isYoutube(src)) iframeYoutube++
    })

    const titleH1Raw = $('h1').first().text().replace(/\s+/g, ' ').trim()
        || $('h2').first().text().replace(/\s+/g, ' ').trim()
    const titleH1 = titleH1Raw || null

    const plainText = $.root().text().replace(/\s+/g, ' ').trim()
    const wordCount = plainText ? plainText.split(' ').filter(Boolean).length : 0
    const snippet = plainText.slice(0, SNIPPET_LEN)

    return {
        linkedIds: Array.from(linkedSet).sort((a, b) => a - b),
        uploadsRefs,
        externalLinks,
        images,
        iframeYoutube,
        wordCount,
        snippet,
        titleH1,
    }
}

async function main() {
    const conn = await mysql.createConnection({
        host: process.env.MYSQL_HOST ?? 'mysql',
        port: Number(process.env.MYSQL_PORT ?? 3306),
        user: process.env.MYSQL_USER ?? 'aviation',
        password: process.env.MYSQL_PASSWORD ?? '',
        database: process.env.MYSQL_DATABASE ?? 'kknau',
    })

    const [rows] = await conn.execute(
        `SELECT old_id, title, view_mode, content_path
         FROM articles_v2
         WHERE view_mode IN ('html', 'docx_to_html')
         ORDER BY old_id ASC`
    )
    const articles = rows as ArticleRow[]

    const records: AuditRecord[] = []
    const stats: Record<RecordKind, number> = {
        pure_hub: 0,
        mixed_hub: 0,
        content_with_links: 0,
        content_pure: 0,
        missing: 0,
    }

    for (const a of articles) {
        const filePath = path.join(UPLOADS_DIR, a.content_path)
        const exists = fs.existsSync(filePath)

        if (!exists) {
            const record: AuditRecord = {
                old_id: a.old_id,
                title_db: a.title ?? '',
                title_h1: null,
                view_mode: a.view_mode,
                content_path: a.content_path,
                file_exists: false,
                file_size_bytes: null,
                file_mtime: null,
                kind: 'missing',
                linked_article_ids: [],
                upload_refs_count: 0,
                external_links_count: 0,
                image_count: 0,
                iframe_youtube_count: 0,
                word_count: 0,
                text_snippet: '',
            }
            records.push(record)
            stats.missing++
            continue
        }

        const stat = fs.statSync(filePath)
        let html: string
        try {
            html = fs.readFileSync(filePath, 'utf8')
        } catch (err) {
            const msg = err instanceof Error ? err.message : String(err)
            process.stderr.write(`read error ${a.old_id}: ${msg}\n`)
            html = ''
        }

        const info = analyse(html, a.old_id)
        const kind = classify(info.linkedIds.length, info.wordCount, true)
        stats[kind]++

        records.push({
            old_id: a.old_id,
            title_db: a.title ?? '',
            title_h1: info.titleH1,
            view_mode: a.view_mode,
            content_path: a.content_path,
            file_exists: true,
            file_size_bytes: stat.size,
            file_mtime: stat.mtime.toISOString(),
            kind,
            linked_article_ids: info.linkedIds,
            upload_refs_count: info.uploadsRefs,
            external_links_count: info.externalLinks,
            image_count: info.images,
            iframe_youtube_count: info.iframeYoutube,
            word_count: info.wordCount,
            text_snippet: info.snippet,
        })
    }

    await conn.end()

    const out = {
        generated_at: new Date().toISOString(),
        config: {
            hub_threshold: HUB_THRESHOLD,
            pure_hub_word_max: PURE_HUB_WORD_MAX,
            snippet_len: SNIPPET_LEN,
            uploads_dir: UPLOADS_DIR,
        },
        totals: {
            scanned: articles.length,
            ...stats,
        },
        records,
    }

    process.stdout.write(JSON.stringify(out, null, 2) + '\n')
}

main().catch((err) => {
    process.stderr.write(String(err?.stack ?? err) + '\n')
    process.exit(1)
})
