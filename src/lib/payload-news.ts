import { getPayload, type Where } from 'payload'
import config from '@payload-config'
import { DATA_UNAVAILABLE, isNotFoundError, type Unavailable } from './data-result'

export interface NewsCardItem {
    id: string
    title: string
    excerpt: string
    content: string
    image: string | null
    date: string
    category: string
    author: string
    publishedAtIso: string
}

export interface ArchiveMonth {
    year: number
    month: number
    count: number
}

export async function getPayloadInstance() {
    return getPayload({ config })
}

// Первинне detail-читання: null = не знайдено/не опубліковано, Unavailable = БД недоступна.
export async function getPayloadNewsById(
    id: number,
): Promise<Record<string, unknown> | null | Unavailable> {
    try {
        const payload = await getPayload({ config })
        const doc = await payload.findByID({
            collection: 'news',
            id,
            depth: 2,
        })
        if ((doc as Record<string, unknown>)._status !== 'published') return null
        return doc
    } catch (error) {
        if (isNotFoundError(error)) return null
        console.error('[getPayloadNewsById] data source unavailable:', error)
        return DATA_UNAVAILABLE
    }
}

// Вторинне читання («інші новини») — тихо деградує в [], щоб не ламати detail-сторінку.
export async function getPayloadPublishedNews(limit = 20) {
    try {
        const payload = await getPayload({ config })
        const res = await payload.find({
            collection: 'news',
            where: { _status: { equals: 'published' } },
            sort: '-publishedAt',
            limit,
            depth: 1,
        })
        return res.docs as Array<Record<string, unknown>>
    } catch (error) {
        console.error('[getPayloadPublishedNews] data source unavailable:', error)
        return [] as Array<Record<string, unknown>>
    }
}

export function extractPayloadCoverUrl(
    cover: unknown,
    size: 'thumbnail' | 'card' | 'feature' | null = 'card',
): string | null {
    if (!cover || typeof cover !== 'object') return null
    const c = cover as Record<string, unknown>
    if (size) {
        const sizes = c.sizes as Record<string, unknown> | undefined
        const sized = sizes?.[size] as Record<string, unknown> | undefined
        if (sized && typeof sized.url === 'string' && sized.url) return sized.url
    }
    return typeof c.url === 'string' && c.url ? c.url : null
}

function resolveBlockImageUrl(
    media: unknown,
    externalUrl: unknown,
): string | null {
    if (media && typeof media === 'object') {
        const url = (media as Record<string, unknown>).url
        if (typeof url === 'string' && url) return url
    }
    if (typeof externalUrl === 'string' && externalUrl) return externalUrl
    return null
}

/**
 * Fallback cover: перша inline-картинка з content (image-блок або перше фото
 * галереї), у порядку появи. Використовується, коли coverImage не заповнений —
 * мігровані новини мають зображення лише всередині content.
 */
export function extractFirstContentImageUrl(content: unknown): string | null {
    if (!Array.isArray(content)) return null
    for (const raw of content) {
        if (!raw || typeof raw !== 'object') continue
        const block = raw as Record<string, unknown>
        if (block.blockType === 'image') {
            const url = resolveBlockImageUrl(block.media, block.externalUrl)
            if (url) return url
        } else if (block.blockType === 'gallery' && Array.isArray(block.images)) {
            for (const img of block.images) {
                if (!img || typeof img !== 'object') continue
                const i = img as Record<string, unknown>
                const url = resolveBlockImageUrl(i.media, i.externalUrl)
                if (url) return url
            }
        }
    }
    return null
}

function formatUkDate(iso: string): string {
    return new Date(iso).toLocaleDateString('uk-UA', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })
}

export function payloadDocToCardItem(doc: Record<string, unknown>): NewsCardItem {
    const tags = Array.isArray(doc.tags)
        ? (doc.tags as Array<{ tag: string }>).map((t) => t.tag).filter(Boolean)
        : []
    const publishedAtIso = doc.publishedAt
        ? String(doc.publishedAt)
        : new Date().toISOString()
    return {
        id: String(doc.id ?? ''),
        title: String(doc.title ?? ''),
        excerpt: String(doc.excerpt ?? ''),
        content: '',
        image:
            extractPayloadCoverUrl(doc.coverImage, 'card') ??
            extractFirstContentImageUrl(doc.content),
        date: formatUkDate(publishedAtIso),
        category: tags.join(' · '),
        author: '',
        publishedAtIso,
    }
}

function buildDateRangeFilter(year?: number, month?: number) {
    if (year && month) {
        const start = new Date(year, month - 1, 1).toISOString()
        const end = new Date(year, month, 1).toISOString()
        return { greater_than_equal: start, less_than: end }
    }
    if (year) {
        const start = new Date(year, 0, 1).toISOString()
        const end = new Date(year + 1, 0, 1).toISOString()
        return { greater_than_equal: start, less_than: end }
    }
    return null
}

// Первинне читання стрічки: Unavailable = БД недоступна (API-роут та сторінки це обробляють).
export async function getPayloadNewsList(opts: {
    limit?: number
    offset?: number
    year?: number
    month?: number
}): Promise<{ items: NewsCardItem[]; total: number } | Unavailable> {
    const { limit = 10, offset = 0, year, month } = opts
    try {
        const payload = await getPayload({ config })
        const where: Where = { _status: { equals: 'published' } }
        const dateFilter = buildDateRangeFilter(year, month)
        if (dateFilter) where.publishedAt = dateFilter

        const page = Math.floor(offset / limit) + 1
        const res = await payload.find({
            collection: 'news',
            where,
            sort: '-publishedAt',
            limit,
            page,
            depth: 1,
        })
        return {
            items: res.docs.map((d) => payloadDocToCardItem(d as Record<string, unknown>)),
            total: res.totalDocs,
        }
    } catch (error) {
        console.error('[getPayloadNewsList] data source unavailable:', error)
        return DATA_UNAVAILABLE
    }
}

// Вторинне читання (архів-сайдбар) — тихо деградує в [].
export async function getPayloadNewsArchive(): Promise<ArchiveMonth[]> {
    let res
    try {
        const payload = await getPayload({ config })
        res = await payload.find({
            collection: 'news',
            where: { _status: { equals: 'published' } },
            limit: 10000,
            pagination: false,
            depth: 0,
        })
    } catch (error) {
        console.error('[getPayloadNewsArchive] data source unavailable:', error)
        return []
    }
    const counts = new Map<string, ArchiveMonth>()
    for (const doc of res.docs) {
        const iso = (doc as Record<string, unknown>).publishedAt
        if (typeof iso !== 'string') continue
        const d = new Date(iso)
        if (Number.isNaN(d.getTime())) continue
        const year = d.getFullYear()
        const month = d.getMonth() + 1
        const key = `${year}-${month}`
        const entry = counts.get(key) ?? { year, month, count: 0 }
        entry.count++
        counts.set(key, entry)
    }
    return Array.from(counts.values()).sort((a, b) => {
        if (b.year !== a.year) return b.year - a.year
        return b.month - a.month
    })
}
