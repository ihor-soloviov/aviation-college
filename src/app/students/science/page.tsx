import { Metadata } from "next";
import { SciencePage } from "@/components/Students/Science";
import { BackLink } from "@/components/common/BackLink/BackLink";
import { PageTitle } from "@/components/common/PageTitle/PageTitle";

export const metadata: Metadata = {
  title: "Наукове товариство коледжу | Криворізький фаховий коледж НАУ",
  description:
    "Наукове товариство коледжу (НТК) - наукові гуртки, конференції, олімпіади та досягнення здобувачів освіти Криворізького фахового коледжу НАУ",
  keywords: [
    "наукове товариство",
    "НТК",
    "наукові гуртки",
    "конференції",
    "олімпіади",
    "криворізький коледж",
  ],
};

export default function ScienceRoute() {
  return (
    <section className="bg-gray-50 py-16 md:py-24 dark:bg-gray-900">
      <div className="container mx-auto space-y-8">
        <BackLink href="/students" label="Здобувачам освіти" />
        <PageTitle
          title="Наукове товариство коледжу"
          description="Наукова діяльність, гуртки, конференції та олімпіади"
        />
        <SciencePage />
      </div>
    </section>
  );
}
