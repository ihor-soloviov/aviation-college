"use client";
import { Button } from "@/components/ui/button";
import { Sun, Moon, ListFilter } from "lucide-react";

const categoryIcons: Record<string, React.ElementType> = {
  "Всі": ListFilter,
  "Денна форма навчання": Sun,
  "Заочна форма навчання": Moon,
};

const Categories = ({
  categories = ["Всі", "Денна форма навчання", "Заочна форма навчання"],
  current,
  onSelect,
}: {
  categories?: string[];
  current: string;
  onSelect: (c: string) => void;
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {categories.map((category) => {
        const isActive = category === current;
        const Icon = categoryIcons[category];
        return (
          <Button
            key={category}
            variant={isActive ? "default" : "outline"}
            className={`
              cursor-pointer transition-all duration-200
              ${isActive 
                ? "bg-blue-600 hover:bg-blue-700 shadow-md scale-105" 
                : "hover:border-blue-400 hover:text-blue-600"
              }
            `}
            onClick={() => onSelect(category)}
          >
            {Icon && <Icon className="h-4 w-4 mr-2" />}
            <span className="hidden sm:inline">{category}</span>
            <span className="sm:hidden">
              {category === "Всі" ? "Всі" : category.split(" ")[0]}
            </span>
          </Button>
        );
      })}
    </div>
  );
};

export default Categories;
