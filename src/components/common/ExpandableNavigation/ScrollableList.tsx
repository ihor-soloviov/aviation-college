"use client";

import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { NavigationLink } from "./types";
import { NavLinkItem } from "./NavLinkItem";

type Props = {
  links: NavigationLink[];
};

export const ScrollableList = ({ links }: Props) => {
  const listRef = useRef<HTMLUListElement>(null);
  const [showFade, setShowFade] = useState(false);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const update = () => {
      const isScrollable = el.scrollHeight > el.clientHeight + 1;
      const isAtBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 2;
      setShowFade(isScrollable && !isAtBottom);
    };

    update();
    el.addEventListener("scroll", update);

    const ro = new ResizeObserver(update);
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="relative">
      <ul
        ref={listRef}
        className="space-y-2 pl-0.5 max-h-52 overflow-y-auto overscroll-contain"
      >
        {links.map((link) => (
          <li key={link.href + link.title} className="min-w-0">
            <NavLinkItem link={link} />
          </li>
        ))}
      </ul>

      <div
        className={cn(
          "pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-card to-transparent transition-opacity duration-200",
          showFade ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
};
