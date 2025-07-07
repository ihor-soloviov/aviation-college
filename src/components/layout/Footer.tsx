import Link from 'next/link'
import { Plane } from 'lucide-react'
import React from 'react'
import Image from 'next/image'

const socials = [
    {
        name: 'instagram',
        href: 'https://www.instagram.com/kk_nau/',
        iconPath: '/instagram.svg'
    },
    {
        name: 'facebook',
        href: 'https://www.facebook.com/kknauofficial/?rf=1794013074244809',
        iconPath: '/facebook.svg'
    },

    {
        name: 'youtube',
        href: 'https://www.youtube.com/channel/UCLWVYkhjvjMsyAwofwPY_zQ',
        iconPath: '/youtube.svg'
    },
    {
        name: 'telegram',
        href: 'https://t.me/kk_nau',
        iconPath: '/telegram.svg'
    }
]

const Footer = () => {
    return (
        <footer className="border-t bg-gray-50 dark:bg-background">
            <div className="container py-12 mx-auto">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <Plane className="h-6 w-6 text-blue-600" />
                            <span className="text-xl font-bold">Авіаційний коледж</span>
                        </div>
                        <p className="mt-4 text-sm text-muted-foreground">
                            Надаємо освіту в галузі авіації з 1951 року.
                        </p>
                        <div className="mt-4 flex gap-4">
                            {socials.map((social) => (
                                <Link key={social.name} href={social.href} className="text-muted-foreground hover:text-blue-600">
                                    <span className="sr-only">{social.name}</span>
                                    <Image src={social.iconPath} alt={social.name} width={24} height={24} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Програми</h4>
                        <ul className="space-y-2 text-sm">
                            {[
                                "Pilot Training",
                                "Aircraft Maintenance",
                                "Aviation Management",
                                "Air Traffic Control",
                                "Flight Dispatcher",
                            ].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-sm text-muted-foreground transition-colors duration-300 hover:text-black">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Ресурси</h4>
                        <ul className="space-y-2 text-sm">
                            {["Admissions", "Financial Aid", "Career Services", "Student Life", "Alumni Network"].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-sm text-muted-foreground transition-colors duration-300 hover:text-black">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Контакти</h4>
                        <address className="not-italic">
                            <a
                                href="https://maps.app.goo.gl/UzDMeywUZNE1dkKv5"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-muted-foreground transition-colors duration-300 hover:text-black"
                            >
                                вулиця Олега Антонова, 1
                            </a>
                            <br />
                            <a
                                href="https://maps.app.goo.gl/UzDMeywUZNE1dkKv5"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-muted-foreground transition-colors duration-300 hover:text-black"
                            >
                                Кривий Ріг, 50024
                            </a>
                            <br />
                            <a
                                href="mailto:pochta@krfk.kai.edu.ua"
                                className="mt-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-black"
                            >
                                pochta@krfk.kai.edu.ua
                            </a>
                            <br />
                            <a
                                href="tel:+380678241414"
                                className="text-sm text-muted-foreground transition-colors duration-300 hover:text-black"
                            >
                                067-824-14-14
                            </a>

                        </address>
                    </div>
                </div>

                <div className="mt-12 border-t pt-8 text-center">
                    <div className="text-xs text-muted-foreground">
                        <span className="font-bold">
                            &copy; {new Date().getFullYear()}
                        </span>
                        {" "}
                        <span>
                            Криворізький фаховий коледж
                            державного некомерційного підприємства
                            «Державний університет «Київський авіаційний інститут»
                        </span>
                        <span />
                    </div>
                </div>
            </div>
        </footer >
    )
}

export default Footer
