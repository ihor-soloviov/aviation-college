"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type NavigationLink = {
  title: string;
  href: string;
  description?: string;
  isExternal?: boolean;
  isInDevelopment?: boolean;
  isNeedsLink?: boolean;
};

export type NavigationCategory = {
  title: string;
  description: string;
  icon: React.ReactNode;
  links: NavigationLink[];
  defaultExpanded?: boolean;
};

type Props = {
  categories: NavigationCategory[];
};

export const ExpandableNavigation: React.FC<Props> = ({ categories }) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    () => {
      const initial = new Set<string>();
      categories.forEach((cat) => {
        if (cat.defaultExpanded) {
          initial.add(cat.title);
        }
      });
      return initial;
    }
  );

  const toggleCategory = (title: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(title)) {
        next.delete(title);
      } else {
        next.clear();
        next.add(title);
      }
      return next;
    });
  };

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-start">
      {categories.map((category) => {
        const isExpanded = expandedCategories.has(category.title);
        const isSingleLink =
          category.links.length === 1 &&
          category.links[0].href !== "#" &&
          !category.links[0].isNeedsLink;
        const singleLink = isSingleLink ? category.links[0] : null;

        if (isSingleLink && singleLink) {
          const linkProps = {
            href: singleLink.href,
            ...(singleLink.isExternal && {
              target: "_blank",
              rel: "noopener noreferrer",
            }),
            className: "block",
            "aria-label": category.title,
          };
          return (
            <a key={category.title} {...linkProps}>
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
        }

        return (
          <Card
            key={category.title}
            className={cn(
              "group relative overflow-hidden flex flex-col transition-all duration-300 ease-out",
              isExpanded
                ? "shadow-lg ring-2 ring-blue-200 dark:ring-blue-800"
                : "hover:shadow-md"
            )}
          >
            <CardHeader
              className="pb-3 cursor-pointer select-none"
              onClick={() => toggleCategory(category.title)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleCategory(category.title);
                }
              }}
              aria-expanded={isExpanded}
              aria-label={`${category.title}, ${category.links.length} підрозділів`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-blue-100 p-2 text-blue-600 group-hover:bg-blue-200 transition-colors">
                    {category.icon}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg leading-tight group-hover:text-blue-600 transition-colors">
                      {category.title}
                    </CardTitle>
                    <CardDescription className="text-xs mt-1">
                      {category.links.length} підрозділів
                    </CardDescription>
                  </div>
                </div>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 text-gray-400 transition-transform duration-200",
                    isExpanded && "rotate-180"
                  )}
                />
              </div>
            </CardHeader>

            <div
              className={cn(
                "grid transition-all duration-300 ease-in-out",
                isExpanded
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden min-h-0">
                <CardContent className="pt-0 pb-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    {category.description}
                  </p>
                  <ul className="space-y-2 pl-0.5 max-h-52 overflow-y-auto overscroll-contain">
                    {category.links.map((link) => (
                      <li key={link.href + link.title} className="min-w-0">
                        {link.isInDevelopment ? (
                          <span className="text-sm text-gray-400 cursor-not-allowed flex items-start gap-2">
                            <span className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-gray-300" />
                            <span className="min-w-0 break-words">{link.title}</span>
                            <span className="text-xs shrink-0">(скоро)</span>
                          </span>
                        ) : link.isNeedsLink ? (
                          <span className="text-sm text-gray-500 dark:text-gray-400 flex items-start gap-2">
                            <span className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-amber-400" />
                            <span className="min-w-0 break-words">{link.title}</span>
                            <span className="text-xs shrink-0 text-amber-600 dark:text-amber-500">
                              Потрібно додати посилання
                            </span>
                          </span>
                        ) : (
                          <Link
                            href={link.href}
                            target={link.isExternal ? "_blank" : undefined}
                            rel={
                              link.isExternal
                                ? "noopener noreferrer"
                                : undefined
                            }
                            className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-start gap-2"
                            aria-label={link.title}
                          >
                            <span className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-blue-500" />
                            <span className="min-w-0 break-words">{link.title}</span>
                            {link.isExternal && (
                              <span className="text-xs text-gray-400 shrink-0" aria-hidden>↗</span>
                            )}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
