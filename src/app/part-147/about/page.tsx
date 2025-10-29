import { BackLink } from "@/components/common/BackLink/BackLink";
import {
  Award,
  CheckCircle2,
  Users,
  Building2,
  GraduationCap,
  Shield,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AboutPart147Page() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 py-16 md:py-24">
      <BackLink href="/part-147" />
      <div className="container space-y-16 mx-auto max-w-[1200px] px-4">
        {/* Hero Section */}
        <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 p-4 shadow-lg">
            <Award className="h-10 w-10 text-white" />
          </div>
          <div className="space-y-3">
            <Badge
              variant="secondary"
              className="text-sm font-medium dark:bg-blue-900/30 dark:text-blue-300"
            >
              Сертифікат UA.147.0002
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              Організація PART-147
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Перша в Україні організація з підготовки до технічного
              обслуговування, схвалена Державіаслужбою
            </p>
          </div>
        </div>

        {/* Key Highlights */}
        <div className="grid md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
          <Card className="p-6 text-center space-y-3 hover:shadow-lg transition-shadow dark:bg-gray-800/50 dark:border-gray-700">
            <div className="inline-flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 p-3">
              <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Схвалено з 2012 року
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Сертифікат від 06 липня 2012
            </p>
          </Card>

          <Card className="p-6 text-center space-y-3 hover:shadow-lg transition-shadow dark:bg-gray-800/50 dark:border-gray-700">
            <div className="inline-flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 p-3">
              <GraduationCap className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              3 рейтинги підготовки
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              B1.1, B1.3 та B2
            </p>
          </Card>

          <Card className="p-6 text-center space-y-3 hover:shadow-lg transition-shadow dark:bg-gray-800/50 dark:border-gray-700">
            <div className="inline-flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30 p-3">
              <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Висококласні інструктори
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Схвалені Державіаслужбою
            </p>
          </Card>
        </div>

        {/* Main Content */}
        <Card className="p-8 md:p-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 dark:bg-gray-800/50 dark:border-gray-700">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Про організацію
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Відокремлений структурний підрозділ «Криворізький фаховий
                  коледж Національного авіаційного університету» був першим в
                  Україні схвалений на проведення базової підготовки Державною
                  авіаційною службою України (Державіаслужбою) як Організація з
                  підготовки до технічного обслуговування та експлуатування –
                  Організація PART-147 (сертифікат схвалення UA.147.0002 від 06
                  липня 2012 року).
                </p>
              </div>
            </div>
          </div>

          {/* Ratings Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-2">
                <Award className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Схвалені рейтинги підготовки
              </h2>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        Вид
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        Рейтинг
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        Обмеження
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        Опис
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td
                        rowSpan={3}
                        className="px-6 py-4 font-medium text-gray-900 dark:text-white align-top"
                      >
                        Базовий
                      </td>
                      <td
                        rowSpan={2}
                        className="px-6 py-4 text-gray-700 dark:text-gray-300 align-top"
                      >
                        <Badge
                          variant="outline"
                          className="dark:border-blue-600 dark:text-blue-400"
                        >
                          B1
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                        <Badge
                          variant="secondary"
                          className="dark:bg-gray-800 dark:text-gray-300"
                        >
                          ТВ 1.1
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                        Газотурбінні літаки
                      </td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                        <Badge
                          variant="secondary"
                          className="dark:bg-gray-800 dark:text-gray-300"
                        >
                          ТВ 1.3
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                        Газотурбінні вертольоти
                      </td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                        <Badge
                          variant="outline"
                          className="dark:border-blue-600 dark:text-blue-400"
                        >
                          B2
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                        <Badge
                          variant="secondary"
                          className="dark:bg-gray-800 dark:text-gray-300"
                        >
                          ТВ 2
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                        Авіоніка
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Card>

        {/* Additional Information Cards */}
        <div className="grid md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
          <Card className="p-6 space-y-4 dark:bg-gray-800/50 dark:border-gray-700 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-orange-100 dark:bg-orange-900/30 p-2">
                <Shield className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Контроль якості
              </h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              З метою підтримання схвалення щорічно Організація PART-147 коледжу
              проходить внутрішній незалежний аудит та аудит Державіаслужби. За
              результатами даних аудитів проводяться корегувальні заходи
              внаслідок яких Організація PART-147 постійно підтримує на високому
              рівні забезпечення якості надання освітніх послуг.
            </p>
          </Card>

          <Card className="p-6 space-y-4 dark:bg-gray-800/50 dark:border-gray-700 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-cyan-100 dark:bg-cyan-900/30 p-2">
                <Building2 className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Матеріально-технічна база
              </h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Організація PART-147 забезпечена аудиторним та лабораторним
              фондом, майстернями, ділянками з видів робіт (радіомонтажних,
              електромонтажних тощо), літаками-лабораторіями, що
              використовуються для набуття слухачами практичних навичок з
              відповідних модулів підготовки відповідно до вимог PART-66.
            </p>
          </Card>

          <Card className="p-6 space-y-4 dark:bg-gray-800/50 dark:border-gray-700 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-indigo-100 dark:bg-indigo-900/30 p-2">
                <Users className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Інструкторський склад
              </h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Інструктори з теоретичної та практичної підготовки, екзаменатори
              та експерти з оцінювання практичних навичок Організації PART-147 –
              висококласні спеціалісти з профільною освітою, які схвалені
              Державіаслужбою України на здійснення освітньої діяльності
              відповідно до вимог PART-66. З періодичністю один раз на два роки
              інструкторський склад проходить підвищення кваліфікації за чотирма
              напрямками професійної діяльності.
            </p>
          </Card>

          <Card className="p-6 space-y-4 dark:bg-gray-800/50 dark:border-gray-700 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-emerald-100 dark:bg-emerald-900/30 p-2">
                <GraduationCap className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Практична підготовка
              </h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Для набуття слухачами практичних навичок в умовах реального
              технічного обслуговування повітряних суден, Організацією PART-147
              укладені договори субпідряду із діючими організаціями, схваленими
              Державіаслужбою України як організації з технічного обслуговування
              повітряних суден і компонентів (Організації PART-145).
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
