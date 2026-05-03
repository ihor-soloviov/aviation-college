import { NewsCard } from "../NewsCard"

interface NewsItem {
  id: string
  title: string
  excerpt: string
  content: string
  image: string
  date: string
  category: string
  author: string
}

interface NewsGridProps {
  news: NewsItem[]
  variant?: "default" | "compact"
  maxItems?: number
}

export function NewsGrid({ news, variant = "default", maxItems }: NewsGridProps) {
  const displayNews = maxItems ? news.slice(0, maxItems) : news
  const isCompact = variant === "compact"

  return (
    <section className="bg-background dark:b-gray-900/10 py-16 md:py-24">
      <div className="container space-y-8 mx-auto">
        <div
          className={`grid gap-8 ${isCompact ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            }`}
        >
          {displayNews.map((item) => (
            <NewsCard key={item.id} news={item} variant={variant} />
          ))}
        </div>
      </div>
    </section>
  )
}
