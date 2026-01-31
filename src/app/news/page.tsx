import { NewsGrid } from "@/components/common/NewsGrid/NewsGrid" // Import directly from NewsGrid.tsx
import { newsData } from "@/lib/news-data-template"

export default function NewsPage() {
  return (
    <>
      <NewsGrid news={newsData} />
    </>
  )
}
