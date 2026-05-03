import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getNewsById, getNewsList } from "@/lib/news"
import { Calendar, Share2 } from "lucide-react"
import { notFound } from "next/navigation"
import { NewsCard } from "@/components/common/NewsCard/NewsCard"
import fs from 'fs'
import path from 'path'

type Props = {
    params: Promise<{ id: string }>
}

export default async function NewsDetailPage({ params }: Props) {
    const { id } = await params
    const news = await getNewsById(Number(id))

    if (!news) notFound()

    const uploadsDir = process.env.UPLOADS_DIR ?? '/var/www/uploads'
    const filePath = path.join(uploadsDir, news.content_path)
    const html = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : ''

    const otherRaw = await getNewsList(4)
    const otherNews = otherRaw
        .filter((item) => item.id !== news.id)
        .slice(0, 3)
        .map((item) => ({
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

    const formattedDate = new Date(news.add_date).toLocaleDateString('uk-UA', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })

    return (
        <main className="flex-1 bg-background dark:bg-blue-900/10">
            <section className="py-8">
                <div className="container max-w-4xl mx-auto">
                    <div className="space-y-6">
                        <div className="space-y-4">
                            {news.tags && (
                                <Badge variant="secondary" className="bg-blue-100 text-blue-600">
                                    {news.tags}
                                </Badge>
                            )}
                            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                                {news.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>{formattedDate}</span>
                                </div>
                                <Button variant="outline" size="sm" className="ml-auto bg-transparent">
                                    <Share2 className="h-4 w-4 mr-2" />
                                    Поділитися
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 dark:bg-blue-900/10">
                <div className="container max-w-4xl mx-auto">
                    <div className="prose prose-lg max-w-none">
                        <div
                            className="leading-relaxed space-y-6"
                            dangerouslySetInnerHTML={{ __html: html }}
                        />
                    </div>
                </div>
            </section>

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
