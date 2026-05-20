import { getPayload } from 'payload'
import config from '@payload-config'

export interface DocumentItem {
    id: number
    title: string
    description: string
    category: string
    publishedAt: string
    url: string
    filename: string
    mimeType: string
    filesize: number
}

export async function getPayloadDocuments(): Promise<DocumentItem[]> {
    const payload = await getPayload({ config })
    const res = await payload.find({
        collection: 'documents',
        sort: '-publishedAt',
        limit: 500,
    })
    return res.docs.map((doc) => {
        const d = doc as Record<string, unknown>
        return {
            id: Number(d.id),
            title: String(d.title ?? ''),
            description: String(d.description ?? ''),
            category: String(d.category ?? ''),
            publishedAt: d.publishedAt ? String(d.publishedAt) : '',
            url: String(d.url ?? ''),
            filename: String(d.filename ?? ''),
            mimeType: String(d.mimeType ?? ''),
            filesize: Number(d.filesize ?? 0),
        }
    })
}
