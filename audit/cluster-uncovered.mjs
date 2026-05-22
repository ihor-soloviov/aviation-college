import fs from 'fs'

const legacy = JSON.parse(fs.readFileSync('audit/legacy-hubs.json', 'utf8'))

const native = {
    'SelfGovernance':     [175, 1906, 674, 680, 3382],
    'CodeOfConduct':      [3898],
    'AntiBullying':       [526, 527, 528, 529, 3899, 983],
    'SocialScholarships': [4585],
    'Science':            [215, 3270, 3271, 3272, 3273, 3274, 3275, 3276, 3277, 3278, 3279, 4089],
    'ElectiveCourses':    [3752],
    'PracticalTraining':  [192, 28],
    'ScholarshipRating':  [112, 4789, 4790, 4791, 4792, 4793, 4794, 4795, 4796, 4797, 4311, 4312, 4313, 4550, 4551, 4552],
    'teachers.tsx':       [3861, 3668, 5563, 53, 1389, 2268, 5864, 5863, 6651, 6649, 6650, 3254, 3253, 3252, 3251, 3250, 4257, 4256, 4255, 4254, 4253, 4252, 4251, 4250, 4249, 4248, 5626, 4246, 4247, 4244, 4245, 4243, 4242, 4241, 3278, 3277, 3276, 3275],
    'attestation.data':   [3668, 5563, 3861, 53, 5562, 3398, 2143, 2141, 6281, 5690, 4907, 4562, 3339],
    'entrance-2025':      [4568],
}
const allNativeIds = new Set()
for (const ids of Object.values(native)) for (const id of ids) allNativeIds.add(id)

const coveredHubs = new Set()
for (const r of legacy.records) {
    if (r.kind !== 'pure_hub' && r.kind !== 'mixed_hub') continue
    let n = 0
    for (const id of r.linked_article_ids) if (allNativeIds.has(id)) n++
    if (n / Math.max(r.linked_article_ids.length, 1) >= 0.6) coveredHubs.add(r.old_id)
}

const uncovered = legacy.records.filter(r =>
    (r.kind === 'pure_hub' || r.kind === 'mixed_hub') && !coveredHubs.has(r.old_id)
)

