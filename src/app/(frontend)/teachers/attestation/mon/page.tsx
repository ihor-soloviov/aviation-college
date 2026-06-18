import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackLink } from "@/components/common/BackLink/BackLink";
import { PageTitle } from "@/components/common/PageTitle/PageTitle";
import { getLinkListBySlug } from "@/lib/link-lists";
import { linkAttrs } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title:
    "МОН про атестацію | Криворізький фаховий коледж НАУ",
  description:
    "Міністерство освіти і науки України про атестацію педагогічних працівників (листи, накази).",
};

export default async function MonPage() {
  const list = await getLinkListBySlug("attestation-mon");
  if (!list) notFound();

  return (
    <section className="bg-gray-50 py-16 md:py-24 dark:bg-gray-900">
      <div className="container mx-auto max-w-3xl space-y-8">
        <BackLink href="/teachers" label="Викладачам" />
        <PageTitle
          title="Міністерство освіти і науки України про атестацію (листи, накази)"
          description="Нормативні документи МОН України"
        />
        <ul className="space-y-3">
          {list.items.map((item, index) => {
            return (
              <li key={index}>
                <a
                  {...linkAttrs(item.href)}
                  className="flex items-center gap-2 text-blue-600 hover:underline dark:text-blue-400"
                >
                  <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-blue-500" />
                  {item.title}
                  <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
