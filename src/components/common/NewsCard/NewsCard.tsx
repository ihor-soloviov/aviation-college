import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ArrowRight } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  category: string;
  author: string;
}

interface NewsCardProps {
  news: NewsItem;
  variant?: "default" | "compact";
}

export function NewsCard({ news }: NewsCardProps) {
  return (
    <Link href={`/news/${news.id}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 h-full">
        <CardContent className="p-4 space-y-2 flex flex-col h-full">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{news.date}</span>
          </div>

          <h3 className="font-semibold text-base leading-tight line-clamp-3 group-hover:text-blue-600 transition-colors">
            {news.title}
          </h3>

          <div className="mt-auto pt-2">
            <span className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors">
              Читати далі
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
