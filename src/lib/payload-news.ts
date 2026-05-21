import { getPayload, type Where } from 'payload'
import config from '@payload-config'

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

export async function getPayloadNewsBySlug(slug: string) {
    const payload = await getPayload({ config })
    const res = await payload.find({
        collection: 'news',
        where: {
            slug: { equals: slug },
            _status: { equals: 'published' },
        },
        limit: 1,
        depth: 2,
    })
    return res.docs[0] ?? null
}

export async function getPayloadNewsByLegacyId(legacyId: number) {
    const payload = await getPayload({ config })
    const res = await payload.find({
        collection: 'news',
        where: {
            legacyId: { equals: legacyId },
            _status: { equals: 'published' },
        },
        limit: 1,
        depth: 2,
    })
    return res.docs[0] ?? null
}

export async function getPayloadPublishedNews(limit = 20) {
    const payload = await getPayload({ config })
    const res = await payload.find({
        collection: 'news',
        where: { _status: { equals: 'published' } },
        sort: '-publishedAt',
        limit,
        depth: 1,
    })
    return res.docs as Array<Record<string, unknown>>
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

function formatUkDate(iso: string): string {
    return new Date(iso).toLocaleDateString('uk-UA', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })
}

export function payloadDocToCardItem(doc: Record<string, unknown>): NewsCardItem {
    const slug = String(doc.slug ?? '')
    const tags = Array.isArray(doc.tags)
        ? (doc.tags as Array<{ tag: string }>).map((t) => t.tag).filter(Boolean)
        : []
    const publishedAtIso = doc.publishedAt
        ? String(doc.publishedAt)
        : new Date().toISOString()
    return {
        id: slug,
        title: String(doc.title ?? ''),
        excerpt: String(doc.excerpt ?? ''),
        content: '',
        image: extractPayloadCoverUrl(doc.coverImage, 'card'),
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

export async function getPayloadNewsList(opts: {
    limit?: number
    offset?: number
    year?: number
    month?: number
}): Promise<{ items: NewsCardItem[]; total: number }> {
    const { limit = 10, offset = 0, year, month } = opts
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
}

export async function getPayloadNewsArchive(): Promise<ArchiveMonth[]> {
    const payload = await getPayload({ config })
    const res = await payload.find({
        collection: 'news',
        where: { _status: { equals: 'published' } },
        limit: 10000,
        pagination: false,
        depth: 0,
    })
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
