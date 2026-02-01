import { DocumentItem, ExpandableSection } from "../shared/types";

// Актуальна інформація - виділені картки зверху
export const currentInfoCards: {
  id: string;
  title: string;
  description: string;
  pdfUrl: string;
  icon: "tuition" | "dormitory" | "courses";
  highlight?: boolean;
}[] = [
  {
    id: "current-tuition",
    title: "Вартість навчання 2025-2026",
    description: "Вартість оплати за надання платної освітньої послуги",
    pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%92%D0%B0%D1%80%D1%82%D1%96%D1%81%D1%82%D1%8C%20%D0%BE%D0%BF%D0%BB%D0%B0%D1%82%D0%B8%20%D0%B7%D0%B0%20%D0%BD%D0%B0%D0%B4%D0%B0%D0%BD%D0%BD%D1%8F%20%D0%BF%D0%BB%D0%B0%D1%82%D0%BD%D0%BE%D1%97%20%D0%BE%D1%81%D0%B2%D1%96%D1%82%D0%BD%D1%8C%D0%BE%D1%97%20%D0%BF%D0%BE%D1%81%D0%BB%D1%83%D0%B3%D0%B8%20%D0%B2%202025-2026%20%D0%BD.%D1%80.%20%D0%B4%D0%BB%D1%8F%20%D0%B7%D0%B4%D0%BE%D0%B1%D1%83%D0%B2%D0%B0%D1%87%D1%96%D0%B2%20%D0%BE%D1%81%D0%B2%D1%96%D1%82%D0%B8.pdf",
    icon: "tuition",
    highlight: true,
  },
  {
    id: "current-dormitory",
    title: "Вартість проживання в гуртожитку",
    description: "Актуальна вартість мешкання у гуртожитку коледжу",
    pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%92%D0%B0%D1%80%D1%82%D1%96%D1%81%D1%82%D1%8C%20%D0%BC%D0%B5%D1%88%D0%BA%D0%B0%D0%BD%D0%BD%D1%8F%20%D1%83%20%D0%B3%D1%83%D1%80%D1%82%D0%BE%D0%B6%D0%B8%D1%82%D0%BA%D1%83%20%D0%BA%D0%BE%D0%BB%D0%B5%D0%B4%D0%B6%D1%83.pdf",
    icon: "dormitory",
  },
  {
    id: "current-courses",
    title: "Курси довузівської підготовки",
    description: "Вартість курсів у 2025-2026 н.р.",
    pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%92%D0%B0%D1%80%D1%82%D1%96%D1%81%D1%82%D1%8C%20%D0%BA%D1%83%D1%80%D1%81%D1%96%D0%B2%20%D0%B4%D0%BE%D0%B2%D1%83%D0%B7%D1%96%D0%B2%D1%81%D1%8C%D0%BA%D0%BE%D1%97%20%D0%BF%D1%96%D0%B4%D0%B3%D0%BE%D1%82%D0%BE%D0%B2%D0%BA%D0%B8%20%D1%83%202025-2026%20%D0%BD.%D1%80..pdf",
    icon: "courses",
  },
];

