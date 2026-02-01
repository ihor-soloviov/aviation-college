"use client";

import { useState, useCallback } from "react";
import { Calendar } from "lucide-react";
import { ExpandableCard } from "../shared/ExpandableCard";
import { InfoCard } from "./InfoCard";
import { tuitionFeesData, currentInfoCards } from "./data";

export const TuitionFeesPage = () => {
  const [expandedYears, setExpandedYears] = useState<Set<string>>(new Set());

  const toggleYear = useCallback((yearId: string) => {
    setExpandedYears((prev) => {
      const next = new Set(prev);
      if (next.has(yearId)) {
        next.delete(yearId);
      } else {
        next.add(yearId);
      }
      return next;
    });
  }, []);

  const openPdfInNewTab = useCallback((url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  return (
    <div className="space-y-8">
      {/* Актуальна інформація */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-primary" />
          <h2 className="text-lg font-semibold text-foreground">
            Актуальна інформація
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {currentInfoCards.map((card, index) => (
            <InfoCard
              key={card.id}
              {...card}
              index={index}
              onOpenPdf={openPdfInNewTab}
            />
          ))}
        </div>
      </div>

      {/* Архів документів */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-muted-foreground" />
          <h2 className="text-lg font-semibold text-foreground">
            Архів документів по роках
          </h2>
        </div>
        <div className="space-y-3">
          {tuitionFeesData.map((yearData, index) => (
            <ExpandableCard
              key={yearData.id}
              id={yearData.id}
              title={yearData.title}
              icon={<Calendar className="h-6 w-6" />}
              items={yearData.items}
              index={index}
              isExpanded={expandedYears.has(yearData.id)}
              onToggle={() => toggleYear(yearData.id)}
              onOpenPdf={openPdfInNewTab}
              gridCols={2}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
