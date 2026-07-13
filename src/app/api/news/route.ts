import { NextResponse } from 'next/server'
import { getPayloadNewsList } from '@/lib/payload-news'
import { isUnavailable } from '@/lib/data-result'

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const limit = Math.min(Number(searchParams.get('limit') ?? 10), 50)
    const offset = Number(searchParams.get('offset') ?? 0)
    const year = searchParams.get('year') ? Number(searchParams.get('year')) : undefined
    const month = searchParams.get('month') ? Number(searchParams.get('month')) : undefined

    try {
        const result = await getPayloadNewsList({ limit, offset, year, month })
        if (isUnavailable(result)) {
            return NextResponse.json({ error: 'News temporarily unavailable', news: [], total: 0 }, { status: 503 })
        }
        return NextResponse.json({ news: result.items, total: result.total })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Failed to fetch news', news: [], total: 0 }, { status: 500 })
    }
}
