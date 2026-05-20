import fs from 'fs'
import * as cheerio from 'cheerio'
import type { AnyNode, Element } from 'domhandler'

const html = fs.readFileSync('tmp-samples/1751.html', 'utf8')
console.log(`File size: ${html.length} bytes`)

const $ = cheerio.load(html, null, false)
$('style, script, noscript, head, meta, link').remove()

const allImg = $('img').toArray()
console.log(`<img> tags via $('img'): ${allImg.length}`)
allImg.forEach((el, i) => {
    const src = ($(el).attr('src') ?? '').slice(0, 50)
    console.log(`  img[${i}] src=${src}...`)
})

const root = $.root()[0]
let depth = 0
function walk(node: AnyNode, d: number) {
    if (node.type === 'tag') {
        const el = node as Element
        console.log(`${'  '.repeat(d)}<${el.name}> (children: ${el.children.length})`)
        if (d < 3) {
            for (const c of el.children as AnyNode[]) walk(c, d + 1)
        }
    } else if (node.type === 'text') {
        const t = ((node as { data: string }).data ?? '').slice(0, 40).replace(/\s+/g, ' ')
        if (t.trim()) console.log(`${'  '.repeat(d)}text: "${t}..."`)
    }
}
if (root && 'children' in root) {
    console.log(`Root children: ${(root.children as AnyNode[]).length}`)
    for (const c of root.children as AnyNode[]) walk(c, 0)
}
