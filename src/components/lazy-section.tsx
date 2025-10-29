"use client"
import type React from "react"
import { Suspense, lazy } from "react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { cn } from "@/lib/utils"

type AnimationType = "fadeIn" | "slideUp" | "slideInLeft" | "slideInRight" | "scaleIn" | "none"

interface LazySectionProps {
  children?: React.ReactNode
  component?: () => Promise<{ default: React.ComponentType<unknown> }>
  componentProps?: unknown
  animation?: AnimationType
  delay?: number
  duration?: number
  className?: string
  threshold?: number
  rootMargin?: string
  fallback?: React.ReactNode
}

const animationClasses = {
  fadeIn: {
    initial: "opacity-0",
    animate: "opacity-100",
    transition: "transition-opacity duration-700 ease-out",
  },
  slideUp: {
    initial: "opacity-0 translate-y-8",
    animate: "opacity-100 translate-y-0",
    transition: "transition-all duration-700 ease-out",
  },
  slideInLeft: {
    initial: "opacity-0 -translate-x-8",
    animate: "opacity-100 translate-x-0",
    transition: "transition-all duration-700 ease-out",
  },
  slideInRight: {
    initial: "opacity-0 translate-x-8",
    animate: "opacity-100 translate-x-0",
    transition: "transition-all duration-700 ease-out",
  },
  scaleIn: {
    initial: "opacity-0 scale-95",
    animate: "opacity-100 scale-100",
    transition: "transition-all duration-700 ease-out",
  },
  none: {
    initial: "",
    animate: "",
    transition: "",
  },
}

// Fallback компонент для завантаження
function SectionSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  )
}

export function LazySection({
  children,
  component,
  componentProps = {},
  animation = "slideUp",
  delay = 0,
  duration = 700,
  className,
  threshold = 0.1,
  rootMargin = "100px",
  fallback = <SectionSkeleton />,
}: LazySectionProps) {
  const { ref, isVisible } = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce: true,
  })

  const animConfig = animationClasses[animation]

  // Динамічно завантажуємо компонент тільки коли він стає видимим
  const LazyComponent = component && isVisible ? lazy(component) : null

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(animConfig.transition, isVisible ? animConfig.animate : animConfig.initial, className)}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
      }}
    >
      {component && LazyComponent ? (
        <Suspense fallback={fallback}>
          <LazyComponent {...(componentProps as Record<string, unknown>)} />
        </Suspense>
      ) : (
        children
      )}
    </div>
  )
}
