import { pageContent } from "@/lib/part-147/part-147";
import { GraduationCap } from "lucide-react";
import { LinksNavigation } from "@/components/Part-147/Navigation/LinksNavigation";
import { SectionTitleProps } from "@/types/part-147";

export default function Part147Page() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 md:py-24">
      <div className="container space-y-12 mx-auto">
        {pageContent.map(({ title, description, icon, links }) => (
          <div key={title} className="space-y-6">
            <PageTitle />
            <SectionTitle icon={icon} title={title} description={description} />
            <LinksNavigation links={links} />
          </div>
        ))}
      </div>
    </section>
  );
}

const PageTitle = () => (
  <div className="flex flex-col items-center space-y-4 text-center">
    <div className="inline-block rounded-full bg-blue-100 p-2">
      <GraduationCap className="h-6 w-6 text-blue-600" />
    </div>
    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-balance dark:text-white">
      Організація PART-147
    </h1>
    <p className="max-w-[700px] text-muted-foreground">
      Організація з підготовки до технічного обслуговування та екзаменування
    </p>
  </div>
);

const SectionTitle: React.FC<SectionTitleProps> = ({
  icon,
  title,
  description,
}) => (
  <div className="flex items-center gap-3">
    <div className="rounded-full bg-blue-100 p-2 text-blue-600">{icon}</div>
    <div>
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </div>
);
