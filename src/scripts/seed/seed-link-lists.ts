/**
 * Seed linkLists collection from hard-coded native-component data.
 *
 * Idempotent: each definition has a unique `slug`; we upsert by slug.
 * For documents, legacyId is looked up against the existing `documents`
 * collection — if the document isn't found, the item is skipped with a
 * warning (so a partial seed never silently drops the slot).
 *
 * Run locally (or inside the prod next container):
 *   node_modules/.bin/tsx src/scripts/seed/seed-link-lists.ts
 *
 * Restrict via env:
 *   SEED_SLUGS=self-governance,anti-bullying  node_modules/.bin/tsx ...
 */

import { getPayload, type Payload } from 'payload'
import config from '../../../payload.config'

type SeedItem = {
    title: string
    description?: string
    icon?: string
    color?: string
    badge?: string
} & (
    | { kind: 'document'; legacyId: number }
    | { kind: 'article'; articleSlug: string }
    | { kind: 'external'; targetUrl: string }
    | { kind: 'group'; children: SeedItem[] }
)

type SeedList = {
    slug: string
    title: string
    description?: string
    items: SeedItem[]
}

const SEEDS: SeedList[] = [
    {
        slug: 'self-governance',
        title: 'Курсантське самоврядування',
        description:
            'Курсантське (студентське) самоврядування забезпечує захист прав та інтересів здобувачів освіти, сприяє їх участі в управлінні закладом.',
        items: [
            {
                title: 'Положення про курсантське (студентське) самоврядування',
                description: 'Нормативний документ, що регламентує діяльність органів студентського самоврядування',
                icon: 'FileText',
                color: 'blue',
                kind: 'document',
                legacyId: 175,
            },
            {
                title: 'План роботи органів курсантського (студентського) самоврядування',
                description: 'Календарний план заходів та подій, організованих студентським самоврядуванням',
                icon: 'Calendar',
                color: 'purple',
                kind: 'document',
                legacyId: 1906,
            },
            {
                title: 'Склад органів курсантського (студентського) самоврядування',
                description: 'Інформація про членів та керівництво органів студентського самоврядування',
                icon: 'UserCheck',
                color: 'green',
                kind: 'document',
                legacyId: 674,
            },
            {
                title: 'Звітність',
                description: 'Протоколи засідань, звіти про діяльність та результати роботи самоврядування',
                icon: 'BarChart3',
                color: 'orange',
                kind: 'document',
                legacyId: 680,
            },
            {
                title: 'Галерея',
                description: 'Фотоматеріали заходів та подій, організованих студентським самоврядуванням',
                icon: 'Image',
                color: 'pink',
                kind: 'document',
                legacyId: 3382,
            },
        ],
    },
]

const requested = process.env.SEED_SLUGS?.split(',').map((s) => s.trim()).filter(Boolean) ?? null

async function resolveDocId(payload: Payload, legacyId: number): Promise<number | string | null> {
    const res = await payload.find({
        collection: 'documents',
        where: { legacyId: { equals: legacyId } },
        limit: 1,
        depth: 0,
    })
    return res.docs[0]?.id ?? null
}

async function resolveArticleId(payload: Payload, slug: string): Promise<number | string | null> {
    const res = await payload.find({
        collection: 'articles',
        where: { slug: { equals: slug } },
        limit: 1,
        depth: 0,
    })
    return res.docs[0]?.id ?? null
}

async function buildItemForPayload(payload: Payload, item: SeedItem, ctxPath: string): Promise<Record<string, unknown> | null> {
    const base = {
        title: item.title,
        description: item.description,
        icon: item.icon,
        color: item.color,
        badge: 'badge' in item ? item.badge : undefined,
        kind: item.kind,
    }
    if (item.kind === 'document') {
        const id = await resolveDocId(payload, item.legacyId)
        if (id == null) {
            console.warn(`  ! ${ctxPath}: document legacyId=${item.legacyId} not found, skipping`)
            return null
        }
        return { ...base, targetDoc: id }
    }
    if (item.kind === 'article') {
        const id = await resolveArticleId(payload, item.articleSlug)
        if (id == null) {
            console.warn(`  ! ${ctxPath}: article slug="${item.articleSlug}" not found, skipping`)
            return null
        }
        return { ...base, targetArticle: id }
    }
    if (item.kind === 'external') {
        return { ...base, targetUrl: item.targetUrl }
    }
    if (item.kind === 'group') {
        const childrenBuilt: Record<string, unknown>[] = []
        for (let i = 0; i < item.children.length; i++) {
            const built = await buildItemForPayload(payload, item.children[i], `${ctxPath}.children[${i}]`)
            if (built) childrenBuilt.push(built)
        }
        return { ...base, children: childrenBuilt }
    }
    return null
}

async function upsertList(payload: Payload, def: SeedList): Promise<void> {
    console.log(`\n[${def.slug}] "${def.title}"`)
    const items: Record<string, unknown>[] = []
    for (let i = 0; i < def.items.length; i++) {
        const built = await buildItemForPayload(payload, def.items[i], `items[${i}]`)
        if (built) items.push(built)
    }
    if (items.length === 0) {
        console.warn(`  ! 0 items resolved, skipping list`)
        return
    }

    const existing = await payload.find({
        collection: 'linkLists',
        where: { slug: { equals: def.slug } },
        limit: 1,
        depth: 0,
    })

    const data = {
        slug: def.slug,
        title: def.title,
        description: def.description,
        items,
    }

    if (existing.docs[0]) {
        await payload.update({
            collection: 'linkLists',
            id: existing.docs[0].id,
            data: data as never,
        })
        console.log(`  ✓ updated id=${existing.docs[0].id}, items=${items.length}`)
    } else {
        const created = await payload.create({
            collection: 'linkLists',
            data: data as never,
        })
        console.log(`  ✓ created id=${created.id}, items=${items.length}`)
    }
}

async function main() {
    const payload = await getPayload({ config })

    const toRun = requested
        ? SEEDS.filter((s) => requested.includes(s.slug))
        : SEEDS

    if (toRun.length === 0) {
        console.warn(`No matching seeds for filter: ${requested?.join(',')}`)
        process.exit(0)
    }

    console.log(`Seeding ${toRun.length} linkLists...`)
    for (const def of toRun) {
        await upsertList(payload, def)
    }
    console.log(`\nDone.`)
    process.exit(0)
}

main().catch((err) => {
    console.error(err)
    process.exit(1)
})
