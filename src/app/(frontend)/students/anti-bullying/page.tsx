import { Metadata } from "next";
import { AntiBullyingPage } from "@/components/Students/AntiBullying";
import { BackLink } from "@/components/common/BackLink/BackLink";
import { PageTitle } from "@/components/common/PageTitle/PageTitle";

export const metadata: Metadata = {
  title: "Протидія булінгу | Криворізький фаховий коледж НАУ",
  description:
    "Заходи протидії булінгу в Криворізькому фаховому коледжі НАУ. Положення, план протидії, методичні матеріали та контакти для звернення.",
  keywords: [
    "протидія булінгу",
    "безпечне середовище",
    "цькування",
    "психологічна допомога",
    "криворізький коледж",
  ],
};

export default function AntiBullyingRoute() {
  return (
    <section className="bg-gray-50 py-16 md:py-24 dark:bg-gray-900">
      <div className="container mx-auto space-y-8">
        <BackLink href="/students" label="Здобувачам освіти" />
        <PageTitle
          title="Протидія булінгу"
          description="Заходи щодо запобігання та протидії булінгу в закладі освіти"
        />
        <AntiBullyingPage />
      </div>
    </section>
  );
}
