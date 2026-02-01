"use client";

import { useState, useCallback } from "react";
import { educationalProcessData } from "./data";
import { ExpandableCard } from "../shared";

const openPdfInNewTab = (url: string) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

export const EducationalProcessPage = () => {
  const [expandedForms, setExpandedForms] = useState<Set<string>>(new Set());

  const handleToggleForm = useCallback((formId: string) => {
    setExpandedForms((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(formId)) {
        newSet.delete(formId);
      } else {
        newSet.add(formId);
      }
      return newSet;
    });
  }, []);

  return (
    <div className="space-y-4">
      {educationalProcessData.map((studyForm, index) => (
        <ExpandableCard
          key={studyForm.id}
          id={studyForm.id}
          title={studyForm.title}
          badge={`${studyForm.studyForm} форма`}
          items={studyForm.items}
          index={index}
          isExpanded={expandedForms.has(studyForm.id)}
          onToggle={() => handleToggleForm(studyForm.id)}
          onOpenPdf={openPdfInNewTab}
          gridCols={3}
        />
      ))}
    </div>
  );
};
