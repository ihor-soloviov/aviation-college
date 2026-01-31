import { PageTitle } from "@/components/common/PageTitle/PageTitle";
import { ScheduleSection } from "@/components/Students/Schedule/ScheduleSection";
import { BackLink } from "@/components/common/BackLink/BackLink";

export const metadata = {
  title: "Розклад занять | Криворізький фаховий коледж НАУ",
  description:
    "Розклад навчальних занять для студентів денної та заочної форми навчання Криворізького фахового коледжу НАУ",
};

export default function SchedulePage() {
  return (
    <section className="bg-gray-50 py-16 md:py-24 dark:bg-gray-900">
      <div className="container mx-auto space-y-8">
        <BackLink href="/students" label="Здобувачам освіти" />
        <PageTitle
          title="Розклад занять"
          description="Розклад навчальних занять на 2024-2025 та 2025-2026 навчальні роки для денної та заочної форми навчання"
        />
        <ScheduleSection />
      </div>
    </section>
  );
}
