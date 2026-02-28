"use client";
import { X, Plane } from "lucide-react";
import React, { useEffect, useRef } from "react";
import Link from "next/link";

import ThemeToggle from "../common/ThemeToggle/ThemeToggle";
import MobileNavItem from "../common/Header/MobileNavItem";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useMobileMenu } from "@/hooks/useMobileMenu";
import { links } from "@/lib/navigation";

const MobileMenuDrawer = () => {
  const { isMenuOpen, closeMenu } = useMobileMenu();
  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuRef, closeMenu, isMenuOpen);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <div
      className={`fixed inset-0 z-[999] md:hidden transition-[visibility] duration-300 ${
        isMenuOpen ? "visible" : "invisible"
      }`}
    >
      <div
        className={`absolute inset-0 backdrop-blur-sm transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={closeMenu}
      />

      <div
        ref={menuRef}
        className={`ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-background border-l border-border shadow-2xl transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-4">
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-2"
          >
            <Plane className="h-5 w-5 text-blue-600" />
            <span className="text-base font-bold">Авіаційний коледж</span>
          </Link>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-input p-2 text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            onClick={closeMenu}
            aria-label="Закрити меню"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-3">
          {links.map((link) => (
            <MobileNavItem
              key={link.label}
              label={link.label}
              href={link.href}
              onClick={closeMenu}
            />
          ))}
        </nav>

        <div className="border-t border-border p-4">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default MobileMenuDrawer;
