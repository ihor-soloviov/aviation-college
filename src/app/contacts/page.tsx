import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Users,
    Award,
    Target,
    Heart,
    Shield,
    Star,
    MapPin,
    Phone,
    Mail,
    GraduationCap,
} from "lucide-react"
import Hero from "@/components/common/Hero/Hero"


export default function AboutPage() {
    return (
        <>
            <Hero imgPath="/hero-contact-us.webp" />

            <section className="bg-gray-50 dark:bg-background py-16 md:py-24">
                <div className="container space-y-12 mx-auto">
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <div className="inline-block rounded-full bg-blue-100 p-2">
                            <Phone className="h-6 w-6 text-blue-600" />
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Контакти</h2>
                        <p className="max-w-[700px] text-muted-foreground">
                            Із запитаннями, пропозиціями та скаргами можна звернутись заповнивши електронну форму для звернень або
                            скористатися контактами нижче.
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {/* College Administration */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Users className="h-5 w-5 text-blue-600" />
                                    <CardTitle className="text-lg">Адміністрація коледжу</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <div className="font-medium">Начальник коледжу</div>
                                    <div className="text-sm text-muted-foreground">Анатолій Олександрович Андрусевич</div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Phone className="h-3 w-3 text-blue-600" />
                                        <span className="text-sm">067-824-14-14</span>
                                    </div>
                                </div>
                                <div>
                                    <div className="font-medium">Приймальна начальника</div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Phone className="h-3 w-3 text-blue-600" />
                                        <span className="text-sm">067-824-14-14</span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Mail className="h-3 w-3 text-blue-600" />
                                        <span className="text-sm">pochta@krfk.kai.edu.ua</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Admissions */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <GraduationCap className="h-5 w-5 text-blue-600" />
                                    <CardTitle className="text-lg">Приймальна комісія</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <div className="font-medium">Заступник начальника коледжу з навчально-наукової роботи</div>
                                    <div className="text-sm text-muted-foreground">Дмитро Петрович Власенков</div>
                                    <div className="text-xs text-muted-foreground mt-1">Заступник голови приймальної комісії</div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-3 w-3 text-blue-600" />
                                        <span className="text-sm">067-296-71-75</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-3 w-3 text-blue-600" />
                                        <span className="text-sm">vstup.aviacollege@gmail.com</span>
                                    </div>
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    Приймальна комісія та підготовчі курси для вступу до коледжу
                                </div>
                            </CardContent>
                        </Card>

                        {/* Academic Department */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Award className="h-5 w-5 text-blue-600" />
                                    <CardTitle className="text-lg">Навчальний відділ</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <div className="font-medium">Заступник начальника коледжу з навчально-методичної роботи</div>
                                    <div className="text-sm text-muted-foreground">Галина Володимирівна Даниліна</div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-3 w-3 text-blue-600" />
                                        <span className="text-sm">068-109-11-58</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-3 w-3 text-blue-600" />
                                        <span className="text-sm">uchebotdel@kk.nau.edu.ua</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* HR Department */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Users className="h-5 w-5 text-blue-600" />
                                    <CardTitle className="text-lg">Відділ кадрів</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <div className="font-medium">Помічник начальника коледжу з кадрової роботи</div>
                                    <div className="text-sm text-muted-foreground">Андрій Сергійович Рекало</div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-3 w-3 text-blue-600" />
                                        <span className="text-sm">068-428-07-90</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-3 w-3 text-blue-600" />
                                        <span className="text-sm">ok@kk.nau.edu.ua</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* PART-147 Organization */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Shield className="h-5 w-5 text-blue-600" />
                                    <CardTitle className="text-lg">Організація PART-147</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <div className="font-medium">Керівник з якості Організації PART-147</div>
                                    <div className="text-sm text-muted-foreground">Дмитро Петрович Власенков</div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-3 w-3 text-blue-600" />
                                        <span className="text-sm">067-296-71-75</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contact Form */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Mail className="h-5 w-5 text-blue-600" />
                                    <CardTitle className="text-lg">Електронні звернення</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-muted-foreground">
                                    Для подачі запитань, пропозицій та скарг скористайтеся електронною формою звернень.
                                </p>
                                <Button className="w-full bg-blue-600 hover:bg-blue-700">Заповнити форму звернення</Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Full Address */}
                    <div className="rounded-lg bg-white dark:bg-blue-900 p-8 text-center">
                        <h3 className="text-xl font-bold mb-4">Поштова адреса</h3>
                        <p className="text-lg text-muted-foreground">
                            Криворізький фаховий коледж Державного некомерційного підприємства
                            <br />
                            «Державний університет «Київський авіаційний інститут»
                        </p>
                        <div className="mt-4 flex items-center justify-center gap-2">
                            <MapPin className="h-5 w-5 text-blue-600" />
                            <a href="https://maps.app.goo.gl/UzDMeywUZNE1dkKv5" target="_blank" rel="noopener noreferrer" className="font-medium">
                                <span className="font-medium">
                                    50024 Україна, Дніпропетровська область, м. Кривий Ріг, вул. Олега Антонова, 1
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}