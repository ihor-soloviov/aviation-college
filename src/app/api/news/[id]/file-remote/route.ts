const FILES_API_URL = process.env.FILES_API_URL

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const numericId = Number(id)

    if (isNaN(numericId)) {
        return new Response('Invalid id', { status: 400 })
    }

    if (!FILES_API_URL) {
        return new Response('FILES_API_URL is not configured', { status: 500 })
    }

    const upstream = await fetch(`${FILES_API_URL}/api/news/${numericId}/file`)

    if (!upstream.ok || !upstream.body) {
        return new Response(upstream.statusText || 'Upstream error', { status: upstream.status })
    }

    return new Response(upstream.body, {
        status: upstream.status,
        headers: {
            'Content-Type': upstream.headers.get('content-type') ?? 'application/octet-stream',
        },
    })
}
