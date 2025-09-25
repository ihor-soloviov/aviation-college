import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const BackLink = ({ href }: { href: string }) => {
  return (
    <Button className="mb-8">
      <Link href={href} className="flex items-center gap-2">
        <ArrowLeft className="h-4 w-4" />
        Назад
      </Link>
    </Button>
  );
};
