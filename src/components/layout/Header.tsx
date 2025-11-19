"use client"
import Link from "next/link"
import { Menu, Plane, X } from "lucide-react"
import React from "react"

import ThemeToggle from "../common/ThemeToggle/ThemeToggle"
import NavItem from "../common/Header/NavItem"
import { links } from "@/lib/navigation"
import { useMobileMenu } from "@/hooks/useMobileMenu"

const Header = () => {
  const { toggleMenu, isMenuOpen } = useMobileMenu()

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Plane className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold">Авіаційний коледж</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <NavItem key={link.label} label={link.label} href={link.href} />
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-input p-2 text-foreground transition-colors hover:bg-accent hover:text-accent-foreground md:hidden"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Закрити меню" : "Відкрити меню"}
          >
            {!isMenuOpen && <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
