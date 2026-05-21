'use client'

import { useState } from 'react'
import { NewsCard } from '@/components/common/NewsCard'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

interface NewsItem {
    id: string
    title: string
    excerpt: string
    content: string
    image: string | null
    date: string
    category: string
    author: string
}

interface NewsFeedProps {
    initialNews: NewsItem[]
    total: number
    year?: number
    month?: number
}

const LIMIT = 10

export function NewsFeed({ initialNews, total, year, month }: NewsFeedProps) {
    const [news, setNews] = useState(initialNews)
    const [loading, setLoading] = useState(false)

    const hasMore = news.length < total

    async function loadMore() {
        setLoading(true)
        try {
            const params = new URLSearchParams({ limit: String(LIMIT), offset: String(news.length) })
            if (year) params.set('year', String(year))
            if (month) params.set('month', String(month))
            const res = await fetch(`/api/news?${params}`)
            const data: { news: NewsItem[] } = await res.json()
            setNews((prev) => [...prev, ...data.news])
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-4">
                {news.map((item) => (
                    <NewsCard key={item.id} news={item} variant="wide" />
                ))}
            </div>

            {hasMore && (
                <div className="text-center">
                    <Button variant="outline" size="lg" onClick={loadMore} disabled={loading}>
                        {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                        {loading ? 'Завантаження...' : 'Завантажити ще'}
                    </Button>
                </div>
            )}
        </div>
    )
}
