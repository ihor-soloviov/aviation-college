import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Calendar, Download } from 'lucide-react'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { DOCUMENT_CATEGORIES } from '@/lib/document-categories'

export const dynamic = 'force-dynamic'

type Props = {
    params: Promise<{ id: string }>
}

const CATEGORY_LABEL = new Map(DOCUMENT_CATEGORIES.map((c) => [c.value, c.label]))

export default async function DocumentDetailPage({ params }: Props) {
    const { id } = await params
    const numericId = Number(id)
    if (!Number.isFinite(numericId)) notFound()

    const payload = await getPayload({ config })
    let doc: Record<string, unknown> | null = null
    try {
        doc = (await payload.findByID({
            collection: 'documents',
            id: numericId,
            depth: 0,
        })) as Record<string, unknown>
    } catch {
        notFound()
    }
    if (!doc) notFound()

    const title = String(doc.title ?? '')
    const description = doc.description ? String(doc.description) : ''
    const subcategory = doc.subcategory ? String(doc.subcategory) : ''
    const publishedAtIso = doc.publishedAt ? String(doc.publishedAt) : new Date().toISOString()
    const categories = Array.isArray(doc.category) ? (doc.category as string[]) : []
    const fileUrl = doc.url ? String(doc.url) : null
    const filename = doc.filename ? String(doc.filename) : null
    const isPdf = doc.mimeType === 'application/pdf'

    const formattedDate = new Date(publishedAtIso).toLocaleDateString('uk-UA', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })

    const publicFileUrl = filename ? `/uploads/payload/documents/${filename}` : fileUrl

    return (
        <main className="flex-1 bg-background dark:bg-blue-900/10">
            <section className="py-8">
                <div className="container max-w-5xl mx-auto">
                    <div className="space-y-6">
                        <Link href="/admin/collections/documents">
                            <Button variant="ghost" size="sm" className="-ml-2 text-muted-foreground hover:text-foreground">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                До всіх документів
                            </Button>
                        </Link>
                        <div className="space-y-4">
                            {categories.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {categories.map((c) => (
                                        <Badge key={c} variant="secondary" className="bg-blue-100 text-blue-600">
                                            {CATEGORY_LABEL.get(c) ?? c}
                                        </Badge>
                                    ))}
                                </div>
                            )}
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">{title}</h1>
                            {subcategory && (
                                <p className="text-sm text-muted-foreground">{subcategory}</p>
                            )}
                            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>{formattedDate}</span>
                                </div>
                                {publicFileUrl && (
                                    <a href={publicFileUrl} download={filename ?? undefined} className="ml-auto">
                                        <Button variant="outline" size="sm">
                                            <Download className="h-4 w-4 mr-2" />
                                            Завантажити
                                        </Button>
                                    </a>
                                )}
                            </div>
                            {description && (
                                <p className="text-base text-foreground/80">{description}</p>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {publicFileUrl && isPdf && (
                <section className="pb-12">
                    <div className="container max-w-5xl mx-auto">
                        <iframe
                            src={publicFileUrl}
                            loading="lazy"
                            title={title}
                            className="w-full border rounded-lg bg-muted"
                            style={{ height: '85vh' }}
                        />
                    </div>
                </section>
            )}
        </main>
    )
}
