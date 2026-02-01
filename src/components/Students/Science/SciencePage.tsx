"use client";

import { useCallback, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Microscope,
  FileText,
  ExternalLink,
  Users,
  Award,
  BookOpen,
  Lightbulb,
  GraduationCap,
  Calculator,
  Monitor,
  Download,
  ChevronDown,
  Plane,
  History,
  ScrollText,
} from "lucide-react";
import { cn } from "@/lib/utils";

const mainPageUrl = "http://kk.nau.edu.ua/article/215";

// Загальна інформація - посилання на статті сайту
const generalInfo = [
  {
    id: "regulation",
    title: "Положення про НТК",
    description: "Нормативний документ, що регламентує діяльність наукового товариства",
    icon: FileText,
    url: "http://kk.nau.edu.ua/article/3270",
    color: "blue",
    type: "external",
  },
  {
    id: "circles-regulation",
    title: "Положення про студентські наукові гуртки та проблемні групи",
    description: "Правила організації та функціонування наукових гуртків",
    icon: Users,
    url: "http://kk.nau.edu.ua/article/3271",
    color: "purple",
    type: "external",
  },
  {
    id: "sections-list",
    title: "Перелік наукових секцій НТК",
    description: "Студентські наукові гуртки та проблемні групи коледжу",
    icon: BookOpen,
    url: "http://kk.nau.edu.ua/article/3272",
    color: "green",
    type: "external",
  },
];

// Конференції - посилання на статті сайту
const conferences = [
  {
    id: "aviation",
    title: "Авіація і космонавтика",
    description: "Науково-практична конференція з питань авіації та космонавтики",
    icon: Plane,
    url: "http://kk.nau.edu.ua/article/3273",
    color: "sky",
  },
  {
    id: "cossacks",
    title: "Козацтво - традиції через роки!",
    description: "Конференція присвячена історії та традиціям українського козацтва",
    icon: History,
    url: "http://kk.nau.edu.ua/article/3274",
    color: "amber",
  },
  {
    id: "pedagogy",
    title: "Сучасний науково-педагогічний досвід при викладанні фундаментальних дисциплін",
    description: "Обмін досвідом викладання фундаментальних дисциплін у закладах освіти",
    icon: BookOpen,
    url: "http://kk.nau.edu.ua/article/3275",
    color: "emerald",
  },
  {
    id: "info-day",
    title: "Всесвітній день інформації",
    description: "Науково-практична конференція з питань інформаційних технологій",
    icon: Monitor,
    url: "http://kk.nau.edu.ua/article/3276",
    color: "cyan",
  },
  {
    id: "integrity",
    title: "Академічна доброчесність: основи теорії та практики",
    description: "Конференція з питань академічної доброчесності в освіті",
    icon: GraduationCap,
    url: "http://kk.nau.edu.ua/article/4089",
    color: "indigo",
  },
];

// Олімпіади та досягнення
const achievements = [
  {
    id: "math",
    title: "Математика",
    description: "Перемоги та досягнення на олімпіадах з математики",
    icon: Calculator,
    url: "http://kk.nau.edu.ua/article/3277",
    color: "rose",
  },
  {
    id: "graphics",
    title: "Комп'ютерна графіка",
    description: "Досягнення здобувачів у галузі комп'ютерної графіки та дизайну",
    icon: Monitor,
    url: "http://kk.nau.edu.ua/article/3278",
    color: "violet",
  },
];

// Нормативно-правова база
const regulations = [
  {
    id: "olympiad-regulation",
    title: "Положення про олімпіади",
    description: "Нормативний документ щодо проведення олімпіад",
    icon: ScrollText,
    url: "http://kk.nau.edu.ua/article/3279",
    color: "slate",
  },
];

