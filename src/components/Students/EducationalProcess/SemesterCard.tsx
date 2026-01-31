"use client";

import { ChevronDown, CalendarRange, CalendarCheck, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { DocumentButton } from "./DocumentButton";

type SemesterCardProps = {
  semester: {
    title: string;
    type: "odd" | "even" | "full";
    documents: { name: string; pdfUrl: string }[];
  };
  semesterKey: string;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  onOpenPdf: (url: string) => void;
};

const getSemesterIcon = (type: "odd" | "even" | "full") => {
  switch (type) {
    case "odd":
      return <CalendarRange className="h-4 w-4" />;
    case "even":
      return <CalendarCheck className="h-4 w-4" />;
    case "full":
      return <Calendar className="h-4 w-4" />;
  }
};

const getSemesterColor = (type: "odd" | "even" | "full") => {
  switch (type) {
    case "odd":
      return "from-violet-500 to-purple-600";
    case "even":
      return "from-amber-500 to-orange-600";
    case "full":
      return "from-emerald-500 to-teal-600";
  }
};

export const SemesterCard = ({
  semester,
  semesterKey,
  index,
  isExpanded,
  onToggle,
  onOpenPdf,
}: SemesterCardProps) => {
  return (
    <div
      key={semesterKey}
      className={cn(
        "rounded-xl border bg-card transition-all duration-200",
        "animate-in fade-in slide-in-from-left-2",
        isExpanded && "bg-muted/30 shadow-sm"
      )}
      style={{
        animationDelay: `${index * 50}ms`,
        animationFillMode: "backwards",
      }}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-muted/50 rounded-xl"
      >
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br text-white shadow-sm",
              getSemesterColor(semester.type)
            )}
          >
            {getSemesterIcon(semester.type)}
          </div>
          <span className="font-medium text-sm md:text-base">
            {semester.title}
          </span>
          <Badge 
            variant="secondary" 
            className={cn(
              "text-xs",
              semester.type === "odd" && "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
              semester.type === "even" && "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
              semester.type === "full" && "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
            )}
          >
            {semester.documents.length}{" "}
            {semester.documents.length === 1 ? "документ" : "документи"}
          </Badge>
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200",
            isExpanded && "rotate-180"
          )}
        />
      </button>

      <div
        className={cn(
          "grid transition-all duration-200 ease-in-out",
          isExpanded
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="grid gap-3 px-4 pb-4">
            {semester.documents.map((doc, docIndex) => (
              <DocumentButton
                key={doc.name}
                document={doc}
                index={docIndex}
                onOpenPdf={onOpenPdf}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
