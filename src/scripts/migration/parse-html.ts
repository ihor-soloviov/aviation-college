import * as cheerio from 'cheerio'
import type { AnyNode, Element, Text } from 'domhandler'
import type { CheerioAPI } from 'cheerio'

export interface ExtractedImage {
    index: number
    ext: string
    data: Buffer
}

export interface ParagraphBlock {
    blockType: 'paragraph'
    content: LexicalState
}

export interface HeadingBlock {
    blockType: 'heading'
    text: string
    level: 'h2' | 'h3' | 'h4'
}

export interface ImageBlockData {
    blockType: 'image'
    externalUrl: string
    caption?: string
}

export interface GalleryBlockData {
    blockType: 'gallery'
    images: Array<{ externalUrl: string; caption?: string }>
}

export interface YoutubeBlock {
    blockType: 'youtube'
    url: string
    caption?: string
}

export interface LinkListBlock {
    blockType: 'linkList'
    title?: string
    links: Array<{ label: string; href: string }>
}

export type ParsedBlock =
    | ParagraphBlock
    | HeadingBlock
    | ImageBlockData
    | GalleryBlockData
    | YoutubeBlock
    | LinkListBlock

interface LexicalNode {
    type: string
    version: number
    [key: string]: unknown
}

export interface LexicalState {
    root: {
        type: 'root'
        children: LexicalNode[]
        direction: 'ltr' | null
        format: ''
        indent: 0
        version: 1
    }
}

export interface ParseResult {
    blocks: ParsedBlock[]
    images: ExtractedImage[]
    warnings: string[]
}

const FORMAT_BOLD = 1
const FORMAT_ITALIC = 2
const FORMAT_UNDERLINE = 8

interface ParseContext {
    blocks: ParsedBlock[]
    currentInlines: LexicalNode[]
    paragraphNodes: LexicalNode[]
    imgBuffer: Array<{ externalUrl: string; caption?: string }>
    images: ExtractedImage[]
    imageCounter: number
    warnings: string[]
}

function makeText(text: string, format = 0): LexicalNode {
    return {
        type: 'text',
        text,
        format,
        version: 1,
        detail: 0,
        mode: 'normal',
        style: '',
    }
}

function makeLink(url: string, text: string, format = 0): LexicalNode {
    return {
        type: 'link',
        url,
        children: [makeText(text, format)],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 3,
        fields: { url, newTab: url.startsWith('http'), linkType: 'custom' },
    }
}

function makeLineBreak(): LexicalNode {
    return { type: 'linebreak', version: 1 }
}

function makeParagraphNode(children: LexicalNode[]): LexicalNode {
    return {
        type: 'paragraph',
        children,
        direction: 'ltr',
        format: '',
        indent: 0,
        textFormat: 0,
        textStyle: '',
        version: 1,
    }
}

function lexicalFromParagraphs(paragraphs: LexicalNode[]): LexicalState {
    return {
        root: {
            type: 'root',
            children: paragraphs,
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
        },
    }
}

function hasMeaningfulInlines(inlines: LexicalNode[]): boolean {
    return inlines.some((n) => {
        if (n.type === 'text') return String(n.text ?? '').trim().length > 0
        if (n.type === 'linebreak') return false
        return true
    })
}

function flushInlines(ctx: ParseContext) {
    if (!hasMeaningfulInlines(ctx.currentInlines)) {
        ctx.currentInlines = []
        return
    }
    ctx.paragraphNodes.push(makeParagraphNode(ctx.currentInlines))
    ctx.currentInlines = []
}

function flushParagraphs(ctx: ParseContext) {
    flushInlines(ctx)
    if (ctx.paragraphNodes.length === 0) return
    ctx.blocks.push({
        blockType: 'paragraph',
        content: lexicalFromParagraphs(ctx.paragraphNodes),
    })
    ctx.paragraphNodes = []
}

