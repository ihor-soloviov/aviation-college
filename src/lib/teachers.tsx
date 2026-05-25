import type { ReactNode } from "react";
import * as LucideIcons from "lucide-react";
import { GraduationCap, type LucideIcon } from "lucide-react";
import {
  NavigationCategory,
  NavigationLink,
} from "@/components/common/ExpandableNavigation";
import { getLinkListBySlug } from "@/lib/link-lists";

function renderIcon(name?: string): ReactNode {
  const Icon =
    (name && (LucideIcons as unknown as Record<string, LucideIcon>)[name]) ||
    GraduationCap;
  return <Icon className="h-5 w-5" />;
}

/**
 * Категорії розділу «Викладачам» з CMS (linkList slug "teachers-nav").
 * Кожна top-level група = категорія; її children = посилання.
 * Документи резолвляться у /documents/<id>; зовнішні/внутрішні — за targetUrl.
 */
export async function getTeachersCategories(): Promise<NavigationCategory[]> {
  const list = await getLinkListBySlug("teachers-nav");
  if (!list) return [];

  return list.items.map((group) => {
    const links: NavigationLink[] = (group.children ?? []).map((child) => ({
      title: child.title,
      href: child.href ?? "#",
      description: child.description,
      isExternal: child.href?.startsWith("http") ?? false,
    }));
    return {
      title: group.title,
      description: group.description ?? "",
      icon: renderIcon(group.icon),
      links,
    };
  });
}
