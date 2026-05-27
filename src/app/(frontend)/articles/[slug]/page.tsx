import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ChevronRight, Home } from 'lucide-react'

import { BlocksRenderer } from '@/components/news/BlocksRenderer'
import { LivePreviewListener } from '@/components/common/LivePreviewListener'
import { getPageBySlug } from '@/lib/pages'

export const dynamic = 'force-dynamic'

type Props = {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ preview?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const page = await getPageBySlug(slug)
    if (!page) return { title: 'Сторінку не знайдено' }
    return {
        title: page.seo.metaTitle || page.title,
        description: page.seo.metaDescription || page.excerpt,
    }
}

export default async function Page({ params, searchParams }: Props) {
    const { slug } = await params
    const isPreview = (await searchParams).preview === 'true'
    const page = await getPageBySlug(slug, { draft: isPreview })
    if (!page) notFound()

    const blocks = page.content as Parameters<typeof BlocksRenderer>[0]['blocks']
    const leadsWithHero = page.content[0]?.blockType === 'hero'

    return (
        <main className="flex-1 bg-background dark:bg-blue-900/10">
            {isPreview && <LivePreviewListener />}
            <section className="py-8">
                <div className="container mx-auto max-w-4xl space-y-6">
                    {/* Breadcrumbs */}
                    <nav className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
                        <Link href="/" className="inline-flex items-center hover:text-foreground">
                            <Home className="h-4 w-4" />
                        </Link>
                        {page.breadcrumbs.map((bc) => (
                            <span key={bc.href} className="inline-flex items-center gap-1.5">
                                <ChevronRight className="h-4 w-4" />
                                <Link href={bc.href} className="hover:text-foreground">
                                    {bc.title}
                                </Link>
                            </span>
                        ))}
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-foreground">{page.title}</span>
                    </nav>

                    {/* Заголовок — лише якщо сторінка не починається з Hero-блоку */}
                    {!leadsWithHero && (
                        <header className="space-y-4">
                            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                                {page.title}
                            </h1>
                            {page.excerpt && (
                                <p className="text-lg text-muted-foreground">{page.excerpt}</p>
                            )}
                            {page.coverImage?.url && (
                                <div className="relative mt-4 overflow-hidden rounded-lg">
                                    <Image
                                        src={page.coverImage.url}
                                        alt={page.coverImage.alt ?? page.title}
                                        width={page.coverImage.width ?? 1200}
                                        height={page.coverImage.height ?? 630}
                                        className="h-auto w-full"
                                        unoptimized={!page.coverImage.width || !page.coverImage.height}
                                    />
                                </div>
                            )}
                        </header>
                    )}

                    <BlocksRenderer blocks={blocks} linkLists={page.linkLists} />
                </div>
            </section>
        </main>
    )
}
