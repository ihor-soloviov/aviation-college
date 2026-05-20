import { pageContent } from "@/lib/part-147/part-147";
import { LinksNavigation } from "@/components/Part-147/Navigation/LinksNavigation";
import { PageTitle } from "@/components/common/PageTitle/PageTitle";
import { SectionTitle } from "@/components/common/SectionTitle/SectionTitle";

export default function Part147Page() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 md:py-24">
      <div className="container space-y-12 mx-auto">
        {pageContent.map(({ title, description, icon, links }) => (
          <div key={title} className="space-y-6">
            <PageTitle
              title="Організація PART-147"
              description="Організація з підготовки до технічного обслуговування та екзаменування"
            />
            <SectionTitle icon={icon} title={title} description={description} />
            <LinksNavigation links={links} />
          </div>
        ))}
      </div>
    </section>
  );
}
