export type CourseCategory = 'it' | 'engineering' | 'aviation' | 'management' | 'telecom'

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