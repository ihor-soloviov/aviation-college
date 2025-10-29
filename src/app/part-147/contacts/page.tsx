import { Mail, MapPin, Phone, Train, Bus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BackLink } from "@/components/common/BackLink/BackLink";

export default function ContactsPage() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 md:py-24">
      <BackLink href="/part-147" />
      <div className="container mx-auto">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl dark:text-white">
            Організація PART-147
          </h2>
          <p className="max-w-[700px] text-muted-foreground dark:text-gray-400">
            Організація з підготовки до технічного обслуговування та
            екзаменування
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-4xl space-y-8 mt-20">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl dark:text-white">
              Основна інформація
            </CardTitle>
            <CardDescription className="dark:text-gray-400">
              ВСП «Криворізький фаховий коледж Національного авіаційного
              університету»
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Address */}
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold mb-1 dark:text-white">
                  Поштова адреса
                </h3>
                <p className="text-muted-foreground dark:text-gray-400">
                  50024, Дніпропетровська область, м. Кривий Ріг, вул. Туполєва,
                  1
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                <Phone className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold mb-1 dark:text-white">Телефон</h3>
                <p className="text-muted-foreground dark:text-gray-400">
                  <a
                    href="tel:+380672967175"
                    className="hover:text-primary transition-colors dark:hover:text-blue-400"
                  >
                    (067) 296-71-75
                  </a>
                </p>
                <p className="text-sm text-muted-foreground dark:text-gray-400 mt-1">
                  Керівник з якості Організації PART-147 Дмитро Петрович
                  Власенков
                </p>
                <p className="text-sm text-muted-foreground dark:text-gray-400">
                  Дзвінки приймаються в будні дні з 08.00 до 17.00
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                <Mail className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold mb-1 dark:text-white">E-mail</h3>
                <p className="text-muted-foreground dark:text-gray-400">
                  <a
                    href="mailto:Vlasenkov.d@gmail.com"
                    className="hover:text-primary transition-colors dark:hover:text-blue-400"
                  >
                    Vlasenkov.d@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl dark:text-white">
              Як до нас дістатися
            </CardTitle>
            <CardDescription className="dark:text-gray-400">
              Маршрути громадського транспорту
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/30">
                <Train className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h3 className="font-semibold mb-2 dark:text-white">
                  Від залізничного вокзалу «Кривий Ріг – Головний»
                </h3>
                <p className="text-muted-foreground dark:text-gray-400">
                  Маршрутне таксі{" "}
                  <span className="font-semibold dark:text-gray-200">
                    № 205
                  </span>{" "}
                  (зупинка «Авіаколедж»)
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/30">
                <Train className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h3 className="font-semibold mb-2 dark:text-white">
                  Від залізничного вокзалу «Кривий Ріг – Червона»
                </h3>
                <p className="text-muted-foreground dark:text-gray-400">
                  Маршрутні таксі{" "}
                  <span className="font-semibold dark:text-gray-200">
                    № 295
                  </span>
                  , тролейбус{" "}
                  <span className="font-semibold dark:text-gray-200">№ 24</span>{" "}
                  (зупинка «Авіаколедж»)
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <Bus className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold mb-2 dark:text-white">
                  Від центрального автовокзалу
                </h3>
                <p className="text-muted-foreground dark:text-gray-400">
                  Маршрутне таксі{" "}
                  <span className="font-semibold dark:text-gray-200">
                    № 295
                  </span>
                  , тролейбус{" "}
                  <span className="font-semibold dark:text-gray-200">№ 24</span>{" "}
                  (зупинка «Авіаколедж»)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
