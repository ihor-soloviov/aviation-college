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
  const completionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Завершаем загрузку при изменении маршрута
  useEffect(() => {
    // Очищаем предыдущий таймаут завершения
    if (completionTimeoutRef.current) {
      clearTimeout(completionTimeoutRef.current);
    }

    // Останавливаем интервал прогресса
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Доводим прогресс до 100% и скрываем лоадер
    setProgress(100);
    
    completionTimeoutRef.current = setTimeout(() => {
      setIsLoading(false);
      setProgress(0);
    }, 300);
    
    return () => {
      if (completionTimeoutRef.current) {
        clearTimeout(completionTimeoutRef.current);
      }
    };
  }, [pathname]);

  const startLoading = useCallback(() => {
    // Очищаем предыдущий интервал, если он существует
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setIsLoading(true);
    setProgress(0);

    // Анимация прогресса со случайным увеличением
    let currentProgress = 0;
    intervalRef.current = setInterval(() => {
      const increment = Math.random() * 15;
      const newProgress = currentProgress + increment;
      
      // Гарантируем, что прогресс всегда увеличивается и не превышает 90%
      currentProgress = Math.min(90, newProgress);
      
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

