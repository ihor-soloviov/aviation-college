"use client";

import { useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Plane,
  Zap,
  Truck,
  FileText,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Clock,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  practiceBases,
  practiceTypes,
  practiceRegulationUrl,
  practiceBasesUrl,
} from "./data";

const getTypeIcon = (type: string) => {
  switch (type) {
    case "aviation":
      return Plane;
    case "energy":
      return Zap;
    case "transport":
      return Truck;
    default:
      return Building2;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "aviation":
      return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400";
    case "energy":
      return "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400";
    case "transport":
      return "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400";
    default:
      return "bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400";
  }
};

export const PracticalTrainingPage = () => {
  const openInNewTab = useCallback((url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  const aviationBases = practiceBases.filter((b) => b.type === "aviation");
  const otherBases = practiceBases.filter((b) => b.type !== "aviation");

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <Card className="overflow-hidden border-0 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-950/30 dark:via-amber-950/20 dark:to-yellow-950/10">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Briefcase className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                  Практичне навчання
                </h2>
              </div>
              <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
                Практична підготовка є невід&apos;ємною складовою освітнього
                процесу. Здобувачі освіти проходять практику на провідних
                підприємствах України, що дозволяє отримати реальний досвід
                роботи за обраною спеціальністю.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <div className="flex items-center gap-2 rounded-lg bg-white/80 px-4 py-2 dark:bg-white/10">
                <Building2 className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-lg font-bold text-foreground">30+</p>
                  <p className="text-xs text-muted-foreground">
                    Баз практики
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-white/80 px-4 py-2 dark:bg-white/10">
                <Plane className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-lg font-bold text-foreground">14</p>
                  <p className="text-xs text-muted-foreground">Аеропортів</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Navigation Cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Положення про практику */}
        <button
          onClick={() => openInNewTab(practiceRegulationUrl)}
          className="group text-left"
        >
          <Card
            className={cn(
              "h-full overflow-hidden transition-all duration-300",
              "hover:shadow-lg hover:border-blue-500/50",
              "animate-in fade-in slide-in-from-bottom-4"
            )}
          >
            <div className="h-1.5 bg-gradient-to-r from-blue-500 to-blue-600" />
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="shrink-0 rounded-xl bg-blue-100 p-4 text-blue-600 transition-transform duration-300 group-hover:scale-110 dark:bg-blue-900/30 dark:text-blue-400">
                  <FileText className="h-8 w-8" />
                </div>
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      Положення про проведення практики
                    </h3>
                    <ExternalLink className="h-5 w-5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Нормативний документ, що регламентує організацію та
                    проведення практичної підготовки здобувачів освіти
                  </p>
                  <Badge variant="secondary" className="mt-2">
                    PDF документ
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </button>

        {/* Бази практики */}
        <button
          onClick={() => openInNewTab(practiceBasesUrl)}
          className="group text-left"
        >
          <Card
            className={cn(
              "h-full overflow-hidden transition-all duration-300",
              "hover:shadow-lg hover:border-orange-500/50",
              "animate-in fade-in slide-in-from-bottom-4"
            )}
            style={{ animationDelay: "100ms", animationFillMode: "backwards" }}
          >
            <div className="h-1.5 bg-gradient-to-r from-orange-500 to-amber-500" />
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="shrink-0 rounded-xl bg-orange-100 p-4 text-orange-600 transition-transform duration-300 group-hover:scale-110 dark:bg-orange-900/30 dark:text-orange-400">
                  <Building2 className="h-8 w-8" />
                </div>
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      Бази практичного навчання
                    </h3>
                    <ExternalLink className="h-5 w-5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Перелік підприємств та організацій, з якими коледж має
                    договори про співпрацю
                  </p>
                  <Badge variant="secondary" className="mt-2">
                    Переглянути список
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </button>
      </div>

      {/* Practice Types */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-primary" />
          <h2 className="text-lg font-semibold text-foreground">
            Види практичної підготовки
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {practiceTypes.map((type, index) => (
            <Card
              key={type.title}
              className={cn(
                "group overflow-hidden transition-all duration-300 hover:shadow-md",
                "animate-in fade-in slide-in-from-bottom-4"
              )}
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: "backwards",
              }}
            >
              <div className="h-1 bg-gradient-to-r from-orange-500 to-amber-500" />
              <CardContent className="p-5">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-orange-600" />
                    <h3 className="font-semibold text-foreground">
                      {type.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {type.description}
                  </p>
                  <Badge variant="outline" className="gap-1">
                    <GraduationCap className="h-3 w-3" />
                    {type.course}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Aviation Partners */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-blue-500" />
          <h2 className="text-lg font-semibold text-foreground">
            Авіаційні підприємства-партнери
          </h2>
          <Badge variant="secondary" className="ml-2">
            {aviationBases.length}
          </Badge>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {aviationBases.map((base, index) => {
            const Icon = getTypeIcon(base.type);
            return (
              <div
                key={base.name}
                className={cn(
                  "flex items-center gap-3 rounded-lg border bg-card p-3 transition-all duration-200",
                  "hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-blue-950/20",
                  "animate-in fade-in slide-in-from-bottom-2"
                )}
                style={{
                  animationDelay: `${index * 30}ms`,
                  animationFillMode: "backwards",
                }}
              >
                <div
                  className={cn("shrink-0 rounded-lg p-2", getTypeColor(base.type))}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <p className="min-w-0 flex-1 truncate text-sm font-medium">
                  {base.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Other Partners */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-muted-foreground" />
          <h2 className="text-lg font-semibold text-foreground">
            Інші підприємства-партнери
          </h2>
          <Badge variant="secondary" className="ml-2">
            {otherBases.length}
          </Badge>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {otherBases.map((base, index) => {
            const Icon = getTypeIcon(base.type);
            return (
              <div
                key={base.name}
                className={cn(
                  "flex items-center gap-3 rounded-lg border bg-card p-3 transition-all duration-200",
                  "hover:border-primary/50 hover:bg-muted/50",
                  "animate-in fade-in slide-in-from-bottom-2"
                )}
                style={{
                  animationDelay: `${index * 30}ms`,
                  animationFillMode: "backwards",
                }}
              >
                <div
                  className={cn("shrink-0 rounded-lg p-2", getTypeColor(base.type))}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <p className="min-w-0 flex-1 truncate text-sm font-medium">
                  {base.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info Banner */}
      <Card className="border-orange-200 bg-orange-50/50 dark:border-orange-800/50 dark:bg-orange-950/20">
        <CardContent className="flex items-start gap-4 p-5">
          <div className="shrink-0 rounded-full bg-orange-100 p-2 dark:bg-orange-900/50">
            <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
          </div>
          <div className="space-y-1">
            <p className="font-medium text-foreground">
              Організація практичного навчання
            </p>
            <p className="text-sm text-muted-foreground">
              Для всіх договорів та угод передбачена автоматична пролонгація,
              якщо жодна із сторін не вимагає її перегляду або розірвання. За
              питаннями організації практики звертайтеся до
              навчально-виробничого відділу коледжу.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
