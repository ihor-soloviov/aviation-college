"use client";

import { FileText, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { DocumentItem } from "./types";

type DocumentCardProps = {
  item: DocumentItem;
  index: number;
  onOpenPdf: (url: string) => void;
};

export const DocumentCard = ({
  item,
  index,
  onOpenPdf,
}: DocumentCardProps) => {
  const isDisabled = item.pdfUrl === "#";

  return (
    <button
      onClick={() => !isDisabled && onOpenPdf(item.pdfUrl)}
      disabled={isDisabled}
      className={cn(
        "group flex items-center gap-3 rounded-lg border p-3 text-left transition-all duration-200",
        "animate-in fade-in zoom-in-95",
        !isDisabled
          ? "hover:border-primary/50 hover:bg-muted/50 hover:shadow-sm"
          : "cursor-not-allowed opacity-50"
      )}
      style={{
        animationDelay: `${index * 30}ms`,
        animationFillMode: "backwards",
      }}
    >
      <div
        className={cn(
          "shrink-0 rounded-lg p-2 transition-colors",
          !isDisabled
            ? "bg-red-100 text-red-600 group-hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400"
            : "bg-muted text-muted-foreground"
        )}
      >
        <FileText className="h-4 w-4" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm truncate">{item.title}</p>
        {item.subtitle && (
          <p className="text-xs text-muted-foreground truncate">{item.subtitle}</p>
        )}
      </div>

      {!isDisabled && (
        <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
      )}
    </button>
  );
};
