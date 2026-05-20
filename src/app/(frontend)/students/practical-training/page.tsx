import { Metadata } from "next";
import { PracticalTrainingPage } from "@/components/Students/PracticalTraining";
import { BackLink } from "@/components/common/BackLink/BackLink";
import { PageTitle } from "@/components/common/PageTitle/PageTitle";

export const metadata: Metadata = {
  title: "Практичне навчання | Криворізький фаховий коледж НАУ",
  description:
    "Бази практичного навчання, положення про проведення практики та інформація для здобувачів освіти Криворізького фахового коледжу НАУ",
  keywords: [
    "практика",
    "практичне навчання",
    "бази практики",
    "виробнича практика",
    "навчальна практика",
    "криворізький коледж",
  ],
};

export default function PracticalTrainingRoute() {
  return (
    <section className="bg-gray-50 py-16 md:py-24 dark:bg-gray-900">
      <div className="container mx-auto space-y-8">
        <BackLink href="/students" label="Здобувачам освіти" />
        <PageTitle
          title="Практичне навчання"
          description="Бази практики, положення та організація практичної підготовки"
        />
        <PracticalTrainingPage />
      </div>
    </section>
  );
}
