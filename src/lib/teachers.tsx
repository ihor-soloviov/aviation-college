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
        href: "http://kk.nau.edu.ua/article/3861",
        isExternal: true,
      },
      {
        title: "Список педагогічних працівників, які підлягають атестації в 2026 році",
        href: "http://kk.nau.edu.ua/article/3668",
        isExternal: true,
      },
      {
        title: "Адреса електронної пошти атестаційної комісії",
        href: "/teachers/attestation/email",
      },
      {
        title: "План підвищення кваліфікації педагогічних (науково-педагогічних) працівників на 2026 рік",
        href: "http://kk.nau.edu.ua/article/5563",
        isExternal: true,
      },
      {
        title: "Міністерство освіти і науки України про атестацію (листи, накази)",
        href: "/teachers/attestation/mon",
      },
      {
        title: "Положення про атестацію педагогічних працівників",
        href: "http://kk.nau.edu.ua/article/53",
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
        href: "http://kk.nau.edu.ua/article/1389",
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
        href: "http://kk.nau.edu.ua/article/2268",
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
        href: "http://kk.nau.edu.ua/article/5864",
        isExternal: true,
      },
      {
        title: "Методичні рекомендації. Дистанційне навчання",
        href: "http://kk.nau.edu.ua/article/5863",
        isExternal: true,
      },
    ],
  },
  {
    title: "Педагогічна скарбниця",
    description: "Методичні матеріали, напрацювання та корисні ресурси.",
    icon: <BookOpen className="h-5 w-5" />,
    links: [
      { title: "Дроздова А.М. (атестація 2025)", href: "http://kk.nau.edu.ua/article/6651", isExternal: true },
      { title: "Кутін А.І. (атестація 2025)", href: "http://kk.nau.edu.ua/article/6649", isExternal: true },
      { title: "Герасименко Ю.А. (атестація 2025)", href: "http://kk.nau.edu.ua/article/6650", isExternal: true },
      { title: "Рашевський М.О. (атестація 2023)", href: "http://kk.nau.edu.ua/article/3254", isExternal: true },
      { title: "Пасічна О.В. (атестація 2023)", href: "http://kk.nau.edu.ua/article/3253", isExternal: true },
      { title: "Кравчук І.В. (атестація 2023)", href: "http://kk.nau.edu.ua/article/3252", isExternal: true },
      { title: "Кравченко Л.О. (атестація 2023)", href: "http://kk.nau.edu.ua/article/3251", isExternal: true },
      { title: "Гребенюк В.С. (атестація 2023)", href: "http://kk.nau.edu.ua/article/3250", isExternal: true },
      { title: "ЦК ФМД (наукова діяльність 2023)", href: "http://kk.nau.edu.ua/article/4257", isExternal: true },
      { title: "ЦК ТТ (наукова діяльність 2023)", href: "http://kk.nau.edu.ua/article/4256", isExternal: true },
      { title: "ЦК КСМ (наукова діяльність 2023)", href: "http://kk.nau.edu.ua/article/4255", isExternal: true },
      { title: "ЦК ІМ (наукова діяльність 2023)", href: "http://kk.nau.edu.ua/article/4254", isExternal: true },
      { title: "ЦК Авіоніки (наукова діяльність 2023)", href: "http://kk.nau.edu.ua/article/4253", isExternal: true },
      { title: "ЦК ПОД ПЗ (наукова діяльність 2023)", href: "http://kk.nau.edu.ua/article/4252", isExternal: true },
      { title: "ЦК ПС та АД (наукова діяльність 2023)", href: "http://kk.nau.edu.ua/article/4251", isExternal: true },
      { title: "ЦК РТ та ЕМ (наукова діяльність 2023)", href: "http://kk.nau.edu.ua/article/4250", isExternal: true },
      { title: "ЦК СГД (наукова діяльність 2023)", href: "http://kk.nau.edu.ua/article/4249", isExternal: true },
      { title: "ЦК ФПД (наукова діяльність 2023)", href: "http://kk.nau.edu.ua/article/4248", isExternal: true },
      { title: "Кравчук І.В. (методичний звіт 2023)", href: "http://kk.nau.edu.ua/article/5626", isExternal: true },
      { title: "Олена Пасічна (методичний звіт 2023)", href: "http://kk.nau.edu.ua/article/4246", isExternal: true },
      { title: "Ірина Петреченко (методичний звіт 2023)", href: "http://kk.nau.edu.ua/article/4247", isExternal: true },
      { title: "Алла Тарадуда (методичний звіт 2023)", href: "http://kk.nau.edu.ua/article/4244", isExternal: true },
      { title: "Надія Смирнова (методичний звіт 2023)", href: "http://kk.nau.edu.ua/article/4245", isExternal: true },
      { title: "Світлана Терьошіна (методичний звіт 2023)", href: "http://kk.nau.edu.ua/article/4243", isExternal: true },
      { title: "Вікторія Тихоступ (методичний звіт 2023)", href: "http://kk.nau.edu.ua/article/4242", isExternal: true },
      { title: "Олена Щигрінцова (методичний звіт 2023)", href: "http://kk.nau.edu.ua/article/4241", isExternal: true },
    ],
  },
  {
    title: "Методичні надбання викладачів коледжу",
    description: "Публікації та матеріали викладачів.",
    icon: <GraduationCap className="h-5 w-5" />,
    links: [
      {
        title: "Кислова М.А.",
        href: "http://kk.nau.edu.ua/article/3278",
        isExternal: true,
      },
      {
        title: "Кравчук І.В.",
        href: "http://kk.nau.edu.ua/article/3277",
        isExternal: true,
      },
      {
        title: "Петреченко І.Б.",
        href: "http://kk.nau.edu.ua/article/3276",
        isExternal: true,
      },
      {
        title: "Пасічна О.В.",
        href: "http://kk.nau.edu.ua/article/3275",
        isExternal: true,
      },
    ],
  },
];
