import { PageTitle } from "@/components/common/PageTitle/PageTitle";
import { EducationalProcessPage } from "@/components/Students/EducationalProcess";
import { BackLink } from "@/components/common/BackLink/BackLink";

export const metadata = {
  title: "Графік освітнього процесу | Криворізький фаховий коледж НАУ",
  description:
    "Графік освітнього процесу для студентів денної та заочної форми навчання Криворізького фахового коледжу НАУ",
};

export default function EducationalProcessPageRoute() {
  return (
    <section className="bg-gray-50 py-16 md:py-24 dark:bg-gray-900">
      <div className="container mx-auto space-y-8">
        <BackLink href="/students" label="Здобувачам освіти" />
        <PageTitle
          title="Графік освітнього процесу"
          description="Графіки навчального процесу на 2023-2024, 2024-2025 та 2025-2026 навчальні роки для денної та заочної форми навчання"
        />
        <EducationalProcessPage />
      </div>
    </section>
  );
}
