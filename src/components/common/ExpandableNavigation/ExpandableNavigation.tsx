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
        next.add(title);
      }
      return next;
    });
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start">
      {categories.map((category) => {
        const isExpanded = expandedCategories.has(category.title);

        return (
          <Card
            key={category.title}
            className="group relative overflow-hidden transition-all hover:shadow-md"
          >
            <CardHeader
              className="pb-3 cursor-pointer select-none"
              onClick={() => toggleCategory(category.title)}
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
                "grid transition-all duration-200 ease-in-out",
                isExpanded
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <CardContent className="pt-0 pb-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    {category.description}
                  </p>
                  <ul className="space-y-2">
                    {category.links.map((link) => (
                      <li key={link.href}>
                        {link.isInDevelopment ? (
                          <span className="text-sm text-gray-400 cursor-not-allowed flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                            {link.title}
                            <span className="text-xs">(скоро)</span>
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
                            className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                            {link.title}
                            {link.isExternal && (
                              <span className="text-xs text-gray-400">↗</span>
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
