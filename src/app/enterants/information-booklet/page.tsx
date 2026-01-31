import { BookOpen, Download, FileText, GraduationCap, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BackLink } from "@/components/common/BackLink/BackLink"

export default function InfoBookletPage() {
  const booklet = {
    title: "Інформаційний буклет для вступників",
    subtitle: "Все, що потрібно знати про вступ до коледжу",
    file: "/info.pdf",
    description:
      "Офіційний інформаційний буклет для абітурієнтів Криворізького фахового коледжу Національного авіаційного університету",
    highlights: [
      {
        icon: GraduationCap,
        title: "Спеціальності",
        description: "Перелік спеціальностей та напрямів підготовки",
      },
      {
        icon: FileText,
        title: "Умови вступу",
        description: "Вимоги до вступників та необхідні документи",
      },
      {
        icon: Info,
        title: "Корисна інформація",
        description: "Контакти приймальної комісії та важливі дати",
      },
    ],
  }

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 py-16 md:py-24">
        <BackLink href="/enterants" />
        <div className="container space-y-12 mx-auto max-w-[1000px] text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 dark:bg-blue-500">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
          </div>
          <Badge className="mb-4 bg-blue-600 hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-500">
            Для вступників
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-balance dark:text-white">
            {booklet.title}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground dark:text-gray-300 leading-relaxed">
            {booklet.description}
          </p>
        </div>
      </section>

      <section className="bg-gray-50 dark:bg-gray-900 py-16 md:py-24">
        <div className="container space-y-12 mx-auto max-w-[1000px]">
          {/* Booklet Header Card */}
          <Card className="overflow-hidden border-2 border-blue-100 dark:border-blue-900 dark:bg-gray-800">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-950 dark:to-blue-900/50 pb-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge
                      variant="secondary"
                      className="bg-blue-600 text-white hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-500"
                    >
                      PDF
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 dark:bg-gray-800"
                    >
                      2025
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl md:text-3xl dark:text-white">{booklet.title}</CardTitle>
                  <CardDescription className="text-base dark:text-gray-300">{booklet.subtitle}</CardDescription>
                </div>
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-blue-600 dark:bg-blue-500">
                  <FileText className="h-10 w-10 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid gap-6 md:grid-cols-3">
                {booklet.highlights.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                      <item.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground dark:text-gray-400">
                        {item.title}
                      </p>
                      <p className="text-sm dark:text-white">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* PDF Viewer */}
          <Card className="overflow-hidden border-2 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:shadow-lg dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg dark:text-white">Перегляд буклету</CardTitle>
                <Badge variant="outline" className="text-xs dark:border-gray-600 dark:text-gray-300">
                  PDF документ
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative aspect-[3/4] md:aspect-[16/10] overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-900">
                <iframe
                  src={booklet.file}
                  className="w-full h-full min-h-[500px] md:min-h-[700px]"
                  title="Інформаційний буклет"
                />
              </div>

              <Button
                variant="outline"
                className="w-full bg-transparent dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                asChild
              >
                <a href={booklet.file} download target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4 mr-2" />
                  Завантажити буклет
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/30 dark:to-gray-800 border-2 border-blue-100 dark:border-blue-900">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-blue-600 dark:bg-blue-500">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">Приймальна комісія</h3>
                  <p className="text-muted-foreground dark:text-gray-300 leading-relaxed">
                    Якщо у вас виникли запитання щодо вступу, зверніться до приймальної комісії
                    Криворізького фахового коледжу Національного авіаційного університету.
                    Ми завжди раді допомогти майбутнім студентам!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}
