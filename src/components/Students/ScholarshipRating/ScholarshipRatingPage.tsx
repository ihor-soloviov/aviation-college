"use client";

import { useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Trophy,
  FileText,
  GraduationCap,
  Plane,
  Monitor,
  Truck,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

const mainPageUrl = "http://kk.nau.edu.ua/article/112";

const departments = [
  {
    id: "transport",
    title: "Відділення «Транспортні технології»",
    icon: Truck,
    color: "blue",
    semesters: [
      {
        year: "2025-2026 н.р.",
        items: [
          { title: "І семестр", url: "http://kk.nau.edu.ua/article/4789" },
          { title: "ІІ семестр", url: "http://kk.nau.edu.ua/article/4790" },
        ],
      },
      {
        year: "2024-2025 н.р.",
        items: [
          { title: "І семестр", url: "http://kk.nau.edu.ua/article/4311" },
          { title: "ІІ семестр", url: "http://kk.nau.edu.ua/article/4550" },
        ],
      },
    ],
  },
  {
    id: "aviation",
    title: "Відділення «Експлуатації та ремонту авіатехніки»",
    icon: Plane,
    color: "purple",
    semesters: [
      {
        year: "2025-2026 н.р.",
        items: [
          { title: "І семестр", url: "http://kk.nau.edu.ua/article/4791" },
          { title: "ІІ семестр", url: "http://kk.nau.edu.ua/article/4792" },
        ],
      },
      {
        year: "2024-2025 н.р.",
        items: [
          { title: "І семестр", url: "http://kk.nau.edu.ua/article/4312" },
          { title: "ІІ семестр", url: "http://kk.nau.edu.ua/article/4551" },
        ],
      },
    ],
  },
  {
    id: "computer",
    title: "Відділення «Комп'ютерна і програмна інженерія»",
    icon: Monitor,
    color: "green",
    semesters: [
      {
        year: "2025-2026 н.р.",
        items: [
          { title: "І семестр", url: "http://kk.nau.edu.ua/article/4793" },
          { title: "ІІ семестр", url: "http://kk.nau.edu.ua/article/4794" },
        ],
      },
      {
        year: "2024-2025 н.р.",
        items: [
          { title: "І семестр", url: "http://kk.nau.edu.ua/article/4313" },
          { title: "ІІ семестр", url: "http://kk.nau.edu.ua/article/4552" },
        ],
      },
    ],
  },
  {
    id: "general",
    title: "Відділення «Загальноосвітня підготовка»",
    icon: BookOpen,
    color: "orange",
    semesters: [
      {
        year: "2025-2026 н.р.",
        items: [
          { title: "І курс", url: "http://kk.nau.edu.ua/article/4795" },
          { title: "ІІ курс", url: "http://kk.nau.edu.ua/article/4796" },
          { title: "ІІ семестр", url: "http://kk.nau.edu.ua/article/4797" },
        ],
      },
    ],
  },
];

const getColorClasses = (color: string) => {
  const colors: Record<
    string,
    { bg: string; text: string; border: string; gradient: string; badgeBg: string }
  > = {
    blue: {
      bg: "bg-blue-100 dark:bg-blue-900/30",
      text: "text-blue-600 dark:text-blue-400",
      border: "border-blue-200 dark:border-blue-800/50",
      gradient: "from-blue-500 to-blue-600",
      badgeBg: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
    },
    purple: {
      bg: "bg-purple-100 dark:bg-purple-900/30",
      text: "text-purple-600 dark:text-purple-400",
      border: "border-purple-200 dark:border-purple-800/50",
      gradient: "from-purple-500 to-purple-600",
      badgeBg: "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300",
    },
    green: {
      bg: "bg-green-100 dark:bg-green-900/30",
      text: "text-green-600 dark:text-green-400",
      border: "border-green-200 dark:border-green-800/50",
      gradient: "from-green-500 to-green-600",
      badgeBg: "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300",
    },
    orange: {
      bg: "bg-orange-100 dark:bg-orange-900/30",
      text: "text-orange-600 dark:text-orange-400",
      border: "border-orange-200 dark:border-orange-800/50",
      gradient: "from-orange-500 to-amber-500",
      badgeBg: "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300",
    },
  };
  return colors[color] || colors.blue;
};

export const ScholarshipRatingPage = () => {
  const openInNewTab = useCallback((url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <Card className="overflow-hidden border-0 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 dark:from-amber-950/30 dark:via-yellow-950/20 dark:to-orange-950/10">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Trophy className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                  Рейтинг для призначення стипендій
                </h2>
              </div>
              <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
                Академічна стипендія призначається здобувачам освіти за
                результатами навчання відповідно до рейтингу успішності. Рейтинг
                формується за результатами семестрового контролю.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <div className="flex items-center gap-2 rounded-lg bg-white/80 px-4 py-2 dark:bg-white/10">
                <GraduationCap className="h-5 w-5 text-amber-600" />
                <div>
                  <p className="text-lg font-bold text-foreground">4</p>
                  <p className="text-xs text-muted-foreground">Відділення</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Departments Grid */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-amber-500" />
          <h2 className="text-lg font-semibold text-foreground">
            Рейтинг за відділеннями
          </h2>
          <Badge variant="secondary" className="ml-2">
            {departments.length}
          </Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {departments.map((dept, index) => {
            const colors = getColorClasses(dept.color);
            return (
              <Card
                key={dept.id}
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  colors.border,
                  "animate-in fade-in slide-in-from-bottom-4"
                )}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: "backwards",
                }}
              >
                <div className={cn("h-1.5 bg-gradient-to-r", colors.gradient)} />
                <CardContent className="p-5">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "shrink-0 rounded-xl p-3",
                          colors.bg,
                          colors.text
                        )}
                      >
                        <dept.icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-semibold text-foreground">
                        {dept.title}
                      </h3>
                    </div>

                    <div className="space-y-3">
                      {dept.semesters.map((semester) => (
                        <div key={semester.year} className="space-y-2">
                          <p className="text-sm font-medium text-muted-foreground">
                            {semester.year}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {semester.items.map((item) => (
                              <button
                                key={item.title}
                                onClick={() => openInNewTab(item.url)}
                                className={cn(
                                  "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-all hover:scale-105",
                                  colors.badgeBg
                                )}
                              >
                                <FileText className="h-3.5 w-3.5" />
                                {item.title}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Info Banner */}
      <Card className="border-amber-200 bg-amber-50/50 dark:border-amber-800/50 dark:bg-amber-950/20">
        <CardContent className="flex items-start gap-4 p-5">
          <div className="shrink-0 rounded-full bg-amber-100 p-2 dark:bg-amber-900/50">
            <GraduationCap className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="space-y-1">
            <p className="font-medium text-foreground">
              Умови призначення академічної стипендії
            </p>
            <p className="text-sm text-muted-foreground">
              Академічна стипендія призначається здобувачам освіти, які навчаються
              за державним замовленням, за результатами семестрового контролю
              відповідно до рейтингу успішності. Рейтинг формується на підставі
              підсумкових оцінок з навчальних дисциплін.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
