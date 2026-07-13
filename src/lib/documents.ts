import { getPayload } from 'payload'
import config from '@payload-config'
import { DATA_UNAVAILABLE, type Unavailable } from './data-result'

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

// Первинне читання: Unavailable = БД недоступна.
export async function getPayloadDocuments(): Promise<DocumentItem[] | Unavailable> {
    let res
    try {
        const payload = await getPayload({ config })
        res = await payload.find({
            collection: 'documents',
            sort: '-publishedAt',
            limit: 500,
        })
    } catch (error) {
        console.error('[getPayloadDocuments] data source unavailable:', error)
        return DATA_UNAVAILABLE
    }
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
