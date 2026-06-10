"use client"
import React, { useTransition } from 'react'
import { ArrowRight, GraduationCap } from 'lucide-react'
import Link from 'next/link'
import Course from '@/components/Courses/Course/Course'
import { useRouter, useSearchParams } from 'next/navigation'
import { CourseCardData, CourseLevel } from '@/types/courses'
import CourseToggle from '@/components/Courses/CourseToggle/CourseToggle'


const Courses = ({ courses }: { courses: CourseCardData[] }) => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [ , startTransition] = useTransition()

    const level = (searchParams.get("level") === "bachelor" ? "bachelor" : "fmb") as CourseLevel

    const updateParam = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams)
        params.set(key, value)

        startTransition(() => {
            router.replace(`?${params.toString()}`, { scroll: false })
        })
    }

    const visible = courses.filter((c) => c.level === level).slice(0, 3)

    return (
        <section className="bg-background dark:bg-blue-900/10 py-16 md:py-24">
            <div className="container space-y-12 mx-auto" >
                <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="inline-block rounded-full bg-blue-100 p-2">
                        <GraduationCap className="h-6 w-6 text-blue-600" />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Освітні програми</h2>
                    <p className="max-w-[700px] text-muted-foreground">
                        Технічні та авіаційні спеціальності з бюджетними місцями — обирайте свій напрямок.
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
                            {visible.map((course) => (
                                <Course key={course.id} course={course} />
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
