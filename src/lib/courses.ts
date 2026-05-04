import { Code, Headphones, Plane, Users, Wrench } from "lucide-react";
import { ICourse, CourseCategory } from "@/types/courses";

export const courses: { fulltime: ICourse[], parttime: ICourse[] } = {
    fulltime: [
        { id: "121", title: "Інженерія програмного забезпечення", level: "Фаховий молодший бакалавр", note: "денна", icon: Code, description: "Розробка та підтримка сучасного програмного забезпечення.", tuition: "10 000 ₴", category: "it" },
        { id: "123", title: "Комп’ютерна інженерія", level: "Фаховий молодший бакалавр", note: "денна", icon: Code, description: "Проєктування та обслуговування комп’ютерних систем і мереж.", tuition: "10 000 ₴", category: "it" },
        { id: "141", title: "Електроенергетика, електротехніка та електромеханіка", level: "Фаховий молодший бакалавр", note: "денна", icon: Wrench, description: "Системи енергоживлення та електромеханічні технології.", tuition: "10 000 ₴", category: "engineering" },
        { id: "172", title: "Електронні комунікації та радіотехніка", level: "Фаховий молодший бакалавр", note: "денна", icon: Headphones, description: "Зв’язок, телекомунікації та радіотехнічні системи.", tuition: "10 000 ₴", category: "telecom" },
        { id: "173", title: "Авіоніка", level: "Фаховий молодший бакалавр", note: "денна", icon: Plane, description: "Авіаційна електроніка та системи управління польотом.", tuition: "10 000 ₴", category: "aviation" },
        { id: "174", title: "Автоматизація, комп’ютерно-інтегровані технології та робототехніка", level: "Фаховий молодший бакалавр", note: "денна", icon: Code, description: "Автоматизація та робототехніка в промисловості.", tuition: "10 000 ₴", category: "it" },
        { id: "272", title: "Авіаційний транспорт", level: "Фаховий молодший бакалавр", note: "денна", icon: Plane, description: "Авіаційні транспортні системи та технології.", tuition: "10 000 ₴", category: "aviation" },
        { id: "275", title: "Транспортні технології (повітряний транспорт)", level: "Фаховий молодший бакалавр", note: "денна", icon: Plane, description: "Повітряні транспортні системи та технології.", tuition: "10 000 ₴", category: "aviation" },

        { id: "073", title: "Менеджмент", level: "Бакалавр", note: "денна", icon: Users, description: "Організація, управління та стратегія бізнесу.", tuition: "10 000 ₴", category: "management" },
        { id: "123", title: "Комп’ютерна інженерія", level: "Бакалавр", note: "денна", icon: Code, description: "Проєктування та розробка комп’ютерних систем.", tuition: "10 000 ₴", category: "it" },
        { id: "141", title: "Електроенергетика, електротехніка та електромеханіка", level: "Бакалавр", note: "денна", icon: Wrench, description: "Системи енергоживлення та електромеханіка.", tuition: "10 000 ₴", category: "engineering" },
        { id: "172", title: "Електронні комунікації та радіотехніка", level: "Бакалавр", note: "денна", icon: Headphones, description: "Телекомунікації та радіотехніка.", tuition: "10 000 ₴", category: "telecom" },
        { id: "272", title: "Авіаційний транспорт", level: "Бакалавр", note: "денна", icon: Plane, description: "Авіаційні транспортні системи та технології.", tuition: "10 000 ₴", category: "aviation" },

    ],
    parttime: [
        { id: "123", title: "Комп’ютерна інженерія", level: "Фаховий молодший бакалавр", note: "заочна", icon: Code, description: "Проєктування та обслуговування комп’ютерних систем і мереж.", tuition: "10 000 ₴", category: "it" },
        { id: "141", title: "Електроенергетика, електротехніка та електромеханіка", level: "Фаховий молодший бакалавр", note: "заочна", icon: Wrench, description: "Системи енергоживлення та електромеханіка.", tuition: "10 000 ₴", category: "engineering" },
        { id: "172", title: "Електронні комунікації та радіотехніка", level: "Фаховий молодший бакалавр", note: "заочна", icon: Headphones, description: "Телекомунікації та радіотехніка.", tuition: "10 000 ₴", category: "telecom" },
        { id: "174", title: "Автоматизація, комп’ютерно-інтегровані технології та робототехніка", level: "Фаховий молодший бакалавр", note: "заочна", icon: Code, description: "Автоматизація та робототехніка в промисловості.", tuition: "10 000 ₴", category: "it" },
        { id: "272", title: "Авіаційний транспорт", level: "Фаховий молодший бакалавр", note: "заочна", icon: Plane, description: "Авіаційні транспортні системи та технології.", tuition: "10 000 ₴", category: "aviation" },
        { id: "275", title: "Транспортні технології (повітряний транспорт)", level: "Фаховий молодший бакалавр", note: "заочна", icon: Plane, description: "Повітряні транспортні системи та технології.", tuition: "10 000 ₴", category: "aviation" },

        { id: "123", title: "Комп’ютерна інженерія", level: "Бакалавр", note: "заочна", icon: Code, description: "Проєктування та розробка комп’ютерних систем.", tuition: "10 000 ₴", category: "it" },
        { id: "141", title: "Електроенергетика, електротехніка та електромеханіка", level: "Бакалавр", note: "заочна", icon: Wrench, description: "Системи енергоживлення та електромеханіка.", tuition: "10 000 ₴", category: "engineering" },
        { id: "172", title: "Електронні комунікації та радіотехніка", level: "Бакалавр", note: "заочна", icon: Headphones, description: "Телекомунікації та радіотехніка.", tuition: "10 000 ₴", category: "telecom" },
        { id: "272", title: "Авіаційний транспорт", level: "Бакалавр", note: "заочна", icon: Plane, description: "Авіаційні транспортні системи та технології.", tuition: "10 000 ₴", category: "aviation" }
    ]
}

export const CATEGORY_LABELS: Record<CourseCategory, string> = {
    it: "IT та автоматизація",
    engineering: "Енергетика",
    aviation: "Авіація",
    telecom: "Телекомунікації",
    management: "Менеджмент",
}
