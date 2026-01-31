import { SchedulePeriod } from "./types";

export const scheduleData: SchedulePeriod[] = [
  {
    id: "denna-2024-2025",
    title: "Денна форма навчання",
    academicYear: "2024-2025",
    studyForm: "Денна",
    sessions: [
      {
        title: "I семестр - Фаховий молодший бакалавр",
        groups: [
          { name: "4 курс", pdfUrl: "http://kk.nau.edu.ua/files/denna-fmb-1sem-4kurs.pdf" },
          { name: "3 курс", pdfUrl: "http://kk.nau.edu.ua/files/denna-fmb-1sem-3kurs.pdf" },
          { name: "2 курс", pdfUrl: "http://kk.nau.edu.ua/files/denna-fmb-1sem-2kurs.pdf" },
          { name: "1 курс", pdfUrl: "http://kk.nau.edu.ua/files/denna-fmb-1sem-1kurs.pdf" },
        ],
      },
      {
        title: "I семестр - Бакалавр",
        groups: [
          { name: "2 курс", pdfUrl: "http://kk.nau.edu.ua/files/denna-bak-1sem-2kurs.pdf" },
          { name: "1 курс", pdfUrl: "http://kk.nau.edu.ua/files/denna-bak-1sem-1kurs.pdf" },
        ],
      },
      {
        title: "II семестр - Фаховий молодший бакалавр",
        groups: [
          { name: "4 курс", pdfUrl: "http://kk.nau.edu.ua/files/denna-fmb-2sem-4kurs.pdf" },
          { name: "3 курс", pdfUrl: "http://kk.nau.edu.ua/files/denna-fmb-2sem-3kurs.pdf" },
          { name: "2 курс", pdfUrl: "http://kk.nau.edu.ua/files/denna-fmb-2sem-2kurs.pdf" },
          { name: "1 курс", pdfUrl: "http://kk.nau.edu.ua/files/denna-fmb-2sem-1kurs.pdf" },
        ],
      },
      {
        title: "II семестр - Бакалавр",
        groups: [
          { name: "2 курс", pdfUrl: "http://kk.nau.edu.ua/files/denna-bak-2sem-2kurs.pdf" },
          { name: "1 курс", pdfUrl: "http://kk.nau.edu.ua/files/denna-bak-2sem-1kurs.pdf" },
        ],
      },
    ],
  },
  {
    id: "zaochna-2024-2025",
    title: "Заочна форма навчання",
    academicYear: "2024-2025",
    studyForm: "Заочна",
    sessions: [
      {
        title: "8-а заліково-екзаменаційна сесія",
        groups: [
          { name: "Група 635-з", pdfUrl: "http://kk.nau.edu.ua/files/635-z-8.pdf" },
          { name: "Група 335-з", pdfUrl: "http://kk.nau.edu.ua/files/335-z-8.pdf" },
          { name: "Група 235-з", pdfUrl: "http://kk.nau.edu.ua/files/235-z-8.pdf" },
          { name: "Група 135-з", pdfUrl: "http://kk.nau.edu.ua/files/135-z-8.pdf" },
        ],
      },
      {
        title: "7-а заліково-екзаменаційна та 8-а настановна сесія",
        groups: [
          { name: "Група 635-з", pdfUrl: "http://kk.nau.edu.ua/files/635-z-7.pdf" },
          { name: "Група 335-з", pdfUrl: "http://kk.nau.edu.ua/files/335-z-7.pdf" },
          { name: "Група 235-з", pdfUrl: "http://kk.nau.edu.ua/files/235-z-7.pdf" },
          { name: "Група 135-з", pdfUrl: "http://kk.nau.edu.ua/files/135-z-7.pdf" },
          { name: "Група 721-з", pdfUrl: "http://kk.nau.edu.ua/files/721-z-7.pdf" },
        ],
      },
      {
        title: "5-а заліково-екзаменаційна та 6-а настановна сесія",
        groups: [
          { name: "Група 645-з", pdfUrl: "http://kk.nau.edu.ua/files/645-z-5.pdf" },
          { name: "Група 345-з", pdfUrl: "http://kk.nau.edu.ua/files/345-z-5.pdf" },
          { name: "Група 145-з", pdfUrl: "http://kk.nau.edu.ua/files/145-z-5.pdf" },
          { name: "Група 721-з", pdfUrl: "http://kk.nau.edu.ua/files/721-z-5.pdf" },
          { name: "Група 321-з", pdfUrl: "http://kk.nau.edu.ua/files/321-z-5.pdf" },
          { name: "Група 221-з", pdfUrl: "http://kk.nau.edu.ua/files/221-z-5.pdf" },
          { name: "Група 121-з", pdfUrl: "http://kk.nau.edu.ua/files/121-z-5.pdf" },
        ],
      },
      {
        title: "4-а заліково-екзаменаційна та 5-а настановна сесія",
        groups: [
          { name: "Група 731-з", pdfUrl: "http://kk.nau.edu.ua/files/731-z-4.pdf" },
          { name: "Група 531-з", pdfUrl: "http://kk.nau.edu.ua/files/531-z-4.pdf" },
          { name: "Група 331-з", pdfUrl: "http://kk.nau.edu.ua/files/331-z-4.pdf" },
          { name: "Група 231-з", pdfUrl: "http://kk.nau.edu.ua/files/231-z-4.pdf" },
          { name: "Група 131-з", pdfUrl: "http://kk.nau.edu.ua/files/131-z-4.pdf" },
          { name: "Група 645-з", pdfUrl: "http://kk.nau.edu.ua/files/645-z-4.pdf" },
          { name: "Група 345-з", pdfUrl: "http://kk.nau.edu.ua/files/345-z-4.pdf" },
          { name: "Група 145-з", pdfUrl: "http://kk.nau.edu.ua/files/145-z-4.pdf" },
        ],
      },
      {
        title: "3-а заліково-екзаменаційна та 4-а настановна сесія",
        groups: [
          { name: "Група 731-з", pdfUrl: "http://kk.nau.edu.ua/files/731-z-3.pdf" },
          { name: "Група 531-з", pdfUrl: "http://kk.nau.edu.ua/files/531-z-3.pdf" },
          { name: "Група 331-з", pdfUrl: "http://kk.nau.edu.ua/files/331-z-3.pdf" },
          { name: "Група 231-з", pdfUrl: "http://kk.nau.edu.ua/files/231-z-3.pdf" },
          { name: "Група 131-з", pdfUrl: "http://kk.nau.edu.ua/files/131-z-3.pdf" },
        ],
      },
      {
        title: "1-а заліково-екзаменаційна та 2-а настановна сесія",
        groups: [
          { name: "Група 741-з", pdfUrl: "http://kk.nau.edu.ua/files/741-z-1.pdf" },
          { name: "Група 541-з", pdfUrl: "http://kk.nau.edu.ua/files/541-z-1.pdf" },
          { name: "Група 241-з", pdfUrl: "http://kk.nau.edu.ua/files/241-z-1.pdf" },
          { name: "Група 141-з", pdfUrl: "http://kk.nau.edu.ua/files/141-z-1.pdf" },
        ],
      },
      {
        title: "Настановна сесія",
        groups: [
          { name: "Група 741-з", pdfUrl: "http://kk.nau.edu.ua/files/741-z-n.pdf" },
          { name: "Група 645-з", pdfUrl: "http://kk.nau.edu.ua/files/645-z-n.pdf" },
          { name: "Група 541-з", pdfUrl: "http://kk.nau.edu.ua/files/541-z-n.pdf" },
          { name: "Група 345-з", pdfUrl: "http://kk.nau.edu.ua/files/345-z-n.pdf" },
          { name: "Група 341-з", pdfUrl: "http://kk.nau.edu.ua/files/341-z-n.pdf" },
          { name: "Група 241-з", pdfUrl: "http://kk.nau.edu.ua/files/241-z-n.pdf" },
          { name: "Група 145-з", pdfUrl: "http://kk.nau.edu.ua/files/145-z-n.pdf" },
          { name: "Група 141-з", pdfUrl: "http://kk.nau.edu.ua/files/141-z-n.pdf" },
        ],
      },
    ],
  },
  {
    id: "zaochna-2025-2026",
    title: "Заочна форма навчання",
    academicYear: "2025-2026",
    studyForm: "Заочна",
    sessions: [
      {
        title: "Розклад занять заочної форми навчання (новий рік)",
        groups: [
          { name: "Інформація буде додана пізніше", pdfUrl: "#" },
        ],
      },
    ],
  },
];
