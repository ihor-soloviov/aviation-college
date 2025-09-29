"use client";
import { Button } from "@/components/ui/button";

const options = ["Фаховий молодший бакалавр", "Бакалавр"];

export default function CourseToggle({
  current,
  onSelect,
}: {
  current: string;
  onSelect: (value: string) => void;
}) {
  const hoverClass =
    "bg-blue-600 hover:bg-blue-700 dark:white/10 dark:hover:bg-white-900/20";

  return (
    <div className="mx-auto flex flex-wrap gap-2">
      {options.map((option) => (
        <Button
          key={option}
          value={option}
          className={`cursor-pointer ${option === current ? hoverClass : ""}`}
          onClick={() => onSelect(option)}
        >
          {option}
        </Button>
      ))}
    </div>
  );
}
