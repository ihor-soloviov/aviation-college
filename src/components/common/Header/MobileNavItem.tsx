"use client";
import clsx from "clsx";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

interface MobileNavItemProps {
  label: string;
  href: string;
  onClick?: () => void;
}

const MobileNavItem = ({ label, href, onClick }: MobileNavItemProps) => {
  const pathname = usePathname();
  const isActive =
    href === "/" ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        "flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium transition-colors",
        isActive
          ? "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
          : "text-foreground hover:bg-accent",
      )}
    >
      {label}
      <ChevronRight
        className={clsx(
          "h-4 w-4 shrink-0 transition-colors",
          isActive ? "text-blue-600 dark:text-blue-400" : "text-muted-foreground",
        )}
      />
    </Link>
  );
};

export default MobileNavItem;
