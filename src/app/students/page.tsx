import { PageTitle } from "@/components/common/PageTitle/PageTitle";
import { ExpandableNavigation } from "@/components/common/ExpandableNavigation";
import { studentsCategories } from "@/lib/students";

export default function StudentsPage() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 md:py-24">
      <div className="container space-y-12 mx-auto">
        <PageTitle
          title="Здобувачам освіти"
          description="Інформація для студентів та курсантів коледжу"
        />
        <ExpandableNavigation categories={studentsCategories} />
      </div>
    </section>
  );
}
