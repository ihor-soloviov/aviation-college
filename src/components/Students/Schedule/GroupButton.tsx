"use client";

import { FileText, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScheduleGroup } from "./types";

type GroupButtonProps = {
  group: ScheduleGroup;
  index: number;
  onOpenPdf: (url: string) => void;
};

export const GroupButton = ({ group, index, onOpenPdf }: GroupButtonProps) => {
  const isDisabled = group.pdfUrl === "#";

  return (
    <button
      onClick={() => onOpenPdf(group.pdfUrl)}
      disabled={isDisabled}
      className={cn(
        "group flex items-center gap-3 rounded-lg border p-3 text-left transition-all duration-200",
        "animate-in fade-in zoom-in-95",
        !isDisabled
          ? "hover:border-blue-500 hover:bg-blue-50 hover:shadow-sm dark:hover:bg-blue-900/20"
          : "cursor-not-allowed opacity-50"
      )}
      style={{
        animationDelay: `${index * 30}ms`,
        animationFillMode: "backwards",
      }}
    >
      <div
        className={cn(
          "rounded-lg p-2 transition-colors",
          !isDisabled
            ? "bg-red-100 text-red-600 group-hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400"
            : "bg-gray-100 text-gray-400 dark:bg-gray-800"
        )}
      >
        <FileText className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm truncate">{group.name}</p>
        {!isDisabled && (
          <p className="text-xs text-muted-foreground">
            Натисніть для перегляду
          </p>
        )}
      </div>
      {!isDisabled && (
        <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
      )}
    </button>
  );
};