const getColorClasses = (color: string) => {
  const colors: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
    blue: { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-600 dark:text-blue-400", border: "hover:border-blue-500/50", gradient: "from-blue-500 to-blue-600" },
    purple: { bg: "bg-purple-100 dark:bg-purple-900/30", text: "text-purple-600 dark:text-purple-400", border: "hover:border-purple-500/50", gradient: "from-purple-500 to-purple-600" },
    green: { bg: "bg-green-100 dark:bg-green-900/30", text: "text-green-600 dark:text-green-400", border: "hover:border-green-500/50", gradient: "from-green-500 to-green-600" },
    indigo: { bg: "bg-indigo-100 dark:bg-indigo-900/30", text: "text-indigo-600 dark:text-indigo-400", border: "hover:border-indigo-500/50", gradient: "from-indigo-500 to-indigo-600" },
    cyan: { bg: "bg-cyan-100 dark:bg-cyan-900/30", text: "text-cyan-600 dark:text-cyan-400", border: "hover:border-cyan-500/50", gradient: "from-cyan-500 to-cyan-600" },
    emerald: { bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-600 dark:text-emerald-400", border: "hover:border-emerald-500/50", gradient: "from-emerald-500 to-emerald-600" },
    amber: { bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-600 dark:text-amber-400", border: "hover:border-amber-500/50", gradient: "from-amber-500 to-amber-600" },
    sky: { bg: "bg-sky-100 dark:bg-sky-900/30", text: "text-sky-600 dark:text-sky-400", border: "hover:border-sky-500/50", gradient: "from-sky-500 to-sky-600" },
    violet: { bg: "bg-violet-100 dark:bg-violet-900/30", text: "text-violet-600 dark:text-violet-400", border: "hover:border-violet-500/50", gradient: "from-violet-500 to-violet-600" },
    rose: { bg: "bg-rose-100 dark:bg-rose-900/30", text: "text-rose-600 dark:text-rose-400", border: "hover:border-rose-500/50", gradient: "from-rose-500 to-rose-600" },
    slate: { bg: "bg-slate-100 dark:bg-slate-900/30", text: "text-slate-600 dark:text-slate-400", border: "hover:border-slate-500/50", gradient: "from-slate-500 to-slate-600" },
  };
  return colors[color] || colors.blue;
};

export const SciencePage = () => {
  const openInNewTab = useCallback((url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <Card className="overflow-hidden border-0 bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 dark:from-cyan-950/30 dark:via-blue-950/20 dark:to-indigo-950/10">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Microscope className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                  Наукове товариство коледжу (НТК)
                </h2>
              </div>
              <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
                Наукове товариство коледжу об&apos;єднує здобувачів освіти, які
                прагнуть розвивати свої наукові здібності, брати участь у
                дослідницькій діяльності та представляти коледж на олімпіадах і
                конференціях.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <div className="flex items-center gap-2 rounded-lg bg-white/80 px-4 py-2 dark:bg-white/10">
                <Award className="h-5 w-5 text-cyan-600" />
                <div>
                  <p className="text-lg font-bold text-foreground">НТК</p>
                  <p className="text-xs text-muted-foreground">Наука</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Card - scrolls to content */}
      <button
        onClick={() => scrollToSection("general-info")}
        className="group w-full text-left"
      >
        <Card
          className={cn(
            "overflow-hidden transition-all duration-300",
            "hover:shadow-lg hover:border-cyan-500/50"
          )}
        >
          <div className="h-1.5 bg-gradient-to-r from-cyan-500 to-blue-500" />
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="shrink-0 rounded-xl bg-cyan-100 p-4 text-cyan-600 transition-transform duration-300 group-hover:scale-110 dark:bg-cyan-900/30 dark:text-cyan-400">
                <Microscope className="h-10 w-10" />
              </div>
              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-semibold text-foreground sm:text-xl">
                    Матеріали наукового товариства
                  </h3>
                  <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Положення, перелік секцій, матеріали конференцій та досягнення 
                  здобувачів освіти на олімпіадах і конкурсах.
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <Badge variant="secondary">Документи</Badge>
                  <Badge variant="secondary">Конференції</Badge>
                  <Badge variant="secondary">Олімпіади</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </button>

      {/* General Information */}
      <div id="general-info" className="space-y-4 scroll-mt-24">
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-cyan-500" />
          <h2 className="text-lg font-semibold text-foreground">
            Загальна інформація
          </h2>
          <Badge variant="secondary" className="ml-2">
            {generalInfo.length}
          </Badge>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {generalInfo.map((item, index) => {
            const colors = getColorClasses(item.color);
            return (
              <button
                key={item.id}
                onClick={() => openInNewTab(item.url)}
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
                  <div className={cn("h-1.5 bg-gradient-to-r", colors.gradient)} />
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
                          <item.icon className="h-6 w-6" />
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="line-clamp-2 font-semibold text-foreground">
                          {item.title}
                        </h3>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                      <Badge variant="secondary" className="gap-1">
                        <ExternalLink className="h-3 w-3" />
                        Переглянути
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </button>
            );
          })}
        </div>
      </div>

      {/* Conferences */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-indigo-500" />
          <h2 className="text-lg font-semibold text-foreground">
            Конференції
          </h2>
          <Badge variant="secondary" className="ml-2">
            {conferences.length}
          </Badge>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {conferences.map((conf, index) => {
            const colors = getColorClasses(conf.color);
            return (
              <button
                key={conf.id}
                onClick={() => openInNewTab(conf.url)}
                className="group w-full text-left"
              >
                <Card
                  className={cn(
                    "h-full overflow-hidden border-l-4 transition-all duration-300 hover:shadow-md",
                    colors.border.replace("hover:", ""),
                    "animate-in fade-in slide-in-from-bottom-4"
                  )}
                  style={{
                    animationDelay: `${index * 80}ms`,
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
                        <conf.icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-medium text-foreground line-clamp-2">
                            {conf.title}
                          </h3>
                          <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                          {conf.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </button>
            );
          })}
        </div>
      </div>

      {/* Achievements */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-violet-500" />
          <h2 className="text-lg font-semibold text-foreground">
            Наші досягнення (Олімпіади)
          </h2>
          <Badge variant="secondary" className="ml-2">
            {achievements.length}
          </Badge>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {achievements.map((achievement, index) => {
            const colors = getColorClasses(achievement.color);
            return (
              <button
                key={achievement.id}
                onClick={() => openInNewTab(achievement.url)}
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
                  <div className={cn("h-1.5 bg-gradient-to-r", colors.gradient)} />
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div
                        className={cn(
                          "shrink-0 rounded-xl p-3 transition-transform duration-300 group-hover:scale-110",
                          colors.bg,
                          colors.text
                        )}
                      >
                        <achievement.icon className="h-6 w-6" />
                      </div>
                      <div className="min-w-0 flex-1 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold text-foreground">
                            {achievement.title}
                          </h3>
                          <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {achievement.description}
                        </p>
                        <Badge variant="secondary" className="gap-1">
                          <Award className="h-3 w-3" />
                          Переглянути
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </button>
            );
          })}
        </div>
      </div>

      {/* Regulations */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-slate-500" />
          <h2 className="text-lg font-semibold text-foreground">
            Нормативно-правова база
          </h2>
          <Badge variant="secondary" className="ml-2">
            {regulations.length}
          </Badge>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {regulations.map((reg, index) => {
            const colors = getColorClasses(reg.color);
            return (
              <button
                key={reg.id}
                onClick={() => openInNewTab(reg.url)}
                className="group w-full text-left"
              >
                <Card
                  className={cn(
                    "overflow-hidden border-l-4 transition-all duration-300 hover:shadow-md",
                    colors.border.replace("hover:", ""),
                    "animate-in fade-in slide-in-from-bottom-4"
                  )}
                  style={{
                    animationDelay: `${index * 80}ms`,
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
                        <reg.icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-medium text-foreground line-clamp-2">
                            {reg.title}
                          </h3>
                          <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                          {reg.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </button>
            );
          })}
        </div>
      </div>

      {/* Info Banner */}
      <Card className="border-cyan-200 bg-cyan-50/50 dark:border-cyan-800/50 dark:bg-cyan-950/20">
        <CardContent className="flex items-start gap-4 p-5">
          <div className="shrink-0 rounded-full bg-cyan-100 p-2 dark:bg-cyan-900/50">
            <Lightbulb className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
          </div>
          <div className="space-y-1">
            <p className="font-medium text-foreground">
              Приєднуйся до НТК!
            </p>
            <p className="text-sm text-muted-foreground">
              Наукове товариство коледжу запрошує всіх зацікавлених здобувачів
              освіти долучитися до наукової діяльності. Участь у НТК дозволяє
              розвивати критичне мислення, набувати досвіду дослідницької роботи
              та представляти свої роботи на конференціях і олімпіадах.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
