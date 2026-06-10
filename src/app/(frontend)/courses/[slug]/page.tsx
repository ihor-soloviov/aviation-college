import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BadgeCheck,
  Briefcase,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  FileText,
  GraduationCap,
  Mail,
  Phone,
} from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getPayloadCourseBySlug,
  getPayloadRelatedCourses,
} from "@/lib/payload-courses";
import {
  CATEGORY_ICONS,
  CATEGORY_LABELS,
  FORM_LABELS,
  LEVEL_LABELS,
} from "@/lib/courseMeta";
import Course from "@/components/Courses/Course/Course";

export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await getPayloadCourseBySlug(slug);
  if (!course) return { title: "Програму не знайдено" };
  return {
    title: `${course.title} — ${LEVEL_LABELS[course.level]}`,
    description: course.excerpt,
  };
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-1 h-6 rounded-full bg-blue-600" />
      <h2 className="text-2xl font-bold tracking-tight">{children}</h2>
    </div>
  );
}

function InfoRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1 py-3 border-b last:border-b-0">
      <span className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <span className="text-sm font-medium leading-snug">{children}</span>
    </div>
  );
}

export default async function CoursePage({ params }: { params: Params }) {
  const { slug } = await params;
  const course = await getPayloadCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const related = await getPayloadRelatedCourses(course);
  const IconComponent = CATEGORY_ICONS[course.category];

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      {/* Hero */}
      <section className="relative overflow-hidden bg-blue-950 text-white">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
          aria-hidden
        />
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-blue-600/30 blur-3xl" aria-hidden />
        <div className="container relative z-10 mx-auto px-4 pt-12 pb-20 lg:pt-16 lg:pb-28">
          <nav
            aria-label="Хлібні крихти"
            className="flex items-center gap-1 text-sm text-blue-200 mb-8"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Головна
            </Link>
            <ChevronRight className="h-4 w-4" aria-hidden />
            <Link
              href="/courses"
              className="hover:text-white transition-colors"
            >
              Освітні програми
            </Link>
            <ChevronRight className="h-4 w-4" aria-hidden />
            <span className="text-white/80 truncate max-w-48 sm:max-w-none">
              {course.title}
            </span>
          </nav>

          <div className="max-w-3xl space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <div className="rounded-full bg-white/10 p-2.5">
                <IconComponent className="h-5 w-5 text-blue-200" />
              </div>
              <Badge className="bg-white/10 hover:bg-white/10 text-white border-white/20 font-mono">
                {course.code}
              </Badge>
              <Badge className="bg-blue-600 hover:bg-blue-600 text-white">
                {LEVEL_LABELS[course.level]}
              </Badge>
              {course.forms.map((form) => (
                <Badge
                  key={form}
                  variant="outline"
                  className="border-white/30 text-blue-100"
                >
                  {FORM_LABELS[form]} форма
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-balance">
              {course.title}
            </h1>
            <p className="text-lg text-blue-100 leading-relaxed">
              {course.excerpt}
            </p>
            <p className="text-sm text-blue-200">
              Напрямок: {CATEGORY_LABELS[course.category]}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-12 pt-10">
            <section className="space-y-4">
              <SectionHeading>Про програму</SectionHeading>
              {course.aboutParagraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-muted-foreground leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </section>

            {course.whatYouLearn.length > 0 && (
              <section className="space-y-4">
                <SectionHeading>Чого ви навчитеся</SectionHeading>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {course.whatYouLearn.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 rounded-lg border bg-background p-3.5 text-sm leading-snug"
                    >
                      <CheckCircle2 className="h-4.5 w-4.5 mt-0.5 shrink-0 text-blue-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {course.careers.length > 0 && (
              <section className="space-y-4">
                <SectionHeading>Ким ви зможете працювати</SectionHeading>
                <ul className="space-y-2.5">
                  {course.careers.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm">
                      <div className="rounded-md bg-blue-100 dark:bg-blue-900 p-1.5 mt-px">
                        <Briefcase className="h-3.5 w-3.5 text-blue-600 dark:text-blue-300" />
                      </div>
                      <span className="pt-1">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className="space-y-4">
              <SectionHeading>Вступ та фінансування</SectionHeading>
              <div className="rounded-xl border bg-background p-6 space-y-4">
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {course.hasBudget && (
                    <div className="flex items-center gap-2 text-sm font-medium text-emerald-700 dark:text-emerald-400">
                      <BadgeCheck className="h-4 w-4" />
                      Бюджетні місця (державне замовлення)
                    </div>
                  )}
                  {course.hasContract && (
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      Навчання за контрактом
                    </div>
                  )}
                </div>
                {course.fundingNote && (
                  <p className="text-sm text-muted-foreground">
                    {course.fundingNote}
                  </p>
                )}
                {course.admission && (
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">
                      Умови вступу:{" "}
                    </span>
                    {course.admission}
                  </p>
                )}
                <Button
                  asChild
                  variant="outline"
                  className="hover:border-blue-400 hover:text-blue-600"
                >
                  <Link href="/entrants/entrance-2025">
                    <FileText className="h-4 w-4 mr-2" />
                    Документи вступної кампанії
                  </Link>
                </Button>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1 pt-10 lg:pt-0">
            <div className="lg:-mt-16 lg:sticky lg:top-24 space-y-6">
              <Card className="shadow-lg border-blue-100 dark:border-blue-900">
                <CardHeader>
                  <CardTitle className="text-xl">
                    Інформація про програму
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <InfoRow label="Код спеціальності">
                    <span className="font-mono">{course.code}</span>
                  </InfoRow>
                  <InfoRow label="Рівень освіти">
                    <span className="flex items-center gap-1.5">
                      <GraduationCap className="h-4 w-4 text-blue-600" />
                      {LEVEL_LABELS[course.level]}
                    </span>
                  </InfoRow>
                  <InfoRow label="Форма навчання">
                    <span className="flex flex-wrap gap-1.5">
                      {course.forms.map((form) => (
                        <Badge key={form} variant="secondary">
                          {FORM_LABELS[form]}
                        </Badge>
                      ))}
                    </span>
                  </InfoRow>
                  <InfoRow label="Термін навчання">
                    <span className="flex items-start gap-1.5">
                      <CalendarClock className="h-4 w-4 mt-0.5 shrink-0 text-blue-600" />
                      {course.duration}
                    </span>
                  </InfoRow>
                  <InfoRow label="Фінансування">
                    <span className="space-y-1.5">
                      {course.hasBudget && (
                        <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                          <BadgeCheck className="h-4 w-4 shrink-0" />
                          Бюджетні місця
                        </span>
                      )}
                      {course.hasContract && (
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-600" />
                          Контракт
                        </span>
                      )}
                    </span>
                  </InfoRow>

                  <div className="pt-5 space-y-3">
                    <Button
                      asChild
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      size="lg"
                    >
                      <a href="mailto:vstup.aviacollege@gmail.com">
                        Подати заявку
                      </a>
                    </Button>
                  </div>

                  <div className="pt-5 mt-5 border-t">
                    <p className="text-sm text-muted-foreground mb-2">
                      Потрібна консультація приймальної комісії?
                    </p>
                    <div className="space-y-2">
                      <a
                        href="tel:+380672967175"
                        className="flex items-center gap-2 text-sm hover:text-blue-600 transition-colors"
                      >
                        <Phone className="h-4 w-4 text-blue-600" />
                        067-296-71-75
                      </a>
                      <a
                        href="mailto:vstup.aviacollege@gmail.com"
                        className="flex items-center gap-2 text-sm hover:text-blue-600 transition-colors"
                      >
                        <Mail className="h-4 w-4 text-blue-600" />
                        vstup.aviacollege@gmail.com
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-16 bg-background dark:bg-blue-900/10">
          <div className="container mx-auto px-4">
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">
                  Суміжні програми
                </h2>
                <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full" />
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {related.map((relatedCourse) => (
                  <Course key={relatedCourse.id} course={relatedCourse} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
