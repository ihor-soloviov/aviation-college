"use client";

import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Brain,
  Heart,
  Shield,
  Lightbulb,
  BookOpen,
  GraduationCap,
  AlertTriangle,
  Users,
  Briefcase,
  Phone,
  ChevronDown,
  X,
  FileText,
  FlaskConical,
  Folder,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  psychologyArticles,
  importantContacts,
  type PsychologyArticle,
} from "@/lib/psychology-articles";

// Маппінг іконок для статей
const articleIcons: Record<string, typeof Brain> = {
  "tips-for-freshmen": GraduationCap,
  "psychology-myths": Brain,
  "job-search-tips": Briefcase,
  "emotion-regulation": Heart,
  "exam-preparation": BookOpen,
  "bullying-prevention": AlertTriangle,
  "quarantine-impact-research": FlaskConical,
  "freshmen-diagnostic-research": FileText,
  "youth-needs-research": Users,
  "help-services": Phone,
  "hiv-safety": Shield,
  "no-violence": AlertTriangle,
};

// Кольори для статей
const articleColors: Record<string, string> = {
  "tips-for-freshmen": "blue",
  "psychology-myths": "purple",
  "job-search-tips": "green",
  "emotion-regulation": "rose",
  "exam-preparation": "amber",
  "bullying-prevention": "red",
  "quarantine-impact-research": "cyan",
  "freshmen-diagnostic-research": "indigo",
  "youth-needs-research": "teal",
  "help-services": "emerald",
  "hiv-safety": "red",
  "no-violence": "orange",
};

// Категорії з назвами
const categoryNames: Record<PsychologyArticle["category"], string> = {
  advice: "Поради",
  research: "Дослідження",
  resources: "Ресурси",
};

const categoryIcons: Record<PsychologyArticle["category"], typeof Brain> = {
  advice: Lightbulb,
  research: FlaskConical,
  resources: Folder,
};

const getColorClasses = (color: string) => {
  const colors: Record<
    string,
    { bg: string; text: string; border: string; gradient: string }
  > = {
    blue: {
      bg: "bg-blue-100 dark:bg-blue-900/30",
      text: "text-blue-600 dark:text-blue-400",
      border: "border-blue-500/50",
      gradient: "from-blue-500 to-blue-600",
    },
    purple: {
      bg: "bg-purple-100 dark:bg-purple-900/30",
      text: "text-purple-600 dark:text-purple-400",
      border: "border-purple-500/50",
      gradient: "from-purple-500 to-purple-600",
    },
    green: {
      bg: "bg-green-100 dark:bg-green-900/30",
      text: "text-green-600 dark:text-green-400",
      border: "border-green-500/50",
      gradient: "from-green-500 to-green-600",
    },
    rose: {
      bg: "bg-rose-100 dark:bg-rose-900/30",
      text: "text-rose-600 dark:text-rose-400",
      border: "border-rose-500/50",
      gradient: "from-rose-500 to-rose-600",
    },
    amber: {
      bg: "bg-amber-100 dark:bg-amber-900/30",
      text: "text-amber-600 dark:text-amber-400",
      border: "border-amber-500/50",
      gradient: "from-amber-500 to-amber-600",
    },
    cyan: {
      bg: "bg-cyan-100 dark:bg-cyan-900/30",
      text: "text-cyan-600 dark:text-cyan-400",
      border: "border-cyan-500/50",
      gradient: "from-cyan-500 to-cyan-600",
    },
    red: {
      bg: "bg-red-100 dark:bg-red-900/30",
      text: "text-red-600 dark:text-red-400",
      border: "border-red-500/50",
      gradient: "from-red-500 to-red-600",
    },
    indigo: {
      bg: "bg-indigo-100 dark:bg-indigo-900/30",
      text: "text-indigo-600 dark:text-indigo-400",
      border: "border-indigo-500/50",
      gradient: "from-indigo-500 to-indigo-600",
    },
    violet: {
      bg: "bg-violet-100 dark:bg-violet-900/30",
      text: "text-violet-600 dark:text-violet-400",
      border: "border-violet-500/50",
      gradient: "from-violet-500 to-violet-600",
    },
    emerald: {
      bg: "bg-emerald-100 dark:bg-emerald-900/30",
      text: "text-emerald-600 dark:text-emerald-400",
      border: "border-emerald-500/50",
      gradient: "from-emerald-500 to-emerald-600",
    },
    pink: {
      bg: "bg-pink-100 dark:bg-pink-900/30",
      text: "text-pink-600 dark:text-pink-400",
      border: "border-pink-500/50",
      gradient: "from-pink-500 to-pink-600",
    },
    orange: {
      bg: "bg-orange-100 dark:bg-orange-900/30",
      text: "text-orange-600 dark:text-orange-400",
      border: "border-orange-500/50",
      gradient: "from-orange-500 to-orange-600",
    },
    teal: {
      bg: "bg-teal-100 dark:bg-teal-900/30",
      text: "text-teal-600 dark:text-teal-400",
      border: "border-teal-500/50",
      gradient: "from-teal-500 to-teal-600",
    },
    sky: {
      bg: "bg-sky-100 dark:bg-sky-900/30",
      text: "text-sky-600 dark:text-sky-400",
      border: "border-sky-500/50",
      gradient: "from-sky-500 to-sky-600",
    },
    fuchsia: {
      bg: "bg-fuchsia-100 dark:bg-fuchsia-900/30",
      text: "text-fuchsia-600 dark:text-fuchsia-400",
      border: "border-fuchsia-500/50",
      gradient: "from-fuchsia-500 to-fuchsia-600",
    },
    lime: {
      bg: "bg-lime-100 dark:bg-lime-900/30",
      text: "text-lime-600 dark:text-lime-400",
      border: "border-lime-500/50",
      gradient: "from-lime-500 to-lime-600",
    },
  };
  return colors[color] || colors.blue;
};

