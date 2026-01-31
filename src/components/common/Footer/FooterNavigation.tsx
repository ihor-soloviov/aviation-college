import { links } from "@/lib/navigation";
import Link from "next/link";

export const FooterNavigation = () => {
  return (
    <div>
      <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">
        Навігація
      </h4>
      <ul className="space-y-2 text-sm">
        {links.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="-mx-2 -my-1 inline-block px-2 py-1 text-sm text-muted-foreground transition-colors duration-300 hover:text-blue-600"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
