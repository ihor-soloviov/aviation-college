/**
 * Map placeholder targetUrl → real targetDoc by title-match for entrance-2025.
 *
 * Strategy:
 *   1. Exact title match against documents.title.
 *   2. If multiple candidates: pick the one whose `subcategory` best matches
 *      the tree-node's parent-path titles (string-contains scoring).
 *   3. No match → leave as-is, report.
 *
 * Запуск:
 *   DRY=1 node_modules/.bin/tsx src/scripts/seed/match-entrance-2025-docs.ts
 *   node_modules/.bin/tsx src/scripts/seed/match-entrance-2025-docs.ts
 */

import { getPayload } from 'payload'
import config from '../../../payload.config'

const SLUG = 'entrance-2025'
const DRY = process.env.DRY === '1'

type Doc = { id: number; title: string; subcategory?: string | null; publishedAt?: string }
type Node = {
    id: number
    title: string
    isFolder: boolean
    parent: { id: number } | number | null | undefined
    targetDoc?: unknown
    targetUrl?: string | null
}

function parentId(p: Node['parent']): number | null {
    if (p == null) return null
    if (typeof p === 'object') return p.id ?? null
    return p
}

function pathTitlesOf(node: Node, byId: Map<number, Node>): string[] {
    const path: string[] = []
    let pid = parentId(node.parent)
    while (pid != null) {
        const p = byId.get(pid)
        if (!p) break
        path.push(p.title)
        pid = parentId(p.parent)
    }
    return path
}

function scoreCandidate(candidate: Doc, pathTitles: string[]): number {
    const sub = (candidate.subcategory ?? '').toLowerCase()
    if (!sub) return 0
    let score = 0
    for (const t of pathTitles) {
        if (!t) continue
        const tl = t.toLowerCase()
        // count words in path-title that appear in subcategory
        const words = tl.split(/[^\p{L}\p{N}]+/u).filter((w) => w.length > 3)
        for (const w of words) {
            if (sub.includes(w)) score++
        }
    }
    return score
}

async function main() {
    const payload = await getPayload({ config })

    const tree = (
        await payload.find({
            collection: 'documentTrees',
            where: { slug: { equals: SLUG } },
            limit: 1,
            depth: 0,
        })
    ).docs[0]
    if (!tree) {
        console.error(`Tree '${SLUG}' not found`)
        process.exit(1)
    }

    const allNodes = await payload.find({
        collection: 'treeNodes',
        where: { tree: { equals: tree.id } },
        limit: 10000,
        depth: 0,
    })
    const nodes = allNodes.docs as unknown as Node[]
    const byId = new Map<number, Node>(nodes.map((n) => [n.id, n]))

    const candidates = nodes.filter(
        (n) => !n.isFolder && !n.targetDoc && (n.targetUrl?.trim().length ?? 0) > 0,
    )
    console.log(`treeNodes to process: ${candidates.length}`)

    // Fetch matching documents (unique titles)
    const uniqueTitles = Array.from(new Set(candidates.map((n) => n.title)))
    const docsBatch = await payload.find({
        collection: 'documents',
        where: { title: { in: uniqueTitles } },
        depth: 0,
        limit: uniqueTitles.length * 5,
    })
    const docsByTitle = new Map<string, Doc[]>()
    for (const d of docsBatch.docs as unknown as Doc[]) {
        const arr = docsByTitle.get(d.title) ?? []
        arr.push(d)
        docsByTitle.set(d.title, arr)
    }
    console.log(`unique titles: ${uniqueTitles.length}, documents fetched: ${docsBatch.docs.length}`)

    let mapped = 0
    let ambiguousSkipped = 0
    let noMatch = 0
    const noMatchTitles: string[] = []
    const ambiguousLog: string[] = []

    for (const node of candidates) {
        const docs = docsByTitle.get(node.title) ?? []
        if (docs.length === 0) {
            noMatch++
            noMatchTitles.push(`#${node.id} ${node.title.slice(0, 80)}`)
            continue
        }
        let picked: Doc
        if (docs.length === 1) {
            picked = docs[0]
        } else {
            const path = pathTitlesOf(node, byId)
            const scored = docs.map((d) => ({ d, score: scoreCandidate(d, path) }))
            scored.sort((a, b) => b.score - a.score)
            const top = scored[0]
            if (top.score === 0) {
                ambiguousSkipped++
                ambiguousLog.push(
                    `#${node.id} ${node.title.slice(0, 50)} → ${docs.length} candidates, no path hint`,
                )
                continue
            }
            picked = top.d
        }
        if (!DRY) {
            await payload.update({
                collection: 'treeNodes',
                id: node.id,
                data: { targetDoc: picked.id, targetUrl: null },
            })
        }
        mapped++
    }

    console.log()
    console.log(`✓ ${DRY ? 'WOULD map' : 'Mapped'}: ${mapped}`)
    console.log(`⚠ Ambiguous skipped: ${ambiguousSkipped}`)
    if (ambiguousLog.length > 0) {
        for (const l of ambiguousLog) console.log(`   ${l}`)
    }
    console.log(`✗ No title-match: ${noMatch}`)
    for (const l of noMatchTitles) console.log(`   ${l}`)
    process.exit(0)
}

main().catch((err) => {
    console.error('FAIL:', err.message)
    console.error(err.stack?.slice(0, 800))
    process.exit(1)
})
