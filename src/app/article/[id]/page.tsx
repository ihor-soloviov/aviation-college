import { getArticleById } from '@/lib/articles'
import { notFound } from 'next/navigation'
import { resolveFileUrl } from '@/lib/files-url'

type Props = {
    params: Promise<{ id: string }>
}

export default async function ArticlePage({ params }: Props) {
    const { id } = await params
    const article = await getArticleById(Number(id))

    if (!article) notFound()

    const isPdf = article.view_mode === 'pdf'

    return (
        <main className="flex-1">
            <div className="container max-w-5xl mx-auto py-8 space-y-6">
                <h1 className="text-2xl font-bold">{article.title}</h1>

                {isPdf ? (
                    <iframe
                        src={resolveFileUrl(`/api/articles/${id}/file`)}
                        loading="lazy"
                        className="w-full border-0 rounded-lg"
                        style={{ height: '85vh' }}
                    />
                ) : (
                    <div
                        className="prose prose-lg max-w-none"
                        dangerouslySetInnerHTML={{ __html: article.html ?? '' }}
                    />
                )}
            </div>
        </main>
    )
}
