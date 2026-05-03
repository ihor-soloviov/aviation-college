'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronDown } from 'lucide-react'

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

    function toggleYear(year: number) {
        setOpenYear((prev) => (prev === year ? null : year))
    }

    function navigate(year: number, month?: number) {
        const params = new URLSearchParams()
        params.set('year', String(year))
        if (month) params.set('month', String(month))
        router.push(`/news?${params.toString()}`)
    }

    return (
        <aside className="w-52 shrink-0">
            <div className="sticky top-24 space-y-0.5">
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

                  if (year === 0) return

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

                            {/* grid-template-rows: 0fr → 1fr — єдиний спосіб анімувати height: auto */}
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
        </aside>
    )
}