export const UsefulLinksPage = () => {
  const [selectedArticle, setSelectedArticle] =
    useState<PsychologyArticle | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const openArticle = useCallback((article: PsychologyArticle) => {
    setSelectedArticle(article);
    setIsDialogOpen(true);
  }, []);

  const closeArticle = useCallback(() => {
    setIsDialogOpen(false);
    setSelectedArticle(null);
  }, []);

  // Групуємо статті за категоріями
  const adviceArticles = psychologyArticles.filter(
    (a) => a.category === "advice"
  );
  const researchArticles = psychologyArticles.filter(
    (a) => a.category === "research"
  );
  const resourceArticles = psychologyArticles.filter(
    (a) => a.category === "resources"
  );

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <Card className="overflow-hidden border-0 bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 dark:from-violet-950/30 dark:via-purple-950/20 dark:to-fuchsia-950/10">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Brain className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                  Психологічний вісник
                </h2>
              </div>
              <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
                Корисні матеріали від психологічної служби коледжу. Поради щодо
                адаптації, емоційного здоров&apos;я, підготовки до іспитів та
                подолання стресових ситуацій.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <div className="flex items-center gap-2 rounded-lg bg-white/80 px-4 py-2 dark:bg-white/10">
                <Heart className="h-5 w-5 text-violet-600" />
                <div>
                  <p className="text-lg font-bold text-foreground">24/7</p>
                  <p className="text-xs text-muted-foreground">Підтримка</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Card - scrolls to articles */}
      <button
        onClick={() => scrollToSection("articles-section")}
        className="group w-full text-left"
      >
        <Card
          className={cn(
            "overflow-hidden transition-all duration-300",
            "hover:shadow-lg hover:border-violet-500/50"
          )}
        >
          <div className="h-1.5 bg-gradient-to-r from-violet-500 to-purple-500" />
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="shrink-0 rounded-xl bg-violet-100 p-4 text-violet-600 transition-transform duration-300 group-hover:scale-110 dark:bg-violet-900/30 dark:text-violet-400">
                <Brain className="h-10 w-10" />
              </div>
              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-semibold text-foreground sm:text-xl">
                    Психологічні поради та статті
                  </h3>
                  <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Корисні матеріали про психологічне здоров&apos;я, адаптацію,
                  підготовку до іспитів, подолання стресу та багато іншого.
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <Badge variant="secondary">
                    {psychologyArticles.length} статей
                  </Badge>
                  <Badge
                    variant="outline"
                    className="gap-1 text-violet-600 dark:text-violet-400"
                  >
                    <ChevronDown className="h-3 w-3" />
                    Переглянути всі
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </button>

      {/* Psychology Articles - Поради */}
      <div id="articles-section" className="space-y-4 scroll-mt-24">
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-violet-500" />
          <h2 className="text-lg font-semibold text-foreground">
            Психологічні поради
          </h2>
          <Badge variant="secondary" className="ml-2">
            {adviceArticles.length}
          </Badge>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {adviceArticles.map((article, index) => {
            const color = articleColors[article.id] || "blue";
            const colors = getColorClasses(color);
            const IconComponent = articleIcons[article.id] || FileText;
            return (
              <button
                key={article.id}
                onClick={() => openArticle(article)}
                className="group w-full text-left"
              >
                <Card
                  className={cn(
                    "overflow-hidden border-l-4 transition-all duration-300 hover:shadow-md",
                    colors.border,
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
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="line-clamp-2 text-sm font-medium text-foreground">
                            {article.title}
                          </h3>
                          <BookOpen className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Натисніть, щоб прочитати
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

      {/* Research Articles - Дослідження */}
      {researchArticles.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-cyan-500" />
            <h2 className="text-lg font-semibold text-foreground">
              Дослідження
            </h2>
            <Badge variant="secondary" className="ml-2">
              {researchArticles.length}
            </Badge>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {researchArticles.map((article, index) => {
              const color = articleColors[article.id] || "cyan";
              const colors = getColorClasses(color);
              const IconComponent = articleIcons[article.id] || FlaskConical;
              return (
                <button
                  key={article.id}
                  onClick={() => openArticle(article)}
                  className="group w-full text-left"
                >
                  <Card
                    className={cn(
                      "overflow-hidden border-l-4 transition-all duration-300 hover:shadow-md",
                      colors.border,
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
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="line-clamp-2 text-sm font-medium text-foreground">
                              {article.title}
                            </h3>
                            <BookOpen className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground">
                            Натисніть, щоб пр��читати
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
      )}

      {/* Resource Articles - Ресурси */}
      {resourceArticles.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-red-500" />
            <h2 className="text-lg font-semibold text-foreground">Ресурси</h2>
            <Badge variant="secondary" className="ml-2">
              {resourceArticles.length}
            </Badge>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {resourceArticles.map((article, index) => {
              const color = articleColors[article.id] || "red";
              const colors = getColorClasses(color);
              const IconComponent = articleIcons[article.id] || Folder;
              return (
                <button
                  key={article.id}
                  onClick={() => openArticle(article)}
                  className="group w-full text-left"
                >
                  <Card
                    className={cn(
                      "overflow-hidden border-l-4 transition-all duration-300 hover:shadow-md",
                      colors.border,
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
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="line-clamp-2 text-sm font-medium text-foreground">
                              {article.title}
                            </h3>
                            <BookOpen className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground">
                            Натисніть, щоб прочитати
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
      )}

      {/* Contacts Section */}
      <Card className="border-violet-200 bg-violet-50/50 dark:border-violet-800/50 dark:bg-violet-950/20">
        <CardContent className="p-5">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="shrink-0 rounded-full bg-violet-100 p-2 dark:bg-violet-900/50">
                <Heart className="h-5 w-5 text-violet-600 dark:text-violet-400" />
              </div>
              <div className="space-y-1">
                <p className="font-medium text-foreground">
                  Психологічна підтримка
                </p>
                <p className="text-sm text-muted-foreground">
                  Якщо вам потрібна допомога або консультація, зверніться до
                  психологічної служби коледжу. Пам&apos;ятайте: звертатися по
                  допомогу - це нормально і правильно. Всі консультації
                  конфіденційні.
                </p>
              </div>
            </div>

            {/* Психолог коледжу */}
            <div className="rounded-lg border border-violet-200 bg-white/80 p-4 dark:border-violet-800/50 dark:bg-white/5">
              <div className="flex items-center gap-3">
                <div className="shrink-0 rounded-full bg-violet-100 p-2 dark:bg-violet-900/50">
                  <Phone className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    {importantContacts.psychologist.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {importantContacts.psychologist.role}
                  </p>
                  <a
                    href={`tel:${importantContacts.psychologist.phone}`}
                    className="text-sm font-medium text-violet-600 hover:underline dark:text-violet-400"
                  >
                    {importantContacts.psychologist.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Article Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-hidden p-0">
          {selectedArticle && (
            <>
              <DialogHeader className="border-b px-6 py-4">
                <div className="flex items-start gap-4">
                  {(() => {
                    const color = articleColors[selectedArticle.id] || "blue";
                    const colors = getColorClasses(color);
                    const IconComponent =
                      articleIcons[selectedArticle.id] || FileText;
                    return (
                      <div
                        className={cn(
                          "shrink-0 rounded-xl p-3",
                          colors.bg,
                          colors.text
                        )}
                      >
                        <IconComponent className="h-6 w-6" />
                      </div>
                    );
                  })()}
                  <div className="min-w-0 flex-1 space-y-1">
                    <DialogTitle className="text-lg font-semibold leading-tight text-foreground">
                      {selectedArticle.title}
                    </DialogTitle>
                    <Badge variant="secondary" className="text-xs">
                      {categoryNames[selectedArticle.category]}
                    </Badge>
                  </div>
                </div>
              </DialogHeader>
              <div className="max-h-[calc(90vh-140px)] overflow-y-auto">
                <div className="space-y-4 p-6">
                  {selectedArticle.content.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-sm leading-relaxed text-foreground"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
              <div className="flex justify-end border-t px-6 py-4">
                <Button variant="outline" onClick={closeArticle}>
                  <X className="mr-2 h-4 w-4" />
                  Закрити
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
