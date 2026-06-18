import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Атрибути для <a>: повертає href/target/rel лише за наявності посилання.
 * Якщо href порожній — повертає {}, тож <a> рендериться як некліковий
 * елемент (без мертвого href="#" і без pointer-курсора). Зовнішні URL
 * (http...) відкриваються в новій вкладці.
 */
export function linkAttrs(href?: string | null) {
  if (!href) return {}
  const isExternal = href.startsWith("http")
  return {
    href,
    target: isExternal ? "_blank" : undefined,
    rel: isExternal ? "noopener noreferrer" : undefined,
  }
}

export const address_href= "https://maps.app.goo.gl/UzDMeywUZNE1dkKv5"