import { Metadata } from "next";
import { BackLink } from "@/components/common/BackLink/BackLink";
import { PageTitle } from "@/components/common/PageTitle/PageTitle";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

const onlineNppLinks = [
  {
    title: "Лекція до 1 модуля курсу",
    href: "https://www.youtube.com/watch?v=L3YkRQIn5Is",
    isExternal: true,
  },
  {
    title: "Лекція до 2 модуля курсу",
    href: "https://www.youtube.com/watch?v=ytUEObyj0jM",
    isExternal: true,
  },
  {
    title: "Лекція до 3 модуля курсу",
    href: "https://www.youtube.com/watch?v=oW27fnqYQQA",
    isExternal: true,
  },
  {
    title: "Лекція до 4 модуля курсу",
    href: "https://www.youtube.com/watch?v=DW09JMQMJe8",
    isExternal: true,
  },
  {
    title: "Лекція до 5 модуля курсу",
    href: "https://www.youtube.com/watch?v=99IREuV8v-A",
    isExternal: true,
  },
  {
    title: "Онлайн-семінар «Цифрові інструменти Google для вищої освіти»",
    href: "https://www.youtube.com/watch?v=lOJrBNx6wJM",
    isExternal: true,
  },
];

export const metadata: Metadata = {
  title:
    "Онлайн-навчання для НПП | Криворізький фаховий коледж НАУ",
  description:
    "Онлайн-курс «Цифрові інструменти Google для ЗВО та ЗФПО» — лекції та матеріали для навчально-педагогічних працівників.",
};

export default function OnlineNppPage() {
  return (
    <section className="bg-gray-50 py-16 md:py-24 dark:bg-gray-900">
      <div className="container mx-auto max-w-3xl space-y-8">
        <BackLink href="/teachers" label="Викладачам" />
        <PageTitle
          title="Онлайн-навчання для НПП"
          description="Онлайн-курс «Цифрові інструменти Google для ЗВО та ЗФПО»"
        />
        <Card className="overflow-hidden shadow-sm">
          <CardContent className="p-6 sm:p-8">
            <ul className="space-y-3">
              {onlineNppLinks.map((link) => (
                <li key={link.href + link.title}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-blue-500" />
                    <span className="flex-1">{link.title}</span>
                    <ExternalLink className="h-4 w-4 shrink-0 text-gray-400" />
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
