"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export default function ThemeToggle() {
    const [theme, setTheme] = useState<"light" | "dark">("light")

    useEffect(() => {
        if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
            document.documentElement.classList.add("dark")
            setTheme("dark")
        } else {
            document.documentElement.classList.remove("dark")
            setTheme("light")
        }
    }, [])

    const toggleTheme = () => {
        const isDark = document.documentElement.classList.contains("dark")
        if (isDark) {
            document.documentElement.classList.remove("dark")
            localStorage.setItem("theme", "light")
            setTheme("light")
        } else {
            document.documentElement.classList.add("dark")
            localStorage.setItem("theme", "dark")
            setTheme("dark")
        }
    }

    return (
        <Button
            onClick={toggleTheme}
            className="rounded px-4 py-2 border text-sm transition-colors border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
            {theme === "dark" ? "🌞 Light" : "🌙 Dark"}
        </Button>
    )
}
