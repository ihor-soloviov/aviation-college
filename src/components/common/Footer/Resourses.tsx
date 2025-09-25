import Link from "next/link";

const resourses = [
  "Admissions",
  "Financial Aid",
  "Career Services",
  "Student Life",
  "Alumni Network",
];
export const Resourses = () => {
  return (
    <div>
      <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">
        Ресурси
      </h4>
      <ul className="space-y-2 text-sm">
        {resourses.map((item) => (
          <li key={item}>
            <Link
              href="#"
              className="text-sm text-muted-foreground transition-colors duration-300 hover:text-blue-600"
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
