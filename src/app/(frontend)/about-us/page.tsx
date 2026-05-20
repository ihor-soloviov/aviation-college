import { AnimatedCounter } from "@/components/animated-counter"
import { LazySection } from "@/components/lazy-section"
import { Card, CardContent } from "@/components/ui/card"
import {
  GraduationCap,
  Users,
  Building2,
  BookOpen,
  Plane,
  Trophy,
  MapPin,
  Calendar,
  Wifi,
  Utensils,
  Home,
  Music,
} from "lucide-react"

export default function AboutUsPage() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6">
              Криворізький Фаховий Коледж КАІ
            </h1>
            <p className="max-w-[800px] mx-auto text-lg text-white/90 md:text-xl">
              Понад 70 років досконалості в авіаційній освіті. Готуємо професіоналів для неба.
            </p>
          </LazySection>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white dark:bg-gray-900 py-16 border-b dark:border-gray-800">
        <div className="container mx-auto">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <LazySection animation="scaleIn" delay={0}>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                  <AnimatedCounter end={35000} suffix="+" />
                </div>
                <div className="text-muted-foreground dark:text-gray-400 mt-2">Випускників</div>
              </div>
            </LazySection>
            <LazySection animation="scaleIn" delay={100}>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                  <AnimatedCounter end={45} suffix="+" />
                </div>
                <div className="text-muted-foreground dark:text-gray-400 mt-2">Країн світу</div>
              </div>
            </LazySection>
            <LazySection animation="scaleIn" delay={200}>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                  <AnimatedCounter end={106} />
                </div>
                <div className="text-muted-foreground dark:text-gray-400 mt-2">Викладачів</div>
              </div>
            </LazySection>
            <LazySection animation="scaleIn" delay={300}>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                  <AnimatedCounter end={13} />
                </div>
                <div className="text-muted-foreground dark:text-gray-400 mt-2">Повітряних суден</div>
              </div>
            </LazySection>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="container mx-auto max-w-[900px]">
          <LazySection animation="slideUp">
            <div className="flex items-center gap-3 mb-8">
              <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3">
                <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-3xl font-bold tracking-tighter dark:text-white">Історія та місія</h2>
            </div>
          </LazySection>

          <LazySection animation="slideUp" delay={100}>
            <Card className="mb-6 dark:bg-gray-900 dark:border-gray-800">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-2 mt-1">
                    <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 dark:text-white">Місце розташування</h3>
                    <p className="text-muted-foreground dark:text-gray-400">
                      50024, Дніпропетровська область, м. Кривий Ріг, вул. Олега Антонова, 1
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </LazySection>

          <LazySection animation="slideUp" delay={200}>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-muted-foreground dark:text-gray-400 mb-4">
                Історія коледжу бере початок з червня 1951 року. За роки свого існування коледж став сучасним закладом
                освіти і підготував понад 35 тисяч фахівців, які працюють не лише в Україні, але і поза її межами, більш
                як у 45 країнах світу.
              </p>
              <p className="text-muted-foreground dark:text-gray-400">
                Основним завданням розвитку освіти у Криворізькому фаховому коледжі стає виведення її на рівень
                державних і міжнародних стандартів, досягнення якісно нового рівня підготовки авіаційних фахівців.
              </p>
            </div>
          </LazySection>
        </div>
      </section>

      {/* Faculty Section */}
      <section className="bg-white dark:bg-gray-900 py-16 md:py-24">
        <div className="container mx-auto max-w-[900px]">
          <LazySection animation="slideUp">
            <div className="flex items-center gap-3 mb-8">
              <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3">
                <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-3xl font-bold tracking-tighter dark:text-white">Викладацький склад</h2>
            </div>
          </LazySection>

          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <LazySection animation="scaleIn" delay={0}>
              <Card className="text-center dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                    <AnimatedCounter end={4} />
                  </div>
                  <div className="text-sm text-muted-foreground dark:text-gray-400">Доктори наук</div>
                </CardContent>
              </Card>
            </LazySection>
            <LazySection animation="scaleIn" delay={100}>
              <Card className="text-center dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                    <AnimatedCounter end={20} />
                  </div>
                  <div className="text-sm text-muted-foreground dark:text-gray-400">Кандидати наук</div>
                </CardContent>
              </Card>
            </LazySection>
            <LazySection animation="scaleIn" delay={200}>
              <Card className="text-center dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                    <AnimatedCounter end={63} />
                  </div>
                  <div className="text-sm text-muted-foreground dark:text-gray-400">Вища категорія</div>
                </CardContent>
              </Card>
            </LazySection>
          </div>

          <LazySection animation="slideUp" delay={300}>
            <p className="text-muted-foreground dark:text-gray-400">
              Освітній п��оцес у коледжі здійснюють 106 штатних та позаштатних викладачів. Для реалізації освітнього
              процесу залучаються викладачі Національного авіаційного університету та інших закладів вищої освіти, які
              працюють в коледжі за сумісництвом, та фахівці-практики.
            </p>
          </LazySection>
        </div>
      </section>

      {/* Infrastructure Section */}
      <section className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="container mx-auto max-w-[900px]">
          <LazySection animation="slideUp">
            <div className="flex items-center gap-3 mb-8">
              <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 p-3">
                <Building2 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-3xl font-bold tracking-tighter dark:text-white">Інфраструктура</h2>
            </div>
          </LazySection>

          <div className="grid gap-6 md:grid-cols-2">
            <LazySection animation="slideInLeft" delay={0}>
              <Card className="dark:bg-gray-900 dark:border-gray-800">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 p-2">
                      <Building2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 dark:text-white">Навчальні корпуси</h3>
                      <p className="text-sm text-muted-foreground dark:text-gray-400">
                        5 корпусів з 51 аудиторією, 14 кабінетами та 39 лабораторіями
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </LazySection>

            <LazySection animation="slideInRight" delay={100}>
              <Card className="dark:bg-gray-900 dark:border-gray-800">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 p-2">
                      <Plane className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 dark:text-white">Авіаційна техніка</h3>
                      <p className="text-sm text-muted-foreground dark:text-gray-400">
                        13 повітряних суден на власній авіаційно-технічній базі
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </LazySection>

            <LazySection animation="slideInLeft" delay={200}>
              <Card className="dark:bg-gray-900 dark:border-gray-800">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 p-2">
                      <Trophy className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 dark:text-white">Спортивні об'єкти</h3>
                      <p className="text-sm text-muted-foreground dark:text-gray-400">
                        2 спортзали, стадіон, баскетбольна та волейбольна площадки
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </LazySection>

            <LazySection animation="slideInRight" delay={300}>
              <Card className="dark:bg-gray-900 dark:border-gray-800">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 p-2">
                      <BookOpen className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 dark:text-white">Бібліотека</h3>
                      <p className="text-sm text-muted-foreground dark:text-gray-400">
                        Понад 147,480 томів літератури та електронні ресурси
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </LazySection>
          </div>

          <LazySection animation="slideUp" delay={400}>
            <Card className="mt-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border-purple-200 dark:border-purple-900/30">
              <CardContent className="pt-6">
                <div className="grid gap-4 md:grid-cols-3 text-center">
                  <div>
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      <AnimatedCounter end={23} />
                    </div>
                    <div className="text-sm text-muted-foreground dark:text-gray-400">Комп'ютерні лабораторії</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      <AnimatedCounter end={311} />
                    </div>
                    <div className="text-sm text-muted-foreground dark:text-gray-400">Комп'ютерів</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      <AnimatedCounter end={23} />
                    </div>
                    <div className="text-sm text-muted-foreground dark:text-gray-400">Гектарів території</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </LazySection>
        </div>
      </section>

      {/* Student Life Section */}
      <section className="bg-white dark:bg-gray-900 py-16 md:py-24">
        <div className="container mx-auto max-w-[900px]">
          <LazySection animation="slideUp">
            <div className="flex items-center gap-3 mb-8">
              <div className="rounded-full bg-orange-100 dark:bg-orange-900/30 p-3">
                <Music className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h2 className="text-3xl font-bold tracking-tighter dark:text-white">Студентське життя</h2>
            </div>
          </LazySection>

          <div className="grid gap-6 md:grid-cols-2">
            <LazySection animation="scaleIn" delay={0}>
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-orange-100 dark:bg-orange-900/30 p-2">
                      <Home className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 dark:text-white">Гуртожитки</h3>
                      <p className="text-sm text-muted-foreground dark:text-gray-400">
                        4 гуртожитки з 100% забезпеченням житлом
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </LazySection>

            <LazySection animation="scaleIn" delay={100}>
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-orange-100 dark:bg-orange-900/30 p-2">
                      <Utensils className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 dark:text-white">Харчування</h3>
                      <p className="text-sm text-muted-foreground dark:text-gray-400">
                        Їдальня на 900 місць та 2 буфети
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </LazySection>

            <LazySection animation="scaleIn" delay={200}>
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-orange-100 dark:bg-orange-900/30 p-2">
                      <Music className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 dark:text-white">Культура</h3>
                      <p className="text-sm text-muted-foreground dark:text-gray-400">
                        Студентський палац, клуб "Авіатор", творчі колективи
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </LazySection>

            <LazySection animation="scaleIn" delay={300}>
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-orange-100 dark:bg-orange-900/30 p-2">
                      <Wifi className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 dark:text-white">Інтернет</h3>
                      <p className="text-sm text-muted-foreground dark:text-gray-400">
                        Wi-Fi по всій території, Google Workspace
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </LazySection>
          </div>

          <LazySection animation="slideUp" delay={400}>
            <Card className="mt-6 dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="pt-6">
                <p className="text-muted-foreground dark:text-gray-400">
                  На території коледжу розташований Студентський палац та клуб «Авіатор», у яких працюють різноманітні
                  художні гуртки, проводяться культурні заходи, конкурси та концерти. Працюють студентські творчі
                  колективи, духовий оркестр, танцювальний колектив та 10 спортивних секцій.
                </p>
              </CardContent>
            </Card>
          </LazySection>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-900 dark:to-gray-900 py-16 md:py-24">
        <div className="container mx-auto max-w-[800px] text-center">
          <LazySection animation="fadeIn">
            <div className="inline-block rounded-full bg-white/20 dark:bg-white/10 p-3 mb-6">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold tracking-tighter text-white mb-6">Наше покликання</h2>
            <p className="text-lg text-white/90 leading-relaxed">
              Основним із завдань колективу коледжу є формування професійно-важливих компетентностей фахівців, які
              сприяють успішному виконанню фахової діяльності в умовах інтеграції України до світового співтовариства і
              конкурувати на світовому ринку праці.
            </p>
          </LazySection>
        </div>
      </section>
    </>
  )
}
