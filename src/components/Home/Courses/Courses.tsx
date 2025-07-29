"use client"
import { Button } from '@/components/ui/button'
import React, { startTransition, useTransition } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, GraduationCap } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image'
import Link from 'next/link'
import { Calendar } from 'lucide-react'
import { courses } from '@/lib/courses'
import Course from '@/components/Courses/Course/Course'
import Categories from '@/components/Courses/Categories/Categories'
import { useRouter, useSearchParams } from 'next/navigation'
import { ICourse } from '@/types/courses'
import CourseToggle from '@/components/Courses/CourseToggle/CourseToggle'


const Courses = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    const level = searchParams.get("level") || "Фаховий молодший бакалавр"

    const updateParam = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams)
        if (value === "Всі") {
            params.delete(key)
        } else {
            params.set(key, value)
        }

        startTransition(() => {
            router.replace(`?${params.toString()}`, { scroll: false })
        })
    }

    const filter = (items: ICourse[]) =>
        items.filter((c) => {
            return c.level === level
        })

    const fulltime = filter(courses.fulltime)
    return (
        <section className="bg-background dark:bg-blue-900/10 py-16 md:py-24">
            <div className="container space-y-12 mx-auto" >
                <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="inline-block rounded-full bg-blue-100 p-2">
                        <GraduationCap className="h-6 w-6 text-blue-600" />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Навчальні програми</h2>
                    <p className="max-w-[700px] text-muted-foreground">
                        Комплексні навчальні програми, розроблені для підготовки до успішної кар'єри в авіації.
                    </p>
                </div>

                <div className="w-full flex flex-col gap-8">
                    <div className="flex justify-center">
                        <CourseToggle
                            current={level}
                            onSelect={(l) => updateParam("level", l)}
                        />
                    </div>

                    <div className="space-y-8">
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {fulltime.slice(0, 3).map((course, index) => (
                                <Course key={index} course={course} IconComponent={course.icon} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <Link href="/courses#all" className="group inline-flex items-center gap-1 text-blue-600 hover:text-blue-800">
                        Переглянути всі програми
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Courses
