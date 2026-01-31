"use client";

import { FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SemesterDocument } from "./types";

type DocumentButtonProps = {
  document: SemesterDocument;
  index: number;
  onOpenPdf: (url: string) => void;
};

export const DocumentButton = ({
  document,
  index,
  onOpenPdf,
}: DocumentButtonProps) => {
  return (
    <Button
      variant="outline"
      onClick={() => onOpenPdf(document.pdfUrl)}
      className={cn(
        "group h-auto w-full justify-start gap-3 p-4 text-left",
        "animate-in fade-in slide-in-from-bottom-2",
        "hover:border-blue-300 hover:bg-blue-50/50 dark:hover:border-blue-700 dark:hover:bg-blue-950/30",
        "transition-all duration-200"
      )}
      style={{
        animationDelay: `${index * 50}ms`,
        animationFillMode: "backwards",
      }}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
        <FileText className="h-5 w-5" />
      </div>
      <div className="flex flex-1 flex-col gap-0.5">
        <span className="font-medium text-sm">{document.name}</span>
        <span className="text-xs text-muted-foreground">Натисніть для перегляду</span>
      </div>
      <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
    </Button>
  );
};
