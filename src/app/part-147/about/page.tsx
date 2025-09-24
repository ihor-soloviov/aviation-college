import { Award } from "lucide-react";

export default function AboutPart147Page() {
  return (
    <section className="bg-gray-50 dark:bg-blue-900/10 py-16 md:py-24">
      <div className="container space-y-12 mx-auto max-w-[1000px]">
        <div className="space-y-8">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <div className="inline-block rounded-full bg-blue-100 p-3">
              <Award className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">
              Загальна інформація про Організацію PART-147
            </h2>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Відокремлений структурний підрозділ «Криворізький фаховий коледж
              Національного авіаційного університету» був першим в Україні
              схвалений на проведення базової підготовки Державною авіаційною
              службою України (Державіаслужбою) як Організація з підготовки до
              технічного обслуговування та експлуатування – Організація PART-147
              (сертифікат схвалення UA.147.0002 від 06 липня 2012 року).
              Відповідно до схвалення, коледж має право на проведення базової
              підготовки та/або екзаменування за наступними рейтингами:
            </p>

            {/* Ratings Table */}
            <div className="my-8">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-blue-900/10">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                        Вид
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                        Рейтинг
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                        Обмеження
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                        Опис
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td
                        rowSpan={3}
                        className="border border-gray-300 px-4 py-3 font-medium align-top"
                      >
                        Базовий
                      </td>
                      <td
                        rowSpan={2}
                        className="border border-gray-300 px-4 py-3 align-top"
                      >
                        B1
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        ТВ 1.1
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        Газотурбінні літаки
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">
                        ТВ 1.3
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        Газотурбінні вертольоти
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">B2</td>
                      <td className="border border-gray-300 px-4 py-3">ТВ 2</td>
                      <td className="border border-gray-300 px-4 py-3">
                        Авіоніка
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              З метою підтримання схвалення щорічно Організація PART-147 коледжу
              проходить внутрішній незалежний аудит та аудит Державіаслужби. За
              результатами даних аудитів проводяться корегувальні заходи
              внаслідок яких Організація PART-147 постійно підтримує на високому
              рівні забезпечення якості надання освітніх послуг.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Організація PART-147 забезпечена аудиторним та лабораторним
              фондом, майстернями, ділянками з видів робіт (радіомонтажних,
              електромонтажних тощо), літаками-лабораторіями, що
              використовуються для набуття слухачами практичних навичок з
              відповідних модулів підготовки відповідно до вимог PART-66.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Інструктори з теоретичної та практичної підготовки, екзаменатори
              та експерти з оцінювання практичних навичок Організації PART-147 –
              висококласні спеціалісти з профільною освітою, які схвалені
              Державіаслужбою України на здійснення освітньої діяльності
              відповідно до вимог PART-66. З періодичністю один раз на два роки
              інструкторський склад проходить підвищення кваліфікації за чотирма
              напрямками професійної діяльності.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Для набуття слухачами практичних навичок в умовах реального
              технічного обслуговування повітряних суден, Організацією PART-147
              укладені договори субпідряду із діючими організаціями, схваленими
              Державіаслужбою України як організації з технічного обслуговування
              повітряних суден і компонентів (Організації PART-145).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
