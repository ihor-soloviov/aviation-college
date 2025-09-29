"use client";
import { Button } from "@/components/ui/button";

const Categories = ({
  categories = ["Всі", "Денна форма навчання", "Заочна форма навчання"],
  current,
  onSelect,
}: {
  categories?: string[];
  current: string;
  onSelect: (c: string) => void;
}) => {
  const hoverClass =
    "bg-blue-600 hover:bg-blue-700 dark:white/10 dark:hover:bg-white-900/20";
  return (
    <div className="mx-auto flex gap-2">
      {categories.map((category) => (
        <Button
          key={category}
          className={`cursor-pointer ${category === current ? hoverClass : ""}`}
          onClick={() => onSelect(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};

export default Categories;
