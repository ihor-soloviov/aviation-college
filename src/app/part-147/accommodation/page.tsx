import {
  Bed,
  DollarSign,
  Clock,
  Home,
  Tv,
  Utensils,
  Droplet,
  MapPin,
  AlertCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { BackLink } from "@/components/common/BackLink/BackLink";

export default function AccommodationPage() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 md:py-24">
      <BackLink href="/part-147" />
      <div className="container space-y-12 mx-auto max-w-[1000px]">
        {/* Location Card */}
        <Card className="overflow-hidden dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-600 dark:bg-blue-500">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl dark:text-white">
                  Розташування готелю
                </CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Гуртожиток № 10, перший поверх
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-muted-foreground dark:text-gray-300 leading-relaxed">
              На території коледжу, на першому поверсі гуртожитку № 10,
              функціонує готель, де можуть розміщатися слухачі курсів
              Організації PART-147. Відстань від готелю до навчальних корпусів
              коледжу – близько 100 метрів.
            </p>
          </CardContent>
        </Card>

        {/* Room Types */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="text-center dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-500/20">
                <Bed className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-xl dark:text-white">
                Одномісні
              </CardTitle>
              <CardDescription className="dark:text-gray-400">
                Кімнати для одного слухача
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-500/20">
                <Bed className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-xl dark:text-white">
                Двомісні
              </CardTitle>
              <CardDescription className="dark:text-gray-400">
                Кімнати для двох слухачів
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-500/20">
                <Bed className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle className="text-xl dark:text-white">
                Тримісні
              </CardTitle>
              <CardDescription className="dark:text-gray-400">
                Кімнати для трьох слухачів
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Amenities Card */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl dark:text-white">
              Зручності та обладнання
            </CardTitle>
            <CardDescription className="dark:text-gray-400">
              Все необхідне для комфортного проживання
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Shared Facilities */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2 dark:text-white">
                  <Home className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Спільні приміщення
                </h3>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-500/20">
                      <Utensils className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <p className="font-medium dark:text-white">Кухня</p>
                      <p className="text-sm text-muted-foreground dark:text-gray-400">
                        Власна кухня з побутовою технікою і посудом на кожні дві
                        кімнати
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-500/20">
                      <Droplet className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium dark:text-white">Санвузол</p>
                      <p className="text-sm text-muted-foreground dark:text-gray-400">
                        Душова кабіна та бойлер на кожні дві кімнати
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Room Facilities */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2 dark:text-white">
                  <Bed className="h-5 w-5 text-blue-600 dark:text-blue-400" />У
                  кімнатах
                </h3>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-100 dark:bg-green-500/20">
                      <Home className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="font-medium dark:text-white">Меблі</p>
                      <p className="text-sm text-muted-foreground dark:text-gray-400">
                        Всі необхідні меблі для комфортного проживання
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-500/20">
                      <Tv className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="font-medium dark:text-white">Телевізор</p>
                      <p className="text-sm text-muted-foreground dark:text-gray-400">
                        Деякі кімнати оснащені телевізорами
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing and Policies */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Pricing Card */}
          <Card className="border-blue-200 bg-blue-50/50 dark:bg-blue-900/20 dark:border-blue-800">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-600 dark:bg-blue-500">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl dark:text-white">
                    Вартість проживання
                  </CardTitle>
                  <CardDescription className="dark:text-gray-400">
                    Доступні ціни
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                    150
                  </span>
                  <span className="text-2xl font-semibold text-muted-foreground dark:text-gray-400">
                    грн
                  </span>
                </div>
                <p className="text-sm text-muted-foreground dark:text-gray-400">
                  За одного слухача за одну добу
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Check-in/out Card */}
          <Card className="border-green-200 bg-green-50/50 dark:bg-green-900/20 dark:border-green-800">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-green-600 dark:bg-green-500">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl dark:text-white">
                    Заселення та виселення
                  </CardTitle>
                  <CardDescription className="dark:text-gray-400">
                    Гнучкий графік
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground dark:text-gray-300">
                Поселення та виселення до готелю відбувається у будь-який час
                доби
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Important Information */}
        <Card className="border-orange-200 bg-orange-50/50 dark:bg-orange-900/20 dark:border-orange-800">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-orange-600 dark:bg-orange-500">
                <AlertCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl dark:text-white">
                  Важлива інформація
                </CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Будь ласка, зверніть увагу
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-600 dark:bg-orange-400" />
                <p className="text-muted-foreground dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-foreground dark:text-white">
                    Бронювання номерів:
                  </span>{" "}
                  Необхідно заздалегідь при подачі заявки на проходження
                  підготовки
                </p>
              </div>

              <div className="flex gap-3">
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-600 dark:bg-orange-400" />
                <p className="text-muted-foreground dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-foreground dark:text-white">
                    Правила проживання:
                  </span>{" "}
                  Адміністрація коледжу залишає за собою право передчасного
                  виселення із готелю слухача, що проходить підготовку в
                  Організації PART-147, у разі порушення ним правил внутрішнього
                  розпорядку коледжу
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact CTA */}
        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 text-white dark:border-blue-700">
          <CardContent className="flex flex-col items-center gap-4 py-8 text-center">
            <h3 className="text-2xl font-bold">
              Потрібна додаткова інформація?
            </h3>
            <p className="max-w-[600px] text-white/90">
              Контактна інформація щодо поселення доступна на сторінці контактів
            </p>
            <Link
              href="/part-147/contacts"
              className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-medium text-blue-600 transition-colors hover:bg-white/90 dark:bg-white dark:text-blue-700 dark:hover:bg-gray-100"
            >
              Переглянути контакти
            </Link>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
