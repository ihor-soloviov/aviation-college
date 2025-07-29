import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { newsData } from "@/lib/news-data-template"
import { Calendar, User, Share2 } from "lucide-react"
import { notFound } from "next/navigation"
import { NewsCard } from "@/components/common/NewsCard/NewsCard"

type Props = {
    params: Promise<{ id: string }>
}

export default async function NewsDetailPage({ params }: Props) {
    const { id } = await params
    const news = newsData.find((item) => item.id === id)

    if (!news) {
        notFound()
    }

    const otherNews = newsData.filter((item) => item.id !== id).slice(0, 3)

    return (
        <main className="flex-1 bg-background dark:bg-blue-900/10">
            <section className="py-8 ">
                <div className="container max-w-4xl mx-auto">
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <Badge variant="secondary" className="bg-blue-100 text-blue-600">
                                {news.category}
                            </Badge>

                            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{news.title}</h1>

                            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>{news.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    <span>{news.author}</span>
                                </div>
                                <Button variant="outline" size="sm" className="ml-auto bg-transparent">
                                    <Share2 className="h-4 w-4 mr-2" />
                                    Поділитися
                                </Button>
                            </div>
                        </div>

                        {/* Featured Image */}
                        <div className="relative aspect-video overflow-hidden rounded-xl">
                            <Image src={news.image || "/placeholder.svg"} alt={news.title} fill className="object-cover" priority />
                        </div>
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <section className="py-12 dark:bg-blue-900/10">
                <div className="container max-w-4xl mx-auto">
                    <div className="prose prose-lg max-w-none" >
                        <div
                            className="leading-relaxed space-y-6 "
                            dangerouslySetInnerHTML={{ __html: news.content }}
                        />
                    </div>
                </div>
            </section>

            {/* Related News */}
            <section className="py-16">
                <div className="container mx-auto">
                    <div className="space-y-8">
                        <div className="text-center space-y-2">
                            <h2 className="text-3xl font-bold tracking-tight">Інші новини</h2>
                            <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full" />
                        </div>

                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {otherNews.map((item) => (
                                <NewsCard key={item.id} news={item} variant="compact" />
                            ))}
                        </div>

                        <div className="text-center">
                            <Link href="/news">
                                <Button variant="outline" size="lg">
                                    Всі новини
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
