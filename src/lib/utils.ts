import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const address_href= "https://maps.app.goo.gl/UzDMeywUZNE1dkKv5"
