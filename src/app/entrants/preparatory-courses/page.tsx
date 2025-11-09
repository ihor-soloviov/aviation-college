"use client";

import "./styles.scss";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  Clock,
  DollarSign,
  Calendar,
  Phone,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  FileText,
  GraduationCap,
  Users,
  TrendingUp,
  LinkIcon,
} from "lucide-react";
import useCardScrollAnimation from "@/hooks/cardScrollAnimation";
import { useRouter } from "next/navigation";

export default function PreparatoryCoursesPage() {
  const router = useRouter();
  useCardScrollAnimation();

  return (
    <section className="bg-gray-50 dark:bg-blue-900/10 py-16 md:py-24">
      <div className="container mx-auto px-4 space-y-12">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors mb-4"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Назад</span>
        </button>

        {/* Page Title */}
        <div className="flex flex-col items-center space-y-4 text-center max-w-4xl mx-auto">
          <div className="inline-block rounded-full bg-blue-600 dark:bg-blue-700 p-3 shadow-lg">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 dark:text-gray-100">
            Підготовчі курси 2026
          </h1>
          <p className="text-lg text-muted-foreground">
            Запрошуємо учнів 9-тих класів на підготовчі курси для вступу до
            коледжу
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {/* Course Duration */}
          <Card
            className="animation-card group hover:shadow-xl transition-all duration-300 border-t-4 border-t-blue-600"
            data-id="1"
          >
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:scale-110 transition-transform">
                  <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-xs font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                  8 місяців
                </span>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  Тривалість курсів
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  З жовтня по травень (початок червня). Повний курс підготовки
                  до вступу.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Course Subjects */}
          <Card
            className="animation-card group hover:shadow-xl transition-all duration-300 border-t-4 border-t-gray-600 dark:border-t-gray-400"
            data-id="2"
          >
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg group-hover:scale-110 transition-transform">
                  <BookOpen className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                </div>
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 px-3 py-1 rounded-full">
                  2 предмети
                </span>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  Предмети курсів
                </h3>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-500" />
                    <span className="font-medium">Українська мова</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-500" />
                    <span className="font-medium">Математика</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Exams */}
          <Card
            className="animation-card group hover:shadow-xl transition-all duration-300 border-t-4 border-t-blue-500"
            data-id="3"
          >
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-xs font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                  +10 балів
                </span>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  Випускні екзамени
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Тестування з можливістю отримати до 10 додаткових балів при
                  вступі.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Application Form */}
          <Card
            className="animation-card group hover:shadow-xl transition-all duration-300 border-t-4 border-t-gray-500"
            data-id="4"
          >
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg group-hover:scale-110 transition-transform">
                  <Users className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                </div>
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 px-3 py-1 rounded-full">
                  Змішана
                </span>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  Форма навчання
                </h3>
                <div className="space-y-1 text-sm text-muted-foreground leading-relaxed">
                  <p className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>Онлайн до весни, потім офлайн</span>
                  </p>
                  <p className="text-xs">Для іногородніх залишається онлайн</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Course Cost */}
          <Card
            className="animation-card group hover:shadow-xl transition-all duration-300 border-t-4 border-t-blue-600"
            data-id="5"
          >
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:scale-110 transition-transform">
                  <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-xs font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                  Частинами
                </span>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  Вартість курсів
                </h3>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    3500 грн
                  </p>
                  <p className="text-xs text-muted-foreground">
                    за весь курс навчання
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Schedule */}
          <Card
            className="animation-card group hover:shadow-xl transition-all duration-300 border-t-4 border-t-gray-600 dark:border-t-gray-400"
            data-id="6"
          >
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg group-hover:scale-110 transition-transform">
                  <Clock className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                </div>
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 px-3 py-1 rounded-full">
                  Щосуботи
                </span>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  Графік занять
                </h3>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  <span className="font-medium">09:00 - 12:00</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Кожної суботи протягом курсу
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Registration */}
          <Card
            className="animation-card group hover:shadow-xl transition-all duration-300 border-t-4 border-t-blue-600 md:col-span-2 lg:col-span-3"
            data-id="7"
          >
            <CardContent className="p-6 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:scale-110 transition-transform">
                    <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div className="flex-1 space-y-3">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    Як записатися на курси
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100 flex items-center gap-2">
                        <Phone className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        Реєстрація через Viber
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Надішліть: телефон, П.І.Б. слухача та П.І.Б. батьків на
                        номер{" "}
                        <a
                          href="tel:+380672967175"
                          className="font-semibold text-blue-600 hover:underline"
                        >
                          067-296-71-75
                        </a>
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100 flex items-center gap-2">
                        <LinkIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        Онлайн реєстрація
                      </h4>
                      <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSf70UNr0UeYDBLI2z4HvXHh090fv3yQjQgr-Nz76bC9T3os6w/viewform"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                      >
                        Заповнити форму
                        <ArrowLeft className="h-4 w-4 rotate-180" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card
            className="animation-card group hover:shadow-xl transition-all duration-300 border-t-4 border-t-gray-600 dark:border-t-gray-400 md:col-span-2 lg:col-span-3"
            data-id="8"
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg group-hover:scale-110 transition-transform">
                  <Phone className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    Контактна інформація
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    За детальною інформацією звертайтесь за номером телефону:{" "}
                    <a
                      href="tel:+380672967175"
                      className="font-semibold text-blue-600 hover:underline"
                    >
                      067-296-71-75
                    </a>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
