"use client";

import { useCallback } from "react";
import { InfoCard } from "./InfoCard";
import { YearTabs } from "./YearTabs";
import { tuitionFeesData, currentInfoCards } from "./data";

export const TuitionFeesPage = () => {
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
        <YearTabs data={tuitionFeesData} onOpenPdf={openPdfInNewTab} />
      </div>
    </div>
  );
};
