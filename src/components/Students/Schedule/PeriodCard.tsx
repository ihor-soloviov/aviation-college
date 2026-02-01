"use client";

import { Calendar, ChevronDown, BookOpen, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { SchedulePeriod } from "./types";
import { SessionCard } from "./SessionCard";

const getYearIcon = (year: string) => {
  const startYear = parseInt(year.split("-")[0]);
  if (startYear % 2 === 0) {
    return <BookOpen className="h-5 w-5" />;
  }
  return <GraduationCap className="h-5 w-5" />;
};

type PeriodCardProps = {
  period: SchedulePeriod;
  periodIndex: number;
  isPeriodExpanded: boolean;
  expandedYears: Set<string>;
  expandedSessions: Set<string>;
  onTogglePeriod: () => void;
  onToggleYear: (yearKey: string) => void;
  onToggleSession: (sessionKey: string) => void;
  onOpenPdf: (url: string) => void;
};

export const PeriodCard = ({
  period,
  periodIndex,
  isPeriodExpanded,
  expandedYears,
  expandedSessions,
  onTogglePeriod,
  onToggleYear,
  onToggleSession,
  onOpenPdf,
}: PeriodCardProps) => {
  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-lg",
        "animate-in fade-in slide-in-from-bottom-4",
        isPeriodExpanded && "ring-2 ring-blue-500/20"
      )}
      style={{
        animationDelay: `${periodIndex * 100}ms`,
        animationFillMode: "backwards",
      }}
    >
      <CardHeader
        className="cursor-pointer select-none transition-colors hover:bg-muted/50"
        onClick={onTogglePeriod}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-blue-100 p-3 text-blue-600 transition-transform duration-300 group-hover:scale-110 dark:bg-blue-900/30 dark:text-blue-400">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-lg md:text-xl">
                {period.title}
              </CardTitle>
              <Badge
                  variant={period.studyForm === "Денна" ? "default" : "outline"}
                  className="mt-1 text-xs font-normal"
                >
                  {period.studyForm} форма
                </Badge>
            </div>
          </div>
          <ChevronDown
            className={cn(
              "h-5 w-5 text-muted-foreground transition-transform duration-300",
              isPeriodExpanded && "rotate-180"
            )}
          />
        </div>
      </CardHeader>

      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isPeriodExpanded
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <CardContent className="space-y-4 pt-0">
            {period.academicYears.map((academicYear, yearIndex) => {
              const yearKey = `${period.id}-${academicYear.year}`;
              const isYearExpanded = expandedYears.has(yearKey);

              return (
                <div
                  key={yearKey}
                  className={cn(
                    "rounded-lg border bg-muted/30 transition-all duration-200",
                    "animate-in fade-in slide-in-from-left-2",
                    isYearExpanded && "bg-muted/50"
                  )}
                  style={{
                    animationDelay: `${yearIndex * 50}ms`,
                    animationFillMode: "backwards",
                  }}
                >
                  <button
                    onClick={() => onToggleYear(yearKey)}
                    className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-sm">
                        {getYearIcon(academicYear.year)}
                      </div>
                      <div>
                        <span className="font-semibold text-foreground">
                          {academicYear.year} навчальний рік
                        </span>
                        <p className="text-xs text-muted-foreground">
                          {academicYear.sessions.length} {academicYear.sessions.length === 1 ? "сесія" : academicYear.sessions.length < 5 ? "сесії" : "сесій"}
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
                        {academicYear.sessions.map((session, sessionIndex) => {
                          const sessionKey = `${yearKey}-${sessionIndex}`;
                          const isSessionExpanded = expandedSessions.has(sessionKey);

                          return (
                            <SessionCard
                              key={sessionKey}
                              session={session}
                              sessionKey={sessionKey}
                              index={sessionIndex}
                              isExpanded={isSessionExpanded}
                              onToggle={() => onToggleSession(sessionKey)}
                              onOpenPdf={onOpenPdf}
                            />
                          );
                        })}
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
