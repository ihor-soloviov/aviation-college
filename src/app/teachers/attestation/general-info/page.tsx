import { Metadata } from "next";
import { BackLink } from "@/components/common/BackLink/BackLink";
import { PageTitle } from "@/components/common/PageTitle/PageTitle";
import { generalInfoContent } from "@/lib/teachers/attestation.data";
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Загальна інформація про атестацію | Криворізький фаховий коледж НАУ",
  description:
    "Загальна інформація про атестацію педагогічних працівників Криворізького фахового коледжу НАУ.",
};

export default function GeneralInfoPage() {
  return (
    <section className="bg-gray-50 py-16 md:py-24 dark:bg-gray-900">
      <div className="container mx-auto max-w-4xl space-y-8">
        <BackLink href="/teachers" label="Викладачам" />
        <PageTitle
          title="Загальна інформація про атестацію педагогічних працівників"
          description="Мета, принципи та умови атестації"
        />

        <Card className="overflow-hidden shadow-sm">
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="shrink-0 rounded-lg bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                <FileText className="h-6 w-6" />
              </div>
              <div className="min-w-0 flex-1 space-y-5 text-muted-foreground leading-relaxed">
                {generalInfoContent.split("\n\n").map((block, i) => {
                  const lines = block.split("\n").filter(Boolean);
                  const bulletLines = lines.filter((l) => l.trim().startsWith("•"));
                  const textLines = lines.filter((l) => !l.trim().startsWith("•"));
                  if (bulletLines.length > 0) {
                    return (
                      <div key={i} className="space-y-2">
                        {textLines.length > 0 && (
                          <p className="text-base">{textLines.join(" ")}</p>
                        )}
                        <ul className="list-none space-y-1.5 pl-0">
                          {bulletLines.map((line, j) => (
                            <li key={j} className="flex gap-2 text-base">
                              <span className="shrink-0 text-blue-500">•</span>
                              <span>{line.replace(/^•\s*/, "").trim()}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  }
                  return (
                    <p key={i} className="text-base">
                      {block}
                    </p>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
