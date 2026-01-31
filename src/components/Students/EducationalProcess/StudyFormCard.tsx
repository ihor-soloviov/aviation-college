"use client";

import { Sun, Moon, ChevronDown, BookOpen, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { StudyFormData } from "./types";
import { SemesterCard } from "./SemesterCard";

const getYearIcon = (year: string) => {
  const startYear = parseInt(year.split("-")[0]);
  if (startYear % 2 === 0) {
    return <BookOpen className="h-5 w-5" />;
  }
  return <GraduationCap className="h-5 w-5" />;
};

type StudyFormCardProps = {
  studyForm: StudyFormData;
  formIndex: number;
  isFormExpanded: boolean;
  expandedYears: Set<string>;
  expandedSemesters: Set<string>;
  onToggleForm: () => void;
  onToggleYear: (yearKey: string) => void;
  onToggleSemester: (semesterKey: string) => void;
  onOpenPdf: (url: string) => void;
};

export const StudyFormCard = ({
  studyForm,
  formIndex,
  isFormExpanded,
  expandedYears,
  expandedSemesters,
  onToggleForm,
  onToggleYear,
  onToggleSemester,
  onOpenPdf,
}: StudyFormCardProps) => {
  const isDenna = studyForm.studyForm === "Денна";

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-lg",
        "animate-in fade-in slide-in-from-bottom-4",
        isFormExpanded && "ring-2 ring-primary/20"
      )}
      style={{
        animationDelay: `${formIndex * 100}ms`,
        animationFillMode: "backwards",
      }}
    >
      <CardHeader
        className="cursor-pointer select-none transition-colors hover:bg-muted/50"
        onClick={onToggleForm}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className={cn(
                "rounded-full p-3 transition-transform duration-300 group-hover:scale-110",
                isDenna
                  ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                  : "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
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
              <div className="mt-1 flex items-center gap-2">
                <Badge
                  variant={isDenna ? "default" : "outline"}
                  className={cn(
                    "text-xs font-normal",
                    isDenna &&
                      "bg-amber-500 hover:bg-amber-600 dark:bg-amber-600"
                  )}
                >
                  {studyForm.studyForm} форма
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {studyForm.academicYears.length} навчальних{" "}
                  {studyForm.academicYears.length === 1 ? "рік" : "роки"}
                </span>
              </div>
            </div>
          </div>
          <ChevronDown
            className={cn(
              "h-5 w-5 text-muted-foreground transition-transform duration-300",
              isFormExpanded && "rotate-180"
            )}
          />
        </div>
      </CardHeader>

      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isFormExpanded
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <CardContent className="space-y-4 pt-0">
            {studyForm.academicYears.map((academicYear, yearIndex) => {
              const yearKey = `${studyForm.id}-${academicYear.year}`;
              const isYearExpanded = expandedYears.has(yearKey);

              return (
                <div
                  key={yearKey}
                  className={cn(
                    "rounded-xl border bg-muted/30 transition-all duration-200",
                    "animate-in fade-in slide-in-from-left-2",
                    isYearExpanded && "bg-muted/50 shadow-sm"
                  )}
                  style={{
                    animationDelay: `${yearIndex * 50}ms`,
                    animationFillMode: "backwards",
                  }}
                >
                  <button
                    onClick={() => onToggleYear(yearKey)}
                    className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-muted/50 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br shadow-sm text-white",
                          isDenna
                            ? "from-amber-500 to-orange-600"
                            : "from-indigo-500 to-purple-600"
                        )}
                      >
                        {getYearIcon(academicYear.year)}
                      </div>
                      <div>
                        <span className="font-semibold text-foreground">
                          {academicYear.year} навчальний рік
                        </span>
                        <p className="text-xs text-muted-foreground">
                          {academicYear.semesters.length}{" "}
                          {academicYear.semesters.length === 1
                            ? "семестр"
                            : "семестри"}
                        </p>
                      </div>
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-muted-foreground transition-transform duration-200",
                        isYearExpanded && "rotate-180"
                      )}
                    />
                  </button>

                  <div
                    className={cn(
                      "grid transition-all duration-200 ease-in-out",
                      isYearExpanded
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="space-y-3 px-4 pb-4">
                        {academicYear.semesters.map(
                          (semester, semesterIndex) => {
                            const semesterKey = `${yearKey}-${semesterIndex}`;
                            const isSemesterExpanded =
                              expandedSemesters.has(semesterKey);

                            return (
                              <SemesterCard
                                key={semesterKey}
                                semester={semester}
                                semesterKey={semesterKey}
                                index={semesterIndex}
                                isExpanded={isSemesterExpanded}
                                onToggle={() => onToggleSemester(semesterKey)}
                                onOpenPdf={onOpenPdf}
                              />
                            );
                          }
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </div>
      </div>
    </Card>
  );
};
