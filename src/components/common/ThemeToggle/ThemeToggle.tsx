"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState, memo } from "react"

import { Button } from "@/components/ui/button"

const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9">
        <div className="h-4 w-4" />
      </Button>
    )
  }

  const currentTheme = resolvedTheme // light або dark, навіть якщо theme === "system"

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(currentTheme === "light" ? "dark" : "light")}
      className="h-9 w-9 transition-colors hover:bg-accent"
    >
      <ThemeIcon theme={currentTheme} />
      <span className="sr-only">Перемикач теми</span>
    </Button>
  )
}

const ThemeIcon = memo(function ThemeIcon({ theme }: { theme: string | undefined }) {
  return (
    <>
      {theme === "light" ? <Moon className="h-4 w-4 transition-all" /> : <Sun className="h-4 w-4 transition-all" />}
    </>
  )
})

export default ThemeToggle
