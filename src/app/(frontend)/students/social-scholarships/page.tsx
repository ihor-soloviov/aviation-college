import { Metadata } from "next";
import { SocialScholarshipsPage } from "@/components/Students/SocialScholarships";
import { BackLink } from "@/components/common/BackLink/BackLink";
import { PageTitle } from "@/components/common/PageTitle/PageTitle";

export const metadata: Metadata = {
  title: "Соціальні стипендії | Криворізький фаховий коледж НАУ",
  description:
    "Інформація про соціальні стипендії для здобувачів освіти Криворізького фахового коледжу НАУ. Категорії осіб, порядок отримання та необхідні документи.",
  keywords: [
    "соціальна стипендія",
    "пільги",
    "соціальна підтримка",
    "студенти",
    "криворізький коледж",
  ],
};

export default function SocialScholarshipsRoute() {
  return (
    <section className="bg-gray-50 py-16 md:py-24 dark:bg-gray-900">
      <div className="container mx-auto space-y-8">
        <BackLink href="/students" label="Здобувачам освіти" />
        <PageTitle
          title="Соціальні стипендії"
          description="Право на отримання соціальної стипендії для пільгових категорій"
        />
        <SocialScholarshipsPage />
      </div>
    </section>
  );
}
