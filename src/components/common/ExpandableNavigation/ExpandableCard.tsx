import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavigationCategory } from "./types";
import { ScrollableList } from "./ScrollableList";

type Props = {
  category: NavigationCategory;
  isExpanded: boolean;
  onToggle: () => void;
};

export const ExpandableCard = ({ category, isExpanded, onToggle }: Props) => (
  <Card
    className={cn(
      "group relative overflow-hidden flex flex-col transition-all duration-300 ease-out",
      isExpanded
        ? "shadow-lg ring-2 ring-blue-200 dark:ring-blue-800"
        : "hover:shadow-md",
    )}
  >
    <CardHeader
      className="pb-3 cursor-pointer select-none"
      onClick={onToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
      aria-expanded={isExpanded}
      aria-label={`${category.title}, ${category.links.length} підрозділів`}
    >
      <div className="flex items-start justify-between">
        <div className="flex gap-3" style={{ alignItems: "start" }}>
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
            isExpanded && "rotate-180",
          )}
        />
      </div>
    </CardHeader>

    <div
      className={cn(
        "grid transition-all duration-300 ease-in-out",
        isExpanded
          ? "grid-rows-[1fr] opacity-100"
          : "grid-rows-[0fr] opacity-0",
      )}
    >
      <div className="overflow-hidden min-h-0">
        <CardContent className="pt-0 pb-4">
          <p className="text-sm text-muted-foreground mb-4">
            {category.description}
          </p>
          <ScrollableList links={category.links} />
        </CardContent>
      </div>
    </div>
  </Card>
);
