import { Users } from "lucide-react";

export const TableHeader = ({ text }: { text: string }) => {
  return (
    <div className="text-center space-y-4">
      <div className="inline-block rounded-full bg-blue-100 p-3">
        <Users className="h-8 w-8 text-blue-600" />
      </div>
      <h2 className="text-3xl font-bold tracking-tight">{text}</h2>
    </div>
  );
};
