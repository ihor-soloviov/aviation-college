"use client"
import Link from 'next/link'
import { Plane, Menu, X } from 'lucide-react'
import React, { useState, useEffect } from 'react'

import ThemeToggle from '../common/ThemeToggle/ThemeToggle'
import NavItem from '../common/Header/NavItem'
import { links } from '@/lib/navigation'

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    const handleLinkClick = () => {
        setIsOpen(false)
    }

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
                    
                    {/* Mobile Menu Button */}
                    <button 
                        className="md:hidden p-2 hover:bg-accent rounded-md transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? "Закрити меню" : "Відкрити меню"}
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div 
                className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ${
                    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={() => setIsOpen(false)}
            />

            {/* Mobile Menu Sidebar */}
            <div 
                className={`fixed top-0 right-0 h-full w-[300px] sm:w-[350px] bg-background z-50 md:hidden transform transition-transform duration-300 ease-in-out shadow-xl ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex items-center justify-between p-4 border-b">
                    <span className="text-lg font-semibold">Меню</span>
                    <button 
                        className="p-2 hover:bg-accent rounded-md transition-colors"
                        onClick={() => setIsOpen(false)}
                        aria-label="Закрити меню"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <nav className="flex flex-col p-4">
                    {links.map((link) => (
                        <div key={link.label} onClick={handleLinkClick} className="border-b border-border last:border-b-0">
                            <NavItem label={link.label} href={link.href} />
                        </div>
                    ))}
                </nav>
            </div>
        </header>
    )
}

export default Header
