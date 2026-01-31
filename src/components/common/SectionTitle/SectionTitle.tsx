import { SectionTitleProps } from "@/types/part-147";

export const SectionTitle: React.FC<SectionTitleProps> = ({
  icon,
  title,
  description,
}) => (
  <div className="flex items-center gap-3">
    <div className="rounded-full bg-blue-100 p-2 text-blue-600">{icon}</div>
    <div>
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </div>
);
