import dynamic from "next/dynamic";
import Hero from "@/components/common/Hero/Hero"; 
import { NewsGrid } from "@/components/common/NewsGrid";
import { newsData } from "@/lib/news-data-template";

const Courses = dynamic(() => import("@/components/Home/Courses/Courses"), { ssr: true });
const Benefits = dynamic(() => import("@/components/Home/Benefits/Benefits"), { ssr: true });
const Students = dynamic(() => import("@/components/Home/Students/Students"), { ssr: true });
const CTA = dynamic(() => import("@/components/Home/CTA/CTA"), { ssr: true });
const Partners = dynamic(() => import("@/components/Home/Partners/Partners"), { ssr: true });

export default function HomePage() {
  return (
    <>
      <Hero imgPath="/hero-home.webp" />
      <Courses />
      <NewsGrid news={newsData} variant="compact" maxItems={3} />
      <Benefits />
      <Students />
      <CTA />
      <Partners />
    </>
  )
}
