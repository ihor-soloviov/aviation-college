export interface Platform {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: "moodle" | "google" | "meet" | "zoom";
  features: string[];
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  type: "guide" | "video" | "document";
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export const platforms: Platform[] = [
  {
    id: "1",
    name: "Moodle НАУ",
    description: "Основна платформа дистанційного навчання Національного авіаційного університету",
    url: "https://moodle.nau.edu.ua",
    icon: "moodle",
    features: [
      "Доступ до навчальних матеріалів",
      "Виконання завдань та тестів",
      "Відстеження успішності",
      "Комунікація з викладачами",
    ],
  },
  {
    id: "2",
    name: "Google Classroom",
    description: "Додаткова платформа для організації навчального процесу та комунікації",
    url: "https://classroom.google.com",
    icon: "google",
    features: [
      "Оголошення та завдання",
      "Групова робота",
      "Здача робіт онлайн",
      "Зворотний зв'язок",
    ],
  },
  {
    id: "3",
    name: "Google Meet",
    description: "Платформа для проведення онлайн-занять та консультацій у режимі відеоконференції",
    url: "https://meet.google.com",
    icon: "meet",
    features: [
      "Онлайн-лекції",
      "Семінари та консультації",
      "Демонстрація екрану",
      "Запис занять",
    ],
  },
  {
    id: "4",
    name: "Zoom",
    description: "Альтернативна платформа для відеоконференцій та онлайн-занять",
    url: "https://zoom.us",
    icon: "zoom",
    features: [
      "Великі групові заняття",
      "Breakout-кімнати",
      "Інтерактивна дошка",
      "Чат під час занять",
    ],
  },
];

export const resources: Resource[] = [
  {
    id: "1",
    title: "Інструкція з використання Moodle",
    description: "Покрокова інструкція для здобувачів освіти",
    url: "http://kk.nau.edu.ua/files/moodle_guide.pdf",
    type: "guide",
  },
  {
    id: "2",
    title: "Налаштування Google Classroom",
    description: "Як приєднатися до курсу та працювати з матеріалами",
    url: "http://kk.nau.edu.ua/files/classroom_guide.pdf",
    type: "guide",
  },
  {
    id: "3",
    title: "Організація робочого місця",
    description: "Рекомендації щодо технічного забезпечення для дистанційного навчання",
    url: "http://kk.nau.edu.ua/files/workspace_tips.pdf",
    type: "document",
  },
  {
    id: "4",
    title: "Тайм-менеджмент для студентів",
    description: "Як ефективно організувати навчання вдома",
    url: "http://kk.nau.edu.ua/files/time_management.pdf",
    type: "document",
  },
];

export const faqs: FAQ[] = [
  {
    id: "1",
    question: "Як отримати доступ до Moodle?",
    answer: "Для доступу до Moodle використовуйте логін та пароль, які ви отримали при вступі. Якщо ви забули пароль, зверніться до адміністратора системи або скористайтеся функцією відновлення пароля на сторінці входу.",
  },
  {
    id: "2",
    question: "Що робити, якщо не вдається підключитися до онлайн-заняття?",
    answer: "Перевірте якість інтернет-з'єднання, оновіть браузер до останньої версії, очистіть кеш. Якщо проблема не вирішується, зверніться до викладача через альтернативні канали зв'язку (email, Viber).",
  },
  {
    id: "3",
    question: "Чи обов'язкова участь в онлайн-заняттях?",
    answer: "Так, участь в синхронних онлайн-заняттях є обов'язковою. У разі неможливості участі, потрібно заздалегідь повідомити викладача та опрацювати матеріал самостійно.",
  },
  {
    id: "4",
    question: "Як здавати завдання в дистанційному форматі?",
    answer: "Завдання здаються через платформу Moodle або Google Classroom у встановлені терміни. Файли повинні бути у форматах PDF, DOC, DOCX. Переконайтеся, що файл успішно завантажено.",
  },
  {
    id: "5",
    question: "Куди звертатися з технічними проблемами?",
    answer: "З технічними проблемами звертайтеся до навчального відділу коледжу за телефоном або електронною поштою. Також можете написати в групу підтримки у Viber.",
  },
];

export const contacts = {
  email: "distance@kk.nau.edu.ua",
  phone: "+38 (056) 123-45-67",
  viber: "+38 (067) 123-45-67",
  supportHours: "Пн-Пт: 9:00 - 17:00",
};
