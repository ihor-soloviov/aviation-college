import { NewsGrid } from "@/components/common/NewsGrid"
import { newsData } from "@/lib/news-data-template"
import Hero from "@/components/common/Hero/Hero"

export default function NewsPage() {
    return (
        <>
            <Hero imgPath="/hero-news.webp" />
            <NewsGrid news={newsData}  />
        </>
    )
}