// Документи по роках
export const tuitionFeesData: ExpandableSection[] = [
  {
    id: "2026",
    title: "2026 рік",
    items: [
      {
        id: "2026-1",
        title: "Кошторис КРФК КАІ на 2026 рік КПК 2201190 Стипендія",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%9A%D0%BE%D1%88%D1%82%D0%BE%D1%80%D0%B8%D1%81%20%D0%9A%D0%A0%D0%A4%D0%9A%20%D0%9A%D0%90%D0%86%20%D0%BD%D0%B0%202026%20%D1%80%D1%96%D0%BA%20%D0%9A%D0%9F%D0%9A%202201190%20%D0%A1%D1%82%D0%B8%D0%BF%D0%B5%D0%BD%D0%B4%D1%96%D1%8F.pdf",
      },
      {
        id: "2026-2",
        title: "Кошторис КРФК КАІ на 2026 рік КПК 2201420",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%9A%D0%BE%D1%88%D1%82%D0%BE%D1%80%D0%B8%D1%81%20%D0%9A%D0%A0%D0%A4%D0%9A%20%D0%9A%D0%90%D0%86%20%D0%BD%D0%B0%202026%20%D1%80%D1%96%D0%BA%20%D0%9A%D0%9F%D0%9A%202201420.pdf",
      },
    ],
  },
  {
    id: "2025",
    title: "2025 рік",
    items: [
      {
        id: "2025-1",
        title: "Кошторис на 2025 рік КПК 2201190 Стипендії",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%9A%D0%BE%D1%88%D1%82%D0%BE%D1%80%D0%B8%D1%81%20%D0%BD%D0%B0%202025%20%D1%80%D1%96%D0%BA%20%D0%9A%D0%9F%D0%9A%202201190%20%D0%A1%D1%82%D0%B8%D0%BF%D0%B5%D0%BD%D0%B4%D1%96%D1%97.pdf",
      },
      {
        id: "2025-2",
        title: "Кошторис на 2025 рік КПК 2201420",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%9A%D0%BE%D1%88%D1%82%D0%BE%D1%80%D0%B8%D1%81%20%D0%BD%D0%B0%202025%20%D1%80%D1%96%D0%BA%20%D0%9A%D0%9F%D0%9A%202201420.pdf",
      },
    ],
  },
  {
    id: "2024",
    title: "2024 рік",
    items: [
      {
        id: "2024-1",
        title: "Про встановлення оплати за навчання 2024/2025 н.р.",
        subtitle: "від 20.05.2024",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%9F%D1%80%D0%BE%20%D0%B2%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BB%D0%B5%D0%BD%D0%BD%D1%8F%20%D0%BE%D0%BF%D0%BB%D0%B0%D1%82%D0%B8%20%D0%B7%D0%B0%20%D0%BD%D0%B0%D0%B2%D1%87%D0%B0%D0%BD%D0%BD%D1%8F%202024-2025%20%D0%BD.%D1%80..pdf",
      },
      {
        id: "2024-2",
        title: "Кошторис на 2024 рік",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%9A%D0%BE%D1%88%D1%82%D0%BE%D1%80%D0%B8%D1%81%20%D0%BD%D0%B0%202024%20%D1%80%D1%96%D0%BA.pdf",
      },
      {
        id: "2024-3",
        title: "Помісячний план використання бюджетних коштів на 2024 рік",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%9F%D0%BE%D0%BC%D1%96%D1%81%D1%8F%D1%87%D0%BD%D0%B8%D0%B9%20%D0%BF%D0%BB%D0%B0%D0%BD%20%D0%B2%D0%B8%D0%BA%D0%BE%D1%80%D0%B8%D1%81%D1%82%D0%B0%D0%BD%D0%BD%D1%8F%20%D0%B1%D1%8E%D0%B4%D0%B6%D0%B5%D1%82%D0%BD%D0%B8%D1%85%20%D0%BA%D0%BE%D1%88%D1%82%D1%96%D0%B2%20%D0%BD%D0%B0%202024%20%D1%80%D1%96%D0%BA.pdf",
      },
      {
        id: "2024-4",
        title: "План використання бюджетних коштів на 2024 рік",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%9F%D0%BB%D0%B0%D0%BD%20%D0%B2%D0%B8%D0%BA%D0%BE%D1%80%D0%B8%D1%81%D1%82%D0%B0%D0%BD%D0%BD%D1%8F%20%D0%B1%D1%8E%D0%B4%D0%B6%D0%B5%D1%82%D0%BD%D0%B8%D1%85%20%D0%BA%D0%BE%D1%88%D1%82%D1%96%D0%B2%20%D0%BD%D0%B0%202024%20%D1%80%D1%96%D0%BA.pdf",
      },
      {
        id: "2024-5",
        title: "План асигнувань загального фонду бюджету на 2024 рік",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%9F%D0%BB%D0%B0%D0%BD%20%D0%B0%D1%81%D0%B8%D0%B3%D0%BD%D1%83%D0%B2%D0%B0%D0%BD%D1%8C%20%D0%B7%D0%B0%D0%B3%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D0%B3%D0%BE%20%D1%84%D0%BE%D0%BD%D0%B4%D1%83%20%D0%B1%D1%8E%D0%B4%D0%B6%D0%B5%D1%82%D1%83%20%D0%BD%D0%B0%202024%20%D1%80%D1%96%D0%BA.pdf",
      },
    ],
  },
  {
    id: "2023",
    title: "2023 рік",
    items: [
      {
        id: "2023-1",
        title: "Про встановлення оплати за навчання 2023-2024 н.р.",
        subtitle: "від 22.05.2023",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%9F%D1%80%D0%BE%20%D0%B2%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BB%D0%B5%D0%BD%D0%BD%D1%8F%20%D0%BE%D0%BF%D0%BB%D0%B0%D1%82%D0%B8%20%D0%B7%D0%B0%20%D0%BD%D0%B0%D0%B2%D1%87%D0%B0%D0%BD%D0%BD%D1%8F%202023-2024%20%D0%BD.%D1%80..pdf",
      },
      {
        id: "2023-2",
        title: "Про вартість мешкання у гуртожитках коледжу",
        subtitle: "від 23.10.2023",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%9F%D1%80%D0%BE%20%D0%B2%D0%B0%D1%80%D1%82%D1%96%D1%81%D1%82%D1%8C%20%D0%BC%D0%B5%D1%88%D0%BA%D0%B0%D0%BD%D0%BD%D1%8F%20%D1%83%20%D0%B3%D1%83%D1%80%D1%82%D0%BE%D0%B6%D0%B8%D1%82%D0%BA%D0%B0%D1%85%20%D0%BA%D0%BE%D0%BB%D0%B5%D0%B4%D0%B6%D1%83%2023.10.2023.pdf",
      },
      {
        id: "2023-3",
        title: "Про вартість мешкання у гуртожитках коледжу",
        subtitle: "від 15.09.2023",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%9F%D1%80%D0%BE%20%D0%B2%D0%B0%D1%80%D1%82%D1%96%D1%81%D1%82%D1%8C%20%D0%BC%D0%B5%D1%88%D0%BA%D0%B0%D0%BD%D0%BD%D1%8F%20%D1%83%20%D0%B3%D1%83%D1%80%D1%82%D0%BE%D0%B6%D0%B8%D1%82%D0%BA%D0%B0%D1%85%20%D0%BA%D0%BE%D0%BB%D0%B5%D0%B4%D0%B6%D1%83%2015.09.2023.pdf",
      },
    ],
  },
  {
    id: "2022",
    title: "2022 рік",
    items: [
      {
        id: "2022-1",
        title: "Про встановлення оплати за навчання 2022-2023 н.р.",
        subtitle: "від 03.06.2022",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%9F%D1%80%D0%BE%20%D0%B2%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BB%D0%B5%D0%BD%D0%BD%D1%8F%20%D0%BE%D0%BF%D0%BB%D0%B0%D1%82%D0%B8%20%D0%B7%D0%B0%20%D0%BD%D0%B0%D0%B2%D1%87%D0%B0%D0%BD%D0%BD%D1%8F%202022-2023%20%D0%BD.%D1%80..pdf",
      },
      {
        id: "2022-2",
        title: "Про вартість мешкання у гуртожитках коледжу",
        subtitle: "від 31.08.2022",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%9F%D1%80%D0%BE%20%D0%B2%D0%B0%D1%80%D1%82%D1%96%D1%81%D1%82%D1%8C%20%D0%BC%D0%B5%D1%88%D0%BA%D0%B0%D0%BD%D0%BD%D1%8F%20%D1%83%20%D0%B3%D1%83%D1%80%D1%82%D0%BE%D0%B6%D0%B8%D1%82%D0%BA%D0%B0%D1%85%20%D0%BA%D0%BE%D0%BB%D0%B5%D0%B4%D0%B6%D1%83%2031.08.2022.pdf",
      },
      {
        id: "2022-3",
        title: "Про вартість мешкання у гуртожитках коледжу",
        subtitle: "від 22.06.2022",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%9F%D1%80%D0%BE%20%D0%B2%D0%B0%D1%80%D1%82%D1%96%D1%81%D1%82%D1%8C%20%D0%BC%D0%B5%D1%88%D0%BA%D0%B0%D0%BD%D0%BD%D1%8F%20%D1%83%20%D0%B3%D1%83%D1%80%D1%82%D0%BE%D0%B6%D0%B8%D1%82%D0%BA%D0%B0%D1%85%20%D0%BA%D0%BE%D0%BB%D0%B5%D0%B4%D0%B6%D1%83%2022.06.2022.pdf",
      },
      {
        id: "2022-4",
        title: "Кошторис на 2022 рік",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%9A%D0%BE%D1%88%D1%82%D0%BE%D1%80%D0%B8%D1%81%20%D0%BD%D0%B0%202022%20%D1%80%D1%96%D0%BA.pdf",
      },
    ],
  },
  {
    id: "2021",
    title: "2021 рік",
    items: [
      {
        id: "2021-1",
        title: "Про встановлення оплати за навчання 2021-2022 н.р.",
        subtitle: "від 11.06.2021",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%9F%D1%80%D0%BE%20%D0%B2%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BB%D0%B5%D0%BD%D0%BD%D1%8F%20%D0%BE%D0%BF%D0%BB%D0%B0%D1%82%D0%B8%20%D0%B7%D0%B0%20%D0%BD%D0%B0%D0%B2%D1%87%D0%B0%D0%BD%D0%BD%D1%8F%202021-2022%20%D0%BD.%D1%80..pdf",
      },
      {
        id: "2021-2",
        title: "Про вартість мешкання у гуртожитках коледжу",
        subtitle: "від 08.12.2021",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%9F%D1%80%D0%BE%20%D0%B2%D0%B0%D1%80%D1%82%D1%96%D1%81%D1%82%D1%8C%20%D0%BC%D0%B5%D1%88%D0%BA%D0%B0%D0%BD%D0%BD%D1%8F%20%D1%83%20%D0%B3%D1%83%D1%80%D1%82%D0%BE%D0%B6%D0%B8%D1%82%D0%BA%D0%B0%D1%85%20%D0%BA%D0%BE%D0%BB%D0%B5%D0%B4%D0%B6%D1%83%2008.12.2021.pdf",
      },
      {
        id: "2021-3",
        title: "Кошторис на 2021 рік",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%9A%D0%BE%D1%88%D1%82%D0%BE%D1%80%D0%B8%D1%81%20%D0%BD%D0%B0%202021%20%D1%80%D1%96%D0%BA.pdf",
      },
    ],
  },
  {
    id: "2020",
    title: "2020 рік",
    items: [
      {
        id: "2020-1",
        title: "Про встановлення оплати за навчання в 2020/2021 н.р.",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%9F%D1%80%D0%BE%20%D0%B2%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BB%D0%B5%D0%BD%D0%BD%D1%8F%20%D0%BE%D0%BF%D0%BB%D0%B0%D1%82%D0%B8%20%D0%B7%D0%B0%20%D0%BD%D0%B0%D0%B2%D1%87%D0%B0%D0%BD%D0%BD%D1%8F%202020-2021%20%D0%BD.%D1%80..pdf",
      },
      {
        id: "2020-2",
        title: "Кошторис витрат на навчання на 2020 рік",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%9A%D0%BE%D1%88%D1%82%D0%BE%D1%80%D0%B8%D1%81%20%D0%B2%D0%B8%D1%82%D1%80%D0%B0%D1%82%20%D0%BD%D0%B0%20%D0%BD%D0%B0%D0%B2%D1%87%D0%B0%D0%BD%D0%BD%D1%8F%20%D0%BD%D0%B0%202020%20%D1%80%D1%96%D0%BA.pdf",
      },
      {
        id: "2020-3",
        title: "Кошторис на 2020 рік",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%9A%D0%BE%D1%88%D1%82%D0%BE%D1%80%D0%B8%D1%81%20%D0%BD%D0%B0%202020%20%D1%80%D1%96%D0%BA.pdf",
      },
      {
        id: "2020-4",
        title: "Про вартість мешкання у гуртожитках коледжу",
        subtitle: "від 02.11.2020",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%9F%D1%80%D0%BE%20%D0%B2%D0%B0%D1%80%D1%82%D1%96%D1%81%D1%82%D1%8C%20%D0%BC%D0%B5%D1%88%D0%BA%D0%B0%D0%BD%D0%BD%D1%8F%20%D1%83%20%D0%B3%D1%83%D1%80%D1%82%D0%BE%D0%B6%D0%B8%D1%82%D0%BA%D0%B0%D1%85%20%D0%BA%D0%BE%D0%BB%D0%B5%D0%B4%D0%B6%D1%83%2002.11.2020.pdf",
      },
      {
        id: "2020-5",
        title: "Про вартість мешкання у гуртожитках коледжу",
        subtitle: "від 12.05.2020",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%9F%D1%80%D0%BE%20%D0%B2%D0%B0%D1%80%D1%82%D1%96%D1%81%D1%82%D1%8C%20%D0%BC%D0%B5%D1%88%D0%BA%D0%B0%D0%BD%D0%BD%D1%8F%20%D1%83%20%D0%B3%D1%83%D1%80%D1%82%D0%BE%D0%B6%D0%B8%D1%82%D0%BA%D0%B0%D1%85%20%D0%BA%D0%BE%D0%BB%D0%B5%D0%B4%D0%B6%D1%83%2012.05.2020.pdf",
      },
      {
        id: "2020-6",
        title: "Про вартість мешкання у гуртожитках коледжу",
        subtitle: "від 03.02.2020",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%9F%D1%80%D0%BE%20%D0%B2%D0%B0%D1%80%D1%82%D1%96%D1%81%D1%82%D1%8C%20%D0%BC%D0%B5%D1%88%D0%BA%D0%B0%D0%BD%D0%BD%D1%8F%20%D1%83%20%D0%B3%D1%83%D1%80%D1%82%D0%BE%D0%B6%D0%B8%D1%82%D0%BA%D0%B0%D1%85%20%D0%BA%D0%BE%D0%BB%D0%B5%D0%B4%D0%B6%D1%83%2003.02.2020.pdf",
      },
    ],
  },
  {
    id: "2019",
    title: "2019 рік",
    items: [
      {
        id: "2019-1",
        title: "Про встановлення оплати за навчання в 2019/2020 н.р.",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%9F%D1%80%D0%BE%20%D0%B2%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BB%D0%B5%D0%BD%D0%BD%D1%8F%20%D0%BE%D0%BF%D0%BB%D0%B0%D1%82%D0%B8%20%D0%B7%D0%B0%20%D0%BD%D0%B0%D0%B2%D1%87%D0%B0%D0%BD%D0%BD%D1%8F%202019-2020%20%D0%BD.%D1%80..pdf",
      },
      {
        id: "2019-2",
        title: "Про вартість мешкання у гуртожитках коледжу за 2019 рік",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%9F%D1%80%D0%BE%20%D0%B2%D0%B0%D1%80%D1%82%D1%96%D1%81%D1%82%D1%8C%20%D0%BC%D0%B5%D1%88%D0%BA%D0%B0%D0%BD%D0%BD%D1%8F%20%D1%83%20%D0%B3%D1%83%D1%80%D1%82%D0%BE%D0%B6%D0%B8%D1%82%D0%BA%D0%B0%D1%85%20%D0%BA%D0%BE%D0%BB%D0%B5%D0%B4%D0%B6%D1%83%202019.pdf",
      },
      {
        id: "2019-3",
        title: "Кошторис на 2019 рік",
        pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%9A%D0%BE%D1%88%D1%82%D0%BE%D1%80%D0%B8%D1%81%20%D0%BD%D0%B0%202019%20%D1%80%D1%96%D0%BA.pdf",
      },
    ],
  },
];
