import { NewsGrid } from "@/components/common/NewsGrid"
import { newsData } from "@/lib/news-data-template"

export default function NewsPage() {
    return (
        <>
            <NewsGrid news={newsData}  />
        </>
    )
}
