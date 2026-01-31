"use client"
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react"

interface MobileMenuContextValue {
  isMenuOpen: boolean
  toggleMenu: () => void
  closeMenu: () => void
}

const MobileMenuContext = createContext<MobileMenuContextValue | undefined>(undefined)

export const MobileMenuProvider = ({ children }: { children: ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = useCallback(() => setIsMenuOpen(false), [])
  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), [])

  const contextValue = useMemo(
    () => ({
      isMenuOpen,
      toggleMenu,
      closeMenu,
    }),
    [closeMenu, isMenuOpen, toggleMenu],
  )

  return <MobileMenuContext.Provider value={contextValue}>{children}</MobileMenuContext.Provider>
}

export const useMobileMenu = () => {
  const ctx = useContext(MobileMenuContext)
  if (!ctx) {
    throw new Error("useMobileMenu must be used within MobileMenuProvider")
  }
  return ctx
}

