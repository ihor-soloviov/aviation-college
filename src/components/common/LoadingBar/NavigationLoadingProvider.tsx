"use client";

import React, {
  createContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import { usePathname } from "next/navigation";

interface NavigationLoadingContextType {
  isLoading: boolean;
  progress: number;
  startLoading: () => void;
}

export const NavigationLoadingContext = createContext<NavigationLoadingContextType>({
  isLoading: false,
  progress: 0,
  startLoading: () => {},
});

export function NavigationLoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Сбрасываем загрузку при изменении маршрута
  useEffect(() => {
    setIsLoading(false);
    setProgress(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [pathname]);

  const startLoading = useCallback(() => {
    // Очищаем предыдущий интервал, если он существует
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setIsLoading(true);
    setProgress(0);

    // Анимация прогресса
    let currentProgress = 0;
    intervalRef.current = setInterval(() => {
      currentProgress += Math.random() * 15;
      if (currentProgress >= 90) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setProgress(90);
      } else {
        setProgress(currentProgress);
      }
    }, 100);
  }, []);

  // Перехватываем клики на ссылки
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a[href]");

      if (link) {
        const href = link.getAttribute("href");
        if (href && href.startsWith("/") && !href.startsWith("//")) {
          const url = new URL(href, window.location.origin);
          const currentUrl = new URL(window.location.href);

          // Показываем индикатор только если это переход на другую страницу
          if (url.pathname !== currentUrl.pathname) {
            // Небольшая задержка, чтобы не показывать индикатор при очень быстрых переходах
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
              startLoading();
            }, 100);
          }
        }
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
      clearTimeout(timeoutId);
    };
  }, [startLoading]);

  return (
    <NavigationLoadingContext.Provider
      value={{ isLoading, progress, startLoading }}
    >
      {children}
    </NavigationLoadingContext.Provider>
  );
}

