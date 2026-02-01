"use client";

import { useCallback } from "react";
import { FileText, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ContractCard } from "./ContractCard";
import { contractsData } from "./data";

export const ContractsPage = () => {
  const openPdfInNewTab = useCallback((url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  return (
    <div className="space-y-8">
      {/* Info banner */}
      <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/20">
        <CardContent className="flex items-start gap-4 p-4">
          <div className="shrink-0 rounded-full bg-blue-100 p-2 dark:bg-blue-900/50">
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
              Важлива інформація
            </p>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Оберіть тип договору відповідно до вашої форми навчання. Для контрактної форми використовуйте договір 
              &quot;КОНТРАКТ&quot;, для бюджетної - &quot;БЮДЖЕТ&quot;. Актуальні договори на поточний навчальний рік 
              містять усі необхідні зразки документів.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Contracts grid */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-primary" />
          <h2 className="text-lg font-semibold text-foreground">
            Доступні договори
          </h2>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {contractsData.map((contract, index) => (
            <ContractCard
              key={contract.id}
              contract={contract}
              index={index}
              onOpenPdf={openPdfInNewTab}
            />
          ))}
        </div>
      </div>

      {/* Help section */}
      <Card className="bg-muted/30">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="shrink-0 rounded-lg bg-muted p-3">
              <FileText className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">
                Як заповнити договір?
              </h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                <li>Завантажте відповідний договір натиснувши на картку</li>
                <li>Роздрукуйте договір у двох примірниках</li>
                <li>Заповніть усі необхідні поля (ПІБ, дата народження, адреса тощо)</li>
                <li>Підпишіть обидва примірники договору</li>
                <li>Здайте договори до навчального відділу коледжу</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
