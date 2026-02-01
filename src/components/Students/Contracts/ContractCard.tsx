"use client";

import { FileText, Calendar, CreditCard, GraduationCap, ExternalLink, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ContractItem, ContractType } from "./data";

const getContractConfig = (type: ContractType) => {
  switch (type) {
    case "year":
      return {
        icon: Calendar,
        iconBg: "bg-blue-100 dark:bg-blue-900/30",
        iconColor: "text-blue-600 dark:text-blue-400",
        borderHover: "hover:border-blue-300 dark:hover:border-blue-700",
        badgeClass: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
      };
    case "contract":
      return {
        icon: CreditCard,
        iconBg: "bg-amber-100 dark:bg-amber-900/30",
        iconColor: "text-amber-600 dark:text-amber-400",
        borderHover: "hover:border-amber-300 dark:hover:border-amber-700",
        badgeClass: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300",
      };
    case "budget":
      return {
        icon: GraduationCap,
        iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
        iconColor: "text-emerald-600 dark:text-emerald-400",
        borderHover: "hover:border-emerald-300 dark:hover:border-emerald-700",
        badgeClass: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300",
      };
  }
};

const getContractLabel = (type: ContractType) => {
  switch (type) {
    case "year":
      return "Актуальний рік";
    case "contract":
      return "Контракт";
    case "budget":
      return "Бюджет";
  }
};

type ContractCardProps = {
  contract: ContractItem;
  index: number;
  onOpenPdf: (url: string) => void;
};

export const ContractCard = ({ contract, index, onOpenPdf }: ContractCardProps) => {
  const config = getContractConfig(contract.type);
  const Icon = config.icon;

  return (
    <Card
      className={cn(
        "group cursor-pointer overflow-hidden transition-all duration-300",
        "hover:shadow-lg hover:scale-[1.02]",
        "animate-in fade-in slide-in-from-bottom-4",
        config.borderHover,
        contract.highlight && "ring-2 ring-blue-500/20"
      )}
      style={{
        animationDelay: `${index * 100}ms`,
        animationFillMode: "backwards",
      }}
      onClick={() => onOpenPdf(contract.pdfUrl)}
    >
      {/* Gradient accent top */}
      <div className={cn(
        "h-1 w-full transition-all duration-300",
        contract.type === "year" && "bg-gradient-to-r from-blue-500 to-blue-600",
        contract.type === "contract" && "bg-gradient-to-r from-amber-500 to-amber-600",
        contract.type === "budget" && "bg-gradient-to-r from-emerald-500 to-emerald-600"
      )} />

      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Icon container */}
          <div className={cn(
            "shrink-0 rounded-xl p-3 transition-all duration-300 group-hover:scale-110",
            config.iconBg
          )}>
            <Icon className={cn("h-6 w-6", config.iconColor)} />
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-foreground leading-tight group-hover:text-primary transition-colors">
                {contract.title}
              </h3>
              {contract.highlight && (
                <Badge variant="default" className="shrink-0 text-xs">
                  Актуально
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {contract.description}
            </p>
            
            {/* Footer with badge and action */}
            <div className="flex items-center justify-between pt-2">
              <Badge variant="secondary" className={cn("text-xs font-normal", config.badgeClass)}>
                {getContractLabel(contract.type)}
              </Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Відкрити</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
