import { memo } from "react";
import Course from "@/components/Courses/Course/Course";
import { ICourse } from "@/types/courses";

interface CourseSectionProps {
  id: string;
  title: string;
  icon: React.ElementType;
  courses: ICourse[];
}

function CourseSectionComponent({
  id,
  title,
  icon: Icon,
  courses,
}: CourseSectionProps) {
  if (courses.length === 0) return null;

  return (
    <div id={id} className="space-y-4">
      <div className="flex items-center justify-center gap-3 py-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50">
          <Icon className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-bold">{title}</h2>
          <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
            {courses.length}
          </span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {courses.map((course) => {
          const IconComponent = course.icon;
          return (
            <div key={course.id} className="h-full">
              <Course
                course={course}
                IconComponent={IconComponent}
                shouldShowNote={false}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const CourseSection = memo(CourseSectionComponent);
