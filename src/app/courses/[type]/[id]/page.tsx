import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Phone,
  Mail,
} from "lucide-react"
import { notFound } from "next/navigation"
import { courses } from "@/lib/courses"
import Course from "@/components/Courses/Course/Course"

interface CoursePageProps {
  params: {
    id: string,
    type: "fulltime" | "parttime"
  }
}

export default function CoursePage({ params }: CoursePageProps) {
  const course = courses[params.type].find((c) => c.id === params.id)

  if (!course) {
    notFound()
  }

  const otherCourses = courses[params.type].filter((c) => c.id !== params.id).slice(0, 3);
  const IconComponent = course.icon

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-blue-900/10">
      <section className="relative bg-blue-900 dark:bg-blue-900/10" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div className="flex items-center gap-2">
          <IconComponent className="h-6 w-6 text-blue-600" />
          <Badge className="bg-blue-600 hover:bg-blue-600">{course.note}</Badge>
        </div>
        <div className="container relative z-10">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">

                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-white">{course.title}</h1>
                <p className="text-xl text-white">{course.description}</p>
              </div>
            </div>

            {/* Course Info Card */}
            <div className="lg:col-span-1">
              <Card className="bg-background dark:bg-blue-900 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-2xl">Інформація про курс</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Вартість:</span>
                      <span className="font-semibold text-lg">
                        {course.tuition}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Формат:</span>
                      <span className="font-medium">{course.note}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Рівень:</span>
                      <span className="font-medium">{course.level}</span>
                    </div>
                  </div>

                  <div className="pt-4 space-y-3">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                      <a href="mailto:vstup.aviacollege@gmail.com">
                        Подати заявку
                      </a>
                    </Button>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-2">Потрібна консультація?</p>
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

      {/* <section className="bg-white py-16 md:py-24">
        <div className="container">
          <Tabs defaultValue="overview" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-2xl grid-cols-5">
                <TabsTrigger value="overview">Огляд</TabsTrigger>
                <TabsTrigger value="curriculum">Програма</TabsTrigger>
                <TabsTrigger value="instructors">Викладачі</TabsTrigger>
                <TabsTrigger value="requirements">Вимоги</TabsTrigger>
                <TabsTrigger value="reviews">Відгуки</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="space-y-8">
              <div className="grid gap-12 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold mb-4">Про курс</h2>
                    <div
                      className="prose prose-lg max-w-none text-muted-foreground"
                      dangerouslySetInnerHTML={{ __html: course.fullDescription }}
                    />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-4">Що ви вивчите</h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {course.whatYouWillLearn.map((item, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-4">Кар'єрні можливості</h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {course.careerOpportunities.map((opportunity, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <Award className="h-5 w-5 text-blue-600" />
                          <span className="text-muted-foreground">{opportunity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-blue-600" />
                        Сертифікація
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{course.certification}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-blue-600" />
                        Особливості курсу
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {course.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="curriculum" className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6">Програма навчання</h2>
                <div className="space-y-6">
                  {course.modules.map((module, index) => (
                    <Card key={module.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <CardTitle className="flex items-center gap-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">
                                {index + 1}
                              </div>
                              {module.title}
                            </CardTitle>
                            <CardDescription>{module.description}</CardDescription>
                          </div>
                          <Badge variant="outline">{module.duration}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div>
                          <h4 className="font-semibold mb-3">Теми для вивчення:</h4>
                          <div className="grid gap-2 sm:grid-cols-2">
                            {module.topics.map((topic, topicIndex) => (
                              <div key={topicIndex} className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4 text-blue-600" />
                                <span className="text-sm text-muted-foreground">{topic}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="instructors" className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6">Наші викладачі</h2>
                <div className="grid gap-8 md:grid-cols-2">
                  {course.instructors.map((instructor) => (
                    <Card key={instructor.id}>
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <div className="relative h-20 w-20 overflow-hidden rounded-full">
                            <Image
                              src={instructor.image || "/placeholder.svg"}
                              alt={instructor.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="space-y-2">
                            <CardTitle className="text-xl">{instructor.name}</CardTitle>
                            <CardDescription className="font-medium text-blue-600">
                              {instructor.title}
                            </CardDescription>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              <span>Досвід: {instructor.experience}</span>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground">{instructor.bio}</p>
                        <div>
                          <h4 className="font-semibold mb-2">Сертифікації:</h4>
                          <div className="flex flex-wrap gap-2">
                            {instructor.certifications.map((cert, index) => (
                              <Badge key={index} variant="secondary">
                                {cert}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="requirements" className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6">Вимоги до вступу</h2>
                <div className="grid gap-8 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-blue-600" />
                        Освіта
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {course.requirements.education.map((req, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-blue-600" />
                        Досвід
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {course.requirements.experience.length > 0 ? (
                        <ul className="space-y-2">
                          {course.requirements.experience.map((req, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{req}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-muted-foreground">Попередній досвід не вимагається</p>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-blue-600" />
                        Документи
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {course.requirements.documents.map((req, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5 text-blue-600" />
                        Медичні вимоги
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {course.requirements.medical.map((req, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6">Відгуки студентів</h2>
                {course.testimonials.length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-2">
                    {course.testimonials.map((testimonial) => (
                      <Card key={testimonial.id}>
                        <CardHeader>
                          <div className="flex items-start gap-4">
                            <div className="relative h-12 w-12 overflow-hidden rounded-full">
                              <Image
                                src={testimonial.image || "/placeholder.svg"}
                                alt={testimonial.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="space-y-1">
                              <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                              <CardDescription>
                                {testimonial.role} • {testimonial.company}
                              </CardDescription>
                              <div className="flex items-center gap-1">
                                {Array.from({ length: testimonial.rating }).map((_, i) => (
                                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">"{testimonial.text}"</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <p className="text-muted-foreground">Відгуки студентів з'являться незабаром</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section> */}

      {/* Related Courses */}
      <section className="py-16 my-16">
        <div className="container mx-auto">
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold tracking-tight text-black dark:text-white">Інші курси</h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full" />
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {otherCourses.map((otherCourse) => (
                <Course key={otherCourse.id} course={otherCourse} IconComponent={IconComponent} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div >
  )
}
