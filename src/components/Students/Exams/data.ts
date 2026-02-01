import { DocumentItem } from "../shared/types";

export type ExamsYearData = {
  id: string;
  year: string;
  items: DocumentItem[];
};

export const examsData: ExamsYearData[] = [
  {
    id: "2025-2026",
    year: "2025-2026",
    items: [
      {
        id: "2025-2026-1",
        title: "Розклад проведення екзаменів здобувачів освіти у непарному семестрі",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%A0%D0%BE%D0%B7%D0%BA%D0%BB%D0%B0%D0%B4%20%D0%BF%D1%80%D0%BE%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%BD%D1%8F%20%D0%B5%D0%BA%D0%B7%D0%B0%D0%BC%D0%B5%D0%BD%D1%96%D0%B2%20%D0%B7%D0%B4%D0%BE%D0%B1%D1%83%D0%B2%D0%B0%D1%87%D1%96%D0%B2%20%D0%BE%D1%81%D0%B2%D1%96%D1%82%D0%B8%20%D1%83%20%D0%BD%D0%B5%D0%BF%D0%B0%D1%80%D0%BD%D0%BE%D0%BC%D1%83%20%D1%81%D0%B5%D0%BC%D0%B5%D1%81%D1%82%D1%80%D1%96%202025-2026.pdf",
      },
    ],
  },
  {
    id: "2024-2025",
    year: "2024-2025",
    items: [
      {
        id: "2024-2025-1",
        title: "Екзамени у парному семестрі",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%A0%D0%BE%D0%B7%D0%BA%D0%BB%D0%B0%D0%B4%20%D0%BF%D1%80%D0%BE%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%BD%D1%8F%20%D0%B5%D0%BA%D0%B7%D0%B0%D0%BC%D0%B5%D0%BD%D1%96%D0%B2%20%D0%B7%D0%B4%D0%BE%D0%B1%D1%83%D0%B2%D0%B0%D1%87%D1%96%D0%B2%20%D0%BE%D1%81%D0%B2%D1%96%D1%82%D0%B8%20%D1%83%20%D0%BF%D0%B0%D1%80%D0%BD%D0%BE%D0%BC%D1%83%20%D1%81%D0%B5%D0%BC%D0%B5%D1%81%D1%82%D1%80%D1%96%202024-2025.pdf",
      },
      {
        id: "2024-2025-2",
        title: "Атестація денна ФМБ (1-011, 121, 1-015, 721, 7-011, 7-012)",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%A0%D0%BE%D0%B7%D0%BA%D0%BB%D0%B0%D0%B4%20%D0%B0%D1%82%D0%B5%D1%81%D1%82%D0%B0%D1%86%D1%96%D1%97%20%D0%B4%D0%B5%D0%BD%D0%BD%D0%B0%20%D0%A4%D0%9C%D0%91%201%20%D0%BA%D1%83%D1%80%D1%81.pdf",
      },
      {
        id: "2024-2025-3",
        title: "Атестація заочна ФМБ (121з, 221з, 321з, 721з)",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%A0%D0%BE%D0%B7%D0%BA%D0%BB%D0%B0%D0%B4%20%D0%B0%D1%82%D0%B5%D1%81%D1%82%D0%B0%D1%86%D1%96%D1%97%20%D0%B7%D0%B0%D0%BE%D1%87%D0%BD%D0%B0%20%D0%A4%D0%9C%D0%91.pdf",
      },
      {
        id: "2024-2025-4",
        title: "Атестація заочна Б (135е, 235е, 335е, 635е)",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%A0%D0%BE%D0%B7%D0%BA%D0%BB%D0%B0%D0%B4%20%D0%B0%D1%82%D0%B5%D1%81%D1%82%D0%B0%D1%86%D1%96%D1%97%20%D0%B7%D0%B0%D0%BE%D1%87%D0%BD%D0%B0%20%D0%91.pdf",
      },
      {
        id: "2024-2025-5",
        title: "Атестація денна Б (235, 335, 635, 735)",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%A0%D0%BE%D0%B7%D0%BA%D0%BB%D0%B0%D0%B4%20%D0%B0%D1%82%D0%B5%D1%81%D1%82%D0%B0%D1%86%D1%96%D1%97%20%D0%B4%D0%B5%D0%BD%D0%BD%D0%B0%20%D0%91.pdf",
      },
      {
        id: "2024-2025-6",
        title: "Атестація денна ФМБ (3-017, 327, 3-018, 321, 3-011, 3-012, 3-013)",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%A0%D0%BE%D0%B7%D0%BA%D0%BB%D0%B0%D0%B4%20%D0%B0%D1%82%D0%B5%D1%81%D1%82%D0%B0%D1%86%D1%96%D1%97%20%D0%B4%D0%B5%D0%BD%D0%BD%D0%B0%20%D0%A4%D0%9C%D0%91%203%20%D0%BA%D1%83%D1%80%D1%81.pdf",
      },
      {
        id: "2024-2025-7",
        title: "Екзамени Б (235, 335, 635)",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%A0%D0%BE%D0%B7%D0%BA%D0%BB%D0%B0%D0%B4%20%D0%B5%D0%BA%D0%B7%D0%B0%D0%BC%D0%B5%D0%BD%D1%96%D0%B2%20%D0%91%20235%20335%20635.pdf",
      },
      {
        id: "2024-2025-8",
        title: "Атестація 735 групи",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%A0%D0%BE%D0%B7%D0%BA%D0%BB%D0%B0%D0%B4%20%D0%B0%D1%82%D0%B5%D1%81%D1%82%D0%B0%D1%86%D1%96%D1%97%20735.pdf",
      },
      {
        id: "2024-2025-9",
        title: "Екзамени у непарному семестрі",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%A0%D0%BE%D0%B7%D0%BA%D0%BB%D0%B0%D0%B4%20%D0%BF%D1%80%D0%BE%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%BD%D1%8F%20%D0%B5%D0%BA%D0%B7%D0%B0%D0%BC%D0%B5%D0%BD%D1%96%D0%B2%20%D0%B7%D0%B4%D0%BE%D0%B1%D1%83%D0%B2%D0%B0%D1%87%D1%96%D0%B2%20%D0%BE%D1%81%D0%B2%D1%96%D1%82%D0%B8%20%D1%83%20%D0%BD%D0%B5%D0%BF%D0%B0%D1%80%D0%BD%D0%BE%D0%BC%D1%83%20%D1%81%D0%B5%D0%BC%D0%B5%D1%81%D1%82%D1%80%D1%96%202024-2025.pdf",
      },
    ],
  },
  {
    id: "2023-2024",
    year: "2023-2024",
    items: [
      {
        id: "2023-2024-1",
        title: "Атестація заочна 2023-2024",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%A0%D0%BE%D0%B7%D0%BA%D0%BB%D0%B0%D0%B4%20%D0%B0%D1%82%D0%B5%D1%81%D1%82%D0%B0%D1%86%D1%96%D1%97%20%D0%B7%D0%B0%D0%BE%D1%87%D0%BD%D0%B0%202023-2024.pdf",
      },
      {
        id: "2023-2024-2",
        title: "2 семестр",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%A0%D0%BE%D0%B7%D0%BA%D0%BB%D0%B0%D0%B4%20%D0%B5%D0%BA%D0%B7%D0%B0%D0%BC%D0%B5%D0%BD%D1%96%D0%B2%202%20%D1%81%D0%B5%D0%BC%D0%B5%D1%81%D1%82%D1%80%202023-2024.pdf",
      },
      {
        id: "2023-2024-3",
        title: "1 семестр",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%A0%D0%BE%D0%B7%D0%BA%D0%BB%D0%B0%D0%B4%20%D0%B5%D0%BA%D0%B7%D0%B0%D0%BC%D0%B5%D0%BD%D1%96%D0%B2%201%20%D1%81%D0%B5%D0%BC%D0%B5%D1%81%D1%82%D1%80%202023-2024.pdf",
      },
    ],
  },
  {
    id: "2022-2023",
    year: "2022-2023",
    items: [
      {
        id: "2022-2023-1",
        title: "Консультації ФМБ денна",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%93%D1%80%D0%B0%D1%84%D1%96%D0%BA%20%D0%BA%D0%BE%D0%BD%D1%81%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%86%D1%96%D0%B9%20%D0%A4%D0%9C%D0%91%20%D0%B4%D0%B5%D0%BD%D0%BD%D0%B0%202022-2023.pdf",
      },
      {
        id: "2022-2023-2",
        title: "Консультації Б заочна",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%93%D1%80%D0%B0%D1%84%D1%96%D0%BA%20%D0%BA%D0%BE%D0%BD%D1%81%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%86%D1%96%D0%B9%20%D0%91%20%D0%B7%D0%B0%D0%BE%D1%87%D0%BD%D0%B0%202022-2023.pdf",
      },
      {
        id: "2022-2023-3",
        title: "Консультації ФМБ заочна",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%93%D1%80%D0%B0%D1%84%D1%96%D0%BA%20%D0%BA%D0%BE%D0%BD%D1%81%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%86%D1%96%D0%B9%20%D0%A4%D0%9C%D0%91%20%D0%B7%D0%B0%D0%BE%D1%87%D0%BD%D0%B0%202022-2023.pdf",
      },
      {
        id: "2022-2023-4",
        title: "Атестація денна",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%A0%D0%BE%D0%B7%D0%BA%D0%BB%D0%B0%D0%B4%20%D0%B0%D1%82%D0%B5%D1%81%D1%82%D0%B0%D1%86%D1%96%D1%97%20%D0%B4%D0%B5%D0%BD%D0%BD%D0%B0%202022-2023.pdf",
      },
      {
        id: "2022-2023-5",
        title: "Атестація заочна",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%A0%D0%BE%D0%B7%D0%BA%D0%BB%D0%B0%D0%B4%20%D0%B0%D1%82%D0%B5%D1%81%D1%82%D0%B0%D1%86%D1%96%D1%97%20%D0%B7%D0%B0%D0%BE%D1%87%D0%BD%D0%B0%202022-2023.pdf",
      },
      {
        id: "2022-2023-6",
        title: "2 семестр",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%A0%D0%BE%D0%B7%D0%BA%D0%BB%D0%B0%D0%B4%20%D0%B5%D0%BA%D0%B7%D0%B0%D0%BC%D0%B5%D0%BD%D1%96%D0%B2%202%20%D1%81%D0%B5%D0%BC%D0%B5%D1%81%D1%82%D1%80%202022-2023.pdf",
      },
      {
        id: "2022-2023-7",
        title: "1 семестр",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%A0%D0%BE%D0%B7%D0%BA%D0%BB%D0%B0%D0%B4%20%D0%B5%D0%BA%D0%B7%D0%B0%D0%BC%D0%B5%D0%BD%D1%96%D0%B2%201%20%D1%81%D0%B5%D0%BC%D0%B5%D1%81%D1%82%D1%80%202022-2023.pdf",
      },
    ],
  },
  {
    id: "2021-2022",
    year: "2021-2022",
    items: [
      {
        id: "2021-2022-1",
        title: "Консультації заочна",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%93%D1%80%D0%B0%D1%84%D1%96%D0%BA%20%D0%BA%D0%BE%D0%BD%D1%81%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%86%D1%96%D0%B9%20%D0%B7%D0%B0%D0%BE%D1%87%D0%BD%D0%B0%202021-2022.pdf",
      },
      {
        id: "2021-2022-2",
        title: "Консультації денна",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%93%D1%80%D0%B0%D1%84%D1%96%D0%BA%20%D0%BA%D0%BE%D0%BD%D1%81%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%86%D1%96%D0%B9%20%D0%B4%D0%B5%D0%BD%D0%BD%D0%B0%202021-2022.pdf",
      },
      {
        id: "2021-2022-3",
        title: "Атестація денна",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%A0%D0%BE%D0%B7%D0%BA%D0%BB%D0%B0%D0%B4%20%D0%B0%D1%82%D0%B5%D1%81%D1%82%D0%B0%D1%86%D1%96%D1%97%20%D0%B4%D0%B5%D0%BD%D0%BD%D0%B0%202021-2022.pdf",
      },
      {
        id: "2021-2022-4",
        title: "Атестація заочна",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%A0%D0%BE%D0%B7%D0%BA%D0%BB%D0%B0%D0%B4%20%D0%B0%D1%82%D0%B5%D1%81%D1%82%D0%B0%D1%86%D1%96%D1%97%20%D0%B7%D0%B0%D0%BE%D1%87%D0%BD%D0%B0%202021-2022.pdf",
      },
      {
        id: "2021-2022-5",
        title: "2 семестр",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%A0%D0%BE%D0%B7%D0%BA%D0%BB%D0%B0%D0%B4%20%D0%B5%D0%BA%D0%B7%D0%B0%D0%BC%D0%B5%D0%BD%D1%96%D0%B2%202%20%D1%81%D0%B5%D0%BC%D0%B5%D1%81%D1%82%D1%80%202021-2022.pdf",
      },
      {
        id: "2021-2022-6",
        title: "1 семестр",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%A0%D0%BE%D0%B7%D0%BA%D0%BB%D0%B0%D0%B4%20%D0%B5%D0%BA%D0%B7%D0%B0%D0%BC%D0%B5%D0%BD%D1%96%D0%B2%201%20%D1%81%D0%B5%D0%BC%D0%B5%D1%81%D1%82%D1%80%202021-2022.pdf",
      },
    ],
  },
  {
    id: "2020-2021",
    year: "2020-2021",
    items: [
      {
        id: "2020-2021-1",
        title: "Консультації заочна",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%93%D1%80%D0%B0%D1%84%D1%96%D0%BA%20%D0%BA%D0%BE%D0%BD%D1%81%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%86%D1%96%D0%B9%20%D0%B7%D0%B0%D0%BE%D1%87%D0%BD%D0%B0%202020-2021.pdf",
      },
      {
        id: "2020-2021-2",
        title: "Консультації денна",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%93%D1%80%D0%B0%D1%84%D1%96%D0%BA%20%D0%BA%D0%BE%D0%BD%D1%81%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%86%D1%96%D0%B9%20%D0%B4%D0%B5%D0%BD%D0%BD%D0%B0%202020-2021.pdf",
      },
      {
        id: "2020-2021-3",
        title: "Атестація заочна",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%A0%D0%BE%D0%B7%D0%BA%D0%BB%D0%B0%D0%B4%20%D0%B0%D1%82%D0%B5%D1%81%D1%82%D0%B0%D1%86%D1%96%D1%97%20%D0%B7%D0%B0%D0%BE%D1%87%D0%BD%D0%B0%202020-2021.pdf",
      },
      {
        id: "2020-2021-4",
        title: "Атестація денна",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%A0%D0%BE%D0%B7%D0%BA%D0%BB%D0%B0%D0%B4%20%D0%B0%D1%82%D0%B5%D1%81%D1%82%D0%B0%D1%86%D1%96%D1%97%20%D0%B4%D0%B5%D0%BD%D0%BD%D0%B0%202020-2021.pdf",
      },
      {
        id: "2020-2021-5",
        title: "2 семестр",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%A0%D0%BE%D0%B7%D0%BA%D0%BB%D0%B0%D0%B4%20%D0%B5%D0%BA%D0%B7%D0%B0%D0%BC%D0%B5%D0%BD%D1%96%D0%B2%202%20%D1%81%D0%B5%D0%BC%D0%B5%D1%81%D1%82%D1%80%202020-2021.pdf",
      },
      {
        id: "2020-2021-6",
        title: "1 семестр",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%A0%D0%BE%D0%B7%D0%BA%D0%BB%D0%B0%D0%B4%20%D0%B5%D0%BA%D0%B7%D0%B0%D0%BC%D0%B5%D0%BD%D1%96%D0%B2%201%20%D1%81%D0%B5%D0%BC%D0%B5%D1%81%D1%82%D1%80%202020-2021.pdf",
      },
    ],
  },
];
