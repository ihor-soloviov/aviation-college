import { Mail, MapPin, Phone, Train, Bus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// bg-gradient-to-b from-blue-50 to-white remember to add somewhere

export default function ContactsPage() {
  return (
    <section className="bg-gray-50 dark:bg-blue-900/10 py-16 md:py-24">
      <div className="container mx-auto">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Організація PART-147
          </h2>
          <p className="max-w-[700px] text-muted-foreground">
            Організація з підготовки до технічного обслуговування та
            екзаменування
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-4xl space-y-8 mt-20">
        {/* Main Contact Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Основна інформація</CardTitle>
            <CardDescription>
              ВСП «Криворізький фаховий коледж Національного авіаційного
              університету»
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Address */}
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                <MapPin className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Поштова адреса</h3>
                <p className="text-muted-foreground">
                  50024, Дніпропетровська область, м. Кривий Ріг, вул. Туполєва,
                  1
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-100">
                <Phone className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Телефон</h3>
                <p className="text-muted-foreground">
                  <a
                    href="tel:+380672967175"
                    className="hover:text-primary transition-colors"
                  >
                    (067) 296-71-75
                  </a>
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Керівник з якості Організації PART-147 Дмитро Петрович
                  Власенков
                </p>
                <p className="text-sm text-muted-foreground">
                  Дзвінки приймаються в будні дні з 08.00 до 17.00
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-100">
                <Mail className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">E-mail</h3>
                <p className="text-muted-foreground">
                  <a
                    href="mailto:Vlasenkov.d@gmail.com"
                    className="hover:text-primary transition-colors"
                  >
                    Vlasenkov.d@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How to Get There */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Як до нас дістатися</CardTitle>
            <CardDescription>Маршрути громадського транспорту</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* From Railway Station - Main */}
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-100">
                <Train className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">
                  Від залізничного вокзалу «Кривий Ріг – Головний»
                </h3>
                <p className="text-muted-foreground">
                  Маршрутне таксі <span className="font-semibold">№ 205</span>{" "}
                  (зупинка «Авіаколедж»)
                </p>
              </div>
            </div>

            {/* From Railway Station - Chervona */}
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-100">
                <Train className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">
                  Від залізничного вокзалу «Кривий Ріг – Червона»
                </h3>
                <p className="text-muted-foreground">
                  Маршрутні таксі <span className="font-semibold">№ 295</span>,
                  тролейбус <span className="font-semibold">№ 24</span> (зупинка
                  «Авіаколедж»)
                </p>
              </div>
            </div>

            {/* From Bus Station */}
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                <Bus className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">
                  Від центрального автовокзалу
                </h3>
                <p className="text-muted-foreground">
                  Маршрутне таксі <span className="font-semibold">№ 295</span>,
                  тролейбус <span className="font-semibold">№ 24</span> (зупинка
                  «Авіаколедж»)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
