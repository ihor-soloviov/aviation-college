import { BackLink } from "@/components/common/BackLink/BackLink";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, BookOpen, Clock } from "lucide-react";

const categories = [
  {
    level: "B1.1",
    description:
      "Технік-механік з технічного обслуговування літаків з газотурбінними двигунами",
  },
  {
    level: "B1.3",
    description:
      "Технік-механік з технічного обслуговування вертольотів з газотурбінними двигунами",
  },
  {
    level: "B2",
    description: "Технік-авіонік з технічного обслуговування",
  },
];

const subjectsOnB11 = [
  {
    module: "М 1",
    name: "Математика",
  },
  {
    module: "М 2",
    name: "Фізика",
  },
  {
    module: "М 3",
    name: "Основи електрики",
  },
  {
    module: "М 4",
    name: "Основи електроніки",
  },
  {
    module: "М 5",
    name: "Цифрова техніка/електронні інструментальні системи",
  },
  {
    module: "М 6",
    name: "Матеріали і деталі",
  },
  {
    module: "М 7А",
    name: "Практика технічного обслуговування",
  },
  {
    module: "М 8",
    name: "Основи аеродинаміки",
  },
  {
    module: "М 9А",
    name: "Людський фактор",
  },
  {
    module: "М 10",
    name: "Авіаційне законодавство",
  },
  {
    module: "М 11А",
    name: "Аеродинаміка, конструкції та системи  газотурбінного літака",
  },
  {
    module: "M 15",
    name: "Газотурбінний двигун",
  },
  {
    module: "M 17А",
    name: "Повітряний гвинт",
  },
];

const subjectsOnB13 = [
  {
    module: "М 1",
    name: "Математика",
  },
  {
    module: "М 2",
    name: "Фізика",
  },
  {
    module: "М 3",
    name: "Основи електрики",
  },
  {
    module: "М 4",
    name: "Основи електроніки",
  },
  {
    module: "М 5",
    name: "Цифрова техніка/електронні інструментальні системи",
  },
  {
    module: "М 6",
    name: "Матеріали і деталі",
  },
  {
    module: "М 7А",
    name: "Практика технічного обслуговування",
  },
  {
    module: "М 8",
    name: "Основи аеродинаміки",
  },
  {
    module: "М 9А",
    name: "Людський фактор",
  },
  {
    module: "М 10",
    name: "Авіаційне законодавство",
  },
  {
    module: "М 12",
    name: "Аеродинаміка, конструкції та системи вертольота",
  },
  {
    module: "M 15",
    name: "Газотурбінний двигун",
  },
];

const subjectsOnB2 = [
  {
    module: "М 1",
    name: "Математика",
  },
  {
    module: "М 2",
    name: "Фізика",
  },
  {
    module: "М 3",
    name: "Основи електрики",
  },
  {
    module: "М 4",
    name: "Основи електроніки",
  },
  {
    module: "М 5",
    name: "Цифрова техніка/електронні інструментальні системи",
  },
  {
    module: "М 6",
    name: "Матеріали і деталі",
  },
  {
    module: "М 7А",
    name: "Практика технічного обслуговування",
  },
  {
    module: "М 8",
    name: "Основи аеродинаміки",
  },
  {
    module: "М 9А",
    name: "Людський фактор",
  },
  {
    module: "М 10",
    name: "Авіаційне законодавство",
  },
  {
    module: "М 13",
    name: "Аеродинаміка, конструкції та системи повітряного судна",
  },
  {
    module: "M 14",
    name: "Силова установка",
  },
];

const extensionRequirements = [
  {
    adding: "B1.1",
    current: "B1.3",
    modules: "11A, 17",
  },
  {
    adding: "B1.1",
    current: "B2",
    modules: "2, 6, 7, 11A, 15, 17",
  },
  {
    adding: "B1.3",
    current: "B1.1",
    modules: "12",
  },
  {
    adding: "B1.3",
    current: "B2",
    modules: "2, 6, 7, 12, 15",
  },
  {
    adding: "B2",
    current: "B1.1",
    modules: "4, 5, 13",
  },
  {
    adding: "B2",
    current: "B1.3",
    modules: "4, 5, 13",
  },
];

