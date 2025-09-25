"use client";

import { Plane } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

const socials = [
  {
    name: "instagram",
    href: "https://www.instagram.com/kk_nau/",
    iconPath: {
      light: "/instagram-light.png",
      dark: "/instagram-dark.png",
    },
  },
  {
    name: "facebook",
    href: "https://www.facebook.com/kknauofficial/?rf=1794013074244809",
    iconPath: {
      light: "/facebook-light.png",
      dark: "/facebook-dark.png",
    },
  },
  {
    name: "youtube",
    href: "https://www.youtube.com/channel/UCLWVYkhjvjMsyAwofwPY_zQ",
    iconPath: {
      light: "/youtube-light.png",
      dark: "/youtube-dark.png",
    },
  },
  {
    name: "telegram",
    href: "https://t.me/kk_nau",
    iconPath: {
      light: "/telegram-light.png",
      dark: "/telegram-dark.png",
    },
  },
];

export const Socials = () => {
  const { theme } = useTheme();

  return (
    <div>
      <div className="flex items-center gap-2">
        <Plane className="h-6 w-6 text-blue-600" />
        <span className="text-xl font-bold">Авіаційний коледж</span>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        Надаємо освіту в галузі авіації з 1951 року.
      </p>
      <div className="mt-4 flex gap-4">
        {socials.map((social) => (
          <Link
            key={social.name}
            href={social.href}
            className="text-muted-foreground hover:text-blue-600"
          >
            <span className="sr-only">{social.name}</span>
            {theme === "dark" ? (
              <Image
                src={social.iconPath.dark}
                alt={social.name}
                width={24}
                height={24}
              />
            ) : (
              <Image
                src={social.iconPath.light}
                alt={social.name}
                width={24}
                height={24}
              />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};
