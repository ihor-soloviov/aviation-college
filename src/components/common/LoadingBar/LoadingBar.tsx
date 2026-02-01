"use client";

import { useContext } from "react";
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
          "fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm transition-all duration-500",
          isLoading ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="relative flex flex-col items-center gap-6">
          {/* Airplane with flight animation */}
          <div className="relative">
            {/* Trail effect */}
            <div className={cn(
              "absolute -left-16 top-1/2 -translate-y-1/2 flex gap-1 transition-opacity duration-300",
              isLoading ? "opacity-100" : "opacity-0"
            )}>
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-0.5 rounded-full bg-primary/30"
                  style={{
                    width: `${(4 - i) * 8}px`,
                    animationDelay: `${i * 100}ms`,
                    opacity: 1 - i * 0.2,
                  }}
                />
              ))}
            </div>

            {/* Airplane SVG */}
            <div
              className={cn(
                "relative transition-transform duration-300",
                isLoading && "animate-plane-fly"
              )}
            >
              <svg
                viewBox="0 0 64 64"
                className="h-16 w-16 text-primary drop-shadow-lg"
                fill="currentColor"
              >
                <path d="M62.5 10.5c-1.3-1.3-3.4-1.3-4.7 0L44.1 24.2l-19.3-7.7c-.4-.2-.9-.1-1.2.2l-3.5 3.5c-.4.4-.4 1.1.1 1.4l14.1 9.4-8.5 8.5-6.3-1.6c-.4-.1-.8 0-1.1.3l-2.8 2.8c-.4.4-.3 1 .1 1.3l7.8 3.9 3.9 7.8c.3.5.9.6 1.3.1l2.8-2.8c.3-.3.4-.7.3-1.1l-1.6-6.3 8.5-8.5 9.4 14.1c.3.4 1 .5 1.4.1l3.5-3.5c.3-.3.4-.8.2-1.2l-7.7-19.3 13.7-13.7c1.3-1.3 1.3-3.4 0-4.7z" />
              </svg>
              
              {/* Glow effect */}
              <div className="absolute inset-0 -z-10 animate-pulse blur-xl">
                <svg
                  viewBox="0 0 64 64"
                  className="h-16 w-16 text-primary/30"
                  fill="currentColor"
                >
                  <path d="M62.5 10.5c-1.3-1.3-3.4-1.3-4.7 0L44.1 24.2l-19.3-7.7c-.4-.2-.9-.1-1.2.2l-3.5 3.5c-.4.4-.4 1.1.1 1.4l14.1 9.4-8.5 8.5-6.3-1.6c-.4-.1-.8 0-1.1.3l-2.8 2.8c-.4.4-.3 1 .1 1.3l7.8 3.9 3.9 7.8c.3.5.9.6 1.3.1l2.8-2.8c.3-.3.4-.7.3-1.1l-1.6-6.3 8.5-8.5 9.4 14.1c.3.4 1 .5 1.4.1l3.5-3.5c.3-.3.4-.8.2-1.2l-7.7-19.3 13.7-13.7c1.3-1.3 1.3-3.4 0-4.7z" />
                </svg>
              </div>
            </div>

            {/* Clouds decoration */}
            <div className="absolute -right-8 -top-4 animate-cloud-1">
              <div className="h-2 w-6 rounded-full bg-muted-foreground/10" />
            </div>
            <div className="absolute -right-12 top-2 animate-cloud-2">
              <div className="h-1.5 w-4 rounded-full bg-muted-foreground/10" />
            </div>
          </div>

          {/* Loading text */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm font-medium text-muted-foreground">
              Завантаження...
            </p>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary"
                  style={{ animationDelay: `${i * 150}ms` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

