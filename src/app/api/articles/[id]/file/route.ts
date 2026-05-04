import { getArticleContent } from '@/lib/articles'

const MIME_TYPES: Record<string, string> = {
    pdf: 'application/pdf',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    html: 'text/html',
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const numericId = Number(id)

    if (isNaN(numericId)) {
        return new Response('Invalid id', { status: 400 })
    }

    const file = await getArticleContent(numericId)
    if (!file) {
        return new Response('Not found', { status: 404 })
    }

    const mime = MIME_TYPES[file.fileFormat] ?? 'application/octet-stream'

    const body = new Uint8Array(file.data)

    return new Response(body, {
        headers: {
            'Content-Type': mime,
            'Content-Length': String(body.byteLength),
        },
    })
}
