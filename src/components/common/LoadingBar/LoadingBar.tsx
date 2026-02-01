"use client";

import { useContext } from "react";
import { Plane } from "lucide-react";
import { NavigationLoadingContext } from "./NavigationLoadingProvider";
import { cn } from "@/lib/utils";

export function LoadingBar() {
  const { isLoading, progress } = useContext(NavigationLoadingContext);

  return (
    <>
      {/* Progress bar at top */}
      <div
        className={cn(
          "fixed left-0 right-0 top-0 z-50 h-1 pointer-events-none transition-opacity duration-300",
          isLoading ? "opacity-100" : "opacity-0"
        )}
      >
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 shadow-sm shadow-blue-500/50 transition-all duration-200 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Fullscreen airplane loader overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[100] flex items-center justify-center transition-all duration-500",
          isLoading ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-background/90 backdrop-blur-md" />
        
        {/* Animated sky gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-blue-600/5" />
        
        {/* Floating clouds background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-cloud-float rounded-full bg-blue-200/20 dark:bg-blue-400/10"
              style={{
                width: `${80 + i * 30}px`,
                height: `${30 + i * 10}px`,
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${8 + i * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="relative flex flex-col items-center gap-8">
          {/* Main airplane container */}
          <div className="relative">
            {/* Circular orbit path */}
            <div className="absolute -inset-12 animate-spin-slow">
              <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-blue-400/40" />
              <div className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-blue-300/30" />
              <div className="absolute left-0 top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-blue-400/20" />
              <div className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-blue-300/25" />
            </div>

            {/* Pulsing rings */}
            <div className="absolute -inset-8 animate-ping-slow rounded-full border border-blue-500/20" />
            <div className="absolute -inset-12 animate-ping-slower rounded-full border border-blue-400/10" />
            <div className="absolute -inset-16 animate-ping-slowest rounded-full border border-blue-300/5" />

            {/* Inner glow circle */}
            <div className="absolute -inset-4 animate-pulse rounded-full bg-gradient-to-r from-blue-500/20 via-blue-400/10 to-blue-600/20 blur-xl" />

            {/* Airplane with complex animation */}
            <div className="relative animate-plane-complex">
              {/* Trail particles */}
              <div className="absolute -left-8 top-1/2 -translate-y-1/2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute animate-trail-particle rounded-full bg-blue-500"
                    style={{
                      width: `${6 - i}px`,
                      height: `${6 - i}px`,
                      left: `${-i * 8}px`,
                      opacity: 0.6 - i * 0.1,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>

              {/* Main plane icon */}
              <div className="relative">
                <Plane className="h-14 w-14 text-blue-600 drop-shadow-lg dark:text-blue-400" />
                
                {/* Glow effect behind plane */}
                <div className="absolute inset-0 -z-10 animate-pulse">
                  <Plane className="h-14 w-14 text-blue-500/50 blur-md" />
                </div>
                
                {/* Sparkle effects */}
                <div className="absolute -right-1 -top-1 h-2 w-2 animate-sparkle rounded-full bg-white" />
                <div className="absolute -bottom-1 -left-1 h-1.5 w-1.5 animate-sparkle-delayed rounded-full bg-blue-300" />
              </div>
            </div>
          </div>

          {/* Loading text and progress */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-foreground">
                Авіаційний коледж
              </span>
            </div>
            
            {/* Progress bar */}
            <div className="h-1.5 w-48 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <p className="text-sm text-muted-foreground">
              Завантаження...
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

