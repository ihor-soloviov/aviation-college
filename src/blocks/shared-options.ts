// Спільні опції для блоків і колекцій (єдине джерело правди = брендова консистентність).
// COLOR_OPTIONS / ICON_OPTIONS використовуються в LinkLists, Hero, CardGrid тощо.
// value кольору резолвиться у літеральні Tailwind-класи через src/lib/cms-colors.ts.
// value іконки === точна назва Lucide-компонента (резолвиться через getLucideIcon у рендерері).

export const COLOR_OPTIONS = [
    { label: 'Синій', value: 'blue' },
    { label: 'Індиго', value: 'indigo' },
    { label: 'Фіолетовий', value: 'purple' },
    { label: 'Рожевий', value: 'pink' },
    { label: 'Червоний', value: 'red' },
    { label: 'Оранжевий', value: 'orange' },
    { label: 'Жовтий', value: 'amber' },
    { label: 'Зелений', value: 'green' },
    { label: 'Смарагдовий', value: 'emerald' },
    { label: 'Бірюзовий', value: 'teal' },
    { label: 'Блакитний', value: 'sky' },
    { label: 'Ціановий', value: 'cyan' },
    { label: 'Фіалковий', value: 'violet' },
    { label: 'Трояндовий', value: 'rose' },
    { label: 'Сірий', value: 'slate' },
]

// Курований список Lucide-іконок для випадаючого вибору в адмінці.
// value === точна назва Lucide-компонента. Усі назви перевірені проти lucide-react.
// Щоб додати нову — додай рядок тут.
export const ICON_OPTIONS = [
    // Документи / файли
    { label: 'Документ — FileText', value: 'FileText' },
    { label: 'Файл — File', value: 'File' },
    { label: 'Файли — Files', value: 'Files' },
    { label: 'Документ ✓ — FileCheck', value: 'FileCheck' },
    { label: 'Папка — Folder', value: 'Folder' },
    { label: 'Папка відкрита — FolderOpen', value: 'FolderOpen' },
    { label: 'Сувій — ScrollText', value: 'ScrollText' },
    { label: 'Завантажити — Download', value: 'Download' },
    { label: 'Друк/печатка — Stamp', value: 'Stamp' },
    // Списки / звіти
    { label: 'Список — ClipboardList', value: 'ClipboardList' },
    { label: 'Список ✓ — ClipboardCheck', value: 'ClipboardCheck' },
    { label: 'Чек-лист — ListChecks', value: 'ListChecks' },
    { label: 'Діаграма — BarChart3', value: 'BarChart3' },
    // Освіта / наука
    { label: 'Книга — BookOpen', value: 'BookOpen' },
    { label: 'Книга з закладкою — BookMarked', value: 'BookMarked' },
    { label: 'Випускник — GraduationCap', value: 'GraduationCap' },
    { label: 'Школа/заклад — School', value: 'School' },
    { label: 'Бібліотека — Library', value: 'Library' },
    { label: 'Презентація — Presentation', value: 'Presentation' },
    { label: 'Мікроскоп — Microscope', value: 'Microscope' },
    { label: 'Калькулятор — Calculator', value: 'Calculator' },
    { label: 'Історія — History', value: 'History' },
    { label: 'Колба — FlaskConical', value: 'FlaskConical' },
    { label: 'Ідея — Lightbulb', value: 'Lightbulb' },
    { label: 'Олівець — Pencil', value: 'Pencil' },
    { label: 'Нотатки — NotebookPen', value: 'NotebookPen' },
    // Люди
    { label: 'Люди — Users', value: 'Users' },
    { label: 'Людина — User', value: 'User' },
    { label: 'Людина ✓ — UserCheck', value: 'UserCheck' },
    { label: 'Контакт — Contact', value: 'Contact' },
    { label: 'Портфель — Briefcase', value: 'Briefcase' },
    { label: 'Дитина — Baby', value: 'Baby' },
    { label: 'Доступність — Accessibility', value: 'Accessibility' },
    // Нагороди
    { label: 'Нагорода — Award', value: 'Award' },
    { label: 'Кубок — Trophy', value: 'Trophy' },
    { label: 'Медаль — Medal', value: 'Medal' },
    { label: 'Зірка — Star', value: 'Star' },
    // Право / безпека
    { label: 'Терези — Scale', value: 'Scale' },
    { label: 'Молоток судді — Gavel', value: 'Gavel' },
    { label: 'Щит — Shield', value: 'Shield' },
    { label: 'Щит ✓ — ShieldCheck', value: 'ShieldCheck' },
    { label: 'Щит ! — ShieldAlert', value: 'ShieldAlert' },
    { label: 'Увага — AlertTriangle', value: 'AlertTriangle' },
    // Фінанси
    { label: 'Гроші — Banknote', value: 'Banknote' },
    { label: 'Гаманець — Wallet', value: 'Wallet' },
    { label: 'Картка — CreditCard', value: 'CreditCard' },
    // Зв'язок / навігація
    { label: 'Телефон — Phone', value: 'Phone' },
    { label: 'Пошта — Mail', value: 'Mail' },
    { label: 'Локація — MapPin', value: 'MapPin' },
    { label: 'Мапа — Map', value: 'Map' },
    { label: 'Глобус/сайт — Globe', value: 'Globe' },
    { label: 'Зовнішнє посилання — ExternalLink', value: 'ExternalLink' },
    { label: 'Посилання — Link', value: 'Link' },
    // Інше
    { label: 'Календар — Calendar', value: 'Calendar' },
    { label: 'Годинник — Clock', value: 'Clock' },
    { label: 'Дзвоник — Bell', value: 'Bell' },
    { label: 'Гучномовець — Megaphone', value: 'Megaphone' },
    { label: 'Новини — Newspaper', value: 'Newspaper' },
    { label: 'Зображення — Image', value: 'Image' },
    { label: 'Камера — Camera', value: 'Camera' },
    { label: 'Серце — Heart', value: 'Heart' },
    { label: 'Інфо — Info', value: 'Info' },
    { label: 'Увага (коло) — AlertCircle', value: 'AlertCircle' },
    { label: 'Дім — Home', value: 'Home' },
    { label: 'Заклад — Building2', value: 'Building2' },
    { label: 'Літак — Plane', value: 'Plane' },
    { label: 'Вантажівка — Truck', value: 'Truck' },
    { label: 'Монітор — Monitor', value: 'Monitor' },
    { label: 'Рукостискання — Handshake', value: 'Handshake' },
    { label: 'Мета — Target', value: 'Target' },
]
