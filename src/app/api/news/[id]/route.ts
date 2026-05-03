import { NextResponse } from 'next/server'
import { getNewsById } from '@/lib/news'

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const numericId = Number(id)

    if (isNaN(numericId)) {
        return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
    }

    try {
        const news = await getNewsById(numericId)
        if (!news) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 })
        }
        return NextResponse.json(news)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 })
    }
}
