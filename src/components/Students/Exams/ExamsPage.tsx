"use client";

import { useState, useCallback } from "react";
import { examsData } from "./data";
import { ExpandableCard } from "../shared";

const openPdfInNewTab = (url: string) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

export const ExamsPage = () => {
  const [expandedYears, setExpandedYears] = useState<Set<string>>(new Set());

  const handleToggleYear = useCallback((yearId: string) => {
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

  return (
    <div className="space-y-4">
      {examsData.map((yearData, index) => (
        <ExpandableCard
          key={yearData.id}
          id={yearData.id}
          title={yearData.year}
          items={yearData.items}
          index={index}
          isExpanded={expandedYears.has(yearData.id)}
          onToggle={() => handleToggleYear(yearData.id)}
          onOpenPdf={openPdfInNewTab}
          gridCols={3}
        />
      ))}
    </div>
  );
};
