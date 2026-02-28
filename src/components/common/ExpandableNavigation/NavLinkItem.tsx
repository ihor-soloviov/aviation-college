import Link from "next/link";
import { NavigationLink } from "./types";

export const NavLinkItem = ({ link }: { link: NavigationLink }) => {
  if (link.isInDevelopment) {
    return (
      <span className="text-sm text-gray-400 cursor-not-allowed flex items-start gap-2">
        <span className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-gray-300" />
        <span className="min-w-0 break-words">{link.title}</span>
        <span className="text-xs shrink-0">(скоро)</span>
      </span>
    );
  }

  if (link.isNeedsLink) {
    return (
      <span className="text-sm text-gray-500 dark:text-gray-400 flex items-start gap-2">
        <span className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-amber-400" />
        <span className="min-w-0 break-words">{link.title}</span>
        <span className="text-xs shrink-0 text-amber-600 dark:text-amber-500">
          Потрібно додати посилання
        </span>
      </span>
    );
  }

  return (
    <Link
      href={link.href}
      target={link.isExternal ? "_blank" : undefined}
      rel={link.isExternal ? "noopener noreferrer" : undefined}
      className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-start gap-2"
      aria-label={link.title}
    >
      <span className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-blue-500" />
      <span className="min-w-0 break-words">{link.title}</span>
      {link.isExternal && (
        <span className="text-xs text-gray-400 shrink-0" aria-hidden>
          ↗
        </span>
      )}
    </Link>
  );
};
