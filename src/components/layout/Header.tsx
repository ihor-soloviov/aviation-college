"use client"
import Link from 'next/link'
import { MenuIcon, Plane } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

import ThemeToggle from '../common/ThemeToggle/ThemeToggle'
import NavItem from '../common/Header/NavItem'
import { useMediaQuery } from 'usehooks-ts'
import { useClickOutside } from '@/hooks/useClickOutside'   
import { links } from '@/lib/navigation'

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    // const isMobile = useMediaQuery('(max-width: 768px)')
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    useClickOutside(mobileMenuRef, () => setIsMobileMenuOpen(false), isMobileMenuOpen)

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
                    {/* {isMobile && (
                        <MenuIcon className="h-6 w-6 text-blue-600" onClick={() => setIsMobileMenuOpen(true)} />
                    )} */}
                </div>
            </div>
            {/* {isMobileMenuOpen && (
                <div ref={mobileMenuRef} className="fixed top-0 left-0 w-full h-screen bg-background" >
                    <div className="container mx-auto">
                        <MenuIcon className="h-6 w-6 text-blue-600" onClick={() => setIsMobileMenuOpen(false)} />
                        <div className="flex flex-col items-center gap-4">
                            {links.map((link) => (
                                <NavItem key={link.label} label={link.label} href={link.href} />
                            ))}
                        </div>
                    </div>
                </div>
            )} */}
        </header>
    )
}

export default Header
