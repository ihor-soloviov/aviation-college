// Аналіз глибини hub-дерева.
// Для кожного hub'у проходимо linked_article_ids рекурсивно.
// Node = hub  →  expand (children = його linked_article_ids).
// Node = content article або PDF (не hub або не в legacy-hubs.json) → leaf.
// Cycle protection: visited set per traversal root.
//
// Звіт:
//   - distribution of max-depth per root hub
//   - top deepest hubs
//   - cycle examples (якщо є)
//   - які hubs зустрічаються як child у багатьох парентах

import fs from 'fs'

const legacy = JSON.parse(fs.readFileSync('audit/legacy-hubs.json', 'utf8'))

// Усі записи з audit, індексовані by id.
const byId = new Map()
for (const r of legacy.records) byId.set(r.old_id, r)

// Hub = pure_hub || mixed_hub.
const isHub = (r) => r && (r.kind === 'pure_hub' || r.kind === 'mixed_hub')

const allHubs = legacy.records.filter(isHub)
console.log(`Hubs total: ${allHubs.length}`)

// Глибина: max довжина шляху від root до leaf, де root = цей hub.
// PDF (немає в records) рахується як leaf.
function maxDepth(rootId) {
    const visited = new Set()
    function walk(id, depth) {
        if (visited.has(id)) return depth // cycle stop
        visited.add(id)
        const node = byId.get(id)
        if (!isHub(node)) return depth // leaf (PDF або content article)
        let max = depth
        for (const childId of node.linked_article_ids) {
            const childDepth = walk(childId, depth + 1)
            if (childDepth > max) max = childDepth
        }
        return max
    }
    return walk(rootId, 0)
}

const depthOf = new Map()
const cycleHits = []
for (const hub of allHubs) {
    const d = maxDepth(hub.old_id)
    depthOf.set(hub.old_id, d)
}

// Distribution.
const histogram = new Map()
for (const d of depthOf.values()) histogram.set(d, (histogram.get(d) ?? 0) + 1)
const sortedDepths = [...histogram.entries()].sort((a, b) => a[0] - b[0])
console.log(`\nDepth distribution (hub as root):`)
for (const [depth, count] of sortedDepths) {
    const pct = Math.round(count / allHubs.length * 100)
    console.log(`  depth=${depth}: ${count} hubs (${pct}%)`)
}

// Top deepest.
const topDeep = [...depthOf.entries()]
    .map(([id, d]) => ({ id, d, hub: byId.get(id) }))
    .sort((a, b) => b.d - a.d)
    .slice(0, 25)
console.log(`\nTop 25 deepest hub trees:`)
for (const t of topDeep) {
    console.log(`  d=${t.d}  #${t.id}  "${t.hub.title_db.slice(0, 80)}"`)
}

// Specific case: 674 (SelfGovernance Звітність)
console.log(`\n=== Trace: hub #674 "${byId.get(674)?.title_db}" ===`)
function trace(id, prefix = '') {
    const node = byId.get(id)
    if (!node) {
        console.log(`${prefix}#${id} (not in HTML-audit — likely PDF/document)`)
        return
    }
    console.log(`${prefix}#${id} [${node.kind}] "${node.title_db.slice(0, 60)}" (${node.linked_article_ids.length} children)`)
    if (!isHub(node)) return
    for (const cid of node.linked_article_ids.slice(0, 8)) {
        trace(cid, prefix + '  ')
    }
    if (node.linked_article_ids.length > 8) {
        console.log(`${prefix}  ... +${node.linked_article_ids.length - 8} more`)
    }
}
trace(674)

// Hubs referenced by multiple parents.
const parentCount = new Map()
for (const r of legacy.records) {
    if (!isHub(r)) continue
    for (const cid of r.linked_article_ids) {
        if (!isHub(byId.get(cid))) continue
        parentCount.set(cid, (parentCount.get(cid) ?? 0) + 1)
    }
}
const topShared = [...parentCount.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10)
console.log(`\nHubs referenced from multiple parents (top 10):`)
for (const [id, n] of topShared) {
    const node = byId.get(id)
    console.log(`  #${id} cited by ${n} parents — "${node.title_db.slice(0, 60)}"`)
}

// "Real depth" — який мав би бути в linkLists collection, якби ми це мігрували.
// Якщо a hub is referenced from N parents → це зайвий level (shared subset).
// Окремо рахуємо "containment paths" — найдовший шлях без shared dependencies.
console.log(`\nSummary:`)
console.log(`  Max depth observed: ${Math.max(...depthOf.values())}`)
const med = sortedDepths.reduce((s, [, c]) => s + c, 0)
console.log(`  Median hubs are at depth ${sortedDepths.find(([, c]) => c >= med / 2)?.[0]}`)