function flushImages(ctx: ParseContext) {
    if (ctx.imgBuffer.length === 0) return
    if (ctx.imgBuffer.length === 1) {
        ctx.blocks.push({
            blockType: 'image',
            externalUrl: ctx.imgBuffer[0].externalUrl,
            caption: ctx.imgBuffer[0].caption,
        })
    } else {
        ctx.blocks.push({ blockType: 'gallery', images: ctx.imgBuffer.slice() })
    }
    ctx.imgBuffer = []
}

function flushAllBeforeBlock(ctx: ParseContext) {
    flushParagraphs(ctx)
    flushImages(ctx)
}

function handleImgSrc(src: string, ctx: ParseContext): string | null {
    if (!src) return null
    if (src.startsWith('data:')) {
        const match = /^data:image\/([\w+.-]+);base64,(.+)$/.exec(src)
        if (!match) {
            ctx.warnings.push(`unrecognized data: url`)
            return null
        }
        const rawExt = match[1].toLowerCase()
        const ext = rawExt === 'svg+xml' ? 'svg' : rawExt === 'jpeg' ? 'jpg' : rawExt
        let data: Buffer
        try {
            data = Buffer.from(match[2], 'base64')
        } catch {
            ctx.warnings.push(`base64 decode failed`)
            return null
        }
        const index = ctx.imageCounter++
        ctx.images.push({ index, ext, data })
        return `__IMG_${index}__.${ext}`
    }
    return src.trim()
}

function isYoutubeUrl(url: string): boolean {
    return /(?:youtube\.com|youtu\.be)/i.test(url)
}

const SKIP_TAGS = new Set([
    'style', 'script', 'noscript', 'head', 'meta', 'link',
    'button', 'input', 'select', 'textarea', 'svg',
])

