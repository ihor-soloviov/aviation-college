"use client";

import { useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Building2,
  MapPin,
  Clock,
  GraduationCap,
  FileText,
  ExternalLink,
  Briefcase,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  practiceBases,
  practiceDocuments,
  practiceTypes,
  iconMap,
} from "./data";

export const PracticalTrainingPage = () => {
  const openPdfInNewTab = useCallback((url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

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
                Практична підготовка є невід'ємною складовою освітнього процесу.
                Здобувачі освіти проходять практику на провідних підприємствах
                міста та регіону, що дозволяє отримати реальний досвід роботи за
                обраною спеціальністю.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <div className="flex items-center gap-2 rounded-lg bg-white/80 px-4 py-2 dark:bg-white/10">
                <Building2 className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-lg font-bold text-foreground">6+</p>
                  <p className="text-xs text-muted-foreground">Баз практики</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-white/80 px-4 py-2 dark:bg-white/10">
                <GraduationCap className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-lg font-bold text-foreground">3</p>
                  <p className="text-xs text-muted-foreground">Види практик</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Practice Types */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-primary" />
          <h2 className="text-lg font-semibold text-foreground">
            Види практичної підготовки
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {practiceTypes.map((type, index) => (
            <Card
              key={type.id}
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
                  <h3 className="font-semibold text-foreground">{type.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {type.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="gap-1">
                      <Clock className="h-3 w-3" />
                      {type.duration}
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                      <GraduationCap className="h-3 w-3" />
                      {type.course}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Practice Bases */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-primary" />
          <h2 className="text-lg font-semibold text-foreground">
            Бази практичного навчання
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {practiceBases.map((base, index) => {
            const Icon = iconMap[base.icon];
            return (
              <Card
                key={base.id}
                className={cn(
                  "group overflow-hidden transition-all duration-300 hover:shadow-md",
                  "animate-in fade-in slide-in-from-bottom-4"
                )}
                style={{
                  animationDelay: `${index * 80}ms`,
                  animationFillMode: "backwards",
                }}
              >
                <CardContent className="p-5">
                  <div className="flex gap-4">
                    <div className="shrink-0 rounded-xl bg-orange-100 p-3 text-orange-600 transition-transform duration-300 group-hover:scale-110 dark:bg-orange-900/30 dark:text-orange-400">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="min-w-0 flex-1 space-y-2">
                      <h3 className="font-semibold leading-tight text-foreground">
                        {base.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {base.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {base.specialties.map((specialty) => (
                          <Badge
                            key={specialty}
                            variant="secondary"
                            className="text-xs"
                          >
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Documents */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-muted-foreground" />
          <h2 className="text-lg font-semibold text-foreground">
            Документи та положення
          </h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {practiceDocuments.map((doc, index) => (
            <Button
              key={doc.id}
              variant="outline"
              className={cn(
                "group h-auto justify-start gap-3 p-4 text-left transition-all duration-200",
                "hover:border-orange-500/50 hover:bg-orange-50/50 dark:hover:bg-orange-950/20",
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
              <div className="min-w-0 flex-1">
                <p className="font-medium leading-tight">{doc.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {doc.description}
                </p>
              </div>
              <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </Button>
          ))}
        </div>
      </div>

      {/* Info Banner */}
      <Card className="border-orange-200 bg-orange-50/50 dark:border-orange-800/50 dark:bg-orange-950/20">
        <CardContent className="flex items-start gap-4 p-5">
          <div className="shrink-0 rounded-full bg-orange-100 p-2 dark:bg-orange-900/50">
            <MapPin className="h-5 w-5 text-orange-600 dark:text-orange-400" />
          </div>
          <div className="space-y-1">
            <p className="font-medium text-foreground">
              Організація практичного навчання
            </p>
            <p className="text-sm text-muted-foreground">
              За питаннями організації практики звертайтеся до навчально-виробничого
              відділу коледжу. Розподіл здобувачів освіти на бази практики
              здійснюється відповідно до спеціальності та наявних договорів з
              підприємствами.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
