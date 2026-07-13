import nextDynamic from "next/dynamic";
import Hero from "@/components/common/Hero/Hero";
import { NewsCard } from "@/components/common/NewsCard/NewsCard";
import { getPayloadNewsList } from "@/lib/payload-news";
import { getPayloadCourses } from "@/lib/payload-courses";
import { isUnavailable } from "@/lib/data-result";
import { DataUnavailable } from "@/components/common/DataUnavailable/DataUnavailable";
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
  const [newsResult, coursesResult] = await Promise.all([
    getPayloadNewsList({ limit: 4, offset: 0 }),
    getPayloadCourses(),
  ]);

  const news = isUnavailable(newsResult) ? null : newsResult.items;
  const courses = isUnavailable(coursesResult) ? null : coursesResult;

  return (
    <>
      <Hero imgPath="/hero-contact-us.webp" />
      {courses ? (
        <Suspense>
          <Courses courses={courses} />
        </Suspense>
      ) : (
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <DataUnavailable
              variant="inline"
              title="Освітні програми тимчасово недоступні"
            />
          </div>
        </section>
      )}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Останні новини
            </h2>
          </div>
          <div className="rounded-xl border bg-card/30 p-4 sm:p-6 md:p-8 space-y-6">
            {news ? (
              <div className="flex flex-col gap-4">
                {news.map((item) => (
                  <NewsCard key={item.id} news={item} variant="wide" />
                ))}
              </div>
            ) : (
              <DataUnavailable
                variant="inline"
                title="Новини тимчасово недоступні"
              />
            )}
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