function processNode($: CheerioAPI, node: AnyNode, ctx: ParseContext, formatMask: number): void {
    if (node.type === 'text') {
        const raw = (node as Text).data
        if (!raw) return
        const text = raw.replace(/\s+/g, ' ')
        if (!text.trim()) return
        if (ctx.imgBuffer.length > 0) flushImages(ctx)
        ctx.currentInlines.push(makeText(text, formatMask))
        return
    }
    if (node.type !== 'tag') return

    const el = node as Element
    const tag = el.name.toLowerCase()

    if (SKIP_TAGS.has(tag)) return

    switch (tag) {
        case 'br':
            if (ctx.imgBuffer.length > 0) flushImages(ctx)
            ctx.currentInlines.push(makeLineBreak())
            return

        case 'b':
        case 'strong':
            for (const c of el.children as AnyNode[]) processNode($, c, ctx, formatMask | FORMAT_BOLD)
            return

        case 'i':
        case 'em': {
            // <i> can be either italic text or an icon-font element.
            // Heuristic: if class starts with "ion-" / "fa-" / "icon-" — treat as icon, skip
            const cls = (el.attribs.class ?? '').toLowerCase()
            if (/(^|\s)(ion-|fa-|fas-|fab-|icon-|glyphicon)/.test(cls)) return
            for (const c of el.children as AnyNode[]) processNode($, c, ctx, formatMask | FORMAT_ITALIC)
            return
        }

        case 'u':
            for (const c of el.children as AnyNode[]) processNode($, c, ctx, formatMask | FORMAT_UNDERLINE)
            return

        case 'a': {
            // MS Word HTML often leaves junk in href like:  https://x.com" \t "_blank
            // (escaped target/tooltip leaks). Cut at first whitespace or quote.
            const href = (el.attribs.href ?? '').trim().split(/[\s"']/)[0]
            const text = $(el).text().replace(/\s+/g, ' ').trim()
            if (!text) return
            if (ctx.imgBuffer.length > 0) flushImages(ctx)
            if (href) {
                ctx.currentInlines.push(makeLink(href, text, formatMask))
            } else {
                ctx.currentInlines.push(makeText(text, formatMask))
            }
            return
        }

        case 'p':
        case 'div':
        case 'section':
        case 'article':
        case 'center':
        case 'span':
        case 'font': {
            const isBlock = tag !== 'span' && tag !== 'font'
            for (const c of el.children as AnyNode[]) processNode($, c, ctx, formatMask)
            if (isBlock) flushInlines(ctx)
            return
        }

        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6': {
            flushAllBeforeBlock(ctx)
            const text = $(el).text().replace(/\s+/g, ' ').trim()
            if (!text) return
            const level: 'h2' | 'h3' | 'h4' =
                tag === 'h1' || tag === 'h2' ? 'h2' : tag === 'h3' ? 'h3' : 'h4'
            ctx.blocks.push({ blockType: 'heading', text, level })
            return
        }

        case 'img': {
            const src = el.attribs.src ?? ''
            const url = handleImgSrc(src, ctx)
            if (!url) return
            flushParagraphs(ctx)
            const alt = (el.attribs.alt ?? '').trim()
            ctx.imgBuffer.push({ externalUrl: url, caption: alt || undefined })
            return
        }

        case 'iframe': {
            const src = el.attribs.src ?? ''
            if (isYoutubeUrl(src)) {
                flushAllBeforeBlock(ctx)
                ctx.blocks.push({ blockType: 'youtube', url: src })
            } else if (src) {
                ctx.warnings.push(`non-youtube iframe skipped: ${src.slice(0, 60)}`)
            }
            return
        }

        case 'ul':
        case 'ol': {
            const liItems = (el.children as AnyNode[]).filter(
                (c) => c.type === 'tag' && (c as Element).name === 'li',
            ) as Element[]

            const linkOnlyItems = liItems
                .map((li) => {
                    const $li = $(li)
                    const a = $li.find('a').first()
                    if (!a.length) return null
                    const liText = $li.text().replace(/\s+/g, ' ').trim()
                    const aText = a.text().replace(/\s+/g, ' ').trim()
                    const href = (a.attr('href') ?? '').trim()
                    if (!href || !aText) return null
                    if (liText !== aText) return null
                    return { label: aText, href }
                })
                .filter((v): v is { label: string; href: string } => v !== null)

            if (linkOnlyItems.length === liItems.length && linkOnlyItems.length > 0) {
                flushAllBeforeBlock(ctx)
                ctx.blocks.push({ blockType: 'linkList', links: linkOnlyItems })
            } else {
                if (ctx.imgBuffer.length > 0) flushImages(ctx)
                for (let i = 0; i < liItems.length; i++) {
                    if (i > 0) ctx.currentInlines.push(makeLineBreak())
                    ctx.currentInlines.push(makeText('• ', formatMask))
                    for (const c of (liItems[i].children as AnyNode[])) {
                        processNode($, c, ctx, formatMask)
                    }
                }
                flushInlines(ctx)
            }
            return
        }

        case 'table':
        case 'thead':
        case 'tbody':
        case 'tr':
        case 'td':
        case 'th':
            for (const c of el.children as AnyNode[]) processNode($, c, ctx, formatMask)
            return

        case 'figure':
        case 'figcaption':
        case 'blockquote':
        case 'pre':
        case 'code':
        case 'header':
        case 'footer':
        case 'nav':
        case 'main':
        case 'aside':
        case 'body':
        case 'html':
            for (const c of el.children as AnyNode[]) processNode($, c, ctx, formatMask)
            if (tag === 'blockquote' || tag === 'figure' || tag === 'pre') flushInlines(ctx)
            return

        default:
            for (const c of el.children as AnyNode[]) processNode($, c, ctx, formatMask)
    }
}

export function parseHtml(html: string): ParseResult {
    const $ = cheerio.load(html, null, false)
    $('style, script, noscript, head, meta, link, button, input, select, textarea, svg').remove()

    const ctx: ParseContext = {
        blocks: [],
        currentInlines: [],
        paragraphNodes: [],
        imgBuffer: [],
        images: [],
        imageCounter: 0,
        warnings: [],
    }

    const root = $.root()[0]
    if (root && 'children' in root) {
        for (const c of root.children as AnyNode[]) {
            processNode($, c, ctx, 0)
        }
    }

    flushAllBeforeBlock(ctx)

    return { blocks: ctx.blocks, images: ctx.images, warnings: ctx.warnings }
}
