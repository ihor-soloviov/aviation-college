"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useTransition } from "react";
import Categories from "@/components/Courses/Categories/Categories";
import CourseToggle from "@/components/Courses/CourseToggle/CourseToggle";
import Course from "@/components/Courses/Course/Course";
import { ICourse } from "@/types/courses";
import { Tabs } from "@/components/ui/tabs";
import { Sun, Moon, SearchX } from "lucide-react";

function CourseSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-6 animate-pulse">
      <div className="flex items-center justify-between pb-8">
        <div className="rounded-full bg-muted h-12 w-12" />
      </div>
      <div className="space-y-3">
        <div className="h-5 bg-muted rounded w-3/4 mx-auto" />
        <div className="h-4 bg-muted rounded w-full" />
        <div className="h-4 bg-muted rounded w-2/3 mx-auto" />
      </div>
      <div className="mt-6 space-y-2">
        <div className="h-4 bg-muted rounded" />
        <div className="h-4 bg-muted rounded" />
      </div>
      <div className="flex justify-center mt-4">
        <div className="h-9 w-24 bg-muted rounded" />
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="rounded-full bg-muted p-4 mb-4">
        <SearchX className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">Курсів не знайдено</h3>
      <p className="text-muted-foreground max-w-md">
        За обраними фільтрами немає доступних курсів. Спробуйте змінити
        категорію або рівень освіти.
      </p>
    </div>
  );
}

function CourseSection({
  id,
  title,
  icon: Icon,
  courses,
  isPending,
}: {
  id: string;
  title: string;
  icon: React.ElementType;
  courses: ICourse[];
  isPending: boolean;
}) {
  if (courses.length === 0) return null;

  return (
    <div id={id} className="space-y-4">
      <div className="flex items-center justify-center gap-3 py-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50">
          <Icon className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-bold">{title}</h2>
          <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
            {courses.length}
          </span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
      </div>
      <div
        className={`
                grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
                transition-opacity duration-300
                ${isPending ? "opacity-50" : "opacity-100"}
            `}
      >
        {isPending
          ? Array.from({ length: 4 }).map((_, i) => <CourseSkeleton key={i} />)
          : courses.map((course, index) => {
              const IconComponent = course.icon;
              return (
                <div
                  key={course.id}
                  className="animate-in fade-in slide-in-from-bottom-4 h-full"
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animationFillMode: "backwards",
                  }}
                >
                  <Course
                    course={course}
                    IconComponent={IconComponent}
                    shouldShowNote={false}
                  />
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default function ClientCourseList({
  courses,
}: {
  courses: { fulltime: ICourse[]; parttime: ICourse[] };
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const category = searchParams.get("category") || "Всі";
  const level = searchParams.get("level") || "Фаховий молодший бакалавр";

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === "Всі") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    startTransition(() => {
      router.replace(`?${params.toString()}`, { scroll: false });
    });
  };

  const filter = (items: ICourse[]) =>
    items.filter((c) => {
      const matchesCategory =
        category === "Всі" || c.note === category.split(" ")[0].toLowerCase();
      const matchesLevel = level === "Всі" || c.level === level;
      return matchesCategory && matchesLevel;
    });

  const fulltime = filter(courses.fulltime);
  const parttime = filter(courses.parttime);
  const totalCount = fulltime.length + parttime.length;
  const isEmpty = totalCount === 0 && !isPending;

  return (
    <Tabs>
      <div id="courses-filters" className="scroll-mt-[9vh] space-y-4 p-4 rounded-xl bg-muted/30 border">
        <div className="text-center">
          <span className="text-sm text-muted-foreground">Фільтри</span>
        </div>
        <Categories
          current={category}
          onSelect={(c) => updateParam("category", c)}
        />
        <CourseToggle
          current={level}
          onSelect={(l) => updateParam("level", l)}
        />
        {!isPending && totalCount > 0 && (
          <div className="text-center pt-2">
            <span className="text-sm text-muted-foreground">
              Знайдено курсів:{" "}
              <span className="font-semibold text-foreground">
                {totalCount}
              </span>
            </span>
          </div>
        )}
      </div>

      <section className="flex flex-col gap-8 mt-8">
        {isEmpty ? (
          <EmptyState />
        ) : (
          <>
            <CourseSection
              id="fulltime"
              title="Денна форма навчання"
              icon={Sun}
              courses={fulltime}
              isPending={isPending}
            />
            <CourseSection
              id="parttime"
              title="Заочна форма навчання"
              icon={Moon}
              courses={parttime}
              isPending={isPending}
            />
          </>
        )}
      </section>
    </Tabs>
  );
}
