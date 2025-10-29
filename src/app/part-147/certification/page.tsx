import Image from "next/image"
import { Award, Calendar, FileCheck, Shield, ZoomIn, Download, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { BackLink } from "@/components/common/BackLink/BackLink"

export default function CertificatesPage() {
  const certificates = [
    {
      id: 1,
      title: "Сертифікат схвалення організації PART-147",
      subtitle: "Maintenance Training and Examination Organisation Approval Certificate",
      number: "UA.147.0002",
      issueDate: "06.07.2012",
      revisionDate: "06.11.2020",
      revisionNumber: "2",
      authority: "Державна авіаційна служба України",
      authorityEn: "State Aviation Administration of Ukraine",
      images: ["/certs/cert1.jpeg", "/certs/cert2.jpeg"],
      description:
        "Офіційний сертифікат, що підтверджує схвалення організації для проведення підготовки до технічного обслуговування та екзаменування",
      ratings: [
        {
          code: "B1",
          limitation: "TB1.1",
          description: "Газотурбінні літаки (Aeroplanes Turbine)",
        },
        {
          code: "B1",
          limitation: "TB1.3",
          description: "Газотурбінні вертольоти (Helicopters Turbine)",
        },
        { code: "B2", limitation: "TB2", description: "Авіоніка (Avionics)" },
      ],
    },
  ]

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 py-16 md:py-24">
        <BackLink href="/part-147" />
        <div className="container space-y-12 mx-auto max-w-[1000px] text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 dark:bg-blue-500">
              <Award className="h-8 w-8 text-white" />
            </div>
          </div>
          <Badge className="mb-4 bg-blue-600 hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-500">
            Офіційна акредитація
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-balance dark:text-white">
            Сертифікати та акредитація
          </h1>
          <p className="mt-6 text-lg text-muted-foreground dark:text-gray-300 leading-relaxed">
            Офіційні документи, що підтверджують схвалення організації для проведення підготовки до технічного
            обслуговування та екзаменування відповідно до стандартів PART-147
          </p>
        </div>
      </section>

      <section className="bg-gray-50 dark:bg-gray-900 py-16 md:py-24">
        <div className="container space-y-12 mx-auto max-w-[1000px]">
          {certificates.map((cert) => (
            <div key={cert.id} className="space-y-8">
              {/* Certificate Header Card */}
              <Card className="overflow-hidden border-2 border-blue-100 dark:border-blue-900 dark:bg-gray-800">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-950 dark:to-blue-900/50 pb-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge
                          variant="secondary"
                          className="bg-blue-600 text-white hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-500"
                        >
                          PART-147
                        </Badge>
                        <Badge
                          variant="outline"
                          className="border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 dark:bg-gray-800"
                        >
                          {cert.number}
                        </Badge>
                      </div>
                      <CardTitle className="text-2xl md:text-3xl dark:text-white">{cert.title}</CardTitle>
                      <CardDescription className="text-base dark:text-gray-300">{cert.subtitle}</CardDescription>
                    </div>
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-blue-600 dark:bg-blue-500">
                      <Shield className="h-10 w-10 text-white" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {/* Info Boxes */}
                    <div className="flex gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                        <FileCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground dark:text-gray-400">
                          Номер сертифікату
                        </p>
                        <p className="font-semibold dark:text-white">{cert.number}</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                        <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground dark:text-gray-400">Дата видачі</p>
                        <p className="font-semibold dark:text-white">{cert.issueDate}</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                        <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground dark:text-gray-400">Остання ревізія</p>
                        <p className="font-semibold dark:text-white">{cert.revisionDate}</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/30">
                        <Shield className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground dark:text-gray-400">Видання №</p>
                        <p className="font-semibold dark:text-white">{cert.revisionNumber}</p>
                      </div>
                    </div>
                  </div>

                  {/* Authority Info Box */}
                  <div className="mt-6 rounded-lg bg-blue-50 dark:bg-blue-950/50 p-4 border dark:border-blue-900">
                    <p className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-1">{cert.authority}</p>
                    <p className="text-sm text-blue-700 dark:text-blue-400">{cert.authorityEn}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Certificate Images */}
              <div className="grid gap-6 md:grid-cols-2">
                {cert.images.map((image, index) => (
                  <Card
                    key={index}
                    className="group overflow-hidden border-2 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:shadow-lg dark:bg-gray-800 dark:border-gray-700"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg dark:text-white">
                          Сторінка {index + 1} з {cert.images.length}
                        </CardTitle>
                        <Badge variant="outline" className="text-xs dark:border-gray-600 dark:text-gray-300">
                          {index === 0 ? "Основний документ" : "Додаток"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <div className="relative aspect-[3/4] cursor-pointer overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-900">
                            <Image
                              src={image || "/placeholder.svg"}
                              alt={`${cert.title} - Сторінка ${index + 1}`}
                              fill
                              className="object-contain transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white dark:bg-gray-800 rounded-full p-3">
                                <ZoomIn className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                              </div>
                            </div>
                          </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-5xl h-[90vh] p-0 dark:bg-gray-900">
                          <div className="relative w-full h-full">
                            <Image
                              src={image || "/placeholder.svg"}
                              alt={`${cert.title} - Сторінка ${index + 1}`}
                              fill
                              className="object-contain"
                            />
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Button
                        variant="outline"
                        className="w-full bg-transparent dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                        asChild
                      >
                        <a href={image} download target="_blank" rel="noopener noreferrer">
                          <Download className="h-4 w-4 mr-2" />
                          Завантажити
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Ratings and Limitations */}
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-2xl dark:text-white">Схвалені рейтинги та обмеження</CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    Категорії підготовки, затверджені для Організації PART-147
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cert.ratings.map((rating, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 rounded-lg border dark:border-gray-700 p-4 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-colors"
                      >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-600 dark:bg-blue-500 text-white font-bold text-lg">
                          {rating.code}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="secondary" className="text-xs dark:bg-gray-700 dark:text-gray-200">
                              {rating.limitation}
                            </Badge>
                            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                          </div>
                          <p className="text-sm text-muted-foreground dark:text-gray-300 leading-relaxed">
                            {rating.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Note Box */}
                  <div className="mt-6 rounded-lg bg-blue-50 dark:bg-blue-950/50 p-4 border border-blue-200 dark:border-blue-900">
                    <p className="text-sm text-blue-900 dark:text-blue-300 leading-relaxed">
                      <span className="font-semibold">Примітка:</span> Цей перелік схвалення обмежується тими
                      підготовками та екзаменуваннями, зазначеними у розділі обсягу робіт схваленого керівництва
                      організації з підготовки до технічного обслуговування.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Information */}
              <Card className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/30 dark:to-gray-800 border-2 border-blue-100 dark:border-blue-900">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-blue-600 dark:bg-blue-500">
                      <Award className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-xl font-semibold mb-2 dark:text-white">Офіційна акредитація</h3>
                      <p className="text-muted-foreground dark:text-gray-300 leading-relaxed">
                        Криворізький фаховий коледж Національного авіаційного університету є офіційно схваленою
                        організацією для проведення підготовки до технічного обслуговування та екзаменування відповідно
                        до вимог Авіаційних правил України (Додаток 4 до PART-147).
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
