"use client";

import { ReactNode } from "react";
import { Calendar, ChevronDown, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { DocumentItem } from "./types";
import { DocumentCard } from "./DocumentCard";

type ExpandableCardProps = {
  id: string;
  title: string;
  badge?: string;
  icon?: ReactNode;
  items: DocumentItem[];
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  onOpenPdf: (url: string) => void;
  gridCols?: 1 | 2 | 3 | 4;
};

const getDocumentLabel = (count: number) => {
  if (count === 1) return "документ";
  if (count >= 2 && count <= 4) return "документи";
  return "документів";
};

export const ExpandableCard = ({
  title,
  badge,
  icon,
  items,
  index,
  isExpanded,
  onToggle,
  onOpenPdf,
  gridCols = 2,
}: ExpandableCardProps) => {
  const hasItems = items.length > 0;

  const gridColsClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-lg",
        "animate-in fade-in slide-in-from-bottom-4",
        isExpanded && "ring-2 ring-primary/20"
      )}
      style={{
        animationDelay: `${index * 100}ms`,
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
            <div className="rounded-full bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              {icon || <Calendar className="h-6 w-6" />}
            </div>
            <div>
              <CardTitle className="text-lg md:text-xl">{title}</CardTitle>
              {hasItems ? (
                <Badge variant="outline" className="mt-1 text-xs font-normal">
                  {badge || `${items.length} ${getDocumentLabel(items.length)}`}
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
            <CardContent className="pt-0">
              <div className={cn("grid gap-2", gridColsClass[gridCols])}>
                {items.map((item, itemIndex) => (
                  <DocumentCard
                    key={item.id}
                    item={item}
                    index={itemIndex}
                    onOpenPdf={onOpenPdf}
                  />
                ))}
              </div>
            </CardContent>
          </div>
        </div>
      )}
    </Card>
  );
};
