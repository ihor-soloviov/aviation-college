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
          className="h-full bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 shadow-sm shadow-indigo-600/50 dark:from-blue-500 dark:via-blue-600 dark:to-blue-500 dark:shadow-blue-500/50 transition-all duration-200 ease-out"
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
        {/* Animated background - more contrast in light mode */}
        <div className="absolute inset-0 bg-slate-50/95 backdrop-blur-md dark:bg-background/90" />
        
        {/* Animated sky gradient overlay - deeper colors for light mode */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/8 via-transparent to-slate-400/8 dark:from-blue-500/5 dark:via-transparent dark:to-blue-600/5" />
        
        {/* Floating clouds background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-cloud-float rounded-full bg-slate-300/40 dark:bg-blue-400/10"
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
              <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-indigo-500/50 dark:bg-blue-400/40" />
              <div className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-indigo-400/40 dark:bg-blue-300/30" />
              <div className="absolute left-0 top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-indigo-500/30 dark:bg-blue-400/20" />
              <div className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-indigo-400/35 dark:bg-blue-300/25" />
            </div>

            {/* Pulsing rings - stronger in light mode */}
            <div className="absolute -inset-8 animate-ping-slow rounded-full border border-indigo-500/30 dark:border-blue-500/20" />
            <div className="absolute -inset-12 animate-ping-slower rounded-full border border-indigo-400/20 dark:border-blue-400/10" />
            <div className="absolute -inset-16 animate-ping-slowest rounded-full border border-indigo-300/10 dark:border-blue-300/5" />

            {/* Inner glow circle */}
            <div className="absolute -inset-4 animate-pulse rounded-full bg-gradient-to-r from-indigo-500/25 via-blue-500/15 to-indigo-600/25 blur-xl dark:from-blue-500/20 dark:via-blue-400/10 dark:to-blue-600/20" />

            {/* Airplane with complex animation */}
            <div className="relative animate-plane-complex">
              {/* Trail particles - stronger in light mode */}
              <div className="absolute -left-8 top-1/2 -translate-y-1/2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute animate-trail-particle rounded-full bg-indigo-600 dark:bg-blue-500"
                    style={{
                      width: `${6 - i}px`,
                      height: `${6 - i}px`,
                      left: `${-i * 8}px`,
                      opacity: 0.7 - i * 0.12,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>

              {/* Main plane icon - darker for light mode */}
              <div className="relative">
                <Plane className="h-14 w-14 text-indigo-700 drop-shadow-lg dark:text-blue-400" />
                
                {/* Glow effect behind plane */}
                <div className="absolute inset-0 -z-10 animate-pulse">
                  <Plane className="h-14 w-14 text-indigo-500/60 blur-md dark:text-blue-500/50" />
                </div>
                
                {/* Sparkle effects */}
                <div className="absolute -right-1 -top-1 h-2 w-2 animate-sparkle rounded-full bg-indigo-200 dark:bg-white" />
                <div className="absolute -bottom-1 -left-1 h-1.5 w-1.5 animate-sparkle-delayed rounded-full bg-indigo-400 dark:bg-blue-300" />
              </div>
            </div>
          </div>

          {/* Loading text and progress */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-slate-800 dark:text-foreground">
                Авіаційний коледж
              </span>
            </div>
            
            {/* Progress bar - better contrast in light mode */}
            <div className="h-1.5 w-48 overflow-hidden rounded-full bg-slate-200 dark:bg-muted">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-blue-500 dark:to-blue-600 transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <p className="text-sm text-slate-600 dark:text-muted-foreground">
              Завантаження...
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

