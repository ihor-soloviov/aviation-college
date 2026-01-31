"use client";
import { X } from "lucide-react";
import React, { useEffect, useRef } from "react";

import ThemeToggle from "../common/ThemeToggle/ThemeToggle";
import NavItem from "../common/Header/NavItem";
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
        className={`absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={closeMenu}
      />

      <div
        ref={menuRef}
        className={`ml-auto flex h-full w-full flex-col overflow-y-auto bg-blue-100 px-4 py-4 shadow-2xl transition-transform duration-300 dark:bg-blue-900/30 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border pb-4">
          <span className="text-lg font-semibold">Меню</span>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-input p-2 text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            onClick={closeMenu}
            aria-label="Закрити меню"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-2 py-6">
          {links.map((link) => (
            <NavItem
              key={link.label}
              label={link.label}
              href={link.href}
              onClick={closeMenu}
            />
          ))}
        </nav>

        <div className="border-t border-border pt-4">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default MobileMenuDrawer;
