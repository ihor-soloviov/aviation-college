import { permanentRedirect } from 'next/navigation'

// Канонічний URL сторінок page-builder тепер /<slug> (root catch-all).
// Старий /articles/<slug> лишаємо як 301-редірект (закладки, старі лінки).
export const dynamic = 'force-dynamic'

type Props = {
    params: Promise<{ slug: string }>
}

export default async function ArticleRedirect({ params }: Props) {
    const { slug } = await params
    permanentRedirect(`/${slug}`)
}
