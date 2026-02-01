"use client";

import { useCallback } from "react";
import { CreditCard, ExternalLink, Building2, Banknote, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PAYMENT_URL = "https://next.privat24.ua/payments/form/%7B%22token%22:%2262166dce-0f24-4b84-ac53-eed0960f1295%22%7D";

const features = [
  {
    icon: Shield,
    title: "Безпечна оплата",
    description: "Захищене з'єднання через Приват24",
  },
  {
    icon: Banknote,
    title: "Миттєве зарахування",
    description: "Кошти надходять протягом хвилин",
  },
  {
    icon: Building2,
    title: "Офіційний платіж",
    description: "Квитанція для бухгалтерії",
  },
];

export const PaymentDetailsPage = () => {
  const openPaymentPage = useCallback(() => {
    window.open(PAYMENT_URL, "_blank", "noopener,noreferrer");
  }, []);

  return (
    <div className="space-y-8">
      {/* Hero Card */}
      <Card
        className={cn(
          "relative overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-primary/10",
          "animate-in fade-in slide-in-from-bottom-4 duration-500"
        )}
      >
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        
        <CardContent className="relative flex flex-col items-center gap-6 p-8 text-center md:p-12">
          <div className="rounded-2xl bg-primary/10 p-4">
            <CreditCard className="h-12 w-12 text-primary" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">
              Оплата навчання через Приват24
            </h2>
            <p className="mx-auto max-w-lg text-muted-foreground">
              Швидка та безпечна оплата навчання, проживання в гуртожитку та інших послуг через офіційну платіжну систему ПриватБанку
            </p>
          </div>

          <Button
            size="lg"
            onClick={openPaymentPage}
            className="group gap-2 px-8 py-6 text-base font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            Перейти до оплати
            <ExternalLink className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>

          <p className="text-xs text-muted-foreground">
            Ви будете перенаправлені на захищену сторінку Приват24
          </p>
        </CardContent>
      </Card>

      {/* Features */}
      <div className="grid gap-4 sm:grid-cols-3">
        {features.map((feature, index) => (
          <Card
            key={feature.title}
            className={cn(
              "transition-all duration-300 hover:shadow-md",
              "animate-in fade-in slide-in-from-bottom-4"
            )}
            style={{
              animationDelay: `${(index + 1) * 100}ms`,
              animationFillMode: "backwards",
            }}
          >
            <CardContent className="flex items-start gap-4 p-5">
              <div className="shrink-0 rounded-lg bg-muted p-2">
                <feature.icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="min-w-0">
                <h3 className="font-medium text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Instructions */}
      <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: "400ms", animationFillMode: "backwards" }}>
        <CardContent className="p-6">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Інструкція з оплати</h3>
          <ol className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">1</span>
              <span>Натисніть кнопку "Перейти до оплати" для переходу на сторінку Приват24</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">2</span>
              <span>Введіть ПІБ студента та призначення платежу (за навчання, гуртожиток тощо)</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">3</span>
              <span>Вкажіть суму оплати згідно з договором або рахунком</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">4</span>
              <span>Підтвердіть платіж та збережіть квитанцію для звітності</span>
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
};
