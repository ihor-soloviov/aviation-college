import { Metadata } from "next";
import { BackLink } from "@/components/common/BackLink/BackLink";
import { PageTitle } from "@/components/common/PageTitle/PageTitle";
import { emailContent } from "@/lib/teachers/attestation.data";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title:
    "Адреса електронної пошти атестаційної комісії | Криворізький фаховий коледж НАУ",
  description:
    "Адреса електронної пошти для подання документів до атестаційної комісії.",
};

export default function EmailPage() {
  return (
    <section className="bg-gray-50 py-16 md:py-24 dark:bg-gray-900">
      <div className="container mx-auto max-w-3xl space-y-8">
        <BackLink href="/teachers" label="Викладачам" />
        <PageTitle
          title="Адреса електронної пошти атестаційної комісії"
          description="Подання документів в електронній формі"
        />
        <Card className="overflow-hidden shadow-sm">
          <CardContent className="p-6 sm:p-8">
            <div className="space-y-4">
              <div className="whitespace-pre-line text-muted-foreground leading-relaxed">
                {emailContent.text}
              </div>
              <a
                href={`mailto:${emailContent.email}`}
                className="inline-flex items-center gap-2 text-lg font-medium text-blue-600 hover:underline dark:text-blue-400"
              >
                {emailContent.email}
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
