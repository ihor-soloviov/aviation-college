import {
  Plane,
  Newspaper,
  Building,
  BookOpen,
  Settings,
  DollarSign,
  Mail,
  Users,
  Shield,
} from "lucide-react";

export const linkCategories = [
  {
    title: "Основні сторінки",
    description: "Головні розділи сайту коледжу",
    icon: <Building className="h-5 w-5" />,
    links: [
      {
        title: "Про організацію",
        href: "/part-147/about",
        description: "Загальна інформація про Організацію PART-147",
        icon: <Plane className="h-4 w-4" />,
      },
      {
        title: "Кадровий склад",
        href: "/part-147/staff",
        description: "Кадровий склад Організації PART-147",
        icon: <Users className="h-4 w-4" />,
      },
      {
        title: "Сертифікат схвалення",
        href: "/part-147/certification",
        description:
          "Сертифікат схвалення Організації з підготовки до технічного обслуговування та екзаменування",
        icon: <Shield className="h-4 w-4" />,
      },
      {
        title: "Нормативні вимоги",
        href: "/part-147/requirements",
        description:
          "Нормативні вимоги щодо базової підготовки слухачів та розширення наявної категорії персоналу з технічного обслуговування повітряних суден",
        icon: <Newspaper className="h-4 w-4" />,
      },
      {
        title: "Проведення підготовки",
        href: "/part-147/training",
        description:
          "Організація та проведення підготовки в Організації PART-147",
        icon: <Settings className="h-4 w-4" />,
      },
      {
        title: "Розклади занять та екзаменів",
        href: "/part-147/schedules",
        description:
          "Розклади проведення занять та екзаменів в Організації PART-147",
        icon: <BookOpen className="h-5 w-5" />,
      },
      {
        title: "Вартість підготовки",
        href: "/part-147/cost",
        description:
          "Інформація щодо оплати за проведення підготовки, консультування та екзаменування в Організації PART-147",
        icon: <DollarSign className="h-4 w-4" />,
      },
      {
        title: "Проживання у гуртожитку",
        href: "/part-147/accommodation",
        description:
          "Інформація щодо розміщення в готелі коледжу слухачів, які проходять підготовку в Організації PART-147",
        icon: <Building className="h-4 w-4" />,
      },
      {
        title: "Контакти",
        href: "/part-147/contacts",
        description: "Контакти Організації PART-147",
        icon: <Mail className="h-4 w-4" />,
      },
    ],
  },
];
