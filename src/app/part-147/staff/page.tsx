import { BackLink } from "@/components/common/BackLink/BackLink";
import { InstructorsTable } from "@/components/Part-147/Intructors/InstructorsTable";
import { SubjectsTable } from "@/components/Part-147/Subjects/SubjectsTable";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { Users } from "lucide-react";
import React from "react";
import { subjectsNotes } from "@/lib/part-147/subjects";

export default function StaffPage() {
    // TODO: додати таблицю з кадровим складом
  return (
    <section className="bg-gray-50 dark:bg-blue-900/10 py-16 md:py-24">
      <BackLink href="/part-147" />
      <div className="container space-y-12 mx-auto max-w-[1000px]">
        <div className="space-y-8">
          {/* Instructors table */}
          <div className="text-center space-y-4">
            <div className="inline-block rounded-full bg-blue-100 p-3">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">
              ІНСТРУКТОРИ, ЕКЗАМЕНАТОРИ ТА ЕКСПЕРТИ З ОЦІНЮВАННЯ ПРАКТИЧНИХ
              НАВИЧОК
            </h2>
          </div>

          <InstructorsTable />

          <SubjectsTable />
          <Card className="bg-blue-100 dark:bg-blue-900/50">
            <CardHeader>
              <strong>Примітка</strong>
            </CardHeader>
            <CardContent>
              <p className="mb-4 font-medium">
                У таблиці під записом «B1» без цифрових індексів мається на
                увазі усі можливі підвиди доступні, згідно ліцензії організації
                PART-147 (В1.1,1.3).
              </p>
              <p className="mb-4 font-medium">
                Аналогічно для запису «B2» (В2). Інструктори з теоретичної
                підготовки з модулів які мають практичну частину є одночасно і
                інструкторами з практичної підготовки.
              </p>
              <ul className="list-disc list-inside">
                {subjectsNotes.map(({ title }) => (
                  <li className="mb-2 last:mb-0" key={title}>
                    {title}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
