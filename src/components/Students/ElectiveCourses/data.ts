export interface ElectiveCourse {
  id: string;
  title: string;
  description: string;
  credits: number;
  semester: string;
  specialty: string;
  pdfUrl?: string;
}

export interface CourseCategory {
  id: string;
  title: string;
  description: string;
  courses: ElectiveCourse[];
}

export interface YearCatalog {
  id: string;
  year: string;
  categories: CourseCategory[];
}

export const electiveCatalogs: YearCatalog[] = [
  {
    id: "2024",
    year: "2024-2025",
    categories: [
      {
        id: "it",
        title: "Інформаційні технології",
        description: "Дисципліни для спеціальностей 121, 123, 126",
        courses: [
          {
            id: "1",
            title: "Веб-технології та веб-дизайн",
            description: "Основи HTML, CSS, JavaScript та принципи створення сучасних веб-сайтів",
            credits: 4,
            semester: "5-6",
            specialty: "121, 123",
          },
          {
            id: "2",
            title: "Мобільна розробка",
            description: "Розробка мобільних додатків для Android та iOS платформ",
            credits: 4,
            semester: "6-7",
            specialty: "121, 123",
          },
          {
            id: "3",
            title: "Хмарні технології",
            description: "Основи роботи з хмарними сервісами AWS, Azure, Google Cloud",
            credits: 3,
            semester: "7",
            specialty: "123",
          },
          {
            id: "4",
            title: "Кібербезпека",
            description: "Захист інформації, криптографія та мережева безпека",
            credits: 4,
            semester: "6-7",
            specialty: "123, 126",
          },
        ],
      },
      {
        id: "aviation",
        title: "Авіаційні технології",
        description: "Дисципліни для спеціальностей 173, 272, 275",
        courses: [
          {
            id: "5",
            title: "Сучасні авіаційні системи",
            description: "Вивчення новітніх систем авіоніки та навігаційного обладнання",
            credits: 4,
            semester: "5-6",
            specialty: "173, 272",
          },
          {
            id: "6",
            title: "Безпілотні авіаційні комплекси",
            description: "Конструкція, експлуатація та програмування БПЛА",
            credits: 4,
            semester: "6-7",
            specialty: "173, 272",
          },
          {
            id: "7",
            title: "Авіаційна логістика",
            description: "Організація авіаційних перевезень та логістичні процеси",
            credits: 3,
            semester: "5",
            specialty: "275",
          },
        ],
      },
      {
        id: "electrical",
        title: "Електротехніка та автоматизація",
        description: "Дисципліни для спеціальностей 141, 174",
        courses: [
          {
            id: "8",
            title: "Альтернативні джерела енергії",
            description: "Сонячна, вітрова енергетика та інші відновлювані джерела",
            credits: 3,
            semester: "6",
            specialty: "141",
          },
          {
            id: "9",
            title: "Промислова робототехніка",
            description: "Програмування та експлуатація промислових роботів",
            credits: 4,
            semester: "6-7",
            specialty: "174",
          },
          {
            id: "10",
            title: "Розумний дім та IoT",
            description: "Системи автоматизації будівель та Інтернет речей",
            credits: 3,
            semester: "7",
            specialty: "141, 174",
          },
        ],
      },
      {
        id: "general",
        title: "Загальноосвітні дисципліни",
        description: "Дисципліни для всіх спеціальностей",
        courses: [
          {
            id: "11",
            title: "Ділова англійська мова",
            description: "Професійна англійська для технічних спеціальностей",
            credits: 3,
            semester: "5-6",
            specialty: "Всі",
          },
          {
            id: "12",
            title: "Основи підприємництва",
            description: "Створення та розвиток власного бізнесу в технічній сфері",
            credits: 2,
            semester: "7",
            specialty: "Всі",
          },
          {
            id: "13",
            title: "Soft skills для інженерів",
            description: "Комунікація, робота в команді, презентаційні навички",
            credits: 2,
            semester: "5",
            specialty: "Всі",
          },
        ],
      },
    ],
  },
  {
    id: "2023",
    year: "2023-2024",
    categories: [
      {
        id: "it-2023",
        title: "Інформаційні технології",
        description: "Дисципліни для IT спеціальностей",
        courses: [
          {
            id: "14",
            title: "Основи штучного інтелекту",
            description: "Вступ до машинного навчання та нейронних мереж",
            credits: 4,
            semester: "6-7",
            specialty: "121, 123",
          },
          {
            id: "15",
            title: "DevOps практики",
            description: "CI/CD, контейнеризація та автоматизація розгортання",
            credits: 3,
            semester: "7",
            specialty: "121, 123",
          },
        ],
      },
      {
        id: "aviation-2023",
        title: "Авіаційні технології",
        description: "Дисципліни для авіаційних спеціальностей",
        courses: [
          {
            id: "16",
            title: "Технічна діагностика авіаційної техніки",
            description: "Методи та засоби діагностування повітряних суден",
            credits: 4,
            semester: "6",
            specialty: "173, 272",
          },
        ],
      },
    ],
  },
  {
    id: "2022",
    year: "2022-2023",
    categories: [
      {
        id: "general-2022",
        title: "Загальноосвітні дисципліни",
        description: "Дисципліни для всіх спеціальностей",
        courses: [
          {
            id: "17",
            title: "Академічна доброчесність",
            description: "Етика наукової діяльності та академічне письмо",
            credits: 2,
            semester: "3",
            specialty: "Всі",
          },
        ],
      },
    ],
  },
];

export const catalogDocuments = [
  {
    id: "1",
    title: "Каталог дисциплін за вибором 2024-2025",
    pdfUrl: "http://kk.nau.edu.ua/files/elective_catalog_2024.pdf",
  },
  {
    id: "2",
    title: "Каталог дисциплін за вибором 2023-2024",
    pdfUrl: "http://kk.nau.edu.ua/files/elective_catalog_2023.pdf",
  },
  {
    id: "3",
    title: "Каталог дисциплін за вибором 2022-2023",
    pdfUrl: "http://kk.nau.edu.ua/files/elective_catalog_2022.pdf",
  },
];