// Більш агресивні patterns. Тестовано на вибірці "Other" з попереднього прогону.
const patterns = [
    // ── Освітня діяльність ЦК (cycle commissions) ─────────────────────
    [/(^|\s)(Заходи|Здобутки|Перемоги|Новини|Активність|Підсумки|Результати|Заходи проф|Тиждень|Результати опитування)[^.]*ЦК|циклов[оа][ії]?\s+комісі|Циклова комісія|Циклова комсія|Заходи циклово/i, 'ЦК — заходи/здобутки/новини'],

    // ── Освітні компоненти / навчальні дисципліни ─────────────────────
    [/Нормативні\s*\(?обов|Нормативні (освітні )?компоненти|Силабус|Вибіркові освітні компонент|Робоча програм|Освітньо-?професійн[аоі] програм|ОПП|Дисципліни вільн|Каталог.*вибірк/i, 'Освітні компоненти / Силабуси / Робочі програми'],

    // ── Спеціальності — програми, дипломування, освітні плани ─────────
    [/^Спеціальність|^\d{2,3}\s+(Фаховий|Бакалавр|Фахів)|Дипломування спеціальност|Витяги з протоколів.*ОПП|^\d{3}\s+Нормативні|Спеціальність\s+\d/i, 'Спеціальність N — навчальний план'],

    // ── Розклад занять, екзаменів, сесій ─────────────────────────────
    [/Розклад\s+(занять|екзамен|сесі|консультац|випуск|пар)|^Розклад /i, 'Розклади (занять/екзаменів)'],

    // ── Накази / постанови / положення (адмінбаза) ───────────────────
    [/^Положення\s|^Положення$|^Накази|^Постанови|Нормативно-правов/i, 'Положення / Накази / Норм. база'],

    // ── Вступна кампанія ─────────────────────────────────────────────
    [/^Зарахування|Списки осіб (рекоменд|претендент)|Накази про зарахування|Етапи вступної кампанії|Прогнозован|Правила прийому|Програми вступних|Документи для вступу|Вартість навчанн|Протоколи засідання приймальн/i, 'Вступна кампанія'],

    // ── Звітність / угоди / профспілка ────────────────────────────────
    [/^Звіт(ність)?$|^Звіт(ність)?\s|Угоди про співпрац|^Профспілк|Заходи профспілк/i, 'Звітність / Угоди / Профспілка'],

    // ── Викладачі: атестація, кваліфікація ────────────────────────────
    [/Атестац|підвищення кваліфікаці|АТЕСТАЦ|Курси підвищення|Педагогічн[аі] скарбниця/i, 'Викладачі — атестація/кваліфікація'],

    // ── Виховна, психологічна робота, самоврядування ─────────────────
    [/Виховн|Психолог|^Самоврядуванн|студентського самоврядуванн|Академічна доброчесність/i, 'Виховна / Психологічна робота'],

    // ── Іноземні студенти / Sectors ──────────────────────────────────
    [/Сектор.*іноземн|іноземних студент|Academic|АкаДемічн|Іноземна мова/i, 'Іноземні студенти / Мови'],

    // ── Бібліотека / архіви / історія ────────────────────────────────
    [/^Бібліотек|^Електронна бібліотек|Книжков|^Архів|^АРХІВ|^Історія|^Галерея/i, 'Бібліотека / Архіви / Галереї'],

    // ── Гуртки / семінари / тренінги / конференції / наука ────────────
    [/Гурт[оа]к|^Семінар|^Тренінг|^Конференц|Міжнародна.*конференці|Наукова|Наукова робота|Науково-дослідн|Олімпіад/i, 'Конференції / Гуртки / Олімпіади / Наука'],

    // ── Відділення коледжу ────────────────────────────────────────────
    [/^Відділенн/i, 'Відділення коледжу'],

    // ── Pamʼятки тощо ─────────────────────────────────────────────────
    [/Пам.{0,3}ятк|Методичн[іа] (надбання|рекомендації)|Навчально-методичні матеріали/i, 'Методичні матеріали / Пам\'ятки'],

    // ── Рік ─────────────────────────────────────────────────────────────
    [/^\d{4}[-–]\d{4}\s+н\.?р\.?$|^\d{4}\s+рік$/i, 'Yearly index'],
]

function classify(title) {
    for (const [re, name] of patterns) if (re.test(title)) return name
    return '__other__'
}

const clusters = new Map()
for (const r of uncovered) {
    const t = (r.title_db || r.title_h1 || '').trim()
    const cat = classify(t)
    if (!clusters.has(cat)) clusters.set(cat, [])
    clusters.get(cat).push({ id: r.old_id, title: t, links: r.linked_article_ids.length, words: r.word_count, kind: r.kind })
}

const sorted = [...clusters.entries()].sort((a, b) => b[1].length - a[1].length)

console.log(`Uncovered hubs: ${uncovered.length}\n`)
console.log('| Pattern | Hubs | Total links | Avg links/hub | Sample |')
console.log('|---------|------|-------------|---------------|--------|')

let matched = 0, matchedLinks = 0
for (const [name, items] of sorted) {
    if (name === '__other__') continue
    const totalLinks = items.reduce((s, x) => s + x.links, 0)
    matched += items.length
    matchedLinks += totalLinks
    const avg = (totalLinks / items.length).toFixed(1)
    const sample = items[0]
    console.log(`| ${name} | ${items.length} | ${totalLinks} | ${avg} | #${sample.id} "${sample.title.slice(0, 45)}" (${sample.links}L) |`)
}

const others = clusters.get('__other__') || []
const otherLinks = others.reduce((s, x) => s + x.links, 0)
console.log(`| **Other (unmatched)** | ${others.length} | ${otherLinks} | ${(otherLinks/others.length).toFixed(1)} | (see below) |`)

console.log(`\nMatched: ${matched}/${uncovered.length} (${Math.round(matched/uncovered.length*100)}%)`)
console.log(`Matched-links: ${matchedLinks}/(matched+other) = ${Math.round(matchedLinks/(matchedLinks+otherLinks)*100)}%`)

console.log(`\n=== "Other" — top 30 by link count (для ручного огляду) ===\n`)
others.sort((a, b) => b.links - a.links)
for (const o of others.slice(0, 30)) {
    console.log(`  #${o.id} [${o.kind}] ${o.links}L ${o.words}w  "${o.title.slice(0, 80)}"`)
}

// Зберегти у JSON для подальшого використання
const out = {
    generated_at: new Date().toISOString(),
    uncovered_total: uncovered.length,
    clusters: Object.fromEntries(sorted.map(([name, items]) => [
        name, { count: items.length, total_links: items.reduce((s,x)=>s+x.links,0), items: items.slice(0, 10) }
    ])),
}
fs.writeFileSync('audit/clusters.json', JSON.stringify(out, null, 2))
console.log(`\nWrote audit/clusters.json`)
