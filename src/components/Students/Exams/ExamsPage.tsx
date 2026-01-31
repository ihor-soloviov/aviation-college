"use client";

import { useState, useCallback } from "react";
import { examsData } from "./data";
import { YearCard } from "./YearCard";

export const ExamsPage = () => {
  const [expandedYears, setExpandedYears] = useState<Set<string>>(new Set());

  const toggleYear = useCallback((yearId: string) => {
    setExpandedYears((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(yearId)) {
        newSet.delete(yearId);
      } else {
        newSet.add(yearId);
      }
      return newSet;
    });
  }, []);

  const openPdfInNewTab = useCallback((url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  return (
    <div className="space-y-4">
      {examsData.map((yearData, index) => (
        <YearCard
          key={yearData.id}
          yearData={yearData}
          yearIndex={index}
          isExpanded={expandedYears.has(yearData.id)}
          onToggle={() => toggleYear(yearData.id)}
          onOpenPdf={openPdfInNewTab}
        />
      ))}
    </div>
  );
};
