import { Metadata } from "next";
import { BackLink } from "@/components/common/BackLink/BackLink";
import { PageTitle } from "@/components/common/PageTitle/PageTitle";
import { qualificationRequirementsContent } from "@/lib/teachers/attestation.data";

export const metadata: Metadata = {
  title:
    "Вимоги до кваліфікаційних категорій | Криворізький фаховий коледж НАУ",
  description:
    "Вимоги до кваліфікаційних категорій та педагогічних звань педагогічних працівників.",
};

export default function QualificationRequirementsPage() {
  return (
    <section className="bg-gray-50 py-16 md:py-24 dark:bg-gray-900">
      <div className="container mx-auto max-w-3xl space-y-8">
        <BackLink href="/teachers" label="Викладачам" />
        <PageTitle
          title="Вимоги до кваліфікаційних категорій та педагогічних звань"
          description="Методичні поради педагогічним працівникам"
        />
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <div className="whitespace-pre-line text-muted-foreground leading-relaxed">
            {qualificationRequirementsContent}
          </div>
        </div>
      </div>
    </section>
  );
}
