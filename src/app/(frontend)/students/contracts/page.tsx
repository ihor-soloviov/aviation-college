import { PageTitle } from "@/components/common/PageTitle/PageTitle";
import { ContractsPage } from "@/components/Students/Contracts";
import { BackLink } from "@/components/common/BackLink/BackLink";

export const metadata = {
  title: "Договори | Криворізький фаховий коледж НАУ",
  description:
    "Договори про надання освітніх послуг для здобувачів освіти Криворізького фахового коледжу НАУ",
};

export default function ContractsPageRoute() {
  return (
    <section className="bg-gray-50 py-16 md:py-24 dark:bg-gray-900">
      <div className="container mx-auto space-y-8">
        <BackLink href="/students" label="Здобувачам освіти" />
        <PageTitle
          title="Договори"
          description="Зразки договорів про надання освітніх послуг для контрактної та бюджетної форми навчання"
        />
        <ContractsPage />
      </div>
    </section>
  );
}
