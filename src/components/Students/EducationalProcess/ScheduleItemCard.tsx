"use client";

import { FileText, ExternalLink, Calendar, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScheduleItem } from "./types";

const getSemesterIcon = (type: "odd" | "even" | "full") => {
  switch (type) {
    case "odd":
      return <Calendar className="h-5 w-5" />;
    case "even":
      return <CalendarDays className="h-5 w-5" />;
    case "full":
      return <FileText className="h-5 w-5" />;
  }
};

const getSemesterColors = (type: "odd" | "even" | "full") => {
  switch (type) {
    case "odd":
      return {
        bg: "bg-violet-100 dark:bg-violet-900/30",
        icon: "from-violet-500 to-purple-600",
        text: "text-violet-600 dark:text-violet-400",
        border: "border-violet-200 dark:border-violet-800",
        hover: "hover:border-violet-300 dark:hover:border-violet-700",
      };
    case "even":
      return {
        bg: "bg-orange-100 dark:bg-orange-900/30",
        icon: "from-orange-500 to-amber-600",
        text: "text-orange-600 dark:text-orange-400",
        border: "border-orange-200 dark:border-orange-800",
        hover: "hover:border-orange-300 dark:hover:border-orange-700",
      };
    case "full":
      return {
        bg: "bg-emerald-100 dark:bg-emerald-900/30",
        icon: "from-emerald-500 to-teal-600",
        text: "text-emerald-600 dark:text-emerald-400",
        border: "border-emerald-200 dark:border-emerald-800",
        hover: "hover:border-emerald-300 dark:hover:border-emerald-700",
      };
  }
};

type ScheduleItemCardProps = {
  item: ScheduleItem;
  index: number;
  onOpenPdf: (url: string) => void;
};

export const ScheduleItemCard = ({
  item,
  index,
  onOpenPdf,
}: ScheduleItemCardProps) => {
  const colors = getSemesterColors(item.type);
  const displayTitle = item.semester
    ? `${item.year} - ${item.semester}`
    : item.year;

  return (
    <button
      onClick={() => onOpenPdf(item.pdfUrl)}
      className={cn(
        "group flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all duration-200",
        "animate-in fade-in slide-in-from-left-2",
        colors.border,
        colors.hover,
        "hover:shadow-md hover:scale-[1.01] active:scale-[0.99]"
      )}
      style={{
        animationDelay: `${index * 50}ms`,
        animationFillMode: "backwards",
      }}
    >
      <div
        className={cn(
          "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm transition-transform duration-200 group-hover:scale-110",
          colors.icon
        )}
      >
        {getSemesterIcon(item.type)}
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-foreground truncate">{displayTitle}</h4>
        <p className={cn("text-sm", colors.text)}>
          {item.type === "full"
            ? "Повний навчальний рік"
            : item.type === "odd"
            ? "Непарний семестр"
            : "Парний семестр"}
        </p>
      </div>

      <div
        className={cn(
          "flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
          colors.bg,
          colors.text
        )}
      >
        <span className="hidden sm:inline">Відкрити</span>
        <ExternalLink className="h-4 w-4" />
      </div>
    </button>
  );
};
