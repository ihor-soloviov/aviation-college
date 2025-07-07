import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { newsData } from "@/lib/news-data-template"
import { ArrowLeft, Calendar, User, Share2 } from "lucide-react"
import { notFound } from "next/navigation"
import Hero from "@/components/common/Hero/Hero"

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
        <>
            <Hero imgPath="/hero-news.webp" />
            <main className="flex-1">
                <section className="bg-white py-8">
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
                <section className="bg-white py-12">
                    <div className="container max-w-4xl mx-auto">
                        <div className="prose prose-lg max-w-none">
                            <div
                                className="text-gray-700 leading-relaxed space-y-6"
                                dangerouslySetInnerHTML={{ __html: news.content }}
                            />
                        </div>
                    </div>
                </section>

                {/* Related News */}
                <section className="bg-gray-50/50 py-16">
                    <div className="container mx-auto">
                        <div className="space-y-8">
                            <div className="text-center space-y-2">
                                <h2 className="text-3xl font-bold tracking-tight">Інші новини</h2>
                                <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full" />
                            </div>

                            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {otherNews.map((item) => (
                                    <div key={item.id} className="group">
                                        <div className="overflow-hidden border-0 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 rounded-lg">
                                            <div className="relative h-48 overflow-hidden">
                                                <Image
                                                    src={item.image || "/placeholder.svg"}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                />
                                                <div className="absolute top-4 left-4">
                                                    <Badge variant="secondary" className="bg-white/90 text-blue-600 hover:bg-white">
                                                        {item.category}
                                                    </Badge>
                                                </div>
                                            </div>

                                            <div className="p-6 space-y-3">
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <Calendar className="h-4 w-4" />
                                                    <span>{item.date}</span>
                                                </div>

                                                <h3 className="text-xl font-semibold leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
                                                    {item.title}
                                                </h3>

                                                <p className="text-muted-foreground line-clamp-3">{item.excerpt}</p>

                                                <Link
                                                    href={`/news/${item.id}`}
                                                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors group/link"
                                                >
                                                    Читати далі
                                                    <ArrowLeft className="h-4 w-4 rotate-180 transition-transform group-hover/link:translate-x-1" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
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
        </>
    )
}
