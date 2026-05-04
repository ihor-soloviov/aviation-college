import { Suspense } from "react"
import { getNewsList, getNewsCount, getNewsArchive } from "@/lib/news"
import { NewsFeed } from "@/components/common/NewsFeed/NewsFeed"
import { NewsArchive } from "@/components/common/NewsArchive/NewsArchive"

interface Props {
    searchParams: Promise<{ year?: string; month?: string }>
}

const MONTH_NAMES = [
    'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
    'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень',
]

export default async function NewsPage({ searchParams }: Props) {
    const { year: yearStr, month: monthStr } = await searchParams
    const year = yearStr ? Number(yearStr) : undefined
    const month = monthStr ? Number(monthStr) : undefined

    const [rawNews, total, archive] = await Promise.all([
        getNewsList(10, 0, year, month),
        getNewsCount(year, month),
        getNewsArchive(),
    ])

    const initialNews = rawNews.map((item) => ({
        id: String(item.id),
        title: item.title,
        excerpt: item.excerpt,
        content: '',
        image: '/placeholder.svg',
        date: new Date(item.add_date).toLocaleDateString('uk-UA', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }),
        category: item.tags ?? '',
        author: '',
    }))

    const pageTitle = year && month
        ? `${MONTH_NAMES[month - 1]} ${year}`
        : year
        ? String(year)
        : 'Новини'

    return (
        <div className="container mx-auto py-8 md:py-12 px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-6 md:mb-8">{pageTitle}</h1>
            <div className="flex flex-col md:flex-row gap-4 md:gap-10">
                <Suspense>
                    <NewsArchive archive={archive} />
                </Suspense>
                <div className="flex-1 min-w-0">
                    <NewsFeed key={`${year}-${month}`} initialNews={initialNews} total={total} year={year} month={month} />
                </div>
            </div>
        </div>
    )
}
