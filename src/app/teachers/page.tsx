import { PageTitle } from "@/components/common/PageTitle/PageTitle";
import { ExpandableNavigation } from "@/components/common/ExpandableNavigation";
import { teachersCategories } from "@/lib/teachers";

export default function TeachersPage() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 md:py-24">
      <div className="container space-y-12 mx-auto">
        <PageTitle
          title="Викладачам"
          description="Інформація для викладачів коледжу"
        />
        <ExpandableNavigation categories={teachersCategories} />
      </div>
    </section>
  );
}
