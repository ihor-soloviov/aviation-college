import Benefits from "@/components/Home/Benefits/Benefits";
import Courses from "@/components/Home/Courses/Courses";
import CTA from "@/components/Home/CTA/CTA";
import Partners from "@/components/Home/Partners/Partners";
import Students from "@/components/Home/Students/Students";
import Hero from "@/components/common/Hero/Hero"; 
import { NewsGrid } from "@/components/common/NewsGrid";
import { newsData } from "@/lib/news-data-template";

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
