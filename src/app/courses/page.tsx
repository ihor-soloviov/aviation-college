"use client"
import Hero from "@/components/common/Hero/Hero"
import { courses } from "@/lib/courses"
import ClientCourseList from "@/components/Courses/CourseList/CourseList"
import { Suspense } from "react"

export default function CoursesPage() {
    return (
        <Suspense>
            <main className="flex-1">
                <Hero imgPath="/hero-courses.webp" />
                <div className="bg-white dark:bg-blue-900/10 py-16 md:py-24" id="all">
                    <div>
                        <ClientCourseList courses={courses} />
                    </div>
                </div>
            </main>
        </Suspense>
    )
}
