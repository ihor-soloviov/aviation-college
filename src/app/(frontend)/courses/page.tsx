import { CourseSection } from "@/components/Courses/CourseSection/CourseSection";
import { CoursesFilterBar } from "@/components/Courses/CoursesFilterBar/CoursesFilterBar";
import { getPayloadCourses } from "@/lib/payload-courses";
import { CourseCardData, CourseCategory } from "@/types/courses";
import { GraduationCap, Award, SearchX } from "lucide-react";
import { PageTitle } from "@/components/common/PageTitle/PageTitle";

export const dynamic = "force-dynamic";

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

function matchCourse(
  c: CourseCardData,
  form?: string,
  cat?: string,
  q?: string,
) {
  if (form && !c.forms.includes(form as CourseCardData["forms"][number]))
    return false;
  if (cat && c.category !== cat) return false;
  if (q) {
    const lower = q.toLowerCase();
    if (
      !c.title.toLowerCase().includes(lower) &&
      !c.excerpt.toLowerCase().includes(lower)
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
      <h3 className="text-lg font-semibold mb-2">Програм не знайдено</h3>
      <p className="text-muted-foreground max-w-md">
        За обраними фільтрами немає доступних освітніх програм. Спробуйте
        змінити параметри або скинути фільтри.
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

  const allCourses = await getPayloadCourses();
  const filtered = allCourses.filter((c) => matchCourse(c, form, cat, q));

  const fmb = filtered.filter((c) => c.level === "fmb");
  const bachelor = filtered.filter((c) => c.level === "bachelor");

  const showFmb = !level || level === "fmb";
  const showBachelor = !level || level === "bachelor";
  const totalCount =
    (showFmb ? fmb.length : 0) + (showBachelor ? bachelor.length : 0);

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="container space-y-12 mx-auto">
        <PageTitle
          title="Освітні програми"
          description="Технічні та авіаційні спеціальності з бюджетними місцями — від фахового молодшого бакалавра до бакалавра."
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
                  {showFmb && fmb.length > 0 && (
                    <CourseSection
                      id="fmb"
                      title="Фаховий молодший бакалавр"
                      icon={GraduationCap}
                      courses={fmb}
                    />
                  )}
                  {showBachelor && bachelor.length > 0 && (
                    <CourseSection
                      id="bachelor"
                      title="Бакалавр"
                      icon={Award}
                      courses={bachelor}
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
