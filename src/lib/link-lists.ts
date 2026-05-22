import 'server-only'

import { getPayload } from 'payload'
import config from '@payload-config'

export type LinkListItemKind = 'document' | 'article' | 'external' | 'group'

export type LinkListItem = {
    title: string
    description?: string
    icon?: string
    color?: string
    badge?: string
    kind: LinkListItemKind
    href: string | null
    children?: LinkListItem[]
}

export type LinkList = {
    id: number | string
    slug: string
    title: string
    description?: string
    intro?: unknown   // serialized Lexical state
    items: LinkListItem[]
}

type RawDocRef = { id: number | string; slug?: string } | number | string | null | undefined
type RawItem = {
    title: string
    description?: string | null
    icon?: string | null
    color?: string | null
    badge?: string | null
    kind: LinkListItemKind
    targetDoc?: RawDocRef
    targetArticle?: RawDocRef
    targetUrl?: string | null
    children?: RawItem[]
    entries?: RawItem[]
}

function resolveHref(item: RawItem): string | null {
    if (item.kind === 'document' && item.targetDoc != null) {
        const d = item.targetDoc
        if (typeof d === 'object' && d?.id != null) return `/documents/${d.id}`
        if (typeof d === 'number' || typeof d === 'string') return `/documents/${d}`
        return null
    }
    if (item.kind === 'article' && item.targetArticle != null) {
        const a = item.targetArticle
        if (typeof a === 'object' && a?.slug) return `/articles/${a.slug}`
        if (typeof a === 'object' && a?.id != null) return `/articles/${a.id}`
        if (typeof a === 'number' || typeof a === 'string') return `/articles/${a}`
        return null
    }
    if (item.kind === 'external' && item.targetUrl) return item.targetUrl
    return null
}

function mapItem(item: RawItem): LinkListItem {
    const out: LinkListItem = {
        title: item.title,
        description: item.description ?? undefined,
        icon: item.icon ?? undefined,
        color: item.color ?? undefined,
        badge: item.badge ?? undefined,
        kind: item.kind,
        href: resolveHref(item),
    }
    if (item.kind === 'group') {
        const nested = [...(item.children ?? []), ...(item.entries ?? [])]
        if (nested.length > 0) out.children = nested.map(mapItem)
    }
    return out
}

type RawLinkList = {
    id: number | string
    slug: string
    title: string
    description?: string | null
    intro?: unknown
    items?: RawItem[]
}

function normalize(raw: RawLinkList): LinkList {
    return {
        id: raw.id,
        slug: raw.slug,
        title: raw.title,
        description: raw.description ?? undefined,
        intro: raw.intro ?? null,
        items: (raw.items ?? []).map(mapItem),
    }
}

export async function getLinkListBySlug(slug: string): Promise<LinkList | null> {
    const payload = await getPayload({ config })
    const res = await payload.find({
        collection: 'linkLists',
        where: { slug: { equals: slug } },
        limit: 1,
        depth: 2,
    })
    const raw = res.docs[0] as unknown as RawLinkList | undefined
    if (!raw) return null
    return normalize(raw)
}

export async function getLinkListById(id: number | string): Promise<LinkList | null> {
    const payload = await getPayload({ config })
    try {
        const raw = (await payload.findByID({
            collection: 'linkLists',
            id,
            depth: 2,
        })) as unknown as RawLinkList
        return normalize(raw)
    } catch {
        return null
    }
}
