import { PageTitle } from "@/components/common/PageTitle/PageTitle";
import { PaymentDetailsPage } from "@/components/Students/PaymentDetails";
import { BackLink } from "@/components/common/BackLink/BackLink";

export const metadata = {
  title: "Реквізити для оплати | Криворізький фаховий коледж НАУ",
  description:
    "Реквізити для оплати навчання та інших послуг Криворізького фахового коледжу НАУ через Приват24",
};

export default function PaymentDetailsPageRoute() {
  return (
    <section className="bg-gray-50 py-16 md:py-24 dark:bg-gray-900">
      <div className="container mx-auto space-y-8">
        <BackLink href="/students" label="Здобувачам освіти" />
        <PageTitle
          title="Реквізити для оплати"
          description="Оплата навчання та інших послуг через платіжну систему Приват24"
        />
        <PaymentDetailsPage />
      </div>
    </section>
  );
}
