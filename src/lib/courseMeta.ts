/**
 * Довідники для відображення курсів (клієнт-безпечний модуль — без payload).
 * Іконки тримаємо тут, бо в CMS зберігається лише category.
 */
import { Code, Headphones, Plane, Users, Wrench } from 'lucide-react'
import type { CourseCategory, CourseForm, CourseLevel } from '@/types/courses'

export const CATEGORY_LABELS: Record<CourseCategory, string> = {
    it: 'IT та автоматизація',
    engineering: 'Енергетика',
    aviation: 'Авіація',
    telecom: 'Телекомунікації',
    management: 'Менеджмент',
}

export const CATEGORY_ICONS: Record<CourseCategory, React.ElementType> = {
    it: Code,
    engineering: Wrench,
    aviation: Plane,
    telecom: Headphones,
    management: Users,
}

export const LEVEL_LABELS: Record<CourseLevel, string> = {
    fmb: 'Фаховий молодший бакалавр',
    bachelor: 'Бакалавр',
}

export const FORM_LABELS: Record<CourseForm, string> = {
    fulltime: 'денна',
    parttime: 'заочна',
}
