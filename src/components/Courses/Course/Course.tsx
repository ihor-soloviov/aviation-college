import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, GraduationCap } from "lucide-react";
import React, { memo } from "react";
import { ICourse } from "@/types/courses";
import Link from "next/link";

const Course = ({
  course,
  IconComponent,
  shouldShowNote = true,
}: {
  course: ICourse;
  IconComponent: React.ElementType;
  shouldShowNote?: boolean;
}) => {
  const type = course.note === "денна" ? "fulltime" : "parttime";
  const link = `/courses/${type}/${course.id}`;
  return (
    <Link href={link}>
      <Card
        key={course.id}
        className="group relative overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 h-full flex flex-col"
      >
        <CardHeader className="flex-1">
          <div className="flex items-center justify-between pb-4">
            <div className="rounded-full bg-blue-100 p-3 group-hover:bg-blue-200 transition-colors">
              <IconComponent className="h-6 w-6 text-blue-600" />
            </div>
            {shouldShowNote && (
              <Badge variant="outline" className="text-xs">
                {course.note}
              </Badge>
            )}
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <CardTitle className="text-lg leading-tight text-center">
              {course.title}
            </CardTitle>
            <CardDescription className="text-sm text-center">
              {course.description}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 mt-auto">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1 text-muted-foreground">
                <DollarSign className="h-4 w-4" />
                <span>Ціна</span>
              </div>
              <span className="font-medium">{course.tuition}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1 text-muted-foreground">
                <GraduationCap className="h-4 w-4" />
                <span>Рівень освіти</span>
              </div>
              <span className="font-medium">{course.level}</span>
            </div>
          </div>

          <div className="flex justify-center pt-2">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              Докладніше
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default memo(Course);
