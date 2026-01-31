"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function useNavigationLoading() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Сбрасываем загрузку при изменении маршрута
    setIsLoading(false);
  }, [pathname, searchParams]);

  const startLoading = () => {
    setIsLoading(true);
  };

  return { isLoading, startLoading };
}

