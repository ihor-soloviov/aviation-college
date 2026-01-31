"use client";

import { useContext } from "react";
import { NavigationLoadingContext } from "./NavigationLoadingProvider";

export function LoadingBar() {
  const { isLoading, progress } = useContext(NavigationLoadingContext);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 h-1 bg-transparent pointer-events-none transition-opacity duration-300 ${
        isLoading ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className="h-full bg-blue-600 transition-all duration-200 ease-out shadow-sm"
        style={{
          width: `${progress}%`,
        }}
      />
    </div>
  );
}