export default function RequirementsPage() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-16 md:py-24">
      <BackLink href="/part-147" />
      <div className="container space-y-12 mx-auto max-w-[1000px]">
        <div className="space-y-8">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              Нормативні вимоги
            </h1>
            <p className="mt-6 text-lg text-muted-foreground dark:text-gray-300 leading-relaxed max-w-3xl">
              Нормативні вимоги щодо базової підготовки слухачів та розширення
              наявної категорії персоналу з технічного обслуговування повітряних
              суден
            </p>
          </div>

          <Card className="dark:bg-gray-800/50 dark:border-gray-700 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                Схвалені рейтинги та обмеження
              </CardTitle>
              <CardDescription className="dark:text-gray-300">
                Категорії підготовки, затверджені для Організації PART-147
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 rounded-lg border dark:border-gray-700 p-4 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-all hover:shadow-md dark:bg-gray-800/30"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white font-bold text-lg shadow-md">
                      {category.level}
                    </div>
                    <div className="flex-1 space-y-2">
                      <Badge
                        variant="outline"
                        className="bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800"
                      >
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Затверджено
                      </Badge>
                      <p className="text-sm text-muted-foreground dark:text-gray-300 leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="dark:bg-gray-800/50 dark:border-gray-700 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl dark:text-white flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                Вимоги до базового екзаменування
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 p-6 border border-amber-200 dark:border-amber-900">
                <p className="text-sm text-amber-900 dark:text-amber-300 leading-relaxed">
                  Особа, що виявила бажання пройти базову підготовку за
                  будь-якою категорією (підкатегорією), має право пройти{" "}
                  <span className="font-bold">
                    лише базове екзаменування з відповідних модулів.
                  </span>
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg dark:text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  Обов'язкова повна підготовка
                </h3>
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 p-6 border border-blue-200 dark:border-blue-900 space-y-4">
                  <p className="text-sm text-blue-900 dark:text-blue-300 leading-relaxed">
                    Відповідно до рекомендацій Державної авіаційної служби
                    України, підготовка за програмами модулів{" "}
                    <span className="font-bold">М9А «Людський фактор»</span> та{" "}
                    <span className="font-bold">
                      М10 «Авіаційне законодавство»
                    </span>{" "}
                    відбувається в повному обсязі (тобто слухач не може лише
                    пройти базове екзаменування за цими модулями).
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                      <Badge className="mb-2 bg-blue-600 dark:bg-blue-500">
                        М9А
                      </Badge>
                      <p className="text-sm font-semibold dark:text-white">
                        Людський фактор
                      </p>
                      <p className="text-xs text-muted-foreground dark:text-gray-400 mt-2">
                        42,5 астрономічні години
                      </p>
                      <p className="text-xs text-muted-foreground dark:text-gray-400">
                        (8 днів підготовки по 6 годин на день)
                      </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                      <Badge className="mb-2 bg-blue-600 dark:bg-blue-500">
                        М10
                      </Badge>
                      <p className="text-sm font-semibold dark:text-white">
                        Авіаційне законодавство
                      </p>
                      <p className="text-xs text-muted-foreground dark:text-gray-400 mt-2">
                        88 астрономічних годин
                      </p>
                      <p className="text-xs text-muted-foreground dark:text-gray-400">
                        (15 днів підготовки по 6 годин на день)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-green-50 dark:bg-green-950/20 p-6 border border-green-200 dark:border-green-900">
                <p className="text-sm text-green-900 dark:text-green-300 leading-relaxed">
                  <span className="font-semibold">Можливість:</span> Особа, що
                  проходить лише базове екзаменування з модулів підготовки
                  відповідної категорії або підкатегорії (не враховуючи модулі
                  М9А та М10) має можливість складати по 2 екзамени на день.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="dark:bg-gray-800/50 dark:border-gray-700 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl dark:text-white">
                Інформація щодо розширення повноважень (отримання двох категорій
                – B1 та B2)
              </CardTitle>
              <CardDescription className="dark:text-gray-300">
                Вимоги до базового екзаменування для розширення наявної
                категорії
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 p-6 border border-blue-200 dark:border-blue-900 mb-6">
                <p className="text-sm text-blue-900 dark:text-blue-300 leading-relaxed">
                  Особа, яка виявила бажання пройти базове екзаменування, щоб
                  згодом отримати свідоцтво персоналу з технічного
                  обслуговування, або розширити повноваження наявного свідоцтва
                  персоналу з технічного обслуговування, має пройти базове
                  екзаменування з нижченаведених модулів:
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden shadow-md">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800">
                      <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-white font-semibold">
                        Категорія, що додається
                      </th>
                      <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-white font-semibold">
                        Наявна категорія
                      </th>
                      <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-white font-semibold">
                        Модулі, з яких потрібно пройти екзаменування
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {extensionRequirements.map((req, index) => (
                      <tr
                        key={index}
                        className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors bg-white dark:bg-gray-800"
                      >
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-3">
                          <Badge className="bg-blue-600 dark:bg-blue-500 text-white">
                            {req.adding}
                          </Badge>
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-3">
                          <Badge
                            variant="outline"
                            className="border-gray-400 dark:border-gray-500 dark:text-gray-300"
                          >
                            {req.current}
                          </Badge>
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 dark:text-gray-300">
                          {req.modules}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 rounded-lg bg-gray-100 dark:bg-gray-700/50 p-4 border border-gray-300 dark:border-gray-600">
                <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed italic">
                  <span className="font-semibold">Примітка:</span> В даній
                  таблиці наведені дані лише відповідно тих категорій
                  (підкатегорій) щодо яких наявне схвалення в Організації
                  PART-147 коледжу
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card className="dark:bg-gray-800/50 dark:border-gray-700 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Badge className="bg-blue-600 dark:bg-blue-500 text-lg px-3 py-1">
                    B1.1
                  </Badge>
                  <div>
                    <CardTitle className="dark:text-white">
                      Літаки з газотурбінними двигунами
                    </CardTitle>
                    <CardDescription className="dark:text-gray-300">
                      Модулі базової підготовки для підкатегорії В1.1
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 p-4 border border-blue-200 dark:border-blue-900 mb-6">
                  <p className="text-sm text-blue-900 dark:text-blue-300 leading-relaxed">
                    <span className="font-semibold">Примітка:</span> Слухачі, що
                    проходять базову підготовку за підкатегорією В1.1 «Літаки з
                    газотурбінними двигунами» мають пройти базову підготовку
                    та/або базове екзаменування з наступних модулів, відповідно
                    до вимог PART-66:
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden shadow-md">
                    <thead>
                      <tr className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800">
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-white font-semibold">
                          Модуль
                        </th>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-white font-semibold">
                          Назва
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {subjectsOnB11.map((item, index) => (
                        <tr
                          key={index}
                          className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors bg-white dark:bg-gray-800"
                        >
                          <td className="border border-gray-300 dark:border-gray-600 px-4 py-3">
                            <Badge
                              variant="outline"
                              className="font-mono dark:border-gray-500 dark:text-gray-300"
                            >
                              {item.module}
                            </Badge>
                          </td>
                          <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 dark:text-gray-300">
                            {item.name}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800/50 dark:border-gray-700 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Badge className="bg-blue-600 dark:bg-blue-500 text-lg px-3 py-1">
                    B1.3
                  </Badge>
                  <div>
                    <CardTitle className="dark:text-white">
                      Вертольоти з газотурбінними двигунами
                    </CardTitle>
                    <CardDescription className="dark:text-gray-300">
                      Модулі базової підготовки для підкатегорії В1.3
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 p-4 border border-blue-200 dark:border-blue-900 mb-6">
                  <p className="text-sm text-blue-900 dark:text-blue-300 leading-relaxed">
                    <span className="font-semibold">Примітка:</span> Слухачі, що
                    проходять базову підготовку за підкатегорією В1.3
                    «Вертольоти з газотурбінними двигунами» мають пройти базову
                    підготовку та/або базове екзаменування з наступних модулів,
                    відповідно до вимог PART-66:
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden shadow-md">
                    <thead>
                      <tr className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800">
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-white font-semibold">
                          Модуль
                        </th>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-white font-semibold">
                          Назва
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {subjectsOnB13.map((item, index) => (
                        <tr
                          key={index}
                          className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors bg-white dark:bg-gray-800"
                        >
                          <td className="border border-gray-300 dark:border-gray-600 px-4 py-3">
                            <Badge
                              variant="outline"
                              className="font-mono dark:border-gray-500 dark:text-gray-300"
                            >
                              {item.module}
                            </Badge>
                          </td>
                          <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 dark:text-gray-300">
                            {item.name}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800/50 dark:border-gray-700 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Badge className="bg-blue-600 dark:bg-blue-500 text-lg px-3 py-1">
                    B2
                  </Badge>
                  <div>
                    <CardTitle className="dark:text-white">Авіоніка</CardTitle>
                    <CardDescription className="dark:text-gray-300">
                      Модулі базової підготовки для категорії В2
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 p-4 border border-blue-200 dark:border-blue-900 mb-6">
                  <p className="text-sm text-blue-900 dark:text-blue-300 leading-relaxed">
                    <span className="font-semibold">Примітка:</span> Слухачі, що
                    проходять базову підготовку за категорією В2 «Авіоніка»
                    мають пройти базову підготовку та/або базове екзаменування з
                    наступних модулів, відповідно до вимог PART-66:
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden shadow-md">
                    <thead>
                      <tr className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800">
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-white font-semibold">
                          Модуль
                        </th>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-white font-semibold">
                          Назва
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {subjectsOnB2.map((item, index) => (
                        <tr
                          key={index}
                          className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors bg-white dark:bg-gray-800"
                        >
                          <td className="border border-gray-300 dark:border-gray-600 px-4 py-3">
                            <Badge
                              variant="outline"
                              className="font-mono dark:border-gray-500 dark:text-gray-300"
                            >
                              {item.module}
                            </Badge>
                          </td>
                          <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 dark:text-gray-300">
                            {item.name}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
