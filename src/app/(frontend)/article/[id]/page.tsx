import { notFound, redirect } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getArticleById } from '@/lib/articles'

export const dynamic = 'force-dynamic'

type Props = {
    params: Promise<{ id: string }>
}

export default async function ArticlePage({ params }: Props) {
    const { id } = await params
    const numericId = Number(id)
    if (!Number.isFinite(numericId)) notFound()

    const payload = await getPayload({ config })
    const found = await payload.find({
        collection: 'documents',
        where: { legacyId: { equals: numericId } },
        limit: 1,
        depth: 0,
    })
    if (found.docs[0]) {
        redirect(`/documents/${found.docs[0].id}`)
    }

    const article = await getArticleById(numericId)
    if (!article) notFound()

    return (
        <main className="flex-1">
            <div className="container max-w-5xl mx-auto py-8 space-y-6">
                <h1 className="text-2xl font-bold">{article.title}</h1>
                <div
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: article.html ?? '' }}
                />
            </div>
        </main>
    )
}
