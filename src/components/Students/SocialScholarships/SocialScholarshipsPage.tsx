"use client";

import { useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  ExternalLink,
  Users,
  FileText,
  CheckCircle,
  AlertCircle,
  Phone,
  MapPin,
  Shield,
  Baby,
  Accessibility,
  Home,
  Scale,
  UserCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

const mainPageUrl = "http://kk.nau.edu.ua/article/4585";

const categories = [
  {
    id: "orphans",
    title: "Діти-сироти та діти, позбавлені батьківського піклування",
    description: "Та особи з їх числа у разі продовження навчання до 23 років",
    icon: Baby,
    color: "blue",
  },
  {
    id: "lost-parents",
    title: "Особи, які залишились без батьків",
    description: "У віці від 18 до 23 років (батьки померли/загинули/зникли безвісти)",
    icon: Heart,
    color: "purple",
  },
  {
    id: "chornobyl",
    title: "Постраждалі внаслідок Чорнобильської катастрофи",
    description: "Особи, які мають статус постраждалих від аварії на ЧАЕС",
    icon: AlertCircle,
    color: "yellow",
  },
  {
    id: "veterans",
    title: "Учасники бойових дій та їх діти",
    description: "Визнані учасниками Революції Гідності, учасниками бойових дій",
    icon: Shield,
    color: "green",
  },
  {
    id: "disability",
    title: "Особи з інвалідністю I-III групи",
    description: "Діти з інвалідністю та особи з інвалідністю внаслідок війни",
    icon: Accessibility,
    color: "orange",
  },
  {
    id: "idp",
    title: "Внутрішньо переміщені особи",
    description: "Діти, зареєстровані як ВПО (до 23 років)",
    icon: Home,
    color: "pink",
  },
  {
    id: "low-income",
    title: "Малозабезпечені сім'ї",
    description: "Студенти із сімей, які отримують державну соціальну допомогу",
    icon: Users,
    color: "red",
  },
  {
    id: "fallen-heroes",
    title: "Діти загиблих захисників України",
    description: "Діти загиблих/померлих учасників бойових дій (до 23 років)",
    icon: Scale,
    color: "indigo",
  },
];

const requiredDocuments = [
  "Заява на ім'я начальника коледжу",
  "Копія паспорта громадянина України",
  "Копія свідоцтва про народження",
  "Копія ідентифікаційного коду (ІПН)",
  "Копія студентського квитка",
  "Документи, що підтверджують право на соціальну стипендію",
];

const getColorClasses = (color: string) => {
  const colors: Record<string, { bg: string; text: string; border: string }> = {
    blue: {
      bg: "bg-blue-100 dark:bg-blue-900/30",
      text: "text-blue-600 dark:text-blue-400",
      border: "border-l-blue-500",
    },
    purple: {
      bg: "bg-purple-100 dark:bg-purple-900/30",
      text: "text-purple-600 dark:text-purple-400",
      border: "border-l-purple-500",
    },
    yellow: {
      bg: "bg-yellow-100 dark:bg-yellow-900/30",
      text: "text-yellow-600 dark:text-yellow-400",
      border: "border-l-yellow-500",
    },
    green: {
      bg: "bg-green-100 dark:bg-green-900/30",
      text: "text-green-600 dark:text-green-400",
      border: "border-l-green-500",
    },
    orange: {
      bg: "bg-orange-100 dark:bg-orange-900/30",
      text: "text-orange-600 dark:text-orange-400",
      border: "border-l-orange-500",
    },
    pink: {
      bg: "bg-pink-100 dark:bg-pink-900/30",
      text: "text-pink-600 dark:text-pink-400",
      border: "border-l-pink-500",
    },
    red: {
      bg: "bg-red-100 dark:bg-red-900/30",
      text: "text-red-600 dark:text-red-400",
      border: "border-l-red-500",
    },
    indigo: {
      bg: "bg-indigo-100 dark:bg-indigo-900/30",
      text: "text-indigo-600 dark:text-indigo-400",
      border: "border-l-indigo-500",
    },
  };
  return colors[color] || colors.blue;
};

export const SocialScholarshipsPage = () => {
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
                <Heart className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                  Соціальні стипендії
                </h2>
              </div>
              <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
                Соціальна стипендія призначається здобувачам освіти, які
                належать до соціально незахищених категорій населення.
                Стипендіальне забезпечення здійснюється відповідно до Порядку
                призначення і виплати стипендій (постанова КМУ від 12.07.2004 № 882).
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <div className="flex items-center gap-2 rounded-lg bg-white/80 px-4 py-2 dark:bg-white/10">
                <Users className="h-5 w-5 text-emerald-600" />
                <div>
                  <p className="text-lg font-bold text-foreground">8+</p>
                  <p className="text-xs text-muted-foreground">Категорій</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-emerald-500" />
          <h2 className="text-lg font-semibold text-foreground">
            Хто має право на соціальну стипендію
          </h2>
          <Badge variant="secondary" className="ml-2">
            {categories.length}
          </Badge>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {categories.map((category, index) => {
            const colors = getColorClasses(category.color);
            return (
              <Card
                key={category.id}
                className={cn(
                  "overflow-hidden border-l-4 transition-all duration-300 hover:shadow-md",
                  colors.border,
                  "animate-in fade-in slide-in-from-bottom-4"
                )}
                style={{
                  animationDelay: `${index * 60}ms`,
                  animationFillMode: "backwards",
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "shrink-0 rounded-lg p-2",
                        colors.bg,
                        colors.text
                      )}
                    >
                      <category.icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium text-foreground">
                        {category.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Required Documents */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-emerald-500" />
          <h2 className="text-lg font-semibold text-foreground">
            Необхідні документи
          </h2>
        </div>

        <Card className="border-emerald-200 dark:border-emerald-800/50">
          <CardContent className="p-5">
            <ul className="grid gap-3 sm:grid-cols-2">
              {requiredDocuments.map((doc, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <CheckCircle className="h-4 w-4 shrink-0 text-emerald-500 mt-0.5" />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Contact Section */}
      <Card className="border-emerald-200 bg-emerald-50/50 dark:border-emerald-800/50 dark:bg-emerald-950/20">
        <CardContent className="p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="shrink-0 rounded-full bg-emerald-100 p-2 dark:bg-emerald-900/50">
                <UserCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="space-y-1">
                <p className="font-medium text-foreground">
                  Куди звернутися?
                </p>
                <p className="text-sm text-muted-foreground">
                  Для оформлення соціальної стипендії зверніться до соціального
                  педагога
                </p>
                <p className="font-medium text-foreground">
                  Старова Юлія Сергіївна
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 text-emerald-500" />
                <span>м. Кривий Ріг, вул. Олега Антонова, 1</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Home className="h-4 w-4 text-emerald-500" />
                <span>Гуртожиток №10</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Important Note */}
      <Card className="border-amber-200 bg-amber-50/50 dark:border-amber-800/50 dark:bg-amber-950/20">
        <CardContent className="flex items-start gap-4 p-5">
          <div className="shrink-0 rounded-full bg-amber-100 p-2 dark:bg-amber-900/50">
            <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="space-y-1">
            <p className="font-medium text-foreground">
              Важлива інформація
            </p>
            <p className="text-sm text-muted-foreground">
              Право на соціальні стипендії мають здобувачі освіти, які не
              отримують академічних стипендій, не перебувають на державному
              забезпеченні (крім дітей-сиріт), не знаходяться в академічній
              відпустці і належать до однієї з пільгових категорій.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
