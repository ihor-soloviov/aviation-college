import 'server-only'

import { getPayload } from 'payload'
import config from '@payload-config'

import { getLinkListById, type LinkList } from './link-lists'

type MediaObject = { url?: string; alt?: string; width?: number; height?: number }

type RawParent = { slug?: string; title?: string; parent?: RawParent | number | string | null } | number | string | null | undefined

type RawPage = {
    id: number | string
    slug: string
    title: string
    excerpt?: string | null
    coverImage?: MediaObject | number | string | null
    content?: Array<Record<string, unknown>>
    parent?: RawParent
    seo?: { metaTitle?: string | null; metaDescription?: string | null } | null
}

export type Breadcrumb = { title: string; href: string }

export type PageData = {
    id: number | string
    slug: string
    title: string
    excerpt?: string
    coverImage?: MediaObject | null
    content: Array<Record<string, unknown>>
    breadcrumbs: Breadcrumb[]
    /** Резолвлені linkLists для блоків linkListRef, ключ = id як рядок. */
    linkLists: Record<string, LinkList>
    seo: { metaTitle?: string; metaDescription?: string }
}

function buildBreadcrumbs(parent: RawParent): Breadcrumb[] {
    const chain: Breadcrumb[] = []
    let cur = parent
    // Йдемо по populated-ланцюгу батьків (depth обмежує глибину; цього досить для breadcrumbs).
    let guard = 0
    while (cur && typeof cur === 'object' && cur.slug && guard < 6) {
        chain.unshift({ title: cur.title ?? cur.slug, href: `/${cur.slug}` })
        cur = cur.parent
        guard += 1
    }
    return chain
}

function collectLinkListIds(content: Array<Record<string, unknown>>): string[] {
    const ids = new Set<string>()
    for (const block of content) {
        if (block.blockType !== 'linkListRef') continue
        const ref = block.linkList
        if (ref == null) continue
        if (typeof ref === 'object') {
            const id = (ref as { id?: number | string }).id
            if (id != null) ids.add(String(id))
        } else {
            ids.add(String(ref))
        }
    }
    return [...ids]
}

export async function getPageBySlug(
    slug: string,
    opts: { draft?: boolean } = {},
): Promise<PageData | null> {
    const payload = await getPayload({ config })
    const res = await payload.find({
        collection: 'articles',
        where: { slug: { equals: slug } },
        limit: 1,
        depth: 2,
        // У режимі прев'ю показуємо найсвіжішу чернетку (для Live Preview).
        draft: opts.draft ?? false,
    })
    const raw = res.docs[0] as unknown as RawPage | undefined
    if (!raw) return null

    const content = raw.content ?? []

    // Підвантажуємо резолвлені linkLists для всіх linkListRef-блоків.
    const linkLists: Record<string, LinkList> = {}
    await Promise.all(
        collectLinkListIds(content).map(async (id) => {
            const list = await getLinkListById(id)
            if (list) linkLists[id] = list
        }),
    )

    const cover =
        raw.coverImage && typeof raw.coverImage === 'object' ? (raw.coverImage as MediaObject) : null

    return {
        id: raw.id,
        slug: raw.slug,
        title: raw.title,
        excerpt: raw.excerpt ?? undefined,
        coverImage: cover,
        content,
        breadcrumbs: buildBreadcrumbs(raw.parent),
        linkLists,
        seo: {
            metaTitle: raw.seo?.metaTitle ?? undefined,
            metaDescription: raw.seo?.metaDescription ?? undefined,
        },
    }
}
