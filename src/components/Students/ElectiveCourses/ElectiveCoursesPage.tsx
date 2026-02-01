"use client";

import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  GraduationCap,
  Clock,
  FileText,
  ExternalLink,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { electiveCatalogs, catalogDocuments } from "./data";

export const ElectiveCoursesPage = () => {
  const [activeYear, setActiveYear] = useState(electiveCatalogs[0].id);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set([electiveCatalogs[0].categories[0]?.id])
  );

  const openPdfInNewTab = useCallback((url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  const toggleCategory = useCallback((categoryId: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  }, []);

  const activeYearData = electiveCatalogs.find((y) => y.id === activeYear);

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
                Здобувачі освіти мають право обирати навчальні дисципліни в межах,
                передбачених освітньою програмою та навчальним планом. Вибіркові
                дисципліни дозволяють поглибити знання у вибраному напрямку.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2 rounded-lg bg-white/80 px-4 py-2 dark:bg-white/10">
              <Sparkles className="h-5 w-5 text-violet-600" />
              <div>
                <p className="text-lg font-bold text-foreground">25%</p>
                <p className="text-xs text-muted-foreground">
                  Вибіркових дисциплін
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Year Tabs */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-primary" />
          <h2 className="text-lg font-semibold text-foreground">
            Навчальний рік
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {electiveCatalogs.map((catalog) => (
            <Button
              key={catalog.id}
              variant={activeYear === catalog.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveYear(catalog.id)}
              className={cn(
                "transition-all",
                activeYear === catalog.id &&
                  "bg-violet-600 hover:bg-violet-700 dark:bg-violet-600"
              )}
            >
              {catalog.year}
              {catalog.id === electiveCatalogs[0].id && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  Актуальний
                </Badge>
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Categories */}
      {activeYearData && (
        <div className="space-y-4">
          {activeYearData.categories.map((category, catIndex) => (
            <Card
              key={category.id}
              className={cn(
                "overflow-hidden transition-all duration-300",
                "animate-in fade-in slide-in-from-bottom-4"
              )}
              style={{
                animationDelay: `${catIndex * 100}ms`,
                animationFillMode: "backwards",
              }}
            >
              <button
                onClick={() => toggleCategory(category.id)}
                className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-muted/50"
              >
                <div className="space-y-1">
                  <h3 className="font-semibold text-foreground">
                    {category.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">
                    {category.courses.length} дисциплін
                  </Badge>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 text-muted-foreground transition-transform",
                      expandedCategories.has(category.id) && "rotate-180"
                    )}
                  />
                </div>
              </button>

              {expandedCategories.has(category.id) && (
                <CardContent className="border-t bg-muted/20 p-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {category.courses.map((course, index) => (
                      <div
                        key={course.id}
                        className={cn(
                          "group rounded-lg border bg-background p-4 transition-all duration-200",
                          "hover:border-violet-500/50 hover:shadow-sm",
                          "animate-in fade-in slide-in-from-bottom-2"
                        )}
                        style={{
                          animationDelay: `${index * 50}ms`,
                          animationFillMode: "backwards",
                        }}
                      >
                        <div className="space-y-2">
                          <h4 className="font-medium leading-tight text-foreground">
                            {course.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {course.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="gap-1 text-xs">
                              <GraduationCap className="h-3 w-3" />
                              {course.credits} кредитів
                            </Badge>
                            <Badge variant="outline" className="gap-1 text-xs">
                              <Clock className="h-3 w-3" />
                              {course.semester} сем.
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {course.specialty}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Documents */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-muted-foreground" />
          <h2 className="text-lg font-semibold text-foreground">
            Завантажити каталог
          </h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {catalogDocuments.map((doc, index) => (
            <Button
              key={doc.id}
              variant="outline"
              className={cn(
                "group h-auto justify-start gap-3 p-4 text-left transition-all duration-200",
                "hover:border-violet-500/50 hover:bg-violet-50/50 dark:hover:bg-violet-950/20",
                "animate-in fade-in slide-in-from-bottom-2"
              )}
              style={{
                animationDelay: `${index * 50}ms`,
                animationFillMode: "backwards",
              }}
              onClick={() => openPdfInNewTab(doc.pdfUrl)}
            >
              <div className="shrink-0 rounded-lg bg-red-100 p-2 text-red-600 transition-colors group-hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400">
                <FileText className="h-5 w-5" />
              </div>
              <span className="min-w-0 flex-1 truncate font-medium">
                {doc.title}
              </span>
              <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </Button>
          ))}
        </div>
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
              Обрані дисципліни стають обов'язковими для вивчення.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
