import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, BadgeCheck, GraduationCap, Sun, Moon } from "lucide-react";
import React, { memo } from "react";
import { CourseCardData } from "@/types/courses";
import { CATEGORY_ICONS, FORM_LABELS, LEVEL_LABELS } from "@/lib/courseMeta";
import Link from "next/link";

const Course = ({ course }: { course: CourseCardData }) => {
  const IconComponent = CATEGORY_ICONS[course.category];
  return (
    <Link href={`/courses/${course.slug}`} className="block h-full">
      <Card className="group relative overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 hover:border-blue-300 dark:hover:border-blue-700 h-full flex flex-col">
        <CardHeader className="flex-1">
          <div className="flex items-start justify-between pb-4">
            <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-3 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
              <IconComponent className="h-6 w-6 text-blue-600 dark:text-blue-300" />
            </div>
            <Badge
              variant="outline"
              className="font-mono text-xs text-muted-foreground"
            >
              {course.code}
            </Badge>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-lg leading-tight">
              {course.title}
            </CardTitle>
            <CardDescription className="text-sm">
              {course.excerpt}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 mt-auto">
          <div className="space-y-2 border-t pt-4">
            <div className="flex items-center justify-between gap-2 text-sm">
              <div className="flex items-center gap-1.5 text-muted-foreground shrink-0">
                <GraduationCap className="h-4 w-4" />
                <span>Рівень</span>
              </div>
              <span className="font-medium text-right">
                {LEVEL_LABELS[course.level]}
              </span>
            </div>

            <div className="flex items-center justify-between gap-2 text-sm">
              <div className="flex items-center gap-1.5 text-muted-foreground shrink-0">
                <Sun className="h-4 w-4" />
                <span>Форма</span>
              </div>
              <span className="flex gap-1">
                {course.forms.map((form) => (
                  <Badge
                    key={form}
                    variant="secondary"
                    className="text-xs font-normal"
                  >
                    {form === "parttime" && (
                      <Moon className="h-3 w-3 mr-1" aria-hidden />
                    )}
                    {FORM_LABELS[form]}
                  </Badge>
                ))}
              </span>
            </div>
          </div>

          {course.hasBudget && (
            <div className="flex items-center gap-1.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 px-3 py-2 text-sm text-emerald-700 dark:text-emerald-400">
              <BadgeCheck className="h-4 w-4 shrink-0" />
              <span>
                Є бюджетні місця
                {course.hasContract && (
                  <span className="text-emerald-600/70 dark:text-emerald-500/70">
                    {" "}
                    · контракт
                  </span>
                )}
              </span>
            </div>
          )}

          <div className="flex items-center justify-center gap-1 pt-1 text-sm font-medium text-blue-600 dark:text-blue-400">
            Докладніше про програму
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default memo(Course);
