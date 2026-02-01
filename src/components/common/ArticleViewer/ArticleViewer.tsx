"use client";

import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  FileText,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export interface Article {
  id: string;
  title: string;
  content: string | React.ReactNode;
  icon?: LucideIcon;
  color?: string;
}

export interface ArticleWithLink {
  id: string;
  title: string;
  description?: string;
  icon: LucideIcon;
  color: string;
  url?: string;
  type: "pdf" | "external" | "local";
  content?: string | React.ReactNode;
}

interface ArticleViewerProps {
  articles: Article[];
  title?: string;
  defaultOpenId?: string;
  allowMultipleOpen?: boolean;
}

const getColorClasses = (color: string) => {
  const colors: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
    blue: { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-600 dark:text-blue-400", border: "border-blue-500/50", gradient: "from-blue-500 to-blue-600" },
    purple: { bg: "bg-purple-100 dark:bg-purple-900/30", text: "text-purple-600 dark:text-purple-400", border: "border-purple-500/50", gradient: "from-purple-500 to-purple-600" },
    green: { bg: "bg-green-100 dark:bg-green-900/30", text: "text-green-600 dark:text-green-400", border: "border-green-500/50", gradient: "from-green-500 to-green-600" },
    rose: { bg: "bg-rose-100 dark:bg-rose-900/30", text: "text-rose-600 dark:text-rose-400", border: "border-rose-500/50", gradient: "from-rose-500 to-rose-600" },
    amber: { bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-600 dark:text-amber-400", border: "border-amber-500/50", gradient: "from-amber-500 to-amber-600" },
    cyan: { bg: "bg-cyan-100 dark:bg-cyan-900/30", text: "text-cyan-600 dark:text-cyan-400", border: "border-cyan-500/50", gradient: "from-cyan-500 to-cyan-600" },
    red: { bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-600 dark:text-red-400", border: "border-red-500/50", gradient: "from-red-500 to-red-600" },
    indigo: { bg: "bg-indigo-100 dark:bg-indigo-900/30", text: "text-indigo-600 dark:text-indigo-400", border: "border-indigo-500/50", gradient: "from-indigo-500 to-indigo-600" },
    violet: { bg: "bg-violet-100 dark:bg-violet-900/30", text: "text-violet-600 dark:text-violet-400", border: "border-violet-500/50", gradient: "from-violet-500 to-violet-600" },
    emerald: { bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-500/50", gradient: "from-emerald-500 to-emerald-600" },
    pink: { bg: "bg-pink-100 dark:bg-pink-900/30", text: "text-pink-600 dark:text-pink-400", border: "border-pink-500/50", gradient: "from-pink-500 to-pink-600" },
    orange: { bg: "bg-orange-100 dark:bg-orange-900/30", text: "text-orange-600 dark:text-orange-400", border: "border-orange-500/50", gradient: "from-orange-500 to-orange-600" },
    teal: { bg: "bg-teal-100 dark:bg-teal-900/30", text: "text-teal-600 dark:text-teal-400", border: "border-teal-500/50", gradient: "from-teal-500 to-teal-600" },
    sky: { bg: "bg-sky-100 dark:bg-sky-900/30", text: "text-sky-600 dark:text-sky-400", border: "border-sky-500/50", gradient: "from-sky-500 to-sky-600" },
  };
  return colors[color] || colors.blue;
};

export function ArticleViewer({
  articles,
  title,
  defaultOpenId,
  allowMultipleOpen = false,
}: ArticleViewerProps) {
  const [openArticles, setOpenArticles] = useState<Set<string>>(
    defaultOpenId ? new Set([defaultOpenId]) : new Set()
  );

  const toggleArticle = useCallback(
    (id: string) => {
      setOpenArticles((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(id)) {
          newSet.delete(id);
        } else {
          if (!allowMultipleOpen) {
            newSet.clear();
          }
          newSet.add(id);
        }
        return newSet;
      });
    },
    [allowMultipleOpen]
  );

  const expandAll = useCallback(() => {
    setOpenArticles(new Set(articles.map((a) => a.id)));
  }, [articles]);

  const collapseAll = useCallback(() => {
    setOpenArticles(new Set());
  }, []);

  return (
    <div className="space-y-4">
      {title && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-primary" />
            <h2 className="text-lg font-semibold text-foreground">{title}</h2>
            <Badge variant="secondary" className="ml-2">
              {articles.length}
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={expandAll}
              className="text-xs"
            >
              Розгорнути все
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={collapseAll}
              className="text-xs"
            >
              Згорнути все
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {articles.map((article, index) => {
          const isOpen = openArticles.has(article.id);
          const colors = getColorClasses(article.color || "blue");
          const IconComponent = article.icon || FileText;

          return (
            <Card
              key={article.id}
              className={cn(
                "overflow-hidden transition-all duration-300",
                isOpen && "ring-1 ring-primary/20",
                "animate-in fade-in slide-in-from-bottom-4"
              )}
              style={{
                animationDelay: `${index * 50}ms`,
                animationFillMode: "backwards",
              }}
            >
              <button
                onClick={() => toggleArticle(article.id)}
                className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "shrink-0 rounded-lg p-2 transition-transform duration-300",
                      colors.bg,
                      colors.text,
                      isOpen && "scale-110"
                    )}
                  >
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <h3 className="font-medium text-foreground">{article.title}</h3>
                </div>
                <div
                  className={cn(
                    "shrink-0 rounded-full p-1 transition-transform duration-300",
                    isOpen && "rotate-180"
                  )}
                >
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                </div>
              </button>

              <div
                className={cn(
                  "grid transition-all duration-300 ease-in-out",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                )}
              >
                <div className="overflow-hidden">
                  <div className="border-t px-4 py-5">
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      {typeof article.content === "string" ? (
                        <div
                          dangerouslySetInnerHTML={{ __html: article.content }}
                        />
                      ) : (
                        article.content
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

interface ArticleLinksGridProps {
  items: ArticleWithLink[];
  title?: string;
  columns?: 2 | 3 | 4;
  showDescription?: boolean;
}

export function ArticleLinksGrid({
  items,
  title,
  columns = 3,
  showDescription = true,
}: ArticleLinksGridProps) {
  const openInNewTab = useCallback((url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  const gridCols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  return (
    <div className="space-y-4">
      {title && (
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-primary" />
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          <Badge variant="secondary" className="ml-2">
            {items.length}
          </Badge>
          {items.some((i) => i.type === "pdf") && (
            <Badge variant="outline" className="ml-1 text-xs">
              PDF
            </Badge>
          )}
        </div>
      )}

      <div className={cn("grid gap-4", gridCols[columns])}>
        {items.map((item, index) => {
          const colors = getColorClasses(item.color);
          const isPdf = item.type === "pdf";

          return (
            <button
              key={item.id}
              onClick={() => item.url && openInNewTab(item.url)}
              className={cn(
                "group text-left",
                "animate-in fade-in slide-in-from-bottom-4"
              )}
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: "backwards",
              }}
            >
              <Card
                className={cn(
                  "h-full overflow-hidden transition-all duration-300",
                  "hover:shadow-lg",
                  `hover:${colors.border}`
                )}
              >
                <div className={cn("h-1.5 bg-gradient-to-r", colors.gradient)} />
                <CardContent className="p-5">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div
                        className={cn(
                          "shrink-0 rounded-xl p-3 transition-transform duration-300 group-hover:scale-110",
                          colors.bg,
                          colors.text
                        )}
                      >
                        <item.icon className="h-6 w-6" />
                      </div>
                      {isPdf ? (
                        <Download className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                      ) : (
                        <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                      )}
                    </div>
                    <div className="space-y-2">
                      <h3 className="line-clamp-2 font-semibold text-foreground">
                        {item.title}
                      </h3>
                      {showDescription && item.description && (
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      )}
                    </div>
                    <Badge variant="secondary" className="gap-1">
                      {isPdf ? (
                        <>
                          <FileText className="h-3 w-3" />
                          PDF документ
                        </>
                      ) : (
                        <>
                          <ExternalLink className="h-3 w-3" />
                          Переглянути
                        </>
                      )}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface ArticleCompactListProps {
  items: ArticleWithLink[];
  title?: string;
}

export function ArticleCompactList({ items, title }: ArticleCompactListProps) {
  const openInNewTab = useCallback((url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  return (
    <div className="space-y-4">
      {title && (
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-primary" />
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          <Badge variant="secondary" className="ml-2">
            {items.length}
          </Badge>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => {
          const colors = getColorClasses(item.color);
          const isPdf = item.type === "pdf";

          return (
            <button
              key={item.id}
              onClick={() => item.url && openInNewTab(item.url)}
              className="group w-full text-left"
            >
              <Card
                className={cn(
                  "overflow-hidden border-l-4 transition-all duration-300 hover:shadow-md",
                  colors.border,
                  "animate-in fade-in slide-in-from-bottom-4"
                )}
                style={{
                  animationDelay: `${index * 80}ms`,
                  animationFillMode: "backwards",
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "shrink-0 rounded-lg p-2 transition-transform duration-300 group-hover:scale-110",
                        colors.bg,
                        colors.text
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-medium text-foreground line-clamp-2">
                          {item.title}
                        </h3>
                        {isPdf ? (
                          <Download className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                        ) : (
                          <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </button>
          );
        })}
      </div>
    </div>
  );
}
