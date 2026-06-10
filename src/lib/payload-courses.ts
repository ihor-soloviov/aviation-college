import { getPayload } from 'payload'
import config from '@payload-config'
import type {
    CourseCardData,
    CourseCategory,
    CourseDetailData,
    CourseForm,
    CourseLevel,
} from '@/types/courses'

/** Документ колекції courses (локальний тип — payload-types.ts у проєкті не генерується). */
interface Course {
    id: number
    slug: string
    code: string
    title: string
    level: string
    forms?: string[] | null
    category: string
    excerpt: string
    about: string
    whatYouLearn?: Array<{ item: string }> | null
    careers?: Array<{ item: string }> | null
    duration: string
    admission?: string | null
    funding?: {
        budget?: boolean | null
        contract?: boolean | null
        note?: string | null
    } | null
}

function toCard(doc: Course): CourseCardData {
    return {
        id: doc.id,
        slug: doc.slug,
        code: doc.code,
        title: doc.title,
        level: doc.level as CourseLevel,
        forms: (doc.forms ?? []) as CourseForm[],
        category: doc.category as CourseCategory,
        excerpt: doc.excerpt,
        hasBudget: doc.funding?.budget ?? false,
        hasContract: doc.funding?.contract ?? false,
    }
}

function toDetail(doc: Course): CourseDetailData {
    return {
        ...toCard(doc),
        aboutParagraphs: doc.about
            .split(/\n\s*\n/)
            .map((p) => p.trim())
            .filter(Boolean),
        whatYouLearn: (doc.whatYouLearn ?? []).map((row) => row.item),
        careers: (doc.careers ?? []).map((row) => row.item),
        duration: doc.duration,
        admission: doc.admission ?? null,
        fundingNote: doc.funding?.note ?? null,
    }
}

export async function getPayloadCourses(): Promise<CourseCardData[]> {
    const payload = await getPayload({ config })
    const res = await payload.find({
        collection: 'courses',
        sort: 'order',
        limit: 100,
        depth: 0,
    })
    return (res.docs as unknown as Course[]).map(toCard)
}

export async function getPayloadCourseBySlug(slug: string): Promise<CourseDetailData | null> {
    const payload = await getPayload({ config })
    const res = await payload.find({
        collection: 'courses',
        where: { slug: { equals: slug } },
        limit: 1,
        depth: 0,
    })
    const doc = res.docs[0] as unknown as Course | undefined
    return doc ? toDetail(doc) : null
}

/** Для редіректу зі старих URL /courses/[type]/[id], де id — код спеціальності. */
export async function getPayloadCourseByCode(code: string): Promise<CourseCardData | null> {
    const payload = await getPayload({ config })
    const res = await payload.find({
        collection: 'courses',
        where: { code: { equals: code } },
        sort: 'order', // ФМБ ідуть першими — як знаходив старий find()
        limit: 1,
        depth: 0,
    })
    const doc = res.docs[0] as unknown as Course | undefined
    return doc ? toCard(doc) : null
}

/** Інші програми того ж напрямку (для блоку «Суміжні програми»). */
export async function getPayloadRelatedCourses(
    current: CourseDetailData,
    limit = 3,
): Promise<CourseCardData[]> {
    const all = await getPayloadCourses()
    const others = all.filter((c) => c.id !== current.id)
    const sameCategory = others.filter((c) => c.category === current.category)
    const rest = others.filter((c) => c.category !== current.category)
    return [...sameCategory, ...rest].slice(0, limit)
}
