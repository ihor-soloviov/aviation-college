import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

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

interface NewsCardProps {
  news: NewsItem
  variant?: "default" | "compact"
}

export function NewsCard({ news, variant = "default" }: NewsCardProps) {
  const isCompact = variant === "compact"

  return (
    <Link href={`/news/${news.id}`}>
      <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
        <div className={`relative ${isCompact ? "h-48" : "h-64"} overflow-hidden`}>
          <Image
            src={news.image || "/placeholder.svg"}
            alt={news.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-white/90 text-blue-600 hover:bg-white">
              {news.category}
            </Badge>
          </div>
        </div>

        <CardContent className={`${isCompact ? "p-4" : "p-6"} space-y-3`}>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{news.date}</span>
          </div>

          <h3
            className={`font-semibold leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors ${isCompact ? "text-lg" : "text-xl"
              }`}
          >
            {news.title}
          </h3>

          <p className={`text-muted-foreground line-clamp-3 ${isCompact ? "text-sm" : "text-base"}`}>{news.excerpt}</p>

          <Link
            href={`/news/${news.id}`}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors group/link"
          >
            Читати далі
            <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </CardContent>
      </Card>
    </Link>
  )
}
