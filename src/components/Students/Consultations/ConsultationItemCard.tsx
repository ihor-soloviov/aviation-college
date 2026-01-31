"use client";

import { FileText, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { ConsultationItem } from "./types";

type ConsultationItemCardProps = {
  item: ConsultationItem;
  index: number;
  onOpenPdf: (url: string) => void;
};

export const ConsultationItemCard = ({
  item,
  index,
  onOpenPdf,
}: ConsultationItemCardProps) => {
  const displayTitle = item.semester || item.year;

  return (
    <button
      onClick={() => onOpenPdf(item.pdfUrl)}
      className={cn(
        "group flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-all duration-200",
        "animate-in fade-in zoom-in-95",
        "hover:border-primary/50 hover:bg-muted/50 hover:shadow-sm"
      )}
      style={{
        animationDelay: `${index * 30}ms`,
        animationFillMode: "backwards",
      }}
    >
      <div className="rounded-lg bg-red-100 p-2 text-red-600 transition-colors group-hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400">
        <FileText className="h-4 w-4" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm truncate">{displayTitle}</p>
        <p className="text-xs text-muted-foreground">Графік консультацій</p>
      </div>

      <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
    </button>
  );
};
