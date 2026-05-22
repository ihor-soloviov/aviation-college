import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  Scale,
  Users,
  type LucideIcon,
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";
import { getLinkListBySlug, type LinkListItem } from "@/lib/link-lists";

const COLOR_PRESETS: Record<
  string,
  { bg: string; text: string; border: string; gradient: string }
> = {
  blue: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-600 dark:text-blue-400",
    border: "hover:border-blue-500/50",
    gradient: "from-blue-500 to-blue-600",
  },
  purple: {
    bg: "bg-purple-100 dark:bg-purple-900/30",
    text: "text-purple-600 dark:text-purple-400",
    border: "hover:border-purple-500/50",
    gradient: "from-purple-500 to-purple-600",
  },
  green: {
    bg: "bg-green-100 dark:bg-green-900/30",
    text: "text-green-600 dark:text-green-400",
    border: "hover:border-green-500/50",
    gradient: "from-green-500 to-green-600",
  },
  orange: {
    bg: "bg-orange-100 dark:bg-orange-900/30",
    text: "text-orange-600 dark:text-orange-400",
    border: "hover:border-orange-500/50",
    gradient: "from-orange-500 to-amber-500",
  },
  pink: {
    bg: "bg-pink-100 dark:bg-pink-900/30",
    text: "text-pink-600 dark:text-pink-400",
    border: "hover:border-pink-500/50",
    gradient: "from-pink-500 to-rose-500",
  },
};

const DEFAULT_PRESET = COLOR_PRESETS.blue;

function getColorPreset(color?: string) {
  if (!color) return DEFAULT_PRESET;
  return COLOR_PRESETS[color] ?? DEFAULT_PRESET;
}

function getLucideIcon(name?: string): LucideIcon {
  if (!name) return Users;
  const Icon = (LucideIcons as unknown as Record<string, LucideIcon>)[name];
  return Icon ?? Users;
}

function ItemCard({ item, index }: { item: LinkListItem; index: number }) {
  const preset = getColorPreset(item.color);
  const Icon = getLucideIcon(item.icon);
  const isExternal = item.href?.startsWith("http");

  const inner = (
    <Card
      className={cn(
        "h-full overflow-hidden transition-all duration-300",
        "hover:shadow-lg",
        preset.border,
      )}
    >
      <div className={cn("h-1.5 bg-gradient-to-r", preset.gradient)} />
      <CardContent className="p-5">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div
              className={cn(
                "shrink-0 rounded-xl p-3 transition-transform duration-300 group-hover:scale-110",
                preset.bg,
                preset.text,
              )}
            >
              <Icon className="h-6 w-6" />
            </div>
            <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
          <div className="space-y-2">
            <h3 className="line-clamp-2 font-semibold text-foreground">
              {item.title}
            </h3>
            {item.description && (
              <p className="line-clamp-2 text-sm text-muted-foreground">
                {item.description}
              </p>
            )}
          </div>
          <Badge variant="secondary" className="gap-1">
            <ExternalLink className="h-3 w-3" />
            Відкрити
          </Badge>
        </div>
      </CardContent>
    </Card>
  );

  const className = cn(
    "group block text-left",
    "animate-in fade-in slide-in-from-bottom-4",
  );
  const style = {
    animationDelay: `${index * 100}ms`,
    animationFillMode: "backwards" as const,
  };

  if (!item.href) {
    return (
      <div className={className} style={style}>
        {inner}
      </div>
    );
  }

  return (
    <a
      href={item.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={className}
      style={style}
    >
      {inner}
    </a>
  );
}

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
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.items.map((item, index) => (
          <ItemCard key={index} item={item} index={index} />
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
