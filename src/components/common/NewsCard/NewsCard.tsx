import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ArrowRight, Plane } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string | null;
  date: string;
  category: string;
  author: string;
}

interface NewsCardProps {
  news: NewsItem;
  variant?: "default" | "compact" | "wide";
}

function CoverPlaceholder({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br from-blue-500 via-sky-500 to-cyan-400 overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,white_0%,transparent_45%)]" />
      <Plane
        className="relative h-16 w-16 text-white/80 -rotate-12 drop-shadow-md"
        strokeWidth={1.5}
      />
    </div>
  );
}

export function NewsCard({ news, variant = "default" }: NewsCardProps) {
  if (variant === "wide") {
    return (
      <Link href={`/news/${news.id}`} className="block">
        <Card className="group overflow-hidden p-0 gap-0 transition-all hover:shadow-lg hover:-translate-y-0.5">
          <div className="flex flex-col sm:flex-row">
            <div className="relative sm:w-72 sm:shrink-0 aspect-[16/9] sm:aspect-auto sm:min-h-[180px] bg-muted overflow-hidden">
              {news.image ? (
                <Image
                  src={news.image}
                  alt={news.title}
                  fill
                  sizes="(min-width: 640px) 288px, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <CoverPlaceholder className="absolute inset-0" />
              )}
            </div>
            <CardContent className="flex-1 p-5 sm:p-6 flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {news.date}
                </span>
                {news.category && (
                  <span className="rounded bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5">
                    {news.category}
                  </span>
                )}
              </div>
              <h3 className="font-semibold text-lg sm:text-xl leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                {news.title}
              </h3>
              {news.excerpt && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {news.excerpt}
                </p>
              )}
              <div className="mt-auto pt-2">
                <span className="inline-flex items-center gap-1 text-blue-600 font-medium text-sm">
                  Читати далі
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </CardContent>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/news/${news.id}`}>
      <Card className="group overflow-hidden pt-0 transition-all hover:shadow-lg hover:-translate-y-1 h-full">
        <div className="relative aspect-[3/2] overflow-hidden bg-muted">
          {news.image ? (
            <Image
              src={news.image}
              alt={news.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <CoverPlaceholder className="absolute inset-0" />
          )}
        </div>
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
