"use client"
import Link from 'next/link'
import { Plane } from 'lucide-react'
import React from 'react'

import ThemeToggle from '../common/ThemeToggle/ThemeToggle'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'

const links = [
    {
        label: 'Головна',
        href: '/'
    },
    {
        label: 'Курси',
        href: '/courses'
    },
    {
        label: 'Факультети',
        href: '/facilities'
    },
    {
        label: 'Життя студента',
        href: '/student-life'
    },

    {
        label: 'Прийом',
        href: '/admissions'
    },
    {
        label: 'Контакти',
        href: '/contacts'
    },
]

const Header = () => {
    const pathname = usePathname()
    return (
        <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between py-4 mx-auto">
                <Link href="/" className="flex items-center gap-2">
                    <Plane className="h-6 w-6 text-blue-600" />
                    <span className="text-xl font-bold">Авіаційний коледж</span>
                </Link>
                <nav className="hidden md:flex items-center gap-6">
                    {links.map((link) => {
                        const isActive = pathname === link.href
                        return (
                            <Link
                                key={link.label}
                                href={link.href}
                                className={clsx(
                                    "relative inline-block text-sm font-medium transition-colors group",
                                    isActive ? "text-blue-600" : "text-muted-foreground hover:text-primary"
                                )}
                            >
                                {link.label}
                                <span
                                    className="absolute left-1/2 -bottom-1 h-0.5 w-0 -translate-x-1/2 bg-blue-600 transition-all duration-300 ease-out group-hover:w-full"
                                />
                            </Link>
                        )
                    })}
                </nav>
                <div className="flex items-center gap-4">
                </div>
            </div>
        </header>
    )
}

export default Header
