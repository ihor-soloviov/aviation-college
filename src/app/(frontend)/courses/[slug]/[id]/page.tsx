import { notFound, permanentRedirect } from "next/navigation";
import { getPayloadCourseByCode } from "@/lib/payload-courses";
import { isUnavailable } from "@/lib/data-result";
import { DataUnavailable } from "@/components/common/DataUnavailable/DataUnavailable";

export const dynamic = "force-dynamic";

/**
 * Легасі-редірект зі старих URL /courses/[type]/[id] (type: fulltime|parttime,
 * id: код спеціальності) на нові /courses/[slug]. Сегмент названо [slug] лише
 * через обмеження Next.js — на одному рівні не можна мати [slug] і [type].
 */
export default async function LegacyCoursePage({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const { slug: type, id } = await params;

  if (type !== "fulltime" && type !== "parttime") {
    notFound();
  }

  const course = await getPayloadCourseByCode(id);
  if (isUnavailable(course)) return <DataUnavailable />;
  if (!course) {
    notFound();
  }

  permanentRedirect(`/courses/${course.slug}`);
}
