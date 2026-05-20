import nextDynamic from "next/dynamic";
import Hero from "@/components/common/Hero/Hero";
import { NewsCard } from "@/components/common/NewsCard/NewsCard";
import { getMergedNewsList } from "@/lib/payload-news";
import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

const Courses = nextDynamic(() => import("@/components/Home/Courses/Courses"), {
  ssr: true,
});
const Benefits = nextDynamic(() => import("@/components/Home/Benefits/Benefits"), {
  ssr: true,
});
const Students = nextDynamic(() => import("@/components/Home/Students/Students"), {
  ssr: true,
});
const CTA = nextDynamic(() => import("@/components/Home/CTA/CTA"), { ssr: true });
const Partners = nextDynamic(() => import("@/components/Home/Partners/Partners"), {
  ssr: true,
});

export default async function HomePage() {
  const merged = await getMergedNewsList(4);

  const news = merged.map((item) => ({
    id: item.href.replace("/news/", ""),
    title: item.title,
    excerpt: item.excerpt,
    content: "",
    image: item.imageUrl,
    date: item.publishedAt.toLocaleDateString("uk-UA", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    category: item.tags.join(" · "),
    author: "",
  }));

  return (
    <>
      <Hero imgPath="/hero-contact-us.webp" />
      <Suspense>
        <Courses />
      </Suspense>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Останні новини
            </h2>
          </div>
          <div className="rounded-xl border bg-card/30 p-4 sm:p-6 md:p-8 space-y-6">
            <div className="flex flex-col gap-4">
              {news.map((item) => (
                <NewsCard key={item.id} news={item} variant="wide" />
              ))}
            </div>
            <div className="text-center">
              <Link href="/news">
                <Button variant="outline" size="lg">
                  Всі новини
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Benefits />
      <Students />
      <CTA />
      <Partners />
    </>
  );
}
