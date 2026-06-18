import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    getPayloadNewsById,
    getPayloadPublishedNews,
    extractPayloadCoverUrl,
    payloadDocToCardItem,
} from "@/lib/payload-news"
import { BlocksRenderer } from "@/components/news/BlocksRenderer"
import { ArrowLeft, Calendar } from "lucide-react"
import { notFound } from "next/navigation"
import { NewsCard } from "@/components/common/NewsCard/NewsCard"
import { ShareButton } from "@/components/news/ShareButton"

export const dynamic = "force-dynamic"

type Props = {
    params: Promise<{ id: string }>
}

export default async function NewsDetailPage({ params }: Props) {
    const { id } = await params
    const numericId = Number(id)
    if (!Number.isFinite(numericId)) notFound()

    const doc = await getPayloadNewsById(numericId)
    if (!doc) notFound()

    const title = String(doc.title ?? '')
    const dateRaw = doc.publishedAt ? String(doc.publishedAt) : new Date().toISOString()
    const tagsArr = Array.isArray(doc.tags)
        ? (doc.tags as Array<{ tag: string }>).map((t) => t.tag).filter(Boolean)
        : []
    const tagsLabel = tagsArr.join(' · ')
    const coverUrl = extractPayloadCoverUrl(doc.coverImage, 'feature')
    const blocks = (doc.content ?? []) as Parameters<typeof BlocksRenderer>[0]['blocks']

    const recent = await getPayloadPublishedNews(4)
    const otherNews = recent
        .map((d) => payloadDocToCardItem(d as Record<string, unknown>))
        .filter((item) => item.id !== String(doc.id))
        .slice(0, 3)

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
                                <ShareButton title={title} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {coverUrl && (
                <section className="pb-4">
                    <div className="container max-w-4xl mx-auto">
                        <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
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
                    <BlocksRenderer blocks={blocks} />
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
