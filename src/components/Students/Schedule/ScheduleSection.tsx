"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  ChevronDown,
  FileText,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ScheduleGroup = {
  name: string;
  pdfUrl: string;
};

type ScheduleSession = {
  title: string;
  groups: ScheduleGroup[];
};

type SchedulePeriod = {
  id: string;
  title: string;
  academicYear: string;
  studyForm: "Денна" | "Заочна";
  sessions: ScheduleSession[];
};

const scheduleData: SchedulePeriod[] = [
  {
    id: "zaochna-2024-2025",
    title: "Заочна форма навчання",
    academicYear: "2024-2025",
    studyForm: "Заочна",
    sessions: [
      {
        title: "8-а заліково-екзаменаційна сесія",
        groups: [
          { name: "Група 635-з", pdfUrl: "http://kk.nau.edu.ua/files/635-z-8.pdf" },
          { name: "Група 335-з", pdfUrl: "http://kk.nau.edu.ua/files/335-z-8.pdf" },
          { name: "Група 235-з", pdfUrl: "http://kk.nau.edu.ua/files/235-z-8.pdf" },
          { name: "Група 135-з", pdfUrl: "http://kk.nau.edu.ua/files/135-z-8.pdf" },
        ],
      },
      {
        title: "7-а заліково-екзаменаційна та 8-а настановна сесія",
        groups: [
          { name: "Група 635-з", pdfUrl: "http://kk.nau.edu.ua/files/635-z-7.pdf" },
          { name: "Група 335-з", pdfUrl: "http://kk.nau.edu.ua/files/335-z-7.pdf" },
          { name: "Група 235-з", pdfUrl: "http://kk.nau.edu.ua/files/235-z-7.pdf" },
          { name: "Група 135-з", pdfUrl: "http://kk.nau.edu.ua/files/135-z-7.pdf" },
          { name: "Група 721-з", pdfUrl: "http://kk.nau.edu.ua/files/721-z-7.pdf" },
        ],
      },
      {
        title: "5-а заліково-екзаменаційна та 6-а настановна сесія",
        groups: [
          { name: "Група 645-з", pdfUrl: "http://kk.nau.edu.ua/files/645-z-5.pdf" },
          { name: "Група 345-з", pdfUrl: "http://kk.nau.edu.ua/files/345-z-5.pdf" },
          { name: "Група 145-з", pdfUrl: "http://kk.nau.edu.ua/files/145-z-5.pdf" },
          { name: "Група 721-з", pdfUrl: "http://kk.nau.edu.ua/files/721-z-5.pdf" },
          { name: "Група 321-з", pdfUrl: "http://kk.nau.edu.ua/files/321-z-5.pdf" },
          { name: "Група 221-з", pdfUrl: "http://kk.nau.edu.ua/files/221-z-5.pdf" },
          { name: "Група 121-з", pdfUrl: "http://kk.nau.edu.ua/files/121-z-5.pdf" },
        ],
      },
      {
        title: "4-а заліково-екзаменаційна та 5-а настановна сесія",
        groups: [
          { name: "Група 731-з", pdfUrl: "http://kk.nau.edu.ua/files/731-z-4.pdf" },
          { name: "Група 531-з", pdfUrl: "http://kk.nau.edu.ua/files/531-z-4.pdf" },
          { name: "Група 331-з", pdfUrl: "http://kk.nau.edu.ua/files/331-z-4.pdf" },
          { name: "Група 231-з", pdfUrl: "http://kk.nau.edu.ua/files/231-z-4.pdf" },
          { name: "Група 131-з", pdfUrl: "http://kk.nau.edu.ua/files/131-z-4.pdf" },
          { name: "Група 645-з", pdfUrl: "http://kk.nau.edu.ua/files/645-z-4.pdf" },
          { name: "Група 345-з", pdfUrl: "http://kk.nau.edu.ua/files/345-z-4.pdf" },
          { name: "Група 145-з", pdfUrl: "http://kk.nau.edu.ua/files/145-z-4.pdf" },
        ],
      },
      {
        title: "3-а заліково-екзаменаційна та 4-а настановна сесія",
        groups: [
          { name: "Група 731-з", pdfUrl: "http://kk.nau.edu.ua/files/731-z-3.pdf" },
          { name: "Група 531-з", pdfUrl: "http://kk.nau.edu.ua/files/531-z-3.pdf" },
          { name: "Група 331-з", pdfUrl: "http://kk.nau.edu.ua/files/331-z-3.pdf" },
          { name: "Група 231-з", pdfUrl: "http://kk.nau.edu.ua/files/231-z-3.pdf" },
          { name: "Група 131-з", pdfUrl: "http://kk.nau.edu.ua/files/131-z-3.pdf" },
        ],
      },
      {
        title: "1-а заліково-екзаменаційна та 2-а настановна сесія",
        groups: [
          { name: "Група 741-з", pdfUrl: "http://kk.nau.edu.ua/files/741-z-1.pdf" },
          { name: "Група 541-з", pdfUrl: "http://kk.nau.edu.ua/files/541-z-1.pdf" },
          { name: "Група 241-з", pdfUrl: "http://kk.nau.edu.ua/files/241-z-1.pdf" },
          { name: "Група 141-з", pdfUrl: "http://kk.nau.edu.ua/files/141-z-1.pdf" },
        ],
      },
      {
        title: "Настановна сесія",
        groups: [
          { name: "Група 741-з", pdfUrl: "http://kk.nau.edu.ua/files/741-z-n.pdf" },
          { name: "Група 645-з", pdfUrl: "http://kk.nau.edu.ua/files/645-z-n.pdf" },
          { name: "Група 541-з", pdfUrl: "http://kk.nau.edu.ua/files/541-z-n.pdf" },
          { name: "Група 345-з", pdfUrl: "http://kk.nau.edu.ua/files/345-z-n.pdf" },
          { name: "Група 341-з", pdfUrl: "http://kk.nau.edu.ua/files/341-z-n.pdf" },
          { name: "Група 241-з", pdfUrl: "http://kk.nau.edu.ua/files/241-z-n.pdf" },
          { name: "Група 145-з", pdfUrl: "http://kk.nau.edu.ua/files/145-z-n.pdf" },
          { name: "Група 141-з", pdfUrl: "http://kk.nau.edu.ua/files/141-z-n.pdf" },
        ],
      },
    ],
  },
  {
    id: "denna-2024-2025",
    title: "Денна форма навчання",
    academicYear: "2024-2025",
    studyForm: "Денна",
    sessions: [
      {
        title: "Розклад занять денної форми навчання",
        groups: [
          { name: "1 курс", pdfUrl: "http://kk.nau.edu.ua/files/denna-1-kurs.pdf" },
          { name: "2 курс", pdfUrl: "http://kk.nau.edu.ua/files/denna-2-kurs.pdf" },
          { name: "3 курс", pdfUrl: "http://kk.nau.edu.ua/files/denna-3-kurs.pdf" },
          { name: "4 курс", pdfUrl: "http://kk.nau.edu.ua/files/denna-4-kurs.pdf" },
        ],
      },
    ],
  },
  {
    id: "zaochna-2025-2026",
    title: "Заочна форма навчання",
    academicYear: "2025-2026",
    studyForm: "Заочна",
    sessions: [
      {
        title: "Розклад занять заочної форми навчання (новий рік)",
        groups: [
          { name: "Інформація буде додана пізніше", pdfUrl: "#" },
        ],
      },
    ],
  },
];

