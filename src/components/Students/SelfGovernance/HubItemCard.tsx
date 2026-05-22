"use client";

import { useState } from "react";
import {
    ChevronDown,
    ExternalLink,
    FileText,
    type LucideIcon,
    Users,
} from "lucide-react";
import * as LucideIcons from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LinkListItem } from "@/lib/link-lists";

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

function getLucideIcon(name?: string, fallback: LucideIcon = Users): LucideIcon {
    if (!name) return fallback;
    const Icon = (LucideIcons as unknown as Record<string, LucideIcon>)[name];
    return Icon ?? fallback;
}

function ChildRow({ item }: { item: LinkListItem }) {
    const Icon = getLucideIcon(item.icon, FileText);
    const isExternal = item.href?.startsWith("http");
    const className =
        "group/row flex items-center gap-3 rounded-md border border-transparent px-3 py-2 text-left transition-all duration-200 hover:border-border hover:bg-muted/60";

    const inner = (
        <>
            <div className="shrink-0 rounded-md bg-muted p-2 text-muted-foreground transition-colors group-hover/row:bg-background">
                <Icon className="h-4 w-4" />
            </div>
            <p className="flex-1 min-w-0 text-sm font-medium text-foreground truncate">
                {item.title}
            </p>
            <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover/row:opacity-100" />
        </>
    );

    if (!item.href) {
        return <div className={className}>{inner}</div>;
    }
    return (
        <a
            href={item.href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className={className}
        >
            {inner}
        </a>
    );
}

type Props = {
    item: LinkListItem;
    index: number;
};

export function HubItemCard({ item, index }: Props) {
    const preset = getColorPreset(item.color);
    const Icon = getLucideIcon(item.icon);
    const isGroup = item.kind === "group" && (item.children?.length ?? 0) > 0;
    const isExternal = item.href?.startsWith("http");
    const [open, setOpen] = useState(false);

    const style = {
        animationDelay: `${index * 100}ms`,
        animationFillMode: "backwards" as const,
    };
    const cardClassName = cn(
        "h-full overflow-hidden transition-all duration-300",
        "hover:shadow-lg",
        preset.border,
    );

    const cardHeader = (
        <>
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
                        {isGroup ? (
                            <ChevronDown
                                className={cn(
                                    "h-5 w-5 text-muted-foreground transition-transform duration-300",
                                    open && "rotate-180",
                                )}
                            />
                        ) : (
                            <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                        )}
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
                        {isGroup ? (
                            <>
                                <ChevronDown className="h-3 w-3" />
                                {item.children!.length} документ{
                                    pluralSuffix(item.children!.length)
                                }
                            </>
                        ) : (
                            <>
                                <ExternalLink className="h-3 w-3" />
                                Відкрити
                            </>
                        )}
                    </Badge>
                </div>
            </CardContent>
        </>
    );

    if (isGroup) {
        return (
            <div
                className="group animate-in fade-in slide-in-from-bottom-4"
                style={style}
            >
                <Card className={cn(cardClassName, "cursor-pointer")}>
                    <button
                        type="button"
                        onClick={() => setOpen((v) => !v)}
                        className="w-full text-left"
                        aria-expanded={open}
                    >
                        {cardHeader}
                    </button>
                    {open && (
                        <div className="border-t border-border bg-muted/30 p-3 animate-in fade-in slide-in-from-top-2">
                            <div className="flex flex-col gap-1">
                                {item.children!.map((child, i) => (
                                    <ChildRow key={i} item={child} />
                                ))}
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        );
    }

    const blockClass = "group block text-left animate-in fade-in slide-in-from-bottom-4";

    if (!item.href) {
        return (
            <div className={blockClass} style={style}>
                <Card className={cardClassName}>{cardHeader}</Card>
            </div>
        );
    }

    return (
        <a
            href={item.href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className={blockClass}
            style={style}
        >
            <Card className={cardClassName}>{cardHeader}</Card>
        </a>
    );
}

function pluralSuffix(n: number): string {
    const lastTwo = n % 100;
    if (lastTwo >= 11 && lastTwo <= 14) return "ів";
    const last = n % 10;
    if (last === 1) return "";
    if (last >= 2 && last <= 4) return "и";
    return "ів";
}
