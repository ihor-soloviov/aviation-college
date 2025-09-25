import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail } from "lucide-react";
import { notFound } from "next/navigation";
import { courses } from "@/lib/courses";
import Course from "@/components/Courses/Course/Course";
import { use } from "react";

export default function CoursePage({
  params,
}: {
  params: Promise<{ id: string; type: "fulltime" | "parttime" }>;
}) {
  const { id, type } = use(params);
  const course = courses[type].find((c) => c.id === id);

  if (!course) {
    notFound();
  }

  const otherCourses = courses[type].filter((c) => c.id !== id).slice(0, 3);
  const IconComponent = course.icon;

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-blue-900/10">
      <section
        className="relative bg-blue-900 dark:bg-blue-900/10"
        style={{ paddingTop: "5rem", paddingBottom: "5rem" }}
      >
        <div className="flex items-center gap-2">
          <IconComponent className="h-6 w-6 text-blue-600" />
          <Badge className="bg-blue-600 hover:bg-blue-600">{course.note}</Badge>
        </div>
        <div className="container relative z-10">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-white">
                  {course.title}
                </h1>
                <p className="text-xl text-white">{course.description}</p>
              </div>
            </div>

            {/* Course Info Card */}
            <div className="lg:col-span-1">
              <Card className="bg-background dark:bg-blue-900 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    Інформація про курс
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Вартість:
                      </span>
                      <span className="font-semibold text-lg">
                        {course.tuition}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Формат:
                      </span>
                      <span className="font-medium">{course.note}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Рівень:
                      </span>
                      <span className="font-medium">{course.level}</span>
                    </div>
                  </div>

                  <div className="pt-4 space-y-3">
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      size="lg"
                    >
                      <a href="mailto:vstup.aviacollege@gmail.com">
                        Подати заявку
                      </a>
                    </Button>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-2">
                      Потрібна консультація?
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-blue-600" />
                        <span>067-296-71-75</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-blue-600" />
                        <span>vstup.aviacollege@gmail.com</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Related Courses */}
      <section className="py-16 my-16">
        <div className="container mx-auto">
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold tracking-tight text-black dark:text-white">
                Інші курси
              </h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full" />
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {otherCourses.map((otherCourse) => (
                <Course
                  key={otherCourse.id}
                  course={otherCourse}
                  IconComponent={IconComponent}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
