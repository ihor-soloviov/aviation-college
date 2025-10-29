import { BackLink } from "@/components/common/BackLink/BackLink";
import { InstructorsTable } from "@/components/Part-147/Intructors/InstructorsTable";
import { SubjectsTable } from "@/components/Part-147/Subjects/SubjectsTable";
import { TableHeader } from "@/components/Part-147/TableHeader/TableHeader";
import { Note } from "@/components/Part-147/Note/Note";
import { StaffTable } from "@/components/Part-147/StaffTable/StaffTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

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

export default function RequirementsPage() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 md:py-24">
      <BackLink href="/part-147" />
      <div className="container space-y-12 mx-auto max-w-[1000px]">
        <div className="space-y-8">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-balance dark:text-white">
              Нормативні вимоги
            </h1>
            <p className="mt-6 text-lg text-muted-foreground dark:text-gray-300 leading-relaxed">
              Нормативні вимоги щодо базової підготовки слухачів та розширення
              наявної категорії персоналу з технічного обслуговування повітряних
              суден
            </p>
          </div>

          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl dark:text-white">
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
                    className="flex items-start gap-4 rounded-lg border dark:border-gray-700 p-4 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-colors"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-600 dark:bg-blue-500 text-white font-bold text-lg">
                      {category.level}
                    </div>
                    <div className="flex-1">
                      <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <p className="text-sm text-muted-foreground dark:text-gray-300 leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <StaffTable />
          {/* Instructors table */}
          <TableHeader text="ІНСТРУКТОРИ, ЕКЗАМЕНАТОРИ ТА ЕКСПЕРТИ З ОЦІНЮВАННЯ ПРАКТИЧНИХ НАВИЧОК" />
          <InstructorsTable />

          {/* Subjects table */}
          <SubjectsTable />
          <Note />
        </div>
      </div>
    </section>
  );
}
