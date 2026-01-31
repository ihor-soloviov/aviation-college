"use client";

import { Calendar, ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { SchedulePeriod } from "./types";
import { SessionCard } from "./SessionCard";

type PeriodCardProps = {
  period: SchedulePeriod;
  periodIndex: number;
  isPeriodExpanded: boolean;
  expandedSessions: Set<string>;
  onTogglePeriod: () => void;
  onToggleSession: (sessionKey: string) => void;
  onOpenPdf: (url: string) => void;
};

export const PeriodCard = ({
  period,
  periodIndex,
  isPeriodExpanded,
  expandedSessions,
  onTogglePeriod,
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
              <div className="mt-1 flex items-center gap-2">
                <Badge variant="secondary" className="text-xs font-normal">
                  {period.academicYear} н.р.
                </Badge>
                <Badge
                  variant={period.studyForm === "Денна" ? "default" : "outline"}
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
          </CardContent>
        </div>
      </div>
    </Card>
  );
};
