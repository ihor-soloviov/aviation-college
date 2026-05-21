import { getPayload } from 'payload'
import config from '@payload-config'

import { getNewsList, type NewsListItem } from './news'

export interface UnifiedNewsItem {
    source: 'payload' | 'legacy'
    href: string
    title: string
    excerpt: string
    publishedAt: Date
    tags: string[]
    imageUrl: string | null
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

export async function getMigratedLegacyIds(): Promise<Set<number>> {
    const payload = await getPayload({ config })
    const res = await payload.find({
        collection: 'news',
        where: { legacyId: { exists: true } },
        limit: 10000,
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

function toUnifiedFromPayload(doc: Record<string, unknown>): UnifiedNewsItem {
    const slug = String(doc.slug ?? '')
    const imageUrl = extractPayloadCoverUrl(doc.coverImage, 'card')
    const tags = Array.isArray(doc.tags)
        ? (doc.tags as Array<{ tag: string }>).map((t) => t.tag).filter(Boolean)
        : []
    const publishedAt = doc.publishedAt
        ? new Date(String(doc.publishedAt))
        : new Date()
    return {
        source: 'payload',
        href: `/news/${slug}`,
        title: String(doc.title ?? ''),
        excerpt: String(doc.excerpt ?? ''),
        publishedAt,
        tags,
        imageUrl,
    }
}

function toUnifiedFromLegacy(row: NewsListItem): UnifiedNewsItem {
    return {
        source: 'legacy',
        href: `/news/${row.id}`,
        title: row.title,
        excerpt: row.excerpt,
        publishedAt: new Date(row.add_date),
        tags: row.tags ? [row.tags] : [],
        imageUrl: null,
    }
}

export async function getMergedNewsList(limit = 20): Promise<UnifiedNewsItem[]> {
    const [payloadDocs, legacyRows] = await Promise.all([
        getPayloadPublishedNews(limit),
        getNewsList(limit, 0),
    ])
    const merged: UnifiedNewsItem[] = [
        ...payloadDocs.map(toUnifiedFromPayload),
        ...legacyRows.map(toUnifiedFromLegacy),
    ]
    merged.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
    return merged.slice(0, limit)
}
