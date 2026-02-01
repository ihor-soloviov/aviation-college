"use client";

import { useState } from "react";
import Categories from "@/components/Courses/Categories/Categories";
import CourseToggle from "@/components/Courses/CourseToggle/CourseToggle";
import { CourseSection } from "@/components/Courses/CourseSection/CourseSection";
import { ICourse } from "@/types/courses";
import { Tabs } from "@/components/ui/tabs";
import { Sun, Moon, SearchX } from "lucide-react";

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

export default function ClientCourseList({
  courses,
}: {
  courses: { fulltime: ICourse[]; parttime: ICourse[] };
}) {
  const [category, setCategory] = useState("Всі");
  const [level, setLevel] = useState("Фаховий молодший бакалавр");

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
  const isEmpty = totalCount === 0;

  return (
    <Tabs>
      <div id="courses-filters" className="scroll-mt-[9vh] space-y-4 p-4 rounded-xl bg-muted/30 border">
        <div className="text-center">
          <span className="text-sm text-muted-foreground">Фільтри</span>
        </div>
        <Categories
          current={category}
          onSelect={setCategory}
        />
        <CourseToggle
          current={level}
          onSelect={setLevel}
        />
        {totalCount > 0 && (
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
            />
            <CourseSection
              id="parttime"
              title="Заочна форма навчання"
              icon={Moon}
              courses={parttime}
            />
          </>
        )}
      </section>
    </Tabs>
  );
}
