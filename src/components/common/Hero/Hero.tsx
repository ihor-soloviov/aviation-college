"use client"

import { useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import useParallax from "@/hooks/useParallax"

interface HeroProps {
  imgPath: string
}

const Hero = ({ imgPath }: HeroProps) => {
  const bgRef = useRef<HTMLDivElement>(null)
  const { offsetY } = useParallax(bgRef)

  return (
    <section className="relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 will-change-transform"
        style={{
          transform: `translateY(${offsetY}px)`,
        }}
      >
        <Image
          src={imgPath || "/placeholder.svg"}
          alt="Aviation students with aircraft"
          fill
          className="object-cover transition-transform duration-100"
          priority
          quality={100}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50 dark:bg-black/60" />
      </div>

      <div className="container relative z-10 flex flex-col items-center justify-center space-y-4 py-32 text-center mx-auto md:py-48 lg:py-56">

        <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Авіаційний коледж
        </h1>

        <p className="max-w-[700px] text-lg text-white/90 md:text-xl">
          Більше 70 років традицій авіаційної освіти та незламності в сучасних викликах.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-lg">
            Дізнатися більше
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/80 text-white hover:bg-white hover:text-foreground hover:border-white cursor-pointer backdrop-blur-sm bg-white/10"
          >
            Записатися на навчання
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Hero
