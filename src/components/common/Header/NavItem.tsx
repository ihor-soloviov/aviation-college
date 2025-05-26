"use client"
import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavItemProps {
  label: string
  href: string
}

const NavItem = ({ label, href }: NavItemProps) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={clsx(
        "relative inline-block text-sm font-medium transition-colors group",
        isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
      )}
    >
      {label}
      <span
        className={clsx(
          "absolute left-1/2 -bottom-1 h-0.5 -translate-x-1/2 transition-all duration-300 ease-out",
          isActive ? "w-full bg-primary" : "w-0 bg-primary group-hover:w-full",
        )}
      />
    </Link>
  )
}

export default NavItem
