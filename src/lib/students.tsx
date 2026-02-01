import { NavigationCategory } from "@/components/common/ExpandableNavigation";
import {
  Calendar,
  CreditCard,
  BookOpen,
  Users,
  GraduationCap,
  Microscope,
} from "lucide-react";

export const studentsCategories: NavigationCategory[] = [
  {
    title: "Розклад та графіки",
    description: "Розклади занять, екзаменів, консультацій та графік освітнього процесу",
    icon: <Calendar className="h-5 w-5" />,
    links: [
      {
        title: "Розклад занять",
        href: "/students/schedule",
      },
      {
        title: "Графік освітнього процесу",
        href: "/students/educational-process",
      },
      {
        title: "Графік консультацій",
        href: "/students/consultations",
      },
      {
        title: "Розклад екзаменів",
        href: "/students/exams",
      },
    ],
  },
  {
    title: "Оплата та документи",
    description: "Вартість навчання, реквізити для оплати та договори",
    icon: <CreditCard className="h-5 w-5" />,
    links: [
      {
        title: "Розмір плати за навчання",
        href: "/students/tuition-fees",
        description: "Вартість навчання, підготовки, перепідготовки та проживання",
      },
      {
        title: "Реквізити для оплати",
        href: "/students/payment-details",
      },
      {
        title: "Договори",
        href: "/students/contracts",
      },
    ],
  },
  {
    title: "Навчальний процес",
    description: "Практика, дисципліни за вибором та дистанційне навчання",
    icon: <BookOpen className="h-5 w-5" />,
    links: [
      {
        title: "Практичне навчання",
        href: "/students/practical-training",
        isInDevelopment: true,
      },
      {
        title: "Каталог дисциплін за вибором",
        href: "/students/elective-courses",
        isInDevelopment: true,
      },
      {
        title: "Дистанційне навчання",
        href: "/students/distance-learning",
        isInDevelopment: true,
      },
    ],
  },
  {
    title: "Студентське життя",
    description: "Правила поведінки, самоврядування та безпечне середовище",
    icon: <Users className="h-5 w-5" />,
    links: [
      {
        title: "Правила поведінки здобувача освіти",
        href: "/students/code-of-conduct",
        isInDevelopment: true,
      },
      {
        title: "Курсантське самоврядування",
        href: "/students/self-governance",
        isInDevelopment: true,
      },
      {
        title: "Протидія булінгу",
        href: "/students/anti-bullying",
        isInDevelopment: true,
      },
    ],
  },
  {
    title: "Стипендії",
    description: "Академічна стипендія, рейтинг та соціальна підтримка",
    icon: <GraduationCap className="h-5 w-5" />,
    links: [
      {
        title: "Стипендія (рейтинг)",
        href: "/students/scholarship-rating",
        isInDevelopment: true,
      },
      {
        title: "Соціальні стипендії",
        href: "/students/social-scholarships",
        isInDevelopment: true,
      },
    ],
  },
  {
    title: "Наука та ресурси",
    description: "Наукова діяльність та корисні посилання",
    icon: <Microscope className="h-5 w-5" />,
    links: [
      {
        title: "Наука",
        href: "/students/science",
        isInDevelopment: true,
      },
      {
        title: "Корисні посилання",
        href: "/students/useful-links",
        isInDevelopment: true,
      },
    ],
  },
];
