"use client";

import { useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Scale,
  FileText,
  ExternalLink,
  BookOpen,
  Users,
  Shield,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const regulationUrl = "http://kk.nau.edu.ua/article/3898";

const keyPoints = [
  {
    icon: BookOpen,
    title: "Освітній процес",
    description: "Дотримання правил організації навчання та відвідування занять",
  },
  {
    icon: Users,
    title: "Взаємоповага",
    description: "Етичне ставлення до викладачів, співробітників та інших здобувачів",
  },
  {
    icon: Shield,
    title: "Безпека",
    description: "Дотримання правил внутрішнього розпорядку та техніки безпеки",
  },
  {
    icon: CheckCircle2,
    title: "Академічна доброчесність",
    description: "Чесність у навчанні та дослідницькій діяльності",
  },
];

export const CodeOfConductPage = () => {
  const openInNewTab = useCallback((url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <Card className="overflow-hidden border-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950/30 dark:via-teal-950/20 dark:to-cyan-950/10">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Scale className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                  Правила поведінки здобувача освіти
                </h2>
              </div>
              <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
                Правила поведінки визначають основні норми та стандарти поведінки
                здобувачів освіти в закладі, спрямовані на створення безпечного
                та сприятливого освітнього середовища.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Document Card */}
      <button
        onClick={() => openInNewTab(regulationUrl)}
        className="group w-full text-left"
      >
        <Card
          className={cn(
            "overflow-hidden transition-all duration-300",
            "hover:shadow-lg hover:border-emerald-500/50"
          )}
        >
          <div className="h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500" />
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="shrink-0 rounded-xl bg-emerald-100 p-4 text-emerald-600 transition-transform duration-300 group-hover:scale-110 dark:bg-emerald-900/30 dark:text-emerald-400">
                <FileText className="h-10 w-10" />
              </div>
              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-semibold text-foreground sm:text-xl">
                    Правила поведінки здобувача освіти в закладі освіти
                  </h3>
                  <ExternalLink className="h-5 w-5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Повний текст правил поведінки для здобувачів освіти
                  Криворізького фахового коледжу НАУ. Документ містить вимоги
                  щодо поведінки під час освітнього процесу, на території
                  закладу та у гуртожитках.
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <Badge variant="secondary">Офіційний документ</Badge>
                  <Badge
                    variant="outline"
                    className="gap-1 text-emerald-600 dark:text-emerald-400"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Відкрити на сайті
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </button>

      {/* Key Points */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-emerald-500" />
          <h2 className="text-lg font-semibold text-foreground">
            Основні засади
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {keyPoints.map((point, index) => (
            <Card
              key={point.title}
              className={cn(
                "overflow-hidden transition-all duration-300 hover:shadow-md",
                "animate-in fade-in slide-in-from-bottom-4"
              )}
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: "backwards",
              }}
            >
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 rounded-lg bg-emerald-100 p-2 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                    <point.icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-foreground">
                      {point.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {point.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Info Banner */}
      <Card className="border-emerald-200 bg-emerald-50/50 dark:border-emerald-800/50 dark:bg-emerald-950/20">
        <CardContent className="flex items-start gap-4 p-5">
          <div className="shrink-0 rounded-full bg-emerald-100 p-2 dark:bg-emerald-900/50">
            <Scale className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="space-y-1">
            <p className="font-medium text-foreground">
              Дотримання правил поведінки
            </p>
            <p className="text-sm text-muted-foreground">
              Здобувачі освіти зобов&apos;язані ознайомитися з правилами
              поведінки та дотримуватися їх протягом усього періоду навчання. За
              порушення правил передбачена дисциплінарна відповідальність
              відповідно до чинного законодавства.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
