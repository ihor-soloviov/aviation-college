"use client";

import { useState, useCallback } from "react";
import { consultationsData } from "./data";
import { YearCard } from "./YearCard";

const toggleSetValue = <T,>(set: Set<T>, value: T): Set<T> => {
  const newSet = new Set(set);
  if (newSet.has(value)) {
    newSet.delete(value);
  } else {
    newSet.add(value);
  }
  return newSet;
};

const openPdfInNewTab = (url: string) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

export const ConsultationsPage = () => {
  const [expandedYears, setExpandedYears] = useState<Set<string>>(new Set());

  const handleToggleYear = useCallback((yearId: string) => {
    setExpandedYears((prev) => toggleSetValue(prev, yearId));
  }, []);

  return (
    <div className="space-y-4">
      {consultationsData.map((yearData, index) => (
        <YearCard
          key={yearData.id}
          yearData={yearData}
          yearIndex={index}
          isExpanded={expandedYears.has(yearData.id)}
          onToggle={() => handleToggleYear(yearData.id)}
          onOpenPdf={openPdfInNewTab}
        />
      ))}
    </div>
  );
};
