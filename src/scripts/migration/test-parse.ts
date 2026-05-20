import fs from 'fs'
import path from 'path'
import { parseHtml } from './parse-html'

const SAMPLES_DIR = path.resolve(process.cwd(), 'tmp-samples')

function summarizeBlock(b: ReturnType<typeof parseHtml>['blocks'][number]): string {
    switch (b.blockType) {
        case 'paragraph': {
            const root = b.content.root
            const paragraphs = root.children as Array<{ children?: Array<{ type: string; text?: string }> }>
            const preview = paragraphs
                .map((p) =>
                    (p.children ?? [])
                        .map((c) => (c.type === 'text' ? c.text : c.type === 'linebreak' ? '↵' : `[${c.type}]`))
                        .join(''),
                )
                .join(' / ')
                .replace(/\s+/g, ' ')
                .trim()
                .slice(0, 80)
            return `paragraph[${paragraphs.length} para] "${preview}${preview.length === 80 ? '…' : ''}"`
        }
        case 'heading':
            return `heading[${b.level}] "${b.text.slice(0, 60)}"`
        case 'image':
            return `image url=${b.externalUrl.slice(0, 60)}${b.externalUrl.length > 60 ? '…' : ''}`
        case 'gallery':
            return `gallery[${b.images.length} images]`
        case 'youtube':
            return `youtube ${b.url}`
        case 'linkList':
            return `linkList[${b.links.length} links] e.g. "${b.links[0]?.label.slice(0, 40)}" → ${b.links[0]?.href}`
        default:
            return `unknown`
    }
}

function main() {
    if (!fs.existsSync(SAMPLES_DIR)) {
        console.error(`No samples dir: ${SAMPLES_DIR}`)
        process.exit(1)
    }
    const files = fs
        .readdirSync(SAMPLES_DIR)
        .filter((f) => f.endsWith('.html'))
        .sort()

    if (files.length === 0) {
        console.error(`No .html files in ${SAMPLES_DIR}`)
        process.exit(1)
    }

    for (const f of files) {
        const full = path.join(SAMPLES_DIR, f)
        const html = fs.readFileSync(full, 'utf8')
        const sizeKb = (html.length / 1024).toFixed(1)
        const result = parseHtml(html)
        console.log(`\n========== ${f} (${sizeKb} KB) ==========`)
        console.log(`Blocks: ${result.blocks.length}, extracted images: ${result.images.length}`)
        result.blocks.forEach((b, i) => {
            console.log(`  [${i}] ${summarizeBlock(b)}`)
        })
        if (result.images.length > 0) {
            const totalBytes = result.images.reduce((s, im) => s + im.data.length, 0)
            console.log(`  Extracted images: ${result.images.length} total ${(totalBytes / 1024).toFixed(0)} KB`)
            result.images.slice(0, 3).forEach((im) => {
                console.log(`    img${im.index} .${im.ext} ${(im.data.length / 1024).toFixed(0)} KB`)
            })
        }
        if (result.warnings.length > 0) {
            console.log(`  Warnings: ${result.warnings.join('; ')}`)
        }
    }
}

main()
