import { NextResponse } from 'next/server'
import { getNewsList, getNewsCount } from '@/lib/news'

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const limit = Math.min(Number(searchParams.get('limit') ?? 10), 50)
    const offset = Number(searchParams.get('offset') ?? 0)
    const year = searchParams.get('year') ? Number(searchParams.get('year')) : undefined
    const month = searchParams.get('month') ? Number(searchParams.get('month')) : undefined

    try {
        const [news, total] = await Promise.all([getNewsList(limit, offset, year, month), getNewsCount(year, month)])
        return NextResponse.json({ news, total })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 })
    }
}
