import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type BackLinkProps = {
  href: string;
  label?: string;
};

export const BackLink = ({ href, label = "Назад" }: BackLinkProps) => {
  return (
    <Button asChild variant="outline">
      <Link href={href} className="flex items-center gap-2">
        <ArrowLeft className="h-4 w-4" />
        {label}
      </Link>
    </Button>
  );
};
