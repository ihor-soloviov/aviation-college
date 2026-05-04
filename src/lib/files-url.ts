const FILE_PATH_PREFIX = "/api/articles/"

export function resolveFileUrl(href: string): string {
    if (!href.startsWith(FILE_PATH_PREFIX)) return href
    const base = process.env.FILES_API_URL ?? process.env.NEXT_PUBLIC_FILES_API_URL
    return base ? `${base}${href}` : href
}
