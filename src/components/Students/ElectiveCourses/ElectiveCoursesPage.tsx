"use client";

import { useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  GraduationCap,
  ExternalLink,
  Sparkles,
  Code,
  Cpu,
  Zap,
  Plane,
  Settings,
  Truck,
  Briefcase,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { specialties, sampleCourses, catalogUrl } from "./data";

const getSpecialtyIcon = (code: string) => {
  if (code.includes("121")) return Code;
  if (code.includes("123")) return Cpu;
  if (code.includes("141")) return Zap;
  if (code.includes("173") || code.includes("272")) return Plane;
  if (code.includes("174")) return Settings;
  if (code.includes("275")) return Truck;
  if (code.includes("D3")) return Briefcase;
  return BookOpen;
};

const getColorClasses = (color: string) => {
  const colors: Record<string, { bg: string; text: string; border: string }> = {
    blue: {
      bg: "bg-blue-100 dark:bg-blue-900/30",
      text: "text-blue-600 dark:text-blue-400",
      border: "border-blue-500/50",
    },
    purple: {
      bg: "bg-purple-100 dark:bg-purple-900/30",
      text: "text-purple-600 dark:text-purple-400",
      border: "border-purple-500/50",
    },
    orange: {
      bg: "bg-orange-100 dark:bg-orange-900/30",
      text: "text-orange-600 dark:text-orange-400",
      border: "border-orange-500/50",
    },
    cyan: {
      bg: "bg-cyan-100 dark:bg-cyan-900/30",
      text: "text-cyan-600 dark:text-cyan-400",
      border: "border-cyan-500/50",
    },
    green: {
      bg: "bg-green-100 dark:bg-green-900/30",
      text: "text-green-600 dark:text-green-400",
      border: "border-green-500/50",
    },
    red: {
      bg: "bg-red-100 dark:bg-red-900/30",
      text: "text-red-600 dark:text-red-400",
      border: "border-red-500/50",
    },
  };
  return colors[color] || colors.blue;
};

export const ElectiveCoursesPage = () => {
  const openInNewTab = useCallback((url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  return (
    <div className="space-y-10">
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

      {/* Specialties Grid */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-primary" />
          <h2 className="text-lg font-semibold text-foreground">
            Спеціальності
          </h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {specialties.map((specialty, index) => {
            const Icon = getSpecialtyIcon(specialty.code);
            const colors = getColorClasses(specialty.color);
            return (
              <Card
                key={specialty.id}
                className={cn(
                  "group overflow-hidden transition-all duration-300 hover:shadow-md",
                  "animate-in fade-in slide-in-from-bottom-4"
                )}
                style={{
                  animationDelay: `${index * 50}ms`,
                  animationFillMode: "backwards",
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "shrink-0 rounded-lg p-2 transition-transform duration-300 group-hover:scale-110",
                        colors.bg,
                        colors.text
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1 space-y-1">
                      <Badge variant="outline" className="text-xs">
                        {specialty.code}
                      </Badge>
                      <p className="text-sm font-medium leading-tight text-foreground">
                        {specialty.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {specialty.level}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Sample Courses Preview */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-muted-foreground" />
          <h2 className="text-lg font-semibold text-foreground">
            Приклади дисциплін за вибором
          </h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {sampleCourses.map((catalog, index) => {
            const Icon = getSpecialtyIcon(catalog.specialty.code);
            const colors = getColorClasses(catalog.specialty.color);
            return (
              <Card
                key={catalog.specialty.id}
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  "animate-in fade-in slide-in-from-bottom-4"
                )}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: "backwards",
                }}
              >
                <div
                  className={cn(
                    "flex items-center gap-3 border-b p-4",
                    colors.bg
                  )}
                >
                  <div className={cn("rounded-lg bg-white/80 p-2", colors.text)}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <Badge variant="secondary" className="mb-1">
                      {catalog.specialty.code}
                    </Badge>
                    <p className="truncate text-sm font-semibold text-foreground">
                      {catalog.specialty.name}
                    </p>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {catalog.semesters.slice(0, 2).map((sem) => (
                      <div key={sem.semester} className="space-y-1.5">
                        <p className="text-xs font-medium text-muted-foreground">
                          Семестр {sem.semester}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {sem.courses.slice(0, 2).map((course) => (
                            <Badge
                              key={course}
                              variant="outline"
                              className="text-xs"
                            >
                              {course.length > 25
                                ? course.slice(0, 25) + "..."
                                : course}
                            </Badge>
                          ))}
                          {sem.courses.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{sem.courses.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                    {catalog.semesters.length > 2 && (
                      <p className="text-xs text-muted-foreground">
                        та ще {catalog.semesters.length - 2} семестри...
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* View Full Catalog Button */}
      <div className="flex justify-center">
        <Button
          size="lg"
          onClick={() => openInNewTab(catalogUrl)}
          className="gap-2 bg-violet-600 hover:bg-violet-700"
        >
          <FileText className="h-5 w-5" />
          Переглянути повний каталог
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>

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
