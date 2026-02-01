"use client";

import { useState, useCallback } from "react";
import { scheduleData } from "./data";
import { PeriodCard } from "./PeriodCard";

// Helper function to toggle a value in a Set
const toggleSetValue = <T,>(set: Set<T>, value: T): Set<T> => {
  const next = new Set(set);
  if (next.has(value)) {
    next.delete(value);
  } else {
    next.add(value);
  }
  return next;
};

// Helper function to open PDF in a new tab
const openPdfInNewTab = (url: string): void => {
  if (url !== "#") {
    window.open(url, "_blank", "noopener,noreferrer");
  }
};

export const SchedulePage = () => {
  const [expandedPeriods, setExpandedPeriods] = useState<Set<string>>(
    new Set()
  );
  const [expandedYears, setExpandedYears] = useState<Set<string>>(
    new Set()
  );
  const [expandedSessions, setExpandedSessions] = useState<Set<string>>(
    new Set()
  );

  const handleTogglePeriod = useCallback((id: string) => {
    setExpandedPeriods((prev) => toggleSetValue(prev, id));
  }, []);

  const handleToggleYear = useCallback((yearKey: string) => {
    setExpandedYears((prev) => toggleSetValue(prev, yearKey));
  }, []);

  const handleToggleSession = useCallback((sessionKey: string) => {
    setExpandedSessions((prev) => toggleSetValue(prev, sessionKey));
  }, []);

  const handleOpenPdf = useCallback((url: string) => {
    openPdfInNewTab(url);
  }, []);

  return (
    <div className="space-y-6">
      {scheduleData.map((period, periodIndex) => (
        <PeriodCard
          key={period.id}
          period={period}
          periodIndex={periodIndex}
          isPeriodExpanded={expandedPeriods.has(period.id)}
          expandedYears={expandedYears}
          expandedSessions={expandedSessions}
          onTogglePeriod={() => handleTogglePeriod(period.id)}
          onToggleYear={handleToggleYear}
          onToggleSession={handleToggleSession}
          onOpenPdf={handleOpenPdf}
        />
      ))}
    </div>
  );
};
