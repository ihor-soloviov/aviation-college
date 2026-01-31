import { StudyFormData } from "./types";

export const educationalProcessData: StudyFormData[] = [
  {
    id: "denna",
    title: "Денна форма навчання",
    studyForm: "Денна",
    academicYears: [
      {
        year: "2025-2026",
        semesters: [
          {
            title: "Непарний семестр",
            type: "odd",
            documents: [
              {
                name: "Графік освітнього процесу",
                pdfUrl: "http://kk.nau.edu.ua/files/denna-2025-2026-odd.pdf",
              },
            ],
          },
          {
            title: "Парний семестр",
            type: "even",
            documents: [
              {
                name: "Графік освітнього процесу",
                pdfUrl: "http://kk.nau.edu.ua/files/denna-2025-2026-even.pdf",
              },
            ],
          },
        ],
      },
      {
        year: "2024-2025",
        semesters: [
          {
            title: "Непарний семестр",
            type: "odd",
            documents: [
              {
                name: "Графік освітнього процесу",
                pdfUrl: "http://kk.nau.edu.ua/files/denna-2024-2025-odd.pdf",
              },
            ],
          },
          {
            title: "Парний семестр",
            type: "even",
            documents: [
              {
                name: "Графік освітнього процесу",
                pdfUrl: "http://kk.nau.edu.ua/files/denna-2024-2025-even.pdf",
              },
            ],
          },
        ],
      },
      {
        year: "2023-2024",
        semesters: [
          {
            title: "Повний рік",
            type: "full",
            documents: [
              {
                name: "Графік освітнього процесу",
                pdfUrl: "http://kk.nau.edu.ua/files/denna-2023-2024.pdf",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "zaochna",
    title: "Заочна форма навчання",
    studyForm: "Заочна",
    academicYears: [
      {
        year: "2025-2026",
        semesters: [
          {
            title: "Непарний семестр",
            type: "odd",
            documents: [
              {
                name: "Графік освітнього процесу",
                pdfUrl: "http://kk.nau.edu.ua/files/zaochna-2025-2026-odd.pdf",
              },
            ],
          },
          {
            title: "Парний семестр",
            type: "even",
            documents: [
              {
                name: "Графік освітнього процесу",
                pdfUrl: "http://kk.nau.edu.ua/files/zaochna-2025-2026-even.pdf",
              },
            ],
          },
        ],
      },
      {
        year: "2024-2025",
        semesters: [
          {
            title: "Непарний семестр",
            type: "odd",
            documents: [
              {
                name: "Графік освітнього процесу",
                pdfUrl: "http://kk.nau.edu.ua/files/zaochna-2024-2025-odd.pdf",
              },
            ],
          },
          {
            title: "Парний семестр",
            type: "even",
            documents: [
              {
                name: "Графік освітнього процесу",
                pdfUrl: "http://kk.nau.edu.ua/files/zaochna-2024-2025-even.pdf",
              },
            ],
          },
        ],
      },
      {
        year: "2023-2024",
        semesters: [
          {
            title: "Повний рік",
            type: "full",
            documents: [
              {
                name: "Графік освітнього процесу",
                pdfUrl: "http://kk.nau.edu.ua/files/zaochna-2023-2024.pdf",
              },
            ],
          },
        ],
      },
    ],
  },
];
