import { Button } from '@/components/ui/button'
import { CheckCircle2, MapPin } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Benefits = () => {
    return (
        <section className="bg-gray-50 dark:bg-blue-900/10 py-16 md:py-24">
            <div className="container mx-auto">
                <div className="grid gap-12 lg:grid-cols-2">
                    <div className="flex flex-col justify-center space-y-4">
                        <div className="inline-block rounded-full bg-blue-100 p-2 w-fit">
                            <MapPin className="h-6 w-6 text-blue-600" />
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Авіаційна освіта, <br /> яка не зупиняється</h2>
                        <p className="text-muted-foreground">
                            Попри часткове знищення інфраструктури внаслідок ракетного удару, коледж продовжує підготовку авіаційних фахівців. Ми поєднуємо дистанційне навчання з практикою на авіаційно-технічній базі, забезпечуючи студентам гідну освіту навіть у надскладних умовах.
                        </p>

                        <ul className="space-y-2">
                            {[
                                "Онлайн-навчання через Google Classroom та цифрові ресурси",
                                "Практика на авіаційній технічній базі коледжу",
                                "Супровід досвідченими викладачами з багаторічним досвідом",
                                "Підтримка студентів у воєнний час — стипендії, гнучкі умови",
                                "Виховання незламного покоління авіаційних спеціалістів",
                            ].map((item, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-blue-600" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="pt-4">
                            <Button className="bg-blue-600 hover:bg-blue-700 cursor-pointer">Дізнатися більше</Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <div className="relative aspect-square overflow-hidden rounded-lg">
                                <Image
                                    src="https://placehold.co/400x400/blue/white?text=Google Classroom"
                                    alt="Google Classroom"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="relative aspect-video overflow-hidden rounded-lg">
                                <Image
                                    src="https://placehold.co/400x300/blue/white?text=Технічна база"
                                    alt="Технічна база"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        <div className="space-y-4 pt-8">
                            <div className="relative aspect-video overflow-hidden rounded-lg">
                                <Image
                                    src="https://placehold.co/400x300/blue/white?text=Part-147"
                                    alt="Part-147"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="relative aspect-square overflow-hidden rounded-lg">
                                <Image
                                    src="https://placehold.co/400x400/blue/white?text=Онлайн лабараторія"
                                    alt="Онлайн лабараторія"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Benefits
