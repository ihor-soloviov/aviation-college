import path from 'path'
import fs from 'fs'
import { resolveDocumentCategory } from '../../lib/document-categories'

interface RawCategoryEntry {
    title: string
    articleCount: number
    pdfCount: number
    hubOldIds: number[]
}

interface RawCategoriesFile {
    summary: Record<string, number>
    categories: RawCategoryEntry[]
}

interface CategoryMapEntry {
    category: string
    hubOldId: number
}

const IN_DIR = process.env.CATEGORY_IN_DIR ?? path.resolve(process.cwd(), 'data/category-analysis')
const OUT_DIR = process.env.CATEGORY_OUT_DIR ?? IN_DIR

function resolveTopCategory(title: string): { slug: string; label: string } {
    const cat = resolveDocumentCategory(title)
    return { slug: cat.value, label: cat.label }
}

function main() {
    const rawCategories: RawCategoriesFile = JSON.parse(
        fs.readFileSync(path.join(IN_DIR, 'categories.json'), 'utf8'),
    )
    const articleMap: Record<string, CategoryMapEntry[]> = JSON.parse(
        fs.readFileSync(path.join(IN_DIR, 'category-map.json'), 'utf8'),
    )

    // 1. hub title → top category
    const hubToTop = new Map<string, { slug: string; label: string }>()
    for (const cat of rawCategories.categories) {
        hubToTop.set(cat.title, resolveTopCategory(cat.title))
    }

    // 2. Per-top-category aggregation: count PDFs and hubs
    const topAgg = new Map<string, { label: string; hubCount: number; pdfCount: number; articleCount: number; sampleHubs: string[] }>()
    for (const cat of rawCategories.categories) {
        const top = hubToTop.get(cat.title)!
        const e = topAgg.get(top.slug) ?? { label: top.label, hubCount: 0, pdfCount: 0, articleCount: 0, sampleHubs: [] }
        e.hubCount++
        e.pdfCount += cat.pdfCount
        e.articleCount += cat.articleCount
        if (e.sampleHubs.length < 5) e.sampleHubs.push(cat.title)
        topAgg.set(top.slug, e)
    }

    // 3. Per-article tagging: derive topCategories and subcategory text
    const tagging: Record<string, { topCategories: string[]; subcategory: string }> = {}
    for (const [articleId, hits] of Object.entries(articleMap)) {
        const tops = new Set<string>()
        const subs: string[] = []
        for (const h of hits) {
            const t = hubToTop.get(h.category)
            if (t) tops.add(t.slug)
            if (!subs.includes(h.category)) subs.push(h.category)
        }
        tagging[articleId] = {
            topCategories: Array.from(tops).sort(),
            subcategory: subs.join('; '),
        }
    }

    // 4. "Інше" — surface the hub titles that fell through, so user can patch rules
    const inOther: RawCategoryEntry[] = rawCategories.categories
        .filter((c) => hubToTop.get(c.title)?.slug === 'inshe')
        .sort((a, b) => b.pdfCount - a.pdfCount || b.articleCount - a.articleCount)

    const topList = Array.from(topAgg.entries())
        .map(([slug, v]) => ({ slug, label: v.label, hubCount: v.hubCount, pdfCount: v.pdfCount, articleCount: v.articleCount, sampleHubs: v.sampleHubs }))
        .sort((a, b) => b.pdfCount - a.pdfCount)

    fs.writeFileSync(
        path.join(OUT_DIR, 'top-categories.json'),
        JSON.stringify({ topCategories: topList, inOtherHubs: inOther }, null, 2),
    )
    fs.writeFileSync(
        path.join(OUT_DIR, 'article-tagging.json'),
        JSON.stringify(tagging, null, 2),
    )

    console.log('=== Normalization done ===')
    console.log(`Hubs total: ${rawCategories.categories.length}`)
    console.log(`Articles tagged: ${Object.keys(tagging).length}`)
    console.log(`\nTop-category buckets (sorted by PDFs):`)
    for (const t of topList) {
        console.log(`  ${t.pdfCount.toString().padStart(5)} PDF · ${t.hubCount.toString().padStart(4)} hubs  →  ${t.label} (${t.slug})`)
    }
    if (inOther.length > 0) {
        console.log(`\n"Інше" contains ${inOther.length} hub(s). Top 10 by PDF count:`)
        for (const c of inOther.slice(0, 10)) {
            console.log(`  ${c.pdfCount.toString().padStart(4)} PDF · "${c.title}"`)
        }
        console.log('\nReview data/category-analysis/top-categories.json → adjust rules in src/lib/document-categories.ts → re-run.')
    }
}

main()
