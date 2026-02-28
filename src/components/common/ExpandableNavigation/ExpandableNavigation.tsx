"use client";

import { useState } from "react";
import { NavigationCategory } from "./types";
import { SingleLinkCard } from "./SingleLinkCard";
import { ExpandableCard } from "./ExpandableCard";

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
    },
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
        const isSingleLink =
          category.links.length === 1 &&
          category.links[0].href !== "#" &&
          !category.links[0].isNeedsLink;

        if (isSingleLink) {
          const link = category.links[0];
          return (
            <SingleLinkCard
              key={category.title}
              category={category}
              href={link.href}
              isExternal={link.isExternal}
            />
          );
        }

        return (
          <ExpandableCard
            key={category.title}
            category={category}
            isExpanded={expandedCategories.has(category.title)}
            onToggle={() => toggleCategory(category.title)}
          />
        );
      })}
    </div>
  );
};
