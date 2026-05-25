import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Plane,
  FileText,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Clock,
  BookOpen,
  type LucideIcon,
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";
import { getLinkListBySlug, type LinkListItem } from "@/lib/link-lists";
import { practiceTypes } from "./data";

function getLucideIcon(name?: string, fallback: LucideIcon = FileText): LucideIcon {
  if (!name) return fallback;
  const Icon = (LucideIcons as unknown as Record<string, LucideIcon>)[name];
  return Icon ?? fallback;
}

const navPresets: Record<
  string,
  { gradient: string; iconBg: string; border: string }
> = {
  blue: {
    gradient: "from-blue-500 to-blue-600",
    iconBg: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    border: "hover:border-blue-500/50",
  },
  orange: {
    gradient: "from-orange-500 to-amber-500",
    iconBg:
      "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
    border: "hover:border-orange-500/50",
  },
};

function BaseCard({
  base,
  index,
  aviation,
}: {
  base: LinkListItem;
  index: number;
  aviation: boolean;
}) {
  const Icon = getLucideIcon(base.icon, aviation ? Plane : Building2);
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg border bg-card p-3 transition-all duration-200",
        aviation
          ? "hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-blue-950/20"
          : "hover:border-primary/50 hover:bg-muted/50",
        "animate-in fade-in slide-in-from-bottom-2"
      )}
      style={{ animationDelay: `${index * 30}ms`, animationFillMode: "backwards" }}
    >
      <div
        className={cn(
          "shrink-0 rounded-lg p-2",
          aviation
            ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
            : "bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400"
        )}
      >
        <Icon className="h-4 w-4" />
      </div>
      <p className="min-w-0 flex-1 truncate text-sm font-medium">{base.title}</p>
    </div>
  );
}

export async function PracticalTrainingPage() {
  const [docsList, basesList] = await Promise.all([
    getLinkListBySlug("practical-training"),
    getLinkListBySlug("practice-bases"),
  ]);
  if (!docsList || !basesList) notFound();

  const docs = docsList.items;
  const aviationBases = basesList.items[0]?.children ?? [];
  const otherBases = basesList.items[1]?.children ?? [];

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <Card className="overflow-hidden border-0 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-950/30 dark:via-amber-950/20 dark:to-yellow-950/10">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Briefcase className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                  Практичне навчання
                </h2>
              </div>
              <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
                Практична підготовка є невід&apos;ємною складовою освітнього
                процесу. Здобувачі освіти проходять практику на провідних
                підприємствах України, що дозволяє отримати реальний досвід
                роботи за обраною спеціальністю.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <div className="flex items-center gap-2 rounded-lg bg-white/80 px-4 py-2 dark:bg-white/10">
                <Building2 className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-lg font-bold text-foreground">
                    {aviationBases.length + otherBases.length}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Баз практики
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-white/80 px-4 py-2 dark:bg-white/10">
                <Plane className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-lg font-bold text-foreground">
                    {aviationBases.length}
                  </p>
                  <p className="text-xs text-muted-foreground">Аеропортів</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Navigation Cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {docs.map((doc, index) => {
          const preset = navPresets[doc.color ?? "blue"] ?? navPresets.blue;
          const Icon = getLucideIcon(doc.icon);
          const isExternal = doc.href?.startsWith("http");
          return (
            <a
              key={index}
              href={doc.href ?? "#"}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="group text-left"
            >
              <Card
                className={cn(
                  "h-full overflow-hidden transition-all duration-300",
                  "hover:shadow-lg",
                  preset.border,
                  "animate-in fade-in slide-in-from-bottom-4"
                )}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: "backwards",
                }}
              >
                <div className={cn("h-1.5 bg-gradient-to-r", preset.gradient)} />
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        "shrink-0 rounded-xl p-4 transition-transform duration-300 group-hover:scale-110",
                        preset.iconBg
                      )}
                    >
                      <Icon className="h-8 w-8" />
                    </div>
                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-lg font-semibold text-foreground">
                          {doc.title}
                        </h3>
                        <ExternalLink className="h-5 w-5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                      </div>
                      {doc.description && (
                        <p className="text-sm text-muted-foreground">
                          {doc.description}
                        </p>
                      )}
                      <Badge variant="secondary" className="mt-2">
                        {doc.kind === "document" ? "PDF документ" : "Переглянути список"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </a>
          );
        })}
      </div>

      {/* Practice Types */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-primary" />
          <h2 className="text-lg font-semibold text-foreground">
            Види практичної підготовки
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {practiceTypes.map((type, index) => (
            <Card
              key={type.title}
              className={cn(
                "group overflow-hidden transition-all duration-300 hover:shadow-md",
                "animate-in fade-in slide-in-from-bottom-4"
              )}
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: "backwards",
              }}
            >
              <div className="h-1 bg-gradient-to-r from-orange-500 to-amber-500" />
              <CardContent className="p-5">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-orange-600" />
                    <h3 className="font-semibold text-foreground">
                      {type.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {type.description}
                  </p>
                  <Badge variant="outline" className="gap-1">
                    <GraduationCap className="h-3 w-3" />
                    {type.course}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Aviation Partners */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-blue-500" />
          <h2 className="text-lg font-semibold text-foreground">
            Авіаційні підприємства-партнери
          </h2>
          <Badge variant="secondary" className="ml-2">
            {aviationBases.length}
          </Badge>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {aviationBases.map((base, index) => (
            <BaseCard key={index} base={base} index={index} aviation />
          ))}
        </div>
      </div>

      {/* Other Partners */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-muted-foreground" />
          <h2 className="text-lg font-semibold text-foreground">
            Інші підприємства-партнери
          </h2>
          <Badge variant="secondary" className="ml-2">
            {otherBases.length}
          </Badge>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {otherBases.map((base, index) => (
            <BaseCard key={index} base={base} index={index} aviation={false} />
          ))}
        </div>
      </div>

      {/* Info Banner */}
      <Card className="border-orange-200 bg-orange-50/50 dark:border-orange-800/50 dark:bg-orange-950/20">
        <CardContent className="flex items-start gap-4 p-5">
          <div className="shrink-0 rounded-full bg-orange-100 p-2 dark:bg-orange-900/50">
            <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
          </div>
          <div className="space-y-1">
            <p className="font-medium text-foreground">
              Організація практичного навчання
            </p>
            <p className="text-sm text-muted-foreground">
              Для всіх договорів та угод передбачена автоматична пролонгація,
              якщо жодна із сторін не вимагає її перегляду або розірвання. За
              питаннями організації практики звертайтеся до
              навчально-виробничого відділу коледжу.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
