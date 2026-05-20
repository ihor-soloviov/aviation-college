import { PageTitle } from "@/components/common/PageTitle/PageTitle";
import { TuitionFeesPage } from "@/components/Students/TuitionFees";
import { BackLink } from "@/components/common/BackLink/BackLink";

export const metadata = {
  title: "Розмір плати за навчання | Криворізький фаховий коледж НАУ",
  description:
    "Вартість навчання, підготовки, перепідготовки, підвищення кваліфікації здобувачів освіти та проживання в гуртожитках Криворізького фахового коледжу НАУ",
};

export default function TuitionFeesPageRoute() {
  return (
    <section className="bg-gray-50 py-16 md:py-24 dark:bg-gray-900">
      <div className="container mx-auto space-y-8">
        <BackLink href="/students" label="Здобувачам освіти" />
        <PageTitle
          title="Розмір плати за навчання"
          description="Вартість навчання, підготовки, перепідготовки та проживання в гуртожитках"
        />
        <TuitionFeesPage />
      </div>
    </section>
  );
}
