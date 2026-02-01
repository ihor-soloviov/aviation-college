"use client";

import { useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ShieldAlert,
  FileText,
  ExternalLink,
  BookOpen,
  AlertTriangle,
  Scale,
  ClipboardList,
  Heart,
  Phone,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

const documents = [
  {
    id: "methodology",
    title: "Методичний посібник",
    subtitle: "Протидія булінгу в закладі освіти: системний підхід",
    icon: BookOpen,
    color: "blue",
    url: "http://kk.nau.edu.ua/article/526",
  },
  {
    id: "together",
    title: "Зупинимо булінг разом",
    subtitle: "Інформаційні матеріали про протидію булінгу",
    icon: Heart,
    color: "pink",
    url: "http://kk.nau.edu.ua/article/527",
  },
  {
    id: "tips",
    title: "Зупинимо булінг разом - поради",
    subtitle: "Практичні рекомендації для здобувачів освіти",
    icon: AlertTriangle,
    color: "yellow",
    url: "http://kk.nau.edu.ua/article/528",
  },
  {
    id: "responsibility",
    title: "Зупинимо булінг разом - відповідальність",
    subtitle: "Інформація про відповідальність за булінг",
    icon: Scale,
    color: "red",
    url: "http://kk.nau.edu.ua/article/529",
  },
  {
    id: "plan",
    title: "План протидії булінгу",
    subtitle: "Комплексний план заходів з протидії булінгу в коледжі",
    icon: ClipboardList,
    color: "green",
    url: "http://kk.nau.edu.ua/article/3899",
  },
  {
    id: "regulation",
    title: "Положення про протидію булінгу",
    subtitle: "Нормативний документ, що регламентує протидію булінгу",
    icon: FileText,
    color: "purple",
    url: "http://kk.nau.edu.ua/article/983",
  },
];

const getColorClasses = (color: string) => {
  const colors: Record<
    string,
    { bg: string; text: string; border: string }
  > = {
    blue: {
      bg: "bg-blue-100 dark:bg-blue-900/30",
      text: "text-blue-600 dark:text-blue-400",
      border: "border-l-blue-500",
    },
    pink: {
      bg: "bg-pink-100 dark:bg-pink-900/30",
      text: "text-pink-600 dark:text-pink-400",
      border: "border-l-pink-500",
    },
    yellow: {
      bg: "bg-yellow-100 dark:bg-yellow-900/30",
      text: "text-yellow-600 dark:text-yellow-400",
      border: "border-l-yellow-500",
    },
    red: {
      bg: "bg-red-100 dark:bg-red-900/30",
      text: "text-red-600 dark:text-red-400",
      border: "border-l-red-500",
    },
    green: {
      bg: "bg-green-100 dark:bg-green-900/30",
      text: "text-green-600 dark:text-green-400",
      border: "border-l-green-500",
    },
    purple: {
      bg: "bg-purple-100 dark:bg-purple-900/30",
      text: "text-purple-600 dark:text-purple-400",
      border: "border-l-purple-500",
    },
  };
  return colors[color] || colors.blue;
};

export const AntiBullyingPage = () => {
  const openInNewTab = useCallback((url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  const scrollToDocuments = useCallback(() => {
    const element = document.getElementById("documents-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <Card className="overflow-hidden border-0 bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 dark:from-rose-950/30 dark:via-pink-950/20 dark:to-orange-950/10">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-6 w-6 text-rose-600 dark:text-rose-400" />
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                  Протидія булінгу
                </h2>
              </div>
              <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
                Криворізький фаховий коледж НАУ активно працює над створенням
                безпечного освітнього середовища. Булінг - це цькування,
                агресивна поведінка щодо іншої особи, яка є неприпустимою у
                нашому закладі.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <div className="flex items-center gap-2 rounded-lg bg-white/80 px-4 py-2 dark:bg-white/10">
                <ShieldAlert className="h-5 w-5 text-rose-600" />
                <div>
                  <p className="text-lg font-bold text-foreground">0</p>
                  <p className="text-xs text-muted-foreground">Толерантність</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Card - scrolls to documents */}
      <button
        onClick={scrollToDocuments}
        className="group w-full text-left"
      >
        <Card
          className={cn(
            "overflow-hidden transition-all duration-300",
            "hover:shadow-lg hover:border-rose-500/50"
          )}
        >
          <div className="h-1.5 bg-gradient-to-r from-rose-500 to-pink-500" />
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="shrink-0 rounded-xl bg-rose-100 p-4 text-rose-600 transition-transform duration-300 group-hover:scale-110 dark:bg-rose-900/30 dark:text-rose-400">
                <ShieldAlert className="h-10 w-10" />
              </div>
              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-semibold text-foreground sm:text-xl">
                    Документи та матеріали з протидії булінгу
                  </h3>
                  <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Повна інформація про заходи протидії булінгу, документи,
                  методичні матеріали та корисні посилання для здобувачів освіти
                  та їхніх батьків.
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <Badge variant="secondary">Усі матеріали</Badge>
                  <Badge
                    variant="outline"
                    className="gap-1 text-rose-600 dark:text-rose-400"
                  >
                    <ChevronDown className="h-3 w-3" />
                    Перейти до документів
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </button>

      {/* Documents List */}
      <div id="documents-section" className="space-y-4 scroll-mt-24">
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-rose-500" />
          <h2 className="text-lg font-semibold text-foreground">
            Документи та матеріали
          </h2>
          <Badge variant="secondary" className="ml-2">
            {documents.length}
          </Badge>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {documents.map((doc, index) => {
            const colors = getColorClasses(doc.color);
            return (
              <button
                key={doc.id}
                onClick={() => openInNewTab(doc.url)}
                className="group w-full text-left"
              >
                <Card
                  className={cn(
                    "overflow-hidden border-l-4 transition-all duration-300 hover:shadow-md cursor-pointer",
                    colors.border,
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
                        <doc.icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-medium text-foreground">{doc.title}</h3>
                          <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                        </div>
                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                          {doc.subtitle}
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

      {/* Contact Banner */}
      <Card className="border-rose-200 bg-rose-50/50 dark:border-rose-800/50 dark:bg-rose-950/20">
        <CardContent className="flex items-start gap-4 p-5">
          <div className="shrink-0 rounded-full bg-rose-100 p-2 dark:bg-rose-900/50">
            <Phone className="h-5 w-5 text-rose-600 dark:text-rose-400" />
          </div>
          <div className="space-y-1">
            <p className="font-medium text-foreground">
              Куди звернутися?
            </p>
            <p className="text-sm text-muted-foreground">
              Якщо ви стали свідком або жертвою булінгу, негайно повідомте про
              це куратора групи, психолога коледжу або адміністрацію. Також
              можна скористатися скринькою довіри або подзвонити на гарячу
              лінію з питань запобігання насильству: 0 800 500 335 (безкоштовно).
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
