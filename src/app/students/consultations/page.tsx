import { PageTitle } from "@/components/common/PageTitle/PageTitle";
import { ConsultationsPage } from "@/components/Students/Consultations";
import { BackLink } from "@/components/common/BackLink/BackLink";

export const metadata = {
  title: "Графік консультацій | Криворізький фаховий коледж НАУ",
  description:
    "Графік консультацій для студентів Криворізького фахового коледжу НАУ",
};

export default function ConsultationsPageRoute() {
  return (
    <section className="bg-gray-50 py-16 md:py-24 dark:bg-gray-900">
      <div className="container mx-auto space-y-8">
        <BackLink href="/students" label="Здобувачам освіти" />
        <PageTitle
          title="Графік консультацій"
          description="Графік консультацій викладачів за навчальними роками"
        />
        <ConsultationsPage />
      </div>
    </section>
  );
}
