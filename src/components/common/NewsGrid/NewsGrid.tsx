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
    <section className="bg-background dark:bg-blue-900/10 py-16 md:py-24">
      <div className="container space-y-8 mx-auto">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Останні новини коледжу</h2>
        </div>

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
