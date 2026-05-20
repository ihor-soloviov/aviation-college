import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getNewsById } from "@/lib/news"
import { getPayloadNewsBySlug, getMergedNewsList, extractPayloadCoverUrl } from "@/lib/payload-news"
import { BlocksRenderer } from "@/components/news/BlocksRenderer"
import { ArrowLeft, Calendar, Share2 } from "lucide-react"
import { notFound } from "next/navigation"
import { NewsCard } from "@/components/common/NewsCard/NewsCard"
import fs from 'fs'
import path from 'path'

export const dynamic = "force-dynamic"

type Props = {
    params: Promise<{ idOrSlug: string }>
}

function isNumericId(value: string): boolean {
    return /^\d+$/.test(value)
}

async function renderLegacyHtml(id: string, contentPath: string): Promise<string> {
    const uploadsDir = process.env.UPLOADS_DIR ?? '/var/www/uploads'
    const filePath = path.join(uploadsDir, contentPath)
    const html = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : ''
    if (html) return html
    const remoteRes = await fetch(`${process.env.FILES_API_URL}/api/news/${id}/file`, {
        cache: 'no-store',
    })
    return remoteRes.ok ? await remoteRes.text() : ''
}

export default async function NewsDetailPage({ params }: Props) {
    const { idOrSlug } = await params

    let title = ''
    let dateRaw: string | Date = new Date()
    let tagsLabel = ''
    let coverUrl: string | null = null
    let bodyNode: React.ReactNode = null

    if (isNumericId(idOrSlug)) {
        const news = await getNewsById(Number(idOrSlug))
        if (!news) notFound()
        title = news.title
        dateRaw = news.add_date
        tagsLabel = news.tags ?? ''
        const html = await renderLegacyHtml(idOrSlug, news.content_path)
        bodyNode = (
            <div className="prose prose-lg max-w-none">
                <div
                    className="leading-relaxed space-y-6"
                    dangerouslySetInnerHTML={{ __html: html }}
                />
            </div>
        )
    } else {
        const doc = await getPayloadNewsBySlug(idOrSlug)
        if (!doc) notFound()
        title = String(doc.title ?? '')
        dateRaw = doc.publishedAt ? String(doc.publishedAt) : new Date()
        const tagsArr = Array.isArray(doc.tags)
            ? (doc.tags as Array<{ tag: string }>).map((t) => t.tag).filter(Boolean)
            : []
        tagsLabel = tagsArr.join(' · ')
        coverUrl = extractPayloadCoverUrl(doc.coverImage, 'feature')
        const blocks = (doc.content ?? []) as Parameters<typeof BlocksRenderer>[0]['blocks']
        bodyNode = <BlocksRenderer blocks={blocks} />
    }

    const merged = await getMergedNewsList(4)
    const otherNews = merged
        .filter((item) => item.href !== `/news/${idOrSlug}`)
        .slice(0, 3)
        .map((item) => ({
            id: item.href.replace('/news/', ''),
            title: item.title,
            excerpt: item.excerpt,
            content: '',
            image: item.imageUrl,
            date: item.publishedAt.toLocaleDateString('uk-UA', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            }),
            category: item.tags.join(' · '),
            author: '',
        }))

    const formattedDate = new Date(dateRaw).toLocaleDateString('uk-UA', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })

    return (
        <main className="flex-1 bg-background dark:bg-blue-900/10">
            <section className="py-8">
                <div className="container max-w-4xl mx-auto">
                    <div className="space-y-6">
                        <Link href="/news">
                            <Button variant="ghost" size="sm" className="-ml-2 text-muted-foreground hover:text-foreground">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                До всіх новин
                            </Button>
                        </Link>
                        <div className="space-y-4">
                            {tagsLabel && (
                                <Badge variant="secondary" className="bg-blue-100 text-blue-600">
                                    {tagsLabel}
                                </Badge>
                            )}
                            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                                {title}
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

            {coverUrl && (
                <section className="pb-4">
                    <div className="container max-w-4xl mx-auto">
                        <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-muted">
                            <Image
                                src={coverUrl}
                                alt={title}
                                fill
                                priority
                                sizes="(min-width: 896px) 896px, 100vw"
                                className="object-cover"
                            />
                        </div>
                    </div>
                </section>
            )}

            <section className="py-12 dark:bg-blue-900/10">
                <div className="container max-w-4xl mx-auto">
                    {bodyNode}
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
