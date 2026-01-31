import { DefaultPageContent } from "@/types/part-147";
import {
  Building,
  Users,
  BookOpen,
  Newspaper,
  Settings,
  Calendar,
  Mail,
} from "lucide-react";

export const pageContent: DefaultPageContent[] = [
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
        href: "/courses#courses-filters",
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
        isInDevelopment: true,
      },
    ],
  },
];
