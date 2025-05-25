"use client"

import React, { useEffect, useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface HeroProps {
  imgPath: string
}

const Hero = ({ imgPath }: HeroProps) => {
  const bgRef = useRef<HTMLDivElement>(null)
  const [offsetY, setOffsetY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!bgRef.current) return
      const scrollY = window.scrollY
      const speed = 0.4 // Паралакс-швидкість: менше — сильніше відставання
      setOffsetY(scrollY * speed)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="relative overflow-hidden">
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 will-change-transform"
        style={{
          transform: `translateY(${offsetY}px)`,
        }}
      >
        <Image
          src={imgPath}
          alt="Aviation students with aircraft"
          fill
          className="object-cover brightness-[0.7] transition-transform duration-100"
          priority
          quality={100}
        />
      </div>

      <div className="container relative z-10 flex flex-col items-center justify-center space-y-4 py-32 text-center text-white md:py-48 lg:py-56 mx-auto">
        <Badge className="bg-blue-600 hover:bg-blue-600">Enrollment Open for Fall 2025</Badge>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Авіаційний коледж
        </h1>
        <p className="max-w-[700px] text-lg text-white/90 md:text-xl">
          Світові класи навчальні програми, стан-оф-а-т-арні навчальні прилади, і промислові зв'язки для запуску вашої
          aviation career.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 cursor-pointer">
            Explore Programs
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-blue-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 cursor-pointer"
          >
            Schedule a Tour
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Hero
