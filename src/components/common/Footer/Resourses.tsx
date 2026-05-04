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
      <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm lg:grid-cols-1">
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
