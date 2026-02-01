"use client";

import { useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  GraduationCap,
  ExternalLink,
  Sparkles,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { catalogUrl } from "./data";

export const ElectiveCoursesPage = () => {
  const openInNewTab = useCallback((url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <Card className="overflow-hidden border-0 bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-violet-950/30 dark:via-purple-950/20 dark:to-indigo-950/10">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                  Каталог дисциплін за вибором
                </h2>
              </div>
              <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
                Здобувачі освіти мають право обирати навчальні дисципліни в
                межах, передбачених освітньою програмою та навчальним планом.
                Вибіркові дисципліни дозволяють поглибити знання у вибраному
                напрямку.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <div className="flex items-center gap-2 rounded-lg bg-white/80 px-4 py-2 dark:bg-white/10">
                <Sparkles className="h-5 w-5 text-violet-600" />
                <div>
                  <p className="text-lg font-bold text-foreground">25%</p>
                  <p className="text-xs text-muted-foreground">
                    Вибіркових дисциплін
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-white/80 px-4 py-2 dark:bg-white/10">
                <GraduationCap className="h-5 w-5 text-violet-600" />
                <div>
                  <p className="text-lg font-bold text-foreground">8</p>
                  <p className="text-xs text-muted-foreground">Спеціальностей</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main CTA Card */}
      <button
        onClick={() => openInNewTab(catalogUrl)}
        className="group w-full text-left"
      >
        <Card
          className={cn(
            "overflow-hidden transition-all duration-300",
            "hover:shadow-lg hover:border-violet-500/50",
            "animate-in fade-in slide-in-from-bottom-4"
          )}
        >
          <div className="h-1.5 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500" />
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="shrink-0 rounded-xl bg-violet-100 p-4 text-violet-600 transition-transform duration-300 group-hover:scale-110 dark:bg-violet-900/30 dark:text-violet-400">
                <FileText className="h-10 w-10" />
              </div>
              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-xl font-semibold text-foreground">
                    Повний каталог дисциплін за вибором 2025/2026
                  </h3>
                  <ExternalLink className="h-5 w-5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <p className="text-muted-foreground">
                  Перегляньте повний перелік дисциплін за вибором для всіх
                  спеціальностей на 2025/2026 навчальний рік
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <Badge
                    variant="default"
                    className="bg-violet-600 hover:bg-violet-700"
                  >
                    Актуально
                  </Badge>
                  <Badge variant="secondary">PDF документ</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </button>

      {/* Info Banner */}
      <Card className="border-violet-200 bg-violet-50/50 dark:border-violet-800/50 dark:bg-violet-950/20">
        <CardContent className="flex items-start gap-4 p-5">
          <div className="shrink-0 rounded-full bg-violet-100 p-2 dark:bg-violet-900/50">
            <BookOpen className="h-5 w-5 text-violet-600 dark:text-violet-400" />
          </div>
          <div className="space-y-1">
            <p className="font-medium text-foreground">
              Як обрати дисципліни?
            </p>
            <p className="text-sm text-muted-foreground">
              Вибір дисциплін здійснюється на початку навчального року через
              електронну систему або шляхом подання заяви до навчального відділу.
              Обрані дисципліни стають обов&apos;язковими для вивчення протягом
              відповідного семестру.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
