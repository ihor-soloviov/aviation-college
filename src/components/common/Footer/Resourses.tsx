import Link from "next/link";

const resourses = [
  { label: "Вступ", href: "/admitions" },
  { label: "Оплата навчання", href: "/students/tuition-fees" },
  { label: "Стипендії", href: "/students/social-scholarships" },
  { label: "Розклад занять", href: "/students/schedule" },
  { label: "Документи", href: "/documents" },
];
export const Resourses = () => {
  return (
    <div>
      <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">
        Ресурси
      </h4>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm lg:grid-cols-1">
        {resourses.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-sm text-muted-foreground transition-colors duration-300 hover:text-blue-600"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
