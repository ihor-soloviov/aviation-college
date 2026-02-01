import { Building2, Plane, Cpu, Zap, FileText } from "lucide-react";

export interface PracticeBase {
  id: string;
  name: string;
  description: string;
  specialties: string[];
  icon: "building" | "plane" | "cpu" | "zap";
}

export interface PracticeDocument {
  id: string;
  title: string;
  description: string;
  pdfUrl: string;
}

export const practiceBases: PracticeBase[] = [
  {
    id: "1",
    name: "Міжнародний аеропорт «Кривий Ріг»",
    description: "Практика з технічного обслуговування повітряних суден, наземного обладнання та авіаційних систем",
    specialties: ["Авіоніка", "Авіаційний транспорт"],
    icon: "plane",
  },
  {
    id: "2",
    name: "ПрАТ «АрселорМіттал Кривий Ріг»",
    description: "Практика з електрозабезпечення промислових підприємств, автоматизації виробничих процесів",
    specialties: ["Електроенергетика", "Автоматизація"],
    icon: "zap",
  },
  {
    id: "3",
    name: "ТОВ «ЕРТАНЗ»",
    description: "Практика з автоматизації та комп'ютерно-інтегрованих технологій, робототехніки",
    specialties: ["Автоматизація", "Комп'ютерна інженерія"],
    icon: "cpu",
  },
  {
    id: "4",
    name: "Державне підприємство «Кривбасшахтобуд»",
    description: "Практика з електрозабезпечення цивільних споруд та промислових об'єктів",
    specialties: ["Електроенергетика"],
    icon: "building",
  },
  {
    id: "5",
    name: "ПрАТ «Київстар» (Сектор фіксованого зв'язку)",
    description: "Практика з комп'ютерних мереж, телекомунікаційних систем та IT-інфраструктури",
    specialties: ["Комп'ютерна інженерія", "Інженерія програмного забезпечення"],
    icon: "cpu",
  },
  {
    id: "6",
    name: "Логістичні компанії міста Кривий Ріг",
    description: "Практика з організації транспортних перевезень, логістики та менеджменту",
    specialties: ["Транспортні технології", "Менеджмент"],
    icon: "building",
  },
];

export const practiceDocuments: PracticeDocument[] = [
  {
    id: "1",
    title: "Положення про проведення практики здобувачів освіти",
    description: "Основний документ, що регламентує організацію та проведення всіх видів практик",
    pdfUrl: "http://kk.nau.edu.ua/files/practice_regulation.pdf",
  },
  {
    id: "2",
    title: "Програма навчальної практики",
    description: "Зміст та вимоги до проходження навчальної практики для всіх спеціальностей",
    pdfUrl: "http://kk.nau.edu.ua/files/practice_program.pdf",
  },
  {
    id: "3",
    title: "Програма виробничої практики",
    description: "Зміст та вимоги до проходження виробничої практики на підприємствах",
    pdfUrl: "http://kk.nau.edu.ua/files/production_practice.pdf",
  },
  {
    id: "4",
    title: "Щоденник практики (зразок)",
    description: "Зразок заповнення щоденника практики для здобувачів освіти",
    pdfUrl: "http://kk.nau.edu.ua/files/practice_diary.pdf",
  },
];

export const practiceTypes = [
  {
    id: "1",
    title: "Навчальна практика",
    description: "Ознайомлення з майбутньою професією, формування первинних професійних умінь",
    duration: "2-4 тижні",
    course: "1-2 курс",
  },
  {
    id: "2",
    title: "Виробнича практика",
    description: "Закріплення теоретичних знань, набуття практичних навичок на виробництві",
    duration: "4-6 тижнів",
    course: "2-3 курс",
  },
  {
    id: "3",
    title: "Переддипломна практика",
    description: "Збір матеріалів для дипломної роботи, поглиблення фахових компетенцій",
    duration: "4-8 тижнів",
    course: "4 курс",
  },
];

export const iconMap = {
  building: Building2,
  plane: Plane,
  cpu: Cpu,
  zap: Zap,
  file: FileText,
};
