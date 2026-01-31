"use client";
import { Button } from "@/components/ui/button";
import { GraduationCap, Award } from "lucide-react";

const options = [
  { value: "Фаховий молодший бакалавр", icon: GraduationCap, short: "ФМБ" },
  { value: "Бакалавр", icon: Award, short: "Бакалавр" },
];

export default function CourseToggle({
  current,
  onSelect,
}: {
  current: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4">
      {options.map(({ value, icon: Icon, short }) => {
        const isActive = value === current;
        return (
          <Button
            key={value}
            variant={isActive ? "default" : "outline"}
            className={`
              cursor-pointer transition-all duration-200
              ${isActive 
                ? "bg-blue-600 hover:bg-blue-700 shadow-md scale-105" 
                : "hover:border-blue-400 hover:text-blue-600"
              }
            `}
            onClick={() => onSelect(value)}
          >
            <Icon className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">{value}</span>
            <span className="sm:hidden">{short}</span>
          </Button>
        );
      })}
    </div>
  );
}
