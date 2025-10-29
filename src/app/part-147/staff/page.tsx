import { BackLink } from "@/components/common/BackLink/BackLink";
import { InstructorsTable } from "@/components/Part-147/Intructors/InstructorsTable";
import { SubjectsTable } from "@/components/Part-147/Subjects/SubjectsTable";
import { TableHeader } from "@/components/Part-147/TableHeader/TableHeader";
import { Note } from "@/components/Part-147/Note/Note";
import { StaffTable } from "@/components/Part-147/StaffTable/StaffTable";

export default function StaffPage() {
  // TODO: додати таблицю з кадровим складом
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 md:py-24">
      <BackLink href="/part-147" />
      <div className="container space-y-12 mx-auto max-w-[1000px]">
        <div className="space-y-8">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Кадровий склад Організації PART-147
            </h2>
          </div>

          {/* Staff table */}
          <TableHeader text="КЕРІВНИЙ СКЛАД ОРГАНІЗАЦІЇ PART-147" />
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
