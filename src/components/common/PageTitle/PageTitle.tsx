import {
  Award,
  Banknote,
  BookOpen,
  Building2,
  CalendarCheck,
  CalendarDays,
  ClipboardList,
  FileSignature,
  FlaskConical,
  GraduationCap,
  Heart,
  Info,
  Link,
  Mail,
  MessageSquare,
  Monitor,
  Plane,
  Receipt,
  Scale,
  ScrollText,
  ShieldAlert,
  Trophy,
  Users,
  Vote,
  Wrench,
  type LucideIcon,
} from "lucide-react";

const titleIcons: Record<string, LucideIcon> = {
  Викладачам: Users,
  "Онлайн-навчання для НПП": Monitor,
  "Адреса електронної пошти атестаційної комісії": Mail,
  "Загальна інформація про атестацію педагогічних працівників": Info,
  "Міністерство освіти і науки України про атестацію (листи, накази)": Building2,
  "Накази щодо атестації педагогічних (науково-педагогічних) працівників": ScrollText,
  "Вимоги до кваліфікаційних категорій та педагогічних звань": Award,
  "Здобувачам освіти": GraduationCap,
  "Корисні посилання": Link,
  "Розклад занять": CalendarDays,
  "Стипендія (рейтинг)": Trophy,
  "Наукове товариство коледжу": FlaskConical,
  "Курсантське самоврядування": Vote,
  "Соціальні стипендії": Heart,
  "Розмір плати за навчання": Banknote,
  "Графік освітнього процесу": CalendarCheck,
  "Каталог дисциплін за вибором": BookOpen,
  "Розклад екзаменів": ClipboardList,
  "Реквізити для оплати": Receipt,
  "Практичне навчання": Wrench,
  "Протидія булінгу": ShieldAlert,
  "Правила поведінки здобувача освіти": Scale,
  "Графік консультацій": MessageSquare,
  Договори: FileSignature,
  "Організація PART-147": Plane,
};

export const PageTitle = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const Icon = titleIcons[title] ?? GraduationCap;

  return (
    <div className="flex flex-col items-center space-y-4 text-center">
      <div className="inline-block rounded-full bg-blue-100 p-2">
        <Icon className="h-6 w-6 text-blue-600" />
      </div>
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-balance dark:text-white">
        {title}
      </h1>
      <p className="max-w-[700px] text-muted-foreground">{description}</p>
    </div>
  );
};
