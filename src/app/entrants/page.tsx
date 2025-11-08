import { PageTitle } from "@/components/common/PageTitle/PageTitle";
import { SectionTitle } from "@/components/common/SectionTitle/SectionTitle";
import { LinksNavigation } from "@/components/Part-147/Navigation/LinksNavigation";
import { Part147PageContent } from "@/types/part-147";
import {
  Building,
  Users,
  Newspaper,
  Settings,
  BookOpen,
  Mail,
  Calendar,
} from "lucide-react";

export const pageContent: Part147PageContent[] = [
  {
    title: "Вступникам",
    description: "Інформація для вступників коледжу",
    icon: <Building className="h-5 w-5" />,
    links: [
      {
        title: "Приймальна комісія",
        href: "/entrants/admission-commission",
        description: "Інформація про прийом до коледжу",
        icon: <Users className="h-4 w-4" />,
      },
      {
        title: "Підготовчі курси до вступу",
        href: "/entrants/preparatory-courses",
        description: "Інформація про підготовчі курси до вступу до коледжу",
        icon: <BookOpen className="h-4 w-4" />,
      },
      {
        title: "Інформаційний буклет",
        href: "/entrants/information-booklet",
        description: "Інформаційний буклет для вступників до коледжу",
        icon: <Newspaper className="h-4 w-4" />,
      },
      {
        title: "Спеціальності підготовки",
        href: "/entrants/specialties",
        description:
          "Інформація про спеціальності підготовки до вступу до коледжу",
        icon: <Settings className="h-4 w-4" />,
      },
      {
        title: "Вступ 2025",
        href: "/entrants/entrance-2025",
        description: "Інформація про вступ 2025 до коледжу",
        icon: <Calendar className="h-4 w-4" />,
      },
      {
        title: "Архів приймальної інформації",
        href: "/entrants/admission-information-archive",
        description: "Архів приймальної інформації до коледжу",
        icon: <Mail className="h-4 w-4" />,
      },
    ],
  },
];

export default function EntrantsPage() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 md:py-24">
      <div className="container space-y-12 mx-auto">
        {pageContent.map(({ title, description, icon, links }) => (
          <div key={title} className="space-y-6">
            <PageTitle title={title} description={description} />
            <SectionTitle
              icon={icon}
              title="Вступникам"
              description="Інформація для вступників коледжу"
            />
            <LinksNavigation links={links} />
          </div>
        ))}
      </div>
    </section>
  );
}
