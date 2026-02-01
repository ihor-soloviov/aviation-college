import { DocumentItem } from "../shared/types";

export type EducationalProcessData = {
  id: string;
  title: string;
  studyForm: "Денна" | "Заочна";
  items: DocumentItem[];
};

export const educationalProcessData: EducationalProcessData[] = [
  {
    id: "denna",
    title: "Денна форма навчання",
    studyForm: "Денна",
    items: [
      {
        id: "denna-2025-2026-even",
        title: "2025-2026 - парний семестр",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/2025-2026%20%D0%BF%D0%B0%D1%80%D0%BD%D0%B8%D0%B9%20%D1%81%D0%B5%D0%BC%D0%B5%D1%81%D1%82%D1%80%20%D0%B4%D0%B5%D0%BD%D0%BD%D0%B0%281%29.pdf",
      },
      {
        id: "denna-2025-2026-odd",
        title: "2025-2026 - непарний семестр",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/2025-2026%20%D0%BD%D0%B5%D0%BF%D0%B0%D1%80%D0%BD%D0%B8%D0%B9%20%D1%81%D0%B5%D0%BC%D0%B5%D1%81%D1%82%D1%80%20%D0%B4%D0%B5%D0%BD%D0%BD%D0%B0.pdf",
      },
      {
        id: "denna-2024-2025-even",
        title: "2024-2025 - парний семестр",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/2024-2025%20%D0%BF%D0%B0%D1%80%D0%BD%D0%B8%D0%B9%20%D1%81%D0%B5%D0%BC%D0%B5%D1%81%D1%82%D1%80%20%D0%B4%D0%B5%D0%BD%D0%BD%D0%B0.pdf",
      },
      {
        id: "denna-2024-2025-odd",
        title: "2024-2025 - непарний семестр",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/2024-2025%20%D0%BD%D0%B5%D0%BF%D0%B0%D1%80%D0%BD%D0%B8%D0%B9%20%D1%81%D0%B5%D0%BC%D0%B5%D1%81%D1%82%D1%80%20%D0%B4%D0%B5%D0%BD%D0%BD%D0%B0.pdf",
      },
      {
        id: "denna-2023-2024",
        title: "2023-2024",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/2023-2024%20%D0%B4%D0%B5%D0%BD%D0%BD%D0%B0.pdf",
      },
    ],
  },
  {
    id: "zaochna",
    title: "Заочна форма навчання",
    studyForm: "Заочна",
    items: [
      {
        id: "zaochna-2025-2026-even",
        title: "2025-2026 - парний семестр",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/2025-2026%20%D0%BF%D0%B0%D1%80%D0%BD%D0%B8%D0%B9%20%D1%81%D0%B5%D0%BC%D0%B5%D1%81%D1%82%D1%80%20%D0%B7%D0%B0%D0%BE%D1%87%D0%BD%D0%B0%281%29.pdf",
      },
      {
        id: "zaochna-2025-2026-odd",
        title: "2025-2026 - непарний семестр",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/2025-2026%20%D0%BD%D0%B5%D0%BF%D0%B0%D1%80%D0%BD%D0%B8%D0%B9%20%D1%81%D0%B5%D0%BC%D0%B5%D1%81%D1%82%D1%80%20%D0%B7%D0%B0%D0%BE%D1%87%D0%BD%D0%B0.pdf",
      },
      {
        id: "zaochna-2024-2025-even",
        title: "2024-2025 - парний семестр",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/2024-2025%20%D0%BF%D0%B0%D1%80%D0%BD%D0%B8%D0%B9%20%D1%81%D0%B5%D0%BC%D0%B5%D1%81%D1%82%D1%80%20%D0%B7%D0%B0%D0%BE%D1%87%D0%BD%D0%B0.pdf",
      },
      {
        id: "zaochna-2024-2025-odd",
        title: "2024-2025 - непарний семестр",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/2024-2025%20%D0%BD%D0%B5%D0%BF%D0%B0%D1%80%D0%BD%D0%B8%D0%B9%20%D1%81%D0%B5%D0%BC%D0%B5%D1%81%D1%82%D1%80%20%D0%B7%D0%B0%D0%BE%D1%87%D0%BD%D0%B0.pdf",
      },
      {
        id: "zaochna-2023-2024",
        title: "2023-2024",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/2023-2024%20%D0%B7%D0%B0%D0%BE%D1%87%D0%BD%D0%B0.pdf",
      },
    ],
  },
];
