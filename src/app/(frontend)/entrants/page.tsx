import { PageTitle } from "@/components/common/PageTitle/PageTitle";
import { LinksNavigation } from "@/components/Part-147/Navigation/LinksNavigation";
import { pageContent } from "@/lib/entrants";

export default function entrantsPage() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 md:py-24">
      <div className="container space-y-12 mx-auto">
        {pageContent.map(({ title, description, links }) => (
          <div key={title} className="space-y-10">
            <PageTitle title={title} description={description} />
            <LinksNavigation links={links} />
          </div>
        ))}
      </div>
    </section>
  );
}
