import { PageTitle } from "@/components/common/PageTitle/PageTitle";
import { ExamsPage } from "@/components/Students/Exams";
import { BackLink } from "@/components/common/BackLink/BackLink";

export const metadata = {
  title: "Розклад екзаменів | Криворізький фаховий коледж НАУ",
  description:
    "Розклад проведення екзаменів та атестації здобувачів освіти Криворізького фахового коледжу НАУ",
};

export default function ExamsPageRoute() {
  return (
    <section className="bg-gray-50 py-16 md:py-24 dark:bg-gray-900">
      <div className="container mx-auto space-y-8">
        <BackLink href="/students" label="Здобувачам освіти" />
        <PageTitle
          title="Розклад екзаменів"
          description="Розклади проведення екзаменів та атестації здобувачів освіти денної та заочної форми навчання"
        />
        <ExamsPage />
      </div>
    </section>
  );
}
