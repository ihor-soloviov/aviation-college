import { NavigationCategory } from "@/components/common/ExpandableNavigation";
import {
  Award,
  ScrollText,
  Trophy,
  Monitor,
  BookOpen,
  GraduationCap,
} from "lucide-react";

export const teachersCategories: NavigationCategory[] = [
  {
    title: "Атестація",
    description: "Матеріали та документи з атестації педагогічних працівників.",
    icon: <Award className="h-5 w-5" />,
    links: [
      {
        title: "Загальна інформація про атестацію",
        href: "/teachers/attestation/general-info",
      },
      {
        title: "Графік засідань атестаційної комісії",
        href: "/api/articles/3861/file",
        isExternal: true,
      },
      {
        title: "Список педагогічних працівників, які підлягають атестації в 2026 році",
        href: "/api/articles/3668/file",
        isExternal: true,
      },
      {
        title: "Адреса електронної пошти атестаційної комісії",
        href: "/teachers/attestation/email",
      },
      {
        title: "План підвищення кваліфікації педагогічних (науково-педагогічних) працівників на 2026 рік",
        href: "/api/articles/5563/file",
        isExternal: true,
      },
      {
        title: "Міністерство освіти і науки України про атестацію (листи, накази)",
        href: "/teachers/attestation/mon",
      },
      {
        title: "Положення про атестацію педагогічних працівників",
        href: "/api/articles/53/file",
        isExternal: true,
      },
      {
        title: "Накази щодо атестації педагогічних працівників",
        href: "/teachers/attestation/orders",
      },
      {
        title: "Вимоги до кваліфікаційних категорій та педагогічних звань",
        href: "/teachers/attestation/qualification-requirements",
      },
      {
        title: 'Інформаційний порадник "Атестація педагогічних працівників"',
        href: "https://heyzine.com/flip-book/4b9b7e6f61.html",
        isExternal: true,
      },
    ],
  },
  {
    title: "Правила внутрішнього розпорядку працівників коледжу",
    description: "Внутрішні правила та регламенти для працівників.",
    icon: <ScrollText className="h-5 w-5" />,
    links: [
      {
        title: "Правила внутрішнього розпорядку працівників коледжу",
        href: "/api/articles/1389/file",
        isExternal: true,
      },
    ],
  },
  {
    title: "Рейтинг 2024–2025 н.р.",
    description: "Рейтингові матеріали та документи за навчальний рік.",
    icon: <Trophy className="h-5 w-5" />,
    links: [
      {
        title: "Рейтинг 2024–2025 н.р.",
        href: "/api/articles/2268/file",
        isExternal: true,
      },
    ],
  },
  {
    title: "Дистанційне навчання",
    description: "Матеріали та сервіси для онлайн-навчання.",
    icon: <Monitor className="h-5 w-5" />,
    links: [
      {
        title: "Онлайн-навчання для НПП",
        href: "/teachers/online-npp",
      },
      {
        title: "Збірка сервісів для дистанційного навчання",
        href: "/api/articles/5864/file",
        isExternal: true,
      },
      {
        title: "Методичні рекомендації. Дистанційне навчання",
        href: "/api/articles/5863/file",
        isExternal: true,
      },
    ],
  },
  {
    title: "Педагогічна скарбниця",
    description: "Методичні матеріали, напрацювання та корисні ресурси.",
    icon: <BookOpen className="h-5 w-5" />,
    links: [
      { title: "Дроздова А.М. (атестація 2025)", href: "/api/articles/6651/file", isExternal: true },
      { title: "Кутін А.І. (атестація 2025)", href: "/api/articles/6649/file", isExternal: true },
      { title: "Герасименко Ю.А. (атестація 2025)", href: "/api/articles/6650/file", isExternal: true },
      { title: "Рашевський М.О. (атестація 2023)", href: "/api/articles/3254/file", isExternal: true },
      { title: "Пасічна О.В. (атестація 2023)", href: "/api/articles/3253/file", isExternal: true },
      { title: "Кравчук І.В. (атестація 2023)", href: "/api/articles/3252/file", isExternal: true },
      { title: "Кравченко Л.О. (атестація 2023)", href: "/api/articles/3251/file", isExternal: true },
      { title: "Гребенюк В.С. (атестація 2023)", href: "/api/articles/3250/file", isExternal: true },
      { title: "ЦК ФМД (наукова діяльність 2023)", href: "/api/articles/4257/file", isExternal: true },
      { title: "ЦК ТТ (наукова діяльність 2023)", href: "/api/articles/4256/file", isExternal: true },
      { title: "ЦК КСМ (наукова діяльність 2023)", href: "/api/articles/4255/file", isExternal: true },
      { title: "ЦК ІМ (наукова діяльність 2023)", href: "/api/articles/4254/file", isExternal: true },
      { title: "ЦК Авіоніки (наукова діяльність 2023)", href: "/api/articles/4253/file", isExternal: true },
      { title: "ЦК ПОД ПЗ (наукова діяльність 2023)", href: "/api/articles/4252/file", isExternal: true },
      { title: "ЦК ПС та АД (наукова діяльність 2023)", href: "/api/articles/4251/file", isExternal: true },
      { title: "ЦК РТ та ЕМ (наукова діяльність 2023)", href: "/api/articles/4250/file", isExternal: true },
      { title: "ЦК СГД (наукова діяльність 2023)", href: "/api/articles/4249/file", isExternal: true },
      { title: "ЦК ФПД (наукова діяльність 2023)", href: "/api/articles/4248/file", isExternal: true },
      { title: "Кравчук І.В. (методичний звіт 2023)", href: "/api/articles/5626/file", isExternal: true },
      { title: "Олена Пасічна (методичний звіт 2023)", href: "/api/articles/4246/file", isExternal: true },
      { title: "Ірина Петреченко (методичний звіт 2023)", href: "/api/articles/4247/file", isExternal: true },
      { title: "Алла Тарадуда (методичний звіт 2023)", href: "/api/articles/4244/file", isExternal: true },
      { title: "Надія Смирнова (методичний звіт 2023)", href: "/api/articles/4245/file", isExternal: true },
      { title: "Світлана Терьошіна (методичний звіт 2023)", href: "/api/articles/4243/file", isExternal: true },
      { title: "Вікторія Тихоступ (методичний звіт 2023)", href: "/api/articles/4242/file", isExternal: true },
      { title: "Олена Щигрінцова (методичний звіт 2023)", href: "/api/articles/4241/file", isExternal: true },
    ],
  },
  {
    title: "Методичні надбання викладачів коледжу",
    description: "Публікації та матеріали викладачів.",
    icon: <GraduationCap className="h-5 w-5" />,
    links: [
      {
        title: "Кислова М.А.",
        href: "/api/articles/3278/file",
        isExternal: true,
      },
      {
        title: "Кравчук І.В.",
        href: "/api/articles/3277/file",
        isExternal: true,
      },
      {
        title: "Петреченко І.Б.",
        href: "/api/articles/3276/file",
        isExternal: true,
      },
      {
        title: "Пасічна О.В.",
        href: "/api/articles/3275/file",
        isExternal: true,
      },
    ],
  },
];
