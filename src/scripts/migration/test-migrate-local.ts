import path from 'path'
import fs from 'fs'
import { getPayload } from 'payload'
import config from '../../../payload.config.ts'

import { migrateOneNews } from './migrate-news'

const SAMPLES_DIR = path.resolve(process.cwd(), 'tmp-samples')
const IMAGES_OUT_DIR = path.resolve(process.cwd(), 'tmp-out/news-images')

async function main() {
    if (!fs.existsSync(SAMPLES_DIR)) {
        console.error(`No samples dir: ${SAMPLES_DIR}`)
        process.exit(1)
    }

    const payload = await getPayload({ config })
    console.log(`✓ Payload initialised`)

    const files = fs
        .readdirSync(SAMPLES_DIR)
        .filter((f) => f.endsWith('.html'))
        .sort()

    const stats = { ok: 0, skipped: 0, failed: 0, images: 0 }
    fs.mkdirSync(IMAGES_OUT_DIR, { recursive: true })

    for (const file of files) {
        const oldId = Number(path.basename(file, '.html'))
        if (!Number.isFinite(oldId)) {
            console.warn(`skip non-numeric filename: ${file}`)
            continue
        }

        const fullPath = path.join(SAMPLES_DIR, file)
        const html = fs.readFileSync(fullPath, 'utf8')

        const row = {
            id: oldId,
            old_id: oldId,
            title: `Sample news ${oldId}`,
            tags: null,
            add_date: new Date('2025-01-01'),
            content_type: 'html' as const,
            content_path: `news/${oldId}.html`,
        }

        try {
            const result = await migrateOneNews(payload, row, html, {
                imagesOutDir: IMAGES_OUT_DIR,
            })
            console.log(
                `[old_id=${oldId}] ${result.status} blocks=${result.blocksCount ?? '-'} images=${result.imagesCount ?? '-'}${
                    result.warnings && result.warnings.length > 0 ? ' warn=' + result.warnings.length : ''
                }`,
            )
            if (result.status === 'ok') {
                stats.ok++
                stats.images += result.imagesCount ?? 0
            } else if (result.status === 'skipped') {
                stats.skipped++
            } else {
                stats.failed++
            }
        } catch (err) {
            stats.failed++
            console.error(`[old_id=${oldId}] FAILED:`, err instanceof Error ? err.message : err)
        }
    }

    console.log(`\n=== Local test complete ===`)
    console.log(`OK:      ${stats.ok}`)
    console.log(`Skipped: ${stats.skipped}`)
    console.log(`Failed:  ${stats.failed}`)
    console.log(`Images:  ${stats.images} files in ${IMAGES_OUT_DIR}`)

    process.exit(stats.failed > 0 ? 1 : 0)
}

main().catch((err) => {
    console.error('Fatal:', err)
    process.exit(1)
})
