import 'server-only'

import { getPayload } from 'payload'
import config from '@payload-config'

import { links as fallbackLinks } from './navigation'

export type NavLink = { label: string; href: string }

type RawPageRef = { slug?: string } | number | string | null | undefined

type RawNavItem = {
    label?: string
    type?: 'page' | 'url'
    page?: RawPageRef
    url?: string | null
}

function resolveHref(item: RawNavItem): string | null {
    if (item.type === 'page') {
        const p = item.page
        if (p && typeof p === 'object' && p.slug) return `/${p.slug}`
        return null
    }
    return item.url?.trim() || null
}

// Читає global 'navigation'. Якщо порожній/недоступний — повертає статичний
// fallback (src/lib/navigation.ts), щоб хедер ніколи не лишився без меню.
export async function getNavigation(): Promise<NavLink[]> {
    try {
        const payload = await getPayload({ config })
        const nav = await payload.findGlobal({ slug: 'navigation', depth: 1 })
        const items = (nav?.items as RawNavItem[] | undefined) ?? []
        const resolved = items
            .map((it) => ({ label: it.label ?? '', href: resolveHref(it) }))
            .filter((l): l is NavLink => Boolean(l.label && l.href))
        return resolved.length > 0 ? resolved : fallbackLinks
    } catch {
        return fallbackLinks
    }
}
