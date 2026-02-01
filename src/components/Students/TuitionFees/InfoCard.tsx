"use client";

import { GraduationCap, Home, BookOpen, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type InfoCardProps = {
  id: string;
  title: string;
  description: string;
  pdfUrl: string;
  icon: "tuition" | "dormitory" | "courses";
  highlight?: boolean;
  index: number;
  onOpenPdf: (url: string) => void;
};

const iconMap = {
  tuition: GraduationCap,
  dormitory: Home,
  courses: BookOpen,
};

const colorMap = {
  tuition: {
    bg: "bg-blue-50 dark:bg-blue-950/30",
    iconBg: "bg-blue-100 dark:bg-blue-900/50",
    iconColor: "text-blue-600 dark:text-blue-400",
    border: "border-blue-200 dark:border-blue-800",
    hoverBorder: "hover:border-blue-300 dark:hover:border-blue-700",
  },
  dormitory: {
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/50",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-200 dark:border-emerald-800",
    hoverBorder: "hover:border-emerald-300 dark:hover:border-emerald-700",
  },
  courses: {
    bg: "bg-amber-50 dark:bg-amber-950/30",
    iconBg: "bg-amber-100 dark:bg-amber-900/50",
    iconColor: "text-amber-600 dark:text-amber-400",
    border: "border-amber-200 dark:border-amber-800",
    hoverBorder: "hover:border-amber-300 dark:hover:border-amber-700",
  },
};

export const InfoCard = ({
  title,
  description,
  pdfUrl,
  icon,
  highlight,
  index,
  onOpenPdf,
}: InfoCardProps) => {
  const Icon = iconMap[icon];
  const colors = colorMap[icon];

  return (
    <Card
      className={cn(
        "group cursor-pointer overflow-hidden border-2 transition-all duration-300",
        "animate-in fade-in slide-in-from-bottom-4",
        colors.bg,
        colors.border,
        colors.hoverBorder,
        "hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
        highlight && "ring-2 ring-primary/20"
      )}
      style={{
        animationDelay: `${index * 100}ms`,
        animationFillMode: "backwards",
      }}
      onClick={() => onOpenPdf(pdfUrl)}
    >
      <CardContent className="flex items-start gap-4 p-5">
        <div
          className={cn(
            "shrink-0 rounded-xl p-3 transition-transform duration-300 group-hover:scale-110",
            colors.iconBg
          )}
        >
          <Icon className={cn("h-6 w-6", colors.iconColor)} />
        </div>
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-foreground leading-tight">
              {title}
            </h3>
            {highlight && (
              <Badge variant="default" className="shrink-0 text-xs">
                Актуально
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>
        <ExternalLink
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
          )}
        />
      </CardContent>
    </Card>
  );
};
