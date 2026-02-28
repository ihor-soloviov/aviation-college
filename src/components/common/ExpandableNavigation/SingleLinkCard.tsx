import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { NavigationCategory } from "./types";

type Props = {
  category: NavigationCategory;
  href: string;
  isExternal?: boolean;
};

export const SingleLinkCard = ({ category, href, isExternal }: Props) => (
  <a
    href={href}
    {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
    className="block"
    aria-label={category.title}
  >
    <Card className="group relative overflow-hidden transition-all hover:shadow-md flex flex-col min-h-[135px]">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-blue-100 p-2 text-blue-600 group-hover:bg-blue-200 transition-colors">
              {category.icon}
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg leading-tight group-hover:text-blue-600 transition-colors">
                {category.title}
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                {category.description}
              </p>
            </div>
          </div>
          <span className="text-gray-400 text-xs" aria-hidden>
            ↗
          </span>
        </div>
      </CardHeader>
    </Card>
  </a>
);
