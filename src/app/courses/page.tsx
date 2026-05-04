import Hero from "@/components/common/Hero/Hero";
import { courses } from "@/lib/courses";
import { CourseSection } from "@/components/Courses/CourseSection/CourseSection";
import { CoursesFilterBar } from "@/components/Courses/CoursesFilterBar/CoursesFilterBar";
import { ICourse, CourseCategory } from "@/types/courses";
import { Sun, Moon, SearchX } from "lucide-react";
import { PageTitle } from "@/components/common/PageTitle/PageTitle";

const LEVEL_VALUES: Record<string, string> = {
  fmb: "Фаховий молодший бакалавр",
  bachelor: "Бакалавр",
};

const VALID_CATEGORIES: CourseCategory[] = [
  "it",
  "engineering",
  "aviation",
  "telecom",
  "management",
];

function pick(v: string | string[] | undefined): string | undefined {
  return typeof v === "string" && v.length ? v : undefined;
}

function matchCourse(c: ICourse, level?: string, cat?: string, q?: string) {
  if (level && c.level !== LEVEL_VALUES[level]) return false;
  if (cat && c.category !== cat) return false;
  if (q) {
    const lower = q.toLowerCase();
    if (
      !c.title.toLowerCase().includes(lower) &&
      !c.description.toLowerCase().includes(lower)
    ) {
      return false;
    }
  }
  return true;
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
        параметри або скинути фільтри.
      </p>
    </div>
  );
}

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const formRaw = pick(sp.form);
  const form =
    formRaw === "fulltime" || formRaw === "parttime" ? formRaw : undefined;
  const levelRaw = pick(sp.level);
  const level =
    levelRaw === "fmb" || levelRaw === "bachelor" ? levelRaw : undefined;
  const catRaw = pick(sp.cat);
  const cat =
    catRaw && (VALID_CATEGORIES as string[]).includes(catRaw)
      ? catRaw
      : undefined;
  const q = pick(sp.q);

  const fulltime = courses.fulltime.filter((c) =>
    matchCourse(c, level, cat, q),
  );
  const parttime = courses.parttime.filter((c) =>
    matchCourse(c, level, cat, q),
  );

  const showFulltime = !form || form === "fulltime";
  const showParttime = !form || form === "parttime";
  const totalCount =
    (showFulltime ? fulltime.length : 0) + (showParttime ? parttime.length : 0);

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="container space-y-12 mx-auto">
        <PageTitle
          title="Навчальні програми"
          description="Комплексні навчальні програми, розроблені для підготовки до успішної кар'єри в авіації."
        />
        <div className="py-8 md:py-12" id="all">
          <div className="container mx-auto px-4">
            <CoursesFilterBar totalCount={totalCount} />
            <section
              className="flex flex-col gap-8 mt-8 scroll-mt-[12vh]"
              id="courses"
            >
              {totalCount === 0 ? (
                <EmptyState />
              ) : (
                <>
                  {showFulltime && fulltime.length > 0 && (
                    <CourseSection
                      id="fulltime"
                      title="Денна форма навчання"
                      icon={Sun}
                      courses={fulltime}
                    />
                  )}
                  {showParttime && parttime.length > 0 && (
                    <CourseSection
                      id="parttime"
                      title="Заочна форма навчання"
                      icon={Moon}
                      courses={parttime}
                    />
                  )}
                </>
              )}
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
