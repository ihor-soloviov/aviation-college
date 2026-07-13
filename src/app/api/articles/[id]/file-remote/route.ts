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

    let upstream: Response
    try {
        upstream = await fetch(`${FILES_API_URL}/api/articles/${numericId}/file`)
    } catch (error) {
        console.error('[articles/file-remote] upstream unreachable:', error)
        return new Response('Service temporarily unavailable', { status: 503 })
    }

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
