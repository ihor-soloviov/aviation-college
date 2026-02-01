"use client";

import { useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  FileText,
  ExternalLink,
  Calendar,
  UserCheck,
  BarChart3,
  Image,
  Scale,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sections = [
  {
    id: "regulation",
    title: "Положення про курсантське (студентське) самоврядування",
    description:
      "Нормативний документ, що регламентує діяльність органів студентського самоврядування",
    icon: FileText,
    url: "http://kk.nau.edu.ua/article/175",
    color: "blue",
  },
  {
    id: "work-plan",
    title: "План роботи органів курсантського (студентського) самоврядування",
    description:
      "Календарний план заходів та подій, організованих студентським самоврядуванням",
    icon: Calendar,
    url: "http://kk.nau.edu.ua/article/1906",
    color: "purple",
  },
  {
    id: "members",
    title: "Склад органів курсантського (студентського) самоврядування",
    description:
      "Інформація про членів та керівництво органів студентського самоврядування",
    icon: UserCheck,
    url: "http://kk.nau.edu.ua/article/674",
    color: "green",
  },
  {
    id: "reports",
    title: "Звітність",
    description:
      "Протоколи засідань, звіти про діяльність та результати роботи самоврядування",
    icon: BarChart3,
    url: "http://kk.nau.edu.ua/article/680",
    color: "orange",
  },
  {
    id: "gallery",
    title: "Галерея",
    description:
      "Фотоматеріали заходів та подій, організованих студентським самоврядуванням",
    icon: Image,
    url: "http://kk.nau.edu.ua/article/3382",
    color: "pink",
  },
];

const getColorClasses = (color: string) => {
  const colors: Record<
    string,
    { bg: string; text: string; border: string; gradient: string }
  > = {
    blue: {
      bg: "bg-blue-100 dark:bg-blue-900/30",
      text: "text-blue-600 dark:text-blue-400",
      border: "hover:border-blue-500/50",
      gradient: "from-blue-500 to-blue-600",
    },
    purple: {
      bg: "bg-purple-100 dark:bg-purple-900/30",
      text: "text-purple-600 dark:text-purple-400",
      border: "hover:border-purple-500/50",
      gradient: "from-purple-500 to-purple-600",
    },
    green: {
      bg: "bg-green-100 dark:bg-green-900/30",
      text: "text-green-600 dark:text-green-400",
      border: "hover:border-green-500/50",
      gradient: "from-green-500 to-green-600",
    },
    orange: {
      bg: "bg-orange-100 dark:bg-orange-900/30",
      text: "text-orange-600 dark:text-orange-400",
      border: "hover:border-orange-500/50",
      gradient: "from-orange-500 to-amber-500",
    },
    pink: {
      bg: "bg-pink-100 dark:bg-pink-900/30",
      text: "text-pink-600 dark:text-pink-400",
      border: "hover:border-pink-500/50",
      gradient: "from-pink-500 to-rose-500",
    },
  };
  return colors[color] || colors.blue;
};

export const SelfGovernancePage = () => {
  const openInNewTab = useCallback((url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <Card className="overflow-hidden border-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/30 dark:via-purple-950/20 dark:to-pink-950/10">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                  Курсантське самоврядування
                </h2>
              </div>
              <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
                Курсантське (студентське) самоврядування є невід&apos;ємною
                частиною громадського самоврядування коледжу. Воно забезпечує
                захист прав та інтересів здобувачів освіти, сприяє їх участі в
                управлінні закладом.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <div className="flex items-center gap-2 rounded-lg bg-white/80 px-4 py-2 dark:bg-white/10">
                <Users className="h-5 w-5 text-indigo-600" />
                <div>
                  <p className="text-lg font-bold text-foreground">100%</p>
                  <p className="text-xs text-muted-foreground">Участь</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sections Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section, index) => {
          const colors = getColorClasses(section.color);
          return (
            <button
              key={section.id}
              onClick={() => openInNewTab(section.url)}
              className={cn(
                "group text-left",
                "animate-in fade-in slide-in-from-bottom-4"
              )}
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: "backwards",
              }}
            >
              <Card
                className={cn(
                  "h-full overflow-hidden transition-all duration-300",
                  "hover:shadow-lg",
                  colors.border
                )}
              >
                <div
                  className={cn("h-1.5 bg-gradient-to-r", colors.gradient)}
                />
                <CardContent className="p-5">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div
                        className={cn(
                          "shrink-0 rounded-xl p-3 transition-transform duration-300 group-hover:scale-110",
                          colors.bg,
                          colors.text
                        )}
                      >
                        <section.icon className="h-6 w-6" />
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="line-clamp-2 font-semibold text-foreground">
                        {section.title}
                      </h3>
                      <p className="line-clamp-2 text-sm text-muted-foreground">
                        {section.description}
                      </p>
                    </div>
                    <Badge variant="secondary" className="gap-1">
                      <ExternalLink className="h-3 w-3" />
                      Відкрити
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </button>
          );
        })}
      </div>

      {/* Info Banner */}
      <Card className="border-indigo-200 bg-indigo-50/50 dark:border-indigo-800/50 dark:bg-indigo-950/20">
        <CardContent className="flex items-start gap-4 p-5">
          <div className="shrink-0 rounded-full bg-indigo-100 p-2 dark:bg-indigo-900/50">
            <Scale className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="space-y-1">
            <p className="font-medium text-foreground">
              Права та можливості
            </p>
            <p className="text-sm text-muted-foreground">
              Кожен здобувач освіти має право брати участь у роботі органів
              студентського самоврядування, обирати та бути обраним до їх
              складу. Самоврядування організовує культурно-масові заходи,
              представляє інтереси студентів та сприяє покращенню умов навчання.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
