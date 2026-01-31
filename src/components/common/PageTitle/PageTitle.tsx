import { GraduationCap } from "lucide-react";

export const PageTitle = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="flex flex-col items-center space-y-4 text-center">
    <div className="inline-block rounded-full bg-blue-100 p-2">
      <GraduationCap className="h-6 w-6 text-blue-600" />
    </div>
    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-balance dark:text-white">
      {title}
    </h1>
    <p className="max-w-[700px] text-muted-foreground">{description}</p>
  </div>
);
