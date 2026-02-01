import { Metadata } from "next";
import { UsefulLinksPage } from "@/components/Students/UsefulLinks";
import { BackLink } from "@/components/common/BackLink/BackLink";
import { PageTitle } from "@/components/common/PageTitle/PageTitle";

export const metadata: Metadata = {
  title: "Корисні посилання | Криворізький фаховий коледж НАУ",
  description:
    "Психологічний вісник та корисні матеріали для здобувачів освіти Криворізького фахового коледжу НАУ. Поради психолога, рекомендації та підтримка.",
  keywords: [
    "психологічний вісник",
    "корисні посилання",
    "психологічна допомога",
    "поради студентам",
    "криворізький коледж",
  ],
};

export default function UsefulLinksRoute() {
  return (
    <section className="bg-gray-50 py-16 md:py-24 dark:bg-gray-900">
      <div className="container mx-auto space-y-8">
        <BackLink href="/students" label="Здобувачам освіти" />
        <PageTitle
          title="Корисні посилання"
          description="Психологічний вісник та корисні матеріали для здобувачів освіти"
        />
        <UsefulLinksPage />
      </div>
    </section>
  );
}
