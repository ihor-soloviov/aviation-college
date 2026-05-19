import nextDynamic from "next/dynamic";
import Hero from "@/components/common/Hero/Hero";
import { NewsGrid } from "@/components/common/NewsGrid";
import { getNewsList } from "@/lib/news";
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
  const rawNews = await getNewsList(4, 0);

  const news = rawNews.map((item) => ({
    id: String(item.id),
    title: item.title,
    excerpt: item.excerpt,
    content: "",
    image: "/placeholder.svg",
    date: new Date(item.add_date).toLocaleDateString("uk-UA", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    category: item.tags ?? "",
    author: "",
  }));

  return (
    <>
      <Hero imgPath="/hero-contact-us.webp" />
      <Suspense>
        <Courses />
      </Suspense>
      <section className="py-16 md:py-24">
        <div className="container mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Останні новини
            </h2>
          </div>
          <NewsGrid news={news} paddingEnabled={false} />
          <div className="text-center">
            <Link href="/news">
              <Button variant="outline" size="lg">
                Всі новини
              </Button>
            </Link>
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
