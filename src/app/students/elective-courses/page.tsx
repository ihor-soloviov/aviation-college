import { Metadata } from "next";
import { ElectiveCoursesPage } from "@/components/Students/ElectiveCourses";
import { BackLink } from "@/components/common/BackLink/BackLink";
import { PageTitle } from "@/components/common/PageTitle/PageTitle";

export const metadata: Metadata = {
  title: "Каталог дисциплін за вибором | Криворізький фаховий коледж НАУ",
  description:
    "Каталог вибіркових навчальних дисциплін для здобувачів освіти Криворізького фахового коледжу НАУ",
  keywords: [
    "вибіркові дисципліни",
    "каталог дисциплін",
    "навчальний план",
    "криворізький коледж",
  ],
};

export default function ElectiveCoursesRoute() {
  return (
    <section className="bg-gray-50 py-16 md:py-24 dark:bg-gray-900">
      <div className="container mx-auto space-y-8">
        <BackLink href="/students" label="Здобувачам освіти" />
        <PageTitle
          title="Каталог дисциплін за вибором"
          description="Вибіркові навчальні дисципліни для здобувачів освіти"
        />
        <ElectiveCoursesPage />
      </div>
    </section>
  );
}
