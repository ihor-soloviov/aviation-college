import Benefits from "@/components/Home/Benefits/Benefits";
import Courses from "@/components/Home/Courses/Courses";
import CTA from "@/components/Home/CTA/CTA";
import Partners from "@/components/Home/Partners/Partners";
import Students from "@/components/Home/Students/Students";
import Hero from "@/components/common/Hero/Hero"; 

export default function HomePage() {
  return (
    <>
      <Hero imgPath="/hero-home.webp" />
      <Courses />
      <Benefits />
      <Students />
      <CTA />
      <Partners />
    </>
  )
}
