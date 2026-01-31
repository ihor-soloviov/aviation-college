"use client"

import "./styles.scss"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowLeft,
  GraduationCap,
  Sun,
  Moon,
  Code,
  Cpu,
  Zap,
  Radio,
  Plane,
  Bot,
  Briefcase,
  Award,
  BookOpen,
} from "lucide-react"
import useCardScrollAnimation from "@/hooks/cardScrollAnimation"
import { useRouter } from "next/navigation"
import type { JSX } from "react"

// Specialty data structure
interface Specialty {
  code: string
  name: string
  icon: JSX.Element
}

const fullTimeSpecialties = {
  juniorBachelor: [
    { code: "121", name: "Інженерія програмного забезпечення", icon: <Code className="h-5 w-5" /> },
    { code: "123", name: "Комп'ютерна інженерія", icon: <Cpu className="h-5 w-5" /> },
    { code: "141", name: "Електроенергетика, електротехніка та електромеханіка", icon: <Zap className="h-5 w-5" /> },
    { code: "172", name: "Електронні комунікації та радіотехніка", icon: <Radio className="h-5 w-5" /> },
    { code: "173", name: "Авіоніка", icon: <Plane className="h-5 w-5" /> },
    {
      code: "174",
      name: "Автоматизація, комп'ютерно-інтегровані технології та робототехніка",
      icon: <Bot className="h-5 w-5" />,
    },
    { code: "272", name: "Авіаційний транспорт", icon: <Plane className="h-5 w-5" /> },
    { code: "275", name: "Транспортні технології (повітряний транспорт)", icon: <Plane className="h-5 w-5" /> },
  ],
  bachelor: [
    { code: "073", name: "Менеджмент", icon: <Briefcase className="h-5 w-5" /> },
    { code: "123", name: "Комп'ютерна інженерія", icon: <Cpu className="h-5 w-5" /> },
    { code: "141", name: "Електроенергетика, електротехніка та електромеханіка", icon: <Zap className="h-5 w-5" /> },
    { code: "172", name: "Електронні комунікації та радіотехніка", icon: <Radio className="h-5 w-5" /> },
    { code: "272", name: "Авіаційний транспорт", icon: <Plane className="h-5 w-5" /> },
  ],
}

const distanceSpecialties = {
  juniorBachelor: [
    { code: "123", name: "Комп'ютерна інженерія", icon: <Cpu className="h-5 w-5" /> },
    { code: "141", name: "Електроенергетика, електротехніка та електромеханіка", icon: <Zap className="h-5 w-5" /> },
    { code: "172", name: "Електронні комунікації та радіотехніка", icon: <Radio className="h-5 w-5" /> },
    { code: "173", name: "Авіоніка", icon: <Plane className="h-5 w-5" /> },
    {
      code: "174",
      name: "Автоматизація, комп'ютерно-інтегровані технології та робототехніка",
      icon: <Bot className="h-5 w-5" />,
    },
    { code: "272", name: "Авіаційний транспорт", icon: <Plane className="h-5 w-5" /> },
    { code: "275", name: "Транспортні технології (повітряний транспорт)", icon: <Plane className="h-5 w-5" /> },
  ],
  bachelor: [
    { code: "123", name: "Комп'ютерна інженерія", icon: <Cpu className="h-5 w-5" /> },
    { code: "141", name: "Електроенергетика, електротехніка та електромеханіка", icon: <Zap className="h-5 w-5" /> },
    { code: "172", name: "Електронні комунікації та радіотехніка", icon: <Radio className="h-5 w-5" /> },
    { code: "272", name: "Авіаційний транспорт", icon: <Plane className="h-5 w-5" /> },
  ],
}

