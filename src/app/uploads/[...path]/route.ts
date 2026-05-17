import { NextResponse } from 'next/server'
import path from 'path'
import { promises as fs } from 'fs'

const MIME_BY_EXT: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp',
}

type RouteContext = { params: Promise<{ path: string[] }> }

export async function GET(_req: Request, { params }: RouteContext) {
    if (process.env.UPLOAD_MODE !== 'local') {
        return new NextResponse('Not Found', { status: 404 })
    }

    const uploadsDir = process.env.UPLOADS_DIR
    if (!uploadsDir) return new NextResponse('Uploads not configured', { status: 500 })

    const { path: segments } = await params
    if (!segments || segments.length === 0) return new NextResponse('Not Found', { status: 404 })

    const root = path.resolve(uploadsDir)
    const requested = path.resolve(root, segments.join('/'))

    if (!requested.startsWith(root + path.sep)) {
        return new NextResponse('Forbidden', { status: 403 })
    }

    try {
        const stat = await fs.stat(requested)
        if (!stat.isFile()) return new NextResponse('Not Found', { status: 404 })

        const buffer = await fs.readFile(requested)
        const ext = path.extname(requested).slice(1).toLowerCase()
        const mime = MIME_BY_EXT[ext] ?? 'application/octet-stream'

        return new NextResponse(new Uint8Array(buffer), {
            status: 200,
            headers: {
                'Content-Type': mime,
                'Cache-Control': 'public, max-age=604800, immutable',
            },
        })
    } catch {
        return new NextResponse('Not Found', { status: 404 })
    }
}
