"use client";

import { ChevronDown, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ScheduleSession } from "./types";
import { GroupButton } from "./GroupButton";

type SessionCardProps = {
  session: ScheduleSession;
  sessionKey: string;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  onOpenPdf: (url: string) => void;
};

export const SessionCard = ({
  session,
  sessionKey,
  index,
  isExpanded,
  onToggle,
  onOpenPdf,
}: SessionCardProps) => {
  return (
    <div
      key={sessionKey}
      className={cn(
        "rounded-lg border bg-card transition-all duration-200",
        "animate-in fade-in slide-in-from-left-2",
        isExpanded && "bg-muted/30"
      )}
      style={{
        animationDelay: `${index * 50}ms`,
        animationFillMode: "backwards",
      }}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-muted/50"
      >
        <div className="flex items-center gap-3">
          <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <span className="font-medium text-sm md:text-base">
            {session.title}
          </span>
          <Badge variant="outline" className="text-xs">
            {session.groups.length}{" "}
            {session.groups.length === 1
              ? "група"
              : session.groups.length < 5
                ? "групи"
                : "груп"}
          </Badge>
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200",
            isExpanded && "rotate-180"
          )}
        />
      </button>

      <div
        className={cn(
          "grid transition-all duration-200 ease-in-out",
          isExpanded
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="grid gap-2 px-4 pb-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {session.groups.map((group, groupIndex) => (
              <GroupButton
                key={group.name}
                group={group}
                index={groupIndex}
                onOpenPdf={onOpenPdf}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
