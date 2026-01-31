"use client";

import { useState, useCallback } from "react";
import { educationalProcessData } from "./data";
import { StudyFormCard } from "./StudyFormCard";

const toggleSetValue = (set: Set<string>, value: string): Set<string> => {
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

export const EducationalProcessPage = () => {
  const [expandedForms, setExpandedForms] = useState<Set<string>>(new Set());
  const [expandedYears, setExpandedYears] = useState<Set<string>>(new Set());
  const [expandedSemesters, setExpandedSemesters] = useState<Set<string>>(
    new Set()
  );

  const toggleForm = useCallback((formId: string) => {
    setExpandedForms((prev) => toggleSetValue(prev, formId));
  }, []);

  const toggleYear = useCallback((yearKey: string) => {
    setExpandedYears((prev) => toggleSetValue(prev, yearKey));
  }, []);

  const toggleSemester = useCallback((semesterKey: string) => {
    setExpandedSemesters((prev) => toggleSetValue(prev, semesterKey));
  }, []);

  return (
    <div className="space-y-6">
      {educationalProcessData.map((studyForm, formIndex) => (
        <StudyFormCard
          key={studyForm.id}
          studyForm={studyForm}
          formIndex={formIndex}
          isFormExpanded={expandedForms.has(studyForm.id)}
          expandedYears={expandedYears}
          expandedSemesters={expandedSemesters}
          onToggleForm={() => toggleForm(studyForm.id)}
          onToggleYear={toggleYear}
          onToggleSemester={toggleSemester}
          onOpenPdf={openPdfInNewTab}
        />
      ))}
    </div>
  );
};
