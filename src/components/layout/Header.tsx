"use client"
import Link from 'next/link'
import { Plane, Menu } from 'lucide-react'
import React, { useState } from 'react'

import ThemeToggle from '../common/ThemeToggle/ThemeToggle'
import NavItem from '../common/Header/NavItem'
import { links } from '@/lib/navigation'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useIsMobile } from '@/components/ui/use-mobile'

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    const isMobile = useIsMobile()

    return (
        <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between py-4 mx-auto">
                <Link href="/" className="flex items-center gap-2">
                    <Plane className="h-6 w-6 text-blue-600" />
                    <span className="text-xl font-bold">Авіаційний коледж</span>
                </Link>
                
                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    {links.map((link) => (
                        <NavItem key={link.label} label={link.label} href={link.href} />
                    ))}
                </nav>
                
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    
                    {isMobile && (
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <button 
                                    className="md:hidden p-2 hover:bg-accent rounded-md transition-colors"
                                    aria-label="Відкрити меню"
                                >
                                    <Menu className="h-6 w-6" />
                                </button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                                <nav className="flex flex-col gap-6 mt-8">
                                    {links.map((link) => (
                                        <div key={link.label} onClick={() => setIsOpen(false)}>
                                            <NavItem label={link.label} href={link.href} />
                                        </div>
                                    ))}
                                </nav>
                            </SheetContent>
                        </Sheet>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header
