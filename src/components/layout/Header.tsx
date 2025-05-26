import Link from 'next/link'
import { Plane } from 'lucide-react'
import React from 'react'

import ThemeToggle from '../common/ThemeToggle/ThemeToggle'
import NavItem from '../common/Header/NavItem'

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

    return (
        <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between py-4 mx-auto">
                <Link href="/" className="flex items-center gap-2">
                    <Plane className="h-6 w-6 text-blue-600" />
                    <span className="text-xl font-bold">Авіаційний коледж</span>
                </Link>
                <nav className="hidden md:flex items-center gap-6">
                    {links.map((link) => (
                        <NavItem key={link.label} label={link.label} href={link.href} />
                    ))}
                </nav>
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                </div>
            </div>
        </header>
    )
}

export default Header
