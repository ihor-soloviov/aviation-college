'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronDown, Calendar, X } from 'lucide-react'

interface ArchiveMonth {
    year: number
    month: number
    count: number
}

interface ArchiveYear {
    year: number
    months: ArchiveMonth[]
}

interface NewsArchiveProps {
    archive: ArchiveMonth[]
}

const MONTH_NAMES = [
    'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
    'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень',
]

function groupByYear(archive: ArchiveMonth[]): ArchiveYear[] {
    const map = new Map<number, ArchiveMonth[]>()
    for (const item of archive) {
        if (!map.has(item.year)) map.set(item.year, [])
        map.get(item.year)!.push(item)
    }
    return Array.from(map.entries())
        .sort((a, b) => b[0] - a[0])
        .map(([year, months]) => ({ year, months }))
}

export function NewsArchive({ archive }: NewsArchiveProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const activeYear = searchParams.get('year') ? Number(searchParams.get('year')) : null
    const activeMonth = searchParams.get('month') ? Number(searchParams.get('month')) : null

    const years = groupByYear(archive)
    const [openYear, setOpenYear] = useState<number | null>(
        activeYear ?? (years[0]?.year ?? null)
    )
    const [isMobileOpen, setIsMobileOpen] = useState(false)

    useEffect(() => {
        setIsMobileOpen(false)
    }, [activeYear, activeMonth])

    useEffect(() => {
        if (!isMobileOpen) return
        const prev = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = prev
        }
    }, [isMobileOpen])

    function toggleYear(year: number) {
        setOpenYear((prev) => (prev === year ? null : year))
    }

    function navigate(year: number, month?: number) {
        const params = new URLSearchParams()
        params.set('year', String(year))
        if (month) params.set('month', String(month))
        router.push(`/news?${params.toString()}`)
    }

    const content = (
        <div className="space-y-0.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-2 pb-2">
                Архів новин
            </p>

            {(activeYear || activeMonth) && (
                <button
                    onClick={() => router.push('/news')}
                    className="w-full text-left px-2 py-1 text-sm text-blue-600 hover:underline"
                >
                    ← Всі новини
                </button>
            )}

            {years.map(({ year, months }) => {
                const isOpen = openYear === year
                const isActiveYear = activeYear === year && !activeMonth

                if (year === 0) return null

                return (
                    <div key={year}>
                        <button
                            onClick={() => { toggleYear(year); navigate(year) }}
                            className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md text-sm font-medium transition-colors hover:bg-muted ${
                                isActiveYear ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30' : ''
                            }`}
                        >
                            <span>{year}</span>
                            <ChevronDown
                                className="h-3 w-3 transition-transform duration-300"
                                style={{ transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)' }}
                            />
                        </button>

                        <div
                            className="grid transition-all duration-300 ease-in-out"
                            style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                        >
                            <div className="overflow-hidden">
                                <div className="ml-3 border-l border-border pl-2 space-y-0.5 py-0.5">
                                    {months.map(({ month, count }) => {
                                        const isActive = activeYear === year && activeMonth === month
                                        return (
                                            <button
                                                key={month}
                                                onClick={() => navigate(year, month)}
                                                className={`w-full flex items-center justify-between px-2 py-1 rounded text-sm transition-colors hover:bg-muted ${
                                                    isActive ? 'text-blue-600 font-medium' : 'text-muted-foreground'
                                                }`}
                                            >
                                                <span>{MONTH_NAMES[month - 1]}</span>
                                                <span className="text-xs opacity-60">{count}</span>
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )

    return (
        <>
            <button
                type="button"
                onClick={() => setIsMobileOpen(true)}
                className="md:hidden inline-flex items-center gap-2 px-3 py-2 rounded-md border bg-background text-sm font-medium hover:bg-muted transition-colors"
                aria-label="Відкрити архів новин"
                aria-expanded={isMobileOpen}
            >
                <Calendar className="h-4 w-4" />
                <span>Архів</span>
                {(activeYear || activeMonth) && (
                    <span className="ml-1 inline-flex items-center justify-center h-5 min-w-5 px-1 rounded-full bg-blue-600 text-white text-xs">
                        •
                    </span>
                )}
            </button>

            <div
                aria-hidden={!isMobileOpen}
                className={`md:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
                    isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
            >
                <div
                    onClick={() => setIsMobileOpen(false)}
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                />
                <aside
                    role="dialog"
                    aria-label="Архів новин"
                    aria-modal="true"
                    className={`absolute left-0 top-0 bottom-0 w-72 max-w-[85vw] bg-background border-r shadow-xl overflow-y-auto p-4 transition-transform duration-300 ${
                        isMobileOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                >
                    <button
                        type="button"
                        onClick={() => setIsMobileOpen(false)}
                        className="absolute top-3 right-3 p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
                        aria-label="Закрити архів"
                    >
                        <X className="h-4 w-4" />
                    </button>
                    <div className="mt-2">{content}</div>
                </aside>
            </div>

            <aside className="hidden md:block w-52 shrink-0">
                <div className="sticky top-24">{content}</div>
            </aside>
        </>
    )
}
