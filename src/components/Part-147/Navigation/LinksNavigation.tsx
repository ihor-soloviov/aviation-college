import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { DefaultPageLink } from "@/types/part-147";
import Link from "next/link";

type Props = {
  links: DefaultPageLink[];
};

export const LinksNavigation: React.FC<Props> = ({ links }) => {
  const animationClass =
    "transition-all hover:shadow-md hover:-translate-y-1 h-full";
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {links.map(
        ({ href, title, description, icon, isInDevelopment = false }) => (
          <Link href={href} key={href}>
            <Card
              className={`group relative overflow-hidden ${
                isInDevelopment
                  ? "opacity-50 cursor-not-allowed"
                  : animationClass
              }`}
            >   
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`rounded-full bg-blue-100 p-2 text-blue-600 ${
                        isInDevelopment
                          ? ""
                          : "group-hover:bg-blue-200 transition-colors"
                      }`}
                    >
                      {icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle
                        className={`text-lg leading-tight ${
                          isInDevelopment
                            ? ""
                            : "group-hover:text-blue-600 transition-colors"
                        }`}
                      >
                        {title}
                      </CardTitle>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <CardDescription className="text-sm line-clamp-2">
                  {description}
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        )
      )}
    </div>
  );
};
