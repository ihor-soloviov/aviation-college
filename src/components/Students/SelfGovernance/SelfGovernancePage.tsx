import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Scale, Users } from "lucide-react";
import { getLinkListBySlug } from "@/lib/link-lists";
import { HubItemCard } from "./HubItemCard";

export async function SelfGovernancePage() {
  const list = await getLinkListBySlug("self-governance");
  if (!list) notFound();

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <Card className="overflow-hidden border-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/30 dark:via-purple-950/20 dark:to-pink-950/10">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                  {list.title}
                </h2>
              </div>
              {list.description && (
                <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
                  {list.description}
                </p>
              )}
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <div className="flex items-center gap-2 rounded-lg bg-white/80 px-4 py-2 dark:bg-white/10">
                <Users className="h-5 w-5 text-indigo-600" />
                <div>
                  <p className="text-lg font-bold text-foreground">100%</p>
                  <p className="text-xs text-muted-foreground">Участь</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sections Grid */}
      <div className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.items.map((item, index) => (
          <HubItemCard key={index} item={item} index={index} />
        ))}
      </div>

      {/* Info Banner */}
      <Card className="border-indigo-200 bg-indigo-50/50 dark:border-indigo-800/50 dark:bg-indigo-950/20">
        <CardContent className="flex items-start gap-4 p-5">
          <div className="shrink-0 rounded-full bg-indigo-100 p-2 dark:bg-indigo-900/50">
            <Scale className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="space-y-1">
            <p className="font-medium text-foreground">Права та можливості</p>
            <p className="text-sm text-muted-foreground">
              Кожен здобувач освіти має право брати участь у роботі органів
              студентського самоврядування, обирати та бути обраним до їх
              складу. Самоврядування організовує культурно-масові заходи,
              представляє інтереси студентів та сприяє покращенню умов навчання.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
