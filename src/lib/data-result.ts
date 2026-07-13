/**
 * Спільний маркер «джерело даних недоступне».
 *
 * Дозволяє відрізнити інфраструктурну помилку (БД/CMS недоступні, триває
 * технічне обслуговування) від легітимного «запису не існує» (null):
 *   - Unavailable → сторінка показує «Ведуться технічні роботи» + ретрай;
 *   - null        → сторінка показує 404 (notFound).
 *
 * Використовується у функціях шару даних (src/lib/*) — первинні читання
 * повертають `T | Unavailable` (або `T | null | Unavailable` для detail),
 * а вторинні/декоративні читання тихо деградують у [] / null.
 */
export const DATA_UNAVAILABLE = Symbol('DATA_UNAVAILABLE')
export type Unavailable = typeof DATA_UNAVAILABLE

export function isUnavailable(value: unknown): value is Unavailable {
    return value === DATA_UNAVAILABLE
}

/**
 * Payload кидає NotFound зі status 404 і для відсутнього id у findByID().
 * Це НЕ «недоступно» — це «не знайдено», тож такі помилки мапимо в null.
 */
export function isNotFoundError(error: unknown): boolean {
    const status = (error as { status?: number } | null | undefined)?.status
    return status === 404
}
