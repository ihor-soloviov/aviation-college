"use client";

import { useState } from "react";
import { FileText, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ExpandableSection } from "../shared/types";

type YearTabsProps = {
  data: ExpandableSection[];
  onOpenPdf: (url: string) => void;
};

export const YearTabs = ({ data, onOpenPdf }: YearTabsProps) => {
  const [activeYear, setActiveYear] = useState(data[0]?.id || "");
  const [scrollPosition, setScrollPosition] = useState(0);

  const activeYearData = data.find((y) => y.id === activeYear);

  const scrollTabs = (direction: "left" | "right") => {
    const container = document.getElementById("year-tabs-container");
    if (container) {
      const scrollAmount = 200;
      const newPosition =
        direction === "left"
          ? Math.max(0, scrollPosition - scrollAmount)
          : scrollPosition + scrollAmount;
      container.scrollTo({ left: newPosition, behavior: "smooth" });
      setScrollPosition(newPosition);
    }
  };

  return (
    <div className="space-y-4">
      {/* Year tabs navigation */}
      <div className="relative">
        {/* Scroll buttons */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 z-10 h-8 w-8 -translate-y-1/2 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => scrollTabs("left")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div
          id="year-tabs-container"
          className="scrollbar-hide flex gap-2 overflow-x-auto px-8 py-2 md:flex-wrap md:justify-center md:gap-2 md:px-0"
        >
          {data.map((year, index) => (
            <button
              key={year.id}
              onClick={() => setActiveYear(year.id)}
              className={cn(
                "relative flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                "animate-in fade-in slide-in-from-bottom-2",
                activeYear === year.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
              style={{
                animationDelay: `${index * 30}ms`,
                animationFillMode: "backwards",
              }}
            >
              <span>{year.title}</span>
              <span
                className={cn(
                  "flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs",
                  activeYear === year.id
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-muted-foreground/20 text-muted-foreground"
                )}
              >
                {year.items.length}
              </span>
            </button>
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 z-10 h-8 w-8 -translate-y-1/2 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => scrollTabs("right")}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Documents grid */}
      {activeYearData && (
        <div
          key={activeYear}
          className="animate-in fade-in slide-in-from-bottom-4 rounded-xl border bg-card p-4 shadow-sm"
        >
          <div className="mb-3 flex items-center justify-between border-b pb-3">
            <h3 className="text-sm font-medium text-muted-foreground">
              Документи за {activeYearData.title} рік
            </h3>
            <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
              {activeYearData.items.length} документів
            </span>
          </div>

          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {activeYearData.items.map((item, index) => (
              <button
                key={item.id}
                onClick={() => onOpenPdf(item.pdfUrl)}
                className={cn(
                  "group flex items-center gap-3 rounded-lg border p-3 text-left transition-all duration-200",
                  "animate-in fade-in zoom-in-95",
                  "hover:border-primary/50 hover:bg-muted/50 hover:shadow-sm"
                )}
                style={{
                  animationDelay: `${index * 20}ms`,
                  animationFillMode: "backwards",
                }}
              >
                <div className="rounded-lg bg-red-100 p-2 text-red-600 transition-colors group-hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400">
                  <FileText className="h-4 w-4" />
                </div>
                <p className="flex-1 truncate text-sm font-medium">{item.title}</p>
                <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
