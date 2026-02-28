import { Metadata } from "next";
import { BackLink } from "@/components/common/BackLink/BackLink";
import { PageTitle } from "@/components/common/PageTitle/PageTitle";
import { ordersLinks } from "@/lib/teachers/attestation.data";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title:
    "Накази щодо атестації | Криворізький фаховий коледж НАУ",
  description:
    "Накази щодо атестації педагогічних (науково-педагогічних) працівників.",
};

export default function OrdersPage() {
  return (
    <section className="bg-gray-50 py-16 md:py-24 dark:bg-gray-900">
      <div className="container mx-auto max-w-3xl space-y-8">
        <BackLink href="/teachers" label="Викладачам" />
        <PageTitle
          title="Накази щодо атестації педагогічних (науково-педагогічних) працівників"
          description="Архів наказів коледжу"
        />
        <ul className="space-y-3">
          {ordersLinks.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:underline dark:text-blue-400"
              >
                <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-blue-500" />
                {item.title}
                <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
