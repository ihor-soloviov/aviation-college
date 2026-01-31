"use client";

import { Calendar, ChevronDown, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AcademicYearData } from "./types";
import { ExamItemCard } from "./ExamItemCard";

type YearCardProps = {
  yearData: AcademicYearData;
  yearIndex: number;
  isExpanded: boolean;
  onToggle: () => void;
  onOpenPdf: (url: string) => void;
};

export const YearCard = ({
  yearData,
  yearIndex,
  isExpanded,
  onToggle,
  onOpenPdf,
}: YearCardProps) => {
  const hasItems = yearData.items.length > 0;

  const getDocumentLabel = (count: number) => {
    if (count === 1) return "документ";
    if (count >= 2 && count <= 4) return "документи";
    return "документів";
  };

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-lg",
        "animate-in fade-in slide-in-from-bottom-4",
        isExpanded && "ring-2 ring-blue-500/20"
      )}
      style={{
        animationDelay: `${yearIndex * 100}ms`,
        animationFillMode: "backwards",
      }}
    >
      <CardHeader
        className={cn(
          "select-none transition-colors",
          hasItems && "cursor-pointer hover:bg-muted/50"
        )}
        onClick={hasItems ? onToggle : undefined}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-blue-100 p-3 text-blue-600 transition-transform duration-300 hover:scale-110 dark:bg-blue-900/30 dark:text-blue-400">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-lg md:text-xl">
                {yearData.year}
              </CardTitle>
              {hasItems ? (
                <Badge variant="outline" className="mt-1 text-xs font-normal">
                  {yearData.items.length} {getDocumentLabel(yearData.items.length)}
                </Badge>
              ) : (
                <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>Очікується</span>
                </div>
              )}
            </div>
          </div>
          {hasItems && (
            <ChevronDown
              className={cn(
                "h-5 w-5 text-muted-foreground transition-transform duration-300",
                isExpanded && "rotate-180"
              )}
            />
          )}
        </div>
      </CardHeader>

      {hasItems && (
        <div
          className={cn(
            "grid transition-all duration-300 ease-in-out",
            isExpanded
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="overflow-hidden">
            <CardContent className="space-y-3 pt-0">
              {yearData.items.map((item, index) => (
                <ExamItemCard
                  key={item.id}
                  item={item}
                  index={index}
                  onOpenPdf={onOpenPdf}
                />
              ))}
            </CardContent>
          </div>
        </div>
      )}
    </Card>
  );
};
