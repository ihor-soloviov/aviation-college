import { Metadata } from "next";
import { ScholarshipRatingPage } from "@/components/Students/ScholarshipRating";
import { BackLink } from "@/components/common/BackLink/BackLink";
import { PageTitle } from "@/components/common/PageTitle/PageTitle";

export const metadata: Metadata = {
  title: "Стипендія (рейтинг) | Криворізький фаховий коледж НАУ",
  description:
    "Рейтинг здобувачів освіти для призначення академічної стипендії за всіма відділеннями Криворізького фахового коледжу НАУ.",
  keywords: [
    "стипендія",
    "рейтинг",
    "академічна стипендія",
    "успішність",
    "криворізький коледж",
  ],
};

export default function ScholarshipRatingRoute() {
  return (
    <section className="bg-gray-50 py-16 md:py-24 dark:bg-gray-900">
      <div className="container mx-auto space-y-8">
        <BackLink href="/students" label="Здобувачам освіти" />
        <PageTitle
          title="Стипендія (рейтинг)"
          description="Рейтинг здобувачів освіти для призначення академічної стипендії"
        />
        <ScholarshipRatingPage />
      </div>
    </section>
  );
}
