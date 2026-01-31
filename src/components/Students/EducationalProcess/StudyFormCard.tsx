"use client";

import { Sun, Moon, ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { StudyFormData } from "./types";
import { ScheduleItemCard } from "./ScheduleItemCard";

type StudyFormCardProps = {
  studyForm: StudyFormData;
  formIndex: number;
  isExpanded: boolean;
  onToggle: () => void;
  onOpenPdf: (url: string) => void;
};

export const StudyFormCard = ({
  studyForm,
  formIndex,
  isExpanded,
  onToggle,
  onOpenPdf,
}: StudyFormCardProps) => {
  const isDenna = studyForm.studyForm === "Денна";

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-lg",
        "animate-in fade-in slide-in-from-bottom-4",
        isExpanded && "ring-2 ring-primary/20"
      )}
      style={{
        animationDelay: `${formIndex * 100}ms`,
        animationFillMode: "backwards",
      }}
    >
      <CardHeader
        className="cursor-pointer select-none transition-colors hover:bg-muted/50"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className={cn(
                "rounded-full p-3 transition-transform duration-300",
                isDenna
                  ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                  : "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400",
                isExpanded && "scale-110"
              )}
            >
              {isDenna ? (
                <Sun className="h-6 w-6" />
              ) : (
                <Moon className="h-6 w-6" />
              )}
            </div>
            <div>
              <CardTitle className="text-lg md:text-xl">
                {studyForm.title}
              </CardTitle>
              <Badge
                variant={isDenna ? "default" : "outline"}
                className={cn(
                  "mt-1 text-xs font-normal",
                  isDenna && "bg-amber-500 hover:bg-amber-600 dark:bg-amber-600"
                )}
              >
                {studyForm.items.length} документів
              </Badge>
            </div>
          </div>
          <ChevronDown
            className={cn(
              "h-5 w-5 text-muted-foreground transition-transform duration-300",
              isExpanded && "rotate-180"
            )}
          />
        </div>
      </CardHeader>

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
            {studyForm.items.map((item, index) => (
              <ScheduleItemCard
                key={item.id}
                item={item}
                index={index}
                onOpenPdf={onOpenPdf}
              />
            ))}
          </CardContent>
        </div>
      </div>
    </Card>
  );
};
