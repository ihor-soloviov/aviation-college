// Cross-reference: native components (88 PDF IDs) ↔ legacy hubs.
// Для кожної групи native IDs знаходимо legacy hub з max overlap.

import fs from 'fs'

const legacy = JSON.parse(fs.readFileSync('audit/legacy-hubs.json', 'utf8'))

// Native components → IDs (з native-hubs аудиту).
// Дані витягнуті grep'ом, кожен компонент → set його PDF-IDs.
const native = {
    'SelfGovernance':       [175, 1906, 674, 680, 3382],
    'CodeOfConduct':        [3898],
    'AntiBullying':         [526, 527, 528, 529, 3899, 983],
    'SocialScholarships':   [4585],
    'Science':              [215, 3270, 3271, 3272, 3273, 3274, 3275, 3276, 3277, 3278, 3279, 4089],
    'ElectiveCourses':      [3752],
    'PracticalTraining':    [192, 28],
    'ScholarshipRating':    [112, 4789, 4790, 4791, 4792, 4793, 4794, 4795, 4796, 4797,
                              4311, 4312, 4313, 4550, 4551, 4552],
    'teachers.tsx':         [3861, 3668, 5563, 53, 1389, 2268, 5864, 5863,
                              6651, 6649, 6650, 3254, 3253, 3252, 3251, 3250,
                              4257, 4256, 4255, 4254, 4253, 4252, 4251, 4250, 4249, 4248,
                              5626, 4246, 4247, 4244, 4245, 4243, 4242, 4241,
                              3278, 3277, 3276, 3275],
    'attestation.data':     [3668, 5563, 3861, 53, 5562, 3398, 2143, 2141,
                              6281, 5690, 4907, 4562, 3339],
    'entrance-2025':        [4568], // тільки явні refs; вступ має десятки додаткових
}

const allNativeIds = new Set()
for (const ids of Object.values(native)) for (const id of ids) allNativeIds.add(id)
console.log(`Native: ${Object.keys(native).length} files, ${allNativeIds.size} unique IDs`)

// Шукати: чи ID із native фігурує як linked_article_id в якомусь legacy hub'і.
const legacyById = new Map()
for (const r of legacy.records) legacyById.set(r.old_id, r)

const linkedFromHubs = new Map() // id -> [hubOldIds...]
for (const r of legacy.records) {
    if (r.kind !== 'pure_hub' && r.kind !== 'mixed_hub') continue
    for (const linkedId of r.linked_article_ids) {
        if (!linkedFromHubs.has(linkedId)) linkedFromHubs.set(linkedId, [])
        linkedFromHubs.get(linkedId).push(r.old_id)
    }
}

console.log(`\nLegacy hubs reference ${linkedFromHubs.size} unique article IDs total.`)

// Скільки native IDs фігурують у legacy hubs?
let nativeInLegacy = 0
const nativeNotInLegacy = []
for (const id of allNativeIds) {
    if (linkedFromHubs.has(id)) nativeInLegacy++
    else nativeNotInLegacy.push(id)
}
console.log(`Native IDs which are linked from legacy hubs: ${nativeInLegacy} / ${allNativeIds.size}`)
console.log(`Native IDs NOT linked from any legacy hub: ${nativeNotInLegacy.length}`)

// Для кожного native файлу — знайти legacy hub з найбільшим overlap.
console.log(`\n=== Native ↔ Legacy hub matching ===\n`)
for (const [name, ids] of Object.entries(native)) {
    const overlap = new Map() // hubOldId -> count
    for (const id of ids) {
        const hubsLinking = linkedFromHubs.get(id) ?? []
        for (const h of hubsLinking) overlap.set(h, (overlap.get(h) ?? 0) + 1)
    }
    const sorted = [...overlap.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3)
    console.log(`${name} (${ids.length} IDs):`)
    if (sorted.length === 0) {
        console.log(`  (no matching legacy hub)`)
    } else {
        for (const [hubId, count] of sorted) {
            const hub = legacyById.get(hubId)
            const pct = Math.round((count / ids.length) * 100)
            console.log(`  hub#${hubId} "${hub.title_db.slice(0, 60)}" — ${count}/${ids.length} (${pct}%)`)
        }
    }
    console.log('')
}

// Список legacy hubs, що НЕ покриваються native — backlog для міграції.
console.log(`\n=== Top legacy hubs NOT covered by any native component ===\n`)

// Знайти hubs, чиї children мають перетин з allNativeIds
const coveredHubs = new Set()
for (const r of legacy.records) {
    if (r.kind !== 'pure_hub' && r.kind !== 'mixed_hub') continue
    let coveredChildren = 0
    for (const linkedId of r.linked_article_ids) {
        if (allNativeIds.has(linkedId)) coveredChildren++
    }
    const ratio = coveredChildren / Math.max(r.linked_article_ids.length, 1)
    if (ratio >= 0.6) coveredHubs.add(r.old_id) // 60%+ children covered → likely already native
}

const uncovered = legacy.records
    .filter(r => (r.kind === 'pure_hub' || r.kind === 'mixed_hub') && !coveredHubs.has(r.old_id))
    .sort((a, b) => b.linked_article_ids.length - a.linked_article_ids.length)

console.log(`Hubs total: ${legacy.totals.pure_hub + legacy.totals.mixed_hub}`)
console.log(`"Covered" by native (≥60% children overlap): ${coveredHubs.size}`)
console.log(`Uncovered: ${uncovered.length}\n`)

console.log(`Top 30 uncovered hubs by link count:`)
for (const h of uncovered.slice(0, 30)) {
    console.log(`  #${h.old_id} [${h.kind}] ${h.linked_article_ids.length} links, ${h.word_count}w  "${h.title_db.slice(0, 70)}"`)
}

// Що з content (не-hubs) — їхні linked IDs ведуть куди?
const contentLinkedTotal = new Set()
for (const r of legacy.records) {
    if (r.kind !== 'content_with_links') continue
    for (const id of r.linked_article_ids) contentLinkedTotal.add(id)
}
console.log(`\nContent-with-links pages: ${legacy.totals.content_with_links}`)
console.log(`  total unique IDs they reference: ${contentLinkedTotal.size}`)
