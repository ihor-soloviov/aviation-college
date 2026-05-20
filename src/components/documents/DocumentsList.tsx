'use client'

import { useMemo, useState } from 'react'
import { Download, FileText, Search } from 'lucide-react'
import type { DocumentItem } from '@/lib/documents'

interface Props {
    documents: DocumentItem[]
}

function formatSize(bytes: number): string {
    if (!bytes) return ''
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

function formatDate(iso: string): string {
    if (!iso) return ''
    return new Date(iso).toLocaleDateString('uk-UA', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })
}

export function DocumentsList({ documents }: Props) {
    const [query, setQuery] = useState('')

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase()
        if (!q) return documents
        return documents.filter((d) =>
            d.title.toLowerCase().includes(q) ||
            d.description.toLowerCase().includes(q) ||
            d.category.toLowerCase().includes(q)
        )
    }, [documents, query])

    return (
        <div className="space-y-6">
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <input
                    type="search"
                    placeholder="Пошук за назвою, описом, категорією..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <p className="text-sm text-muted-foreground">
                Знайдено: <span className="font-medium text-foreground">{filtered.length}</span>
                {filtered.length !== documents.length && (
                    <> з {documents.length}</>
                )}
            </p>

            {filtered.length === 0 ? (
                <p className="text-center text-muted-foreground py-16">Нічого не знайдено</p>
            ) : (
                <div className="grid gap-3 md:grid-cols-2">
                    {filtered.map((doc) => (
                        <a
                            key={doc.id}
                            href={doc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-start gap-4 rounded-lg border bg-card p-4 hover:border-blue-500 hover:shadow-sm transition-colors"
                        >
                            <div className="rounded-md bg-blue-50 dark:bg-blue-900/30 p-2 text-blue-600 shrink-0">
                                <FileText className="h-6 w-6" />
                            </div>
                            <div className="flex-1 min-w-0 space-y-1">
                                <h3 className="font-medium leading-tight group-hover:text-blue-700">
                                    {doc.title}
                                </h3>
                                {doc.description && (
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                        {doc.description}
                                    </p>
                                )}
                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground pt-1">
                                    {doc.category && (
                                        <span className="rounded bg-muted px-2 py-0.5">{doc.category}</span>
                                    )}
                                    {doc.publishedAt && <span>{formatDate(doc.publishedAt)}</span>}
                                    {doc.filesize > 0 && <span>{formatSize(doc.filesize)}</span>}
                                </div>
                            </div>
                            <Download className="h-5 w-5 text-muted-foreground group-hover:text-blue-600 mt-1 shrink-0" />
                        </a>
                    ))}
                </div>
            )}
        </div>
    )
}
