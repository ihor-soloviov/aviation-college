"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useTransition } from "react"
import Categories from "@/components/Courses/Categories/Categories"
import CourseToggle from "@/components/Courses/CourseToggle/CourseToggle"
import Course from "@/components/Courses/Course/Course"
import { ICourse } from "@/types/courses"
import { Tabs } from "@/components/ui/tabs"

export default function ClientCourseList({ courses }: { courses: { fulltime: ICourse[], parttime: ICourse[] } }) {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    const category = searchParams.get("category") || "Всі"
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
            const matchesCategory = category === "Всі" || c.note === category.split(" ")[0].toLowerCase()
            const matchesLevel = level === "Всі" || c.level === level
            const result = matchesCategory && matchesLevel
            return result
        })

    const fulltime = filter(courses.fulltime)
    const parttime = filter(courses.parttime)

    return (
        <Tabs>
            <Categories current={category} onSelect={(c) => updateParam("category", c)} />
            <CourseToggle current={level} onSelect={(l) => updateParam("level", l)} />
            <section className="flex flex-col gap-6 mt-6">
                {
                    fulltime.length > 0 && (
                        <div id="fulltime">
                            <h2 className="text-2xl font-bold py-4 text-center">Денна форма навчання</h2>
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {fulltime.map((course) => {
                                    const Icon = course.icon
                                    return <Course key={course.id} course={course} IconComponent={Icon} shouldShowNote={false} />
                                })}
                            </div>
                        </div>
                    )
                }
                {
                    parttime.length > 0 && (
                        <div id="parttime mt-6">
                            <h2 className="text-2xl font-bold py-4 text-center">Заочна форма навчання</h2>
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {parttime.map((course) => {
                                    const Icon = course.icon
                                    return <Course key={course.id} course={course} IconComponent={Icon} shouldShowNote={false} />
                                })}
                            </div>
                        </div>
                    )
                }
            </section>
        </Tabs>
    )
}
