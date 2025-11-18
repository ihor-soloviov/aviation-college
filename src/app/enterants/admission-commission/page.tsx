"use client";

import "./styles.scss";
import { Card, CardContent } from "@/components/ui/card";
import {
  Phone,
  Mail,
  MapPin,
  User,
  ArrowLeft,
  Clock,
  FileText,
  Calendar,
} from "lucide-react";
import useCardScrollAnimation from "@/hooks/cardScrollAnimation";
import { useRouter } from "next/navigation";

export default function AdmissionCommissionPage() {
  const router = useRouter();
  useCardScrollAnimation();

  return (
    <section className="bg-gray-50 dark:bg-blue-900/10 py-16 md:py-24">
      <div className="container mx-auto max-w-[900px] space-y-12">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors mb-4"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Назад</span>
        </button>

        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="inline-block rounded-full bg-blue-100 p-2">
            <User className="h-6 w-6 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Загальна інформація та контакти
          </h1>
        </div>

        <div className="space-y-6">
          {/* Head of Admissions Committee */}
          <Card className="animation-card" data-id="1">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Голова приймальної комісії
              </h2>
              <p className="font-semibold">
                Анатолій Олександрович Андрусевич – начальник коледжу, доктор
                технічних наук, професор.
              </p>
              <p className="text-muted-foreground text-sm">
                2-й навчальний корпус, 2-й поверх, кабінет 2-205.
              </p>
              <div className="flex flex-col items-center text-sm space-y-1">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-blue-600" />
                  <a
                    href="tel:+380678241414"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    (067) 824-14-14
                  </a>
                </div>
                <span className="text-muted-foreground">
                  (будні дні з 09.00 до 16.00)
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Deputy Head */}
          <Card className="animation-card" data-id="2">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Заступник голови приймальної комісії
              </h2>
              <p className="font-semibold">
                Дмитро Петрович Власенков – заступник начальника коледжу з
                навчально-наукової роботи.
              </p>
              <p className="text-muted-foreground text-sm">
                3-й навчальний корпус, 2-й поверх, кабінет 3-206.
              </p>
              <div className="flex flex-col items-center text-sm space-y-1">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-blue-600" />
                  <a
                    href="tel:+380672967175"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    (067) 296-71-75
                  </a>
                </div>
                <span className="text-muted-foreground">
                  (будні дні з 09.00 до 16.00)
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Responsible Secretary */}
          <Card className="animation-card" data-id="3">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Відповідальний секретар приймальної комісії
              </h2>
              <p className="font-semibold">
                Красовська Людмила Андріївна — провідний фахівець з
                профорієнтації.
              </p>
              <p className="text-muted-foreground text-sm">
                3-й навчальний корпус, 2-й поверх, кабінет 3-203.
              </p>
              <div className="flex flex-col items-center text-sm space-y-1">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-blue-600" />
                  <a
                    href="tel:+380980539050"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    (098) 053-90-50
                  </a>
                </div>
                <span className="text-muted-foreground">
                  (будні дні з 09:00 до 16:00)
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Email Contact */}
          <Card className="animation-card" data-id="4">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
              <Mail className="h-5 w-5 text-blue-600" />
              <p className="font-medium">
                Електронна скринька приймальної комісії:
              </p>
              <a
                href="mailto:vstup.aviacollege@gmail.com"
                className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                vstup.aviacollege@gmail.com
              </a>
            </CardContent>
          </Card>

          {/* How to Reach Us */}
          <Card className="animation-card" data-id="5">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <MapPin className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-bold">Як до нас дістатися:</h2>
              <div className="space-y-3 text-sm">
                <p>
                  <span className="font-semibold">
                    Від залізничного вокзалу «Кривий Ріг-Головний»:
                  </span>{" "}
                  маршрутне таксі № 205 (зупинка «Авіаколедж»)
                </p>
                <p>
                  <span className="font-semibold">
                    Від залізничного вокзалу «Кривий Ріг-Червона»:
                  </span>{" "}
                  маршрутне таксі № 295 або тролейбус № 24 (зупинка
                  «Авіаколедж»)
                </p>
                <p>
                  <span className="font-semibold">
                    Від центрального автовокзалу:
                  </span>{" "}
                  маршрутне таксі № 295 або тролейбус № 24 (зупинка
                  «Авіаколедж»)
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col items-center space-y-4 text-center pt-8">
            <div className="inline-block rounded-full bg-blue-100 p-2">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Графік роботи приймальної комісії
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Schedule Period 1 */}
            <Card className="animation-card" data-id="6">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 leading-tight">
                    До 30 червня 2025 року
                  </h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>
                      <span className="font-semibold">Пн-Пт:</span> з 09.00 до
                      14.00
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>
                      <span className="font-semibold">Сб-Нд</span> – вихідні дні
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Schedule Period 2 */}
            <Card className="animation-card" data-id="7">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 leading-tight">
                    З 30 червня 2025 року
                  </h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>
                      <span className="font-semibold">Пн-Чт:</span> з 09.00 до
                      17.00
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>
                      <span className="font-semibold">Пт:</span> з 09.00 до
                      16.00
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>
                      <span className="font-semibold">Сб:</span> з 09.00 до
                      12.00
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>
                      <span className="font-semibold">Нд</span> – вихідний день
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Schedule Period 3 */}
            <Card className="animation-card" data-id="8">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 leading-tight">
                    З 11 серпня 2025 року
                  </h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>
                      <span className="font-semibold">Пн-Пт:</span> з 09.00 до
                      14.00
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>
                      <span className="font-semibold">Сб-Нд</span> – вихідні дні
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col items-center space-y-4 text-center pt-8">
            <div className="inline-block rounded-full bg-blue-100 p-2">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Нормативно-правова база приймальної комісії
            </h2>
          </div>

          {/* Legal Documents */}
          <Card className="animation-card" data-id="9">
            <CardContent className="p-6 space-y-4">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                Положення та інструкції
              </button>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                Програми вступних випробувань у формі індивідуальної усної
                співбесіди
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
