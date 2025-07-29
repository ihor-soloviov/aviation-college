import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Users } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

const Students = () => {
    return (
        <section className="bg-background dark:bg-blue-900/10 py-16 md:py-24">
            <div className="container space-y-12 mx-auto">
                <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="inline-block rounded-full bg-blue-100 p-2">
                        <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl" style={{ backgroundColor: "inherit" }}>
                        Історії успіху наших випускників
                    </h2>
                    <p className="max-w-[700px] text-muted-foreground">
                        Наші випускники знайшли собі роботу в найбільших авіакомпаніях, авіаційних компаніях та організаціях по всьому світу.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {[
                        {
                            name: "Іван Іванов",
                            role: "Авіаелектронік",
                            image: "https://placehold.co/300x300/grey/white?text=Sarah",
                            quote:
                                "Навчання на практиці та зв'язки з промисловістю в коледжі дозволили мені перейти до мій мрії роботи.",
                        },
                        {
                            name: "Олександр Петров",
                            role: "IT-спеціаліст",
                            image: "https://placehold.co/300x300/grey/white?text=Michael",
                            quote:
                                "Технічні знання та практичний досвід, які я отримав, дали мені конкурентне перевагу на ринку праці.",
                        },
                        {
                            name: "Олена Сидорова",
                            role: "Менеджер авіаційних операцій",
                            image: "https://placehold.co/300x300/grey/white?text=Aisha",
                            quote:
                                "Програма керування авіацією надала мені навички та впевненість для успішного керування авіаційними операціями.",
                        },
                    ].map((testimonial, index) => (
                        <Card key={index} className="text-center">
                            <CardHeader className="pb-2">
                                <div className="mx-auto mb-4 overflow-hidden rounded-full">
                                    <Image
                                        src={testimonial.image || "https://placehold.co/300x300/grey/white?text=Student"}
                                        alt={testimonial.name}
                                        width={100}
                                        height={100}
                                        className="mx-auto h-24 w-24 object-cover"
                                    />
                                </div>
                                <CardTitle>{testimonial.name}</CardTitle>
                                <CardDescription>{testimonial.role}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">&quot;{testimonial.quote}&quot;</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="flex justify-center">
                    <Link href="#" className="group inline-flex items-center gap-1 text-blue-600 hover:text-blue-800">
                        Переглянути всі історії успіху
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Students
