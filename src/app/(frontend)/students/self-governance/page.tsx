import { Metadata } from "next";
import { SelfGovernancePage } from "@/components/Students/SelfGovernance";
import { BackLink } from "@/components/common/BackLink/BackLink";
import { PageTitle } from "@/components/common/PageTitle/PageTitle";

export const metadata: Metadata = {
  title: "Курсантське самоврядування | Криворізький фаховий коледж НАУ",
  description:
    "Курсантське (студентське) самоврядування Криворізького фахового коледжу НАУ. Положення, план роботи, склад органів, звітність та галерея.",
  keywords: [
    "студентське самоврядування",
    "курсантське самоврядування",
    "студентська рада",
    "криворізький коледж",
  ],
};

export default function SelfGovernanceRoute() {
  return (
    <section className="bg-gray-50 py-16 md:py-24 dark:bg-gray-900">
      <div className="container mx-auto space-y-8">
        <BackLink href="/students" label="Здобувачам освіти" />
        <PageTitle
          title="Курсантське самоврядування"
          description="Органи самоврядування, положення, план роботи та звітність"
        />
        <SelfGovernancePage />
      </div>
    </section>
  );
}
