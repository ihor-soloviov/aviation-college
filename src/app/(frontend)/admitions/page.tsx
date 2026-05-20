import { AnimatedCounter } from "@/components/animated-counter"
import { LazySection } from "@/components/lazy-section"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  GraduationCap,
  Calendar,
  BookOpen,
  DollarSign,
  Clock,
  Phone,
  MessageSquare,
  CheckCircle2,
  Users,
  Laptop,
  Award,
  ExternalLink,
} from "lucide-react"

export default function AdmissionsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 dark:from-blue-900 dark:via-blue-950 dark:to-gray-900 py-20 md:py-32">
        <div className="absolute inset-0 bg-[url('/aviation-pattern.jpg')] opacity-10"></div>
        <div className="container mx-auto relative z-10 text-center text-white">
          <LazySection animation="fadeIn">
            <div className="inline-block rounded-full bg-white/20 dark:bg-white/10 p-3 mb-6">
              <GraduationCap className="h-8 w-8" />
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6">Підготовчі курси 2026</h1>
            <p className="max-w-[800px] mx-auto text-lg text-white/90 md:text-xl mb-8">
              Запрошуємо учнів 9-тих класів на підготовчі курси для вступу до коледжу у 2026 році
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Badge
                variant="secondary"
                className="text-base px-4 py-2 bg-white/20 dark:bg-white/10 text-white border-white/30"
              >
                8 місяців навчання
              </Badge>
              <Badge
                variant="secondary"
                className="text-base px-4 py-2 bg-white/20 dark:bg-white/10 text-white border-white/30"
              >
                До 10 додаткових балів
              </Badge>
              <Badge
                variant="secondary"
                className="text-base px-4 py-2 bg-white/20 dark:bg-white/10 text-white border-white/30"
              >
                Змішана форма
              </Badge>
            </div>
          </LazySection>
        </div>
      </section>

      {/* Key Stats */}
      <section className="bg-white dark:bg-gray-900 py-16 border-b dark:border-gray-800">
        <div className="container mx-auto">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <LazySection animation="scaleIn" delay={0}>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                  <AnimatedCounter end={8} />
                </div>
                <div className="text-muted-foreground dark:text-gray-400 mt-2">Місяців навчання</div>
              </div>
            </LazySection>
            <LazySection animation="scaleIn" delay={100}>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                  <AnimatedCounter end={10} suffix="+" />
                </div>
                <div className="text-muted-foreground dark:text-gray-400 mt-2">Додаткових балів</div>
              </div>
            </LazySection>
            <LazySection animation="scaleIn" delay={200}>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                  <AnimatedCounter end={3500} />
                </div>
                <div className="text-muted-foreground dark:text-gray-400 mt-2">Вартість (грн)</div>
              </div>
            </LazySection>
            <LazySection animation="scaleIn" delay={300}>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                  <AnimatedCounter end={2} />
                </div>
                <div className="text-muted-foreground dark:text-gray-400 mt-2">Предмети</div>
              </div>
            </LazySection>
          </div>
        </div>
      </section>

      {/* Course Details */}
      <section className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="container mx-auto max-w-[1000px]">
          <LazySection animation="slideUp">
            <div className="flex items-center gap-3 mb-8">
              <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3">
                <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-3xl font-bold tracking-tighter dark:text-white">Деталі курсу</h2>
            </div>
          </LazySection>

          <div className="grid gap-6 md:grid-cols-2">
            <LazySection animation="slideInLeft" delay={0}>
              <Card className="h-full dark:bg-gray-900 dark:border-gray-800 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-2">
                      <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 dark:text-white">Тривалість курсів</h3>
                      <p className="text-sm text-muted-foreground dark:text-gray-400">
                        8 місяців – з жовтня по травень (початок червня)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </LazySection>

            <LazySection animation="slideInRight" delay={100}>
              <Card className="h-full dark:bg-gray-900 dark:border-gray-800 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-2">
                      <BookOpen className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 dark:text-white">Предмети курсів</h3>
                      <p className="text-sm text-muted-foreground dark:text-gray-400">
                        Українська мова та математика – ці предмети входять до програми вступних випробувань незалежно
                        від обраної спеціальності
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </LazySection>

            <LazySection animation="slideInLeft" delay={200}>
              <Card className="h-full dark:bg-gray-900 dark:border-gray-800 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 p-2">
                      <Award className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 dark:text-white">Випускні екзамени</h3>
                      <p className="text-sm text-muted-foreground dark:text-gray-400">
                        По завершенню курсів проводяться випускні екзамени у вигляді тестування. За результатами
                        складання екзаменів слухачі підготовчих курсів можуть отримати до 10 додаткових балів при вступі
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </LazySection>

            <LazySection animation="slideInRight" delay={300}>
              <Card className="h-full dark:bg-gray-900 dark:border-gray-800 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-orange-100 dark:bg-orange-900/30 p-2">
                      <Laptop className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 dark:text-white">Форма навчання</h3>
                      <p className="text-sm text-muted-foreground dark:text-gray-400">
                        Змішана – до початку весни заняття плануються в онлайн режимі, а починаючи з березня місяця –
                        офлайн. Для слухачів з інших населених пунктів буде зберігатися онлайн форма навчання
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </LazySection>
          </div>

          <LazySection animation="slideUp" delay={400}>
            <Card className="mt-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200 dark:border-amber-900/30">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-amber-100 dark:bg-amber-900/30 p-2 mt-1">
                    <CheckCircle2 className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 dark:text-white">Важлива інформація</h3>
                    <p className="text-sm text-muted-foreground dark:text-gray-400">
                      Треба мати на увазі, що можуть вноситися зміни у формат навчання у зв'язку із ситуацією в країні.
                      Для слухачів підготовчих курсів з числа осіб, які мешкають в інших населених пунктах – буде
                      зберігатися онлайн форма навчання.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </LazySection>
        </div>
      </section>

      {/* Schedule and Pricing */}
      <section className="bg-white dark:bg-gray-900 py-16 md:py-24">
        <div className="container mx-auto max-w-[1000px]">
          <LazySection animation="slideUp">
            <div className="flex items-center gap-3 mb-8">
              <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3">
                <Clock className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-3xl font-bold tracking-tighter dark:text-white">Розклад та вартість</h2>
            </div>
          </LazySection>

          <div className="grid gap-6 md:grid-cols-2">
            <LazySection animation="scaleIn" delay={0}>
              <Card className="h-full dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3">
                      <Clock className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-3 dark:text-white text-lg">Розклад занять</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                          <span className="text-sm text-muted-foreground dark:text-gray-400">
                            Щосуботи з 09:00 до 12:00
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                          <span className="text-sm text-muted-foreground dark:text-gray-400">
                            Зручний графік для школярів
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </LazySection>

            <LazySection animation="scaleIn" delay={100}>
              <Card className="h-full dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3">
                      <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-3 dark:text-white text-lg">Вартість навчання</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          <span className="text-sm text-muted-foreground dark:text-gray-400">
                            3500 грн за весь курс навчання
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          <span className="text-sm text-muted-foreground dark:text-gray-400">
                            Можлива оплата частинами
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </LazySection>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="container mx-auto max-w-[900px]">
          <LazySection animation="slideUp">
            <div className="flex items-center gap-3 mb-8">
              <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 p-3">
                <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-3xl font-bold tracking-tighter dark:text-white">Як записатися</h2>
            </div>
          </LazySection>

          <LazySection animation="slideUp" delay={100}>
            <Card className="dark:bg-gray-900 dark:border-gray-800">
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-4 dark:text-white text-lg">
                      Для запису на курси необхідно надіслати повідомлення у месенджері Viber наступного змісту:
                    </h3>
                    <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-lg p-4 space-y-2">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm dark:text-gray-300">Телефон слухача курсів</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm dark:text-gray-300">П.І.Б. слухача курсів</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm dark:text-gray-300">
                          Телефон та П.І.Б. одного з батьків (законного представника) слухача курсів
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-start gap-4 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/30 rounded-lg">
                      <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-2">
                        <MessageSquare className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1 dark:text-white">Viber</h4>
                        <p className="text-sm text-muted-foreground dark:text-gray-400">
                          Надішліть повідомлення на номер
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/30 rounded-lg">
                      <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-2">
                        <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1 dark:text-white">Телефон</h4>
                        <a
                          href="tel:+380672967175"
                          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          067-296-71-75
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </LazySection>

          <LazySection animation="slideUp" delay={200}>
            <Card className="mt-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border-purple-200 dark:border-purple-900/30">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <h3 className="font-semibold dark:text-white text-lg">Або зареєструйтесь онлайн</h3>
                  <p className="text-sm text-muted-foreground dark:text-gray-400 max-w-[600px] mx-auto">
                    Заповніть форму реєстрації онлайн, і ми зв'яжемося з вами для підтвердження запису на курси
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white"
                  >
                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLSf70UNr0UeYDBLI2z4HvXHh090fv3yQjQgr-Nz76bC9T3os6w/viewform?usp=dialog"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      Зареєструватись онлайн
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </LazySection>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-900 dark:to-gray-900 py-16 md:py-24">
        <div className="container mx-auto max-w-[800px] text-center">
          <LazySection animation="fadeIn">
            <div className="inline-block rounded-full bg-white/20 dark:bg-white/10 p-3 mb-6">
              <Phone className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold tracking-tighter text-white mb-4">Потрібна додаткова інформація?</h2>
            <p className="text-lg text-white/90 mb-6">За детальною інформацією звертайтесь за номером телефону:</p>
            <a
              href="tel:+380672967175"
              className="inline-flex items-center gap-2 text-2xl font-bold text-white hover:text-white/80 transition-colors"
            >
              <Phone className="h-6 w-6" />
              067-296-71-75
            </a>
          </LazySection>
        </div>
      </section>
    </>
  )
}
