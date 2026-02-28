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
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-input text-foreground transition-colors hover:bg-accent hover:text-accent-foreground md:hidden"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Закрити меню" : "Відкрити меню"}
          >
            <Menu
              className={`h-5 w-5 absolute transition-all duration-200 ${
                isMenuOpen
                  ? "opacity-0 rotate-90 scale-75"
                  : "opacity-100 rotate-0 scale-100"
              }`}
            />
            <X
              className={`h-5 w-5 absolute transition-all duration-200 ${
                isMenuOpen
                  ? "opacity-100 rotate-0 scale-100"
                  : "opacity-0 -rotate-90 scale-75"
              }`}
            />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
