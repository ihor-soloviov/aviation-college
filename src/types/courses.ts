export type CourseCategory = 'it' | 'engineering' | 'aviation' | 'management' | 'telecom'

export type CourseLevel = 'fmb' | 'bachelor'
export type CourseForm = 'fulltime' | 'parttime'

/** Картка програми у списку курсів (серіалізована, без React-компонентів). */
export interface CourseCardData {
    id: number
    slug: string
    code: string
    title: string
    level: CourseLevel
    forms: CourseForm[]
    category: CourseCategory
    excerpt: string
    hasBudget: boolean
    hasContract: boolean
}

/** Повні дані програми для сторінки /courses/[slug]. */
export interface CourseDetailData extends CourseCardData {
    aboutParagraphs: string[]
    whatYouLearn: string[]
    careers: string[]
    duration: string
    admission: string | null
    fundingNote: string | null
}

/** @deprecated Легасі-тип захардкоджених курсів (src/lib/courses.ts). Видалити після підтвердження міграції в CMS. */
export interface ICourse {
    id: string
    title: string
    level: string
    note: string
    icon: React.ElementType
    description: string
    tuition: string
    category: CourseCategory
}