export const ScheduleSection = () => {
  const [expandedPeriods, setExpandedPeriods] = useState<Set<string>>(
    new Set(["zaochna-2024-2025"])
  );
  const [expandedSessions, setExpandedSessions] = useState<Set<string>>(
    new Set()
  );

  const togglePeriod = (id: string) => {
    setExpandedPeriods((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleSession = (sessionKey: string) => {
    setExpandedSessions((prev) => {
      const next = new Set(prev);
      if (next.has(sessionKey)) {
        next.delete(sessionKey);
      } else {
        next.add(sessionKey);
      }
      return next;
    });
  };

  const handleOpenPdf = (url: string, groupName: string) => {
    if (url === "#") {
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="space-y-6">
      {scheduleData.map((period, periodIndex) => {
        const isPeriodExpanded = expandedPeriods.has(period.id);

        return (
          <Card
            key={period.id}
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
              onClick={() => togglePeriod(period.id)}
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
                    <div className="mt-1 flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className="text-xs font-normal"
                      >
                        {period.academicYear} н.р.
                      </Badge>
                      <Badge
                        variant={
                          period.studyForm === "Денна" ? "default" : "outline"
                        }
                        className="text-xs font-normal"
                      >
                        {period.studyForm} форма
                      </Badge>
                    </div>
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
                  {period.sessions.map((session, sessionIndex) => {
                    const sessionKey = `${period.id}-${sessionIndex}`;
                    const isSessionExpanded = expandedSessions.has(sessionKey);

                    return (
                      <div
                        key={sessionKey}
                        className={cn(
                          "rounded-lg border bg-card transition-all duration-200",
                          "animate-in fade-in slide-in-from-left-2",
                          isSessionExpanded && "bg-muted/30"
                        )}
                        style={{
                          animationDelay: `${sessionIndex * 50}ms`,
                          animationFillMode: "backwards",
                        }}
                      >
                        <button
                          onClick={() => toggleSession(sessionKey)}
                          className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-muted/50"
                        >
                          <div className="flex items-center gap-3">
                            <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            <span className="font-medium text-sm md:text-base">
                              {session.title}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {session.groups.length} груп
                            </Badge>
                          </div>
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 text-muted-foreground transition-transform duration-200",
                              isSessionExpanded && "rotate-180"
                            )}
                          />
                        </button>

                        <div
                          className={cn(
                            "grid transition-all duration-200 ease-in-out",
                            isSessionExpanded
                              ? "grid-rows-[1fr] opacity-100"
                              : "grid-rows-[0fr] opacity-0"
                          )}
                        >
                          <div className="overflow-hidden">
                            <div className="grid gap-2 px-4 pb-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                              {session.groups.map((group, groupIndex) => (
                                <button
                                  key={group.name}
                                  onClick={() =>
                                    handleOpenPdf(group.pdfUrl, group.name)
                                  }
                                  disabled={group.pdfUrl === "#"}
                                  className={cn(
                                    "group flex items-center gap-3 rounded-lg border p-3 text-left transition-all duration-200",
                                    "animate-in fade-in zoom-in-95",
                                    group.pdfUrl !== "#"
                                      ? "hover:border-blue-500 hover:bg-blue-50 hover:shadow-sm dark:hover:bg-blue-900/20"
                                      : "cursor-not-allowed opacity-50"
                                  )}
                                  style={{
                                    animationDelay: `${groupIndex * 30}ms`,
                                    animationFillMode: "backwards",
                                  }}
                                >
                                  <div
                                    className={cn(
                                      "rounded-lg p-2 transition-colors",
                                      group.pdfUrl !== "#"
                                        ? "bg-red-100 text-red-600 group-hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400"
                                        : "bg-gray-100 text-gray-400 dark:bg-gray-800"
                                    )}
                                  >
                                    <FileText className="h-4 w-4" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium text-sm truncate">
                                      {group.name}
                                    </p>
                                    {group.pdfUrl !== "#" && (
                                      <p className="text-xs text-muted-foreground">
                                        Натисніть для перегляду
                                      </p>
                                    )}
                                  </div>
                                  {group.pdfUrl !== "#" && (
                                    <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                                  )}
                                </button>
                              ))}
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
      })}
    </div>
  );
};
