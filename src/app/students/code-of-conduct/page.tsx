import { Metadata } from "next";
import { CodeOfConductPage } from "@/components/Students/CodeOfConduct";
import { BackLink } from "@/components/common/BackLink/BackLink";
import { PageTitle } from "@/components/common/PageTitle/PageTitle";

export const metadata: Metadata = {
  title: "Правила поведінки здобувача освіти | Криворізький фаховий коледж НАУ",
  description:
    "Правила поведінки здобувача освіти в закл��ді освіти Криворізького фахового коледжу НАУ. Норми та стандарти поведінки для студентів.",
  keywords: [
    "правила поведінки",
    "здобувач освіти",
    "студент",
    "норми поведінки",
    "криворізький коледж",
  ],
};

export default function CodeOfConductRoute() {
  return (
    <section className="bg-gray-50 py-16 md:py-24 dark:bg-gray-900">
      <div className="container mx-auto space-y-8">
        <BackLink href="/students" label="Здобувачам освіти" />
        <PageTitle
          title="Правила поведінки здобувача освіти"
          description="Норми та стандарти поведінки для здобувачів освіти"
        />
        <CodeOfConductPage />
      </div>
    </section>
  );
}