export default function SpecialtiesPage() {
  const router = useRouter()
  useCardScrollAnimation()

  const SpecialtyCard = ({ specialty, index }: { specialty: Specialty; index: number }) => (
    <Card
      className="animation-card group hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-600 hover:border-l-blue-700"
      data-id={index}
    >
      <CardContent className="p-4 flex items-center gap-3">
        <div className="flex-shrink-0 p-2.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:scale-110 transition-transform">
          {specialty.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="font-bold text-blue-600 dark:text-blue-400 text-sm">{specialty.code}</span>
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100 leading-tight">{specialty.name}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <section className="bg-gray-50 dark:bg-blue-900/10 py-16 md:py-24">
      <div className="container mx-auto px-4 space-y-12">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 transition-colors mb-4"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Назад</span>
        </button>

        {/* Page Title */}
        <div className="flex flex-col items-center space-y-4 text-center max-w-4xl mx-auto">
          <div className="inline-block rounded-full bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 p-4 shadow-lg">
            <GraduationCap className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 dark:text-gray-100">
            Спеціальності
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Повний перелік спеціальностей підготовки за денною та заочною формами навчання
          </p>
        </div>

        {/* Full-time Education Section */}
        <div className="space-y-8 max-w-7xl mx-auto">
          <Card className="animation-card border-t-4 border-t-blue-600 shadow-lg" data-id="1">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <Sun className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Денна форма навчання</h2>
                  <p className="text-sm text-muted-foreground mt-1">Повноцінне навчання в стінах коледжу</p>
                </div>
              </div>

              {/* Junior Bachelor Specialties */}
              <div className="space-y-6 mb-8">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <Award className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Фаховий молодший бакалавр</h3>
                    <p className="text-xs text-muted-foreground">8 спеціальностей</p>
                  </div>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  {fullTimeSpecialties.juniorBachelor.map((specialty, idx) => (
                    <SpecialtyCard key={specialty.code + specialty.name} specialty={specialty} index={idx + 2} />
                  ))}
                </div>
              </div>

              {/* Bachelor Specialties */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <BookOpen className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Бакалавр</h3>
                    <p className="text-xs text-muted-foreground">5 спеціальностей</p>
                  </div>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  {fullTimeSpecialties.bachelor.map((specialty, idx) => (
                    <SpecialtyCard key={specialty.code + specialty.name} specialty={specialty} index={idx + 10} />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Distance Education Section */}
          <Card className="animation-card border-t-4 border-t-gray-600 dark:border-t-gray-400 shadow-lg" data-id="15">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
                  <Moon className="h-7 w-7 text-gray-700 dark:text-gray-300" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Заочна форма навчання</h2>
                  <p className="text-sm text-muted-foreground mt-1">Навчання з можливістю поєднання з роботою</p>
                </div>
              </div>

              {/* Junior Bachelor Specialties */}
              <div className="space-y-6 mb-8">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <Award className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Фаховий молодший бакалавр</h3>
                    <p className="text-xs text-muted-foreground">7 спеціальностей</p>
                  </div>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  {distanceSpecialties.juniorBachelor.map((specialty, idx) => (
                    <SpecialtyCard
                      key={specialty.code + specialty.name + "distance"}
                      specialty={specialty}
                      index={idx + 16}
                    />
                  ))}
                </div>
              </div>

              {/* Bachelor Specialties */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <BookOpen className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Бакалавр</h3>
                    <p className="text-xs text-muted-foreground">4 спеціальності</p>
                  </div>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  {distanceSpecialties.bachelor.map((specialty, idx) => (
                    <SpecialtyCard
                      key={specialty.code + specialty.name + "distance"}
                      specialty={specialty}
                      index={idx + 23}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info Card */}
        <Card className="animation-card max-w-4xl mx-auto border-l-4 border-l-blue-600 shadow-md" data-id="27">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mt-1">
                <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Важлива інформація</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Ці спеціальності входять до програми вступних випробувань у незалежності від обраної спеціальності. По
                  завершенню курсів проводяться випускні екзамени у вигляді тестування. За результатами складання
                  екзаменів слухачі підготовчих курсів можуть отримати до 10 додаткових балів при вступі.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
