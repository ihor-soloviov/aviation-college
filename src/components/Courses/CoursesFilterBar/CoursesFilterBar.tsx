"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState, useEffect, useTransition, useRef } from "react";
import {
  Sun,
  Moon,
  ListFilter,
  GraduationCap,
  Award,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CATEGORY_LABELS } from "@/lib/courseMeta";

type Option = {
  value: string;
  label: string;
  short?: string;
  icon?: React.ElementType;
};

const FORM_OPTIONS: Option[] = [
  { value: "", label: "Всі форми", short: "Всі", icon: ListFilter },
  { value: "fulltime", label: "Денна форма", short: "Денна", icon: Sun },
  { value: "parttime", label: "Заочна форма", short: "Заочна", icon: Moon },
];

const LEVEL_OPTIONS: Option[] = [
  { value: "", label: "Всі рівні", short: "Всі", icon: ListFilter },
  {
    value: "fmb",
    label: "Фаховий молодший бакалавр",
    short: "ФМБ",
    icon: GraduationCap,
  },
  { value: "bachelor", label: "Бакалавр", short: "Бакалавр", icon: Award },
];

const CATEGORY_OPTIONS: Option[] = [
  { value: "", label: "Всі напрямки", short: "Всі" },
  ...Object.entries(CATEGORY_LABELS).map(([value, label]) => ({
    value,
    label,
    short: label,
  })),
];

export function CoursesFilterBar({ totalCount }: { totalCount: number }) {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  const urlQ = sp.get("q") ?? "";
  const [searchInput, setSearchInput] = useState(urlQ);
  const lastUrlQ = useRef(urlQ);

  useEffect(() => {
    if (urlQ !== lastUrlQ.current) {
      lastUrlQ.current = urlQ;
      setSearchInput(urlQ);
    }
  }, [urlQ]);

  useEffect(() => {
    if (searchInput === lastUrlQ.current) return;
    const handle = setTimeout(() => {
      lastUrlQ.current = searchInput;
      writeParam("q", searchInput || null);
    }, 250);
    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  function writeParam(key: string, value: string | null) {
    const params = new URLSearchParams(sp.toString());
    if (!value) params.delete(key);
    else params.set(key, value);
    const qs = params.toString();
    startTransition(() => {
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    });
  }

  function reset() {
    setSearchInput("");
    lastUrlQ.current = "";
    startTransition(() => {
      router.replace(pathname, { scroll: false });
    });
  }

  const currentForm = sp.get("form") ?? "";
  const currentLevel = sp.get("level") ?? "";
  const currentCat = sp.get("cat") ?? "";
  const hasAny =
    !!currentForm || !!currentLevel || !!currentCat || !!searchInput;

  // Reveal-on-scroll-up (мобілка), три стани:
  //  • flow   — бар у потоці (relative); при скролі вниз з верху природно
  //             йде вгору разом зі сторінкою (лишається на своєму місці);
  //  • shown  — закріплений згори (fixed) і плавно виїжджає (slide-in);
  //  • hidden — закріплений, але плавно заїжджає вгору (slide-out) — це коли
  //             ми вже бачили бар і починаємо гортати вниз.
  // Placeholder тримає висоту, щоб контент не стрибав. Десктоп — звичайний
  // sticky, завжди видимий.
  const barRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"flow" | "shown" | "hidden">("flow");
  const [barH, setBarH] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (barRef.current) setBarH(barRef.current.offsetHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    let lastY = window.scrollY;
    let ticking = false;
    const update = () => {
      ticking = false;
      if (!mq.matches) {
        setMode("flow"); // десктоп — звичайний sticky, без pin-логіки
        return;
      }
      const y = window.scrollY;
      const delta = y - lastY;
      if (Math.abs(delta) < 3) return; // ігноруємо дрібний джитер
      lastY = y;
      const goingUp = delta < 0;
      // Верх місця бару у в'юпорті (placeholder завжди в потоці на тому місці).
      const slotTop = placeholderRef.current
        ? placeholderRef.current.getBoundingClientRect().top
        : Infinity;
      setMode((prev) => {
        if (slotTop >= 64) return "flow"; // на/над своїм місцем — у потоці
        if (goingUp) return "shown"; // гортаємо вгору — виїжджає
        // гортаємо вниз: якщо бар уже був видимий — плавно ховаємо вгору,
        // якщо ще в потоці — лишаємо його йти вгору разом зі сторінкою.
        return prev === "flow" ? "flow" : "hidden";
      });
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    const onResize = () => {
      if (!mq.matches) setMode("flow");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const posClass =
    mode === "shown"
      ? "fixed inset-x-0 top-16 animate-in slide-in-from-top duration-300"
      : mode === "hidden"
        ? "fixed inset-x-0 top-16 animate-out slide-out-to-top fill-mode-forwards duration-300"
        : "relative max-md:mx-[calc(50%_-_50vw)]";

  return (
    <>
      <div
        ref={placeholderRef}
        aria-hidden
        style={{ height: mode === "flow" ? 0 : barH }}
      />
      <div
        ref={barRef}
        className={`z-20 border-b py-3 backdrop-blur bg-background shadow-md md:bg-transparent md:shadow-none md:supports-[backdrop-filter]:bg-background/7 md:sticky md:top-16 md:inset-x-auto md:animate-none ${posClass}`}
      >
        <div className="container mx-auto space-y-3 max-md:px-4">
        <ChipGroup
          ariaLabel="Форма навчання"
          options={FORM_OPTIONS}
          current={currentForm}
          onSelect={(v) => writeParam("form", v || null)}
        />

        <ChipGroup
          ariaLabel="Рівень освіти"
          options={LEVEL_OPTIONS}
          current={currentLevel}
          onSelect={(v) => writeParam("level", v || null)}
        />

        <ChipGroup
          ariaLabel="Напрямок"
          options={CATEGORY_OPTIONS}
          current={currentCat}
          onSelect={(v) => writeParam("cat", v || null)}
        />

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Знайдено:{" "}
            <span className="font-semibold text-foreground">{totalCount}</span>
          </span>
          {hasAny && (
            <Button variant="ghost" size="sm" onClick={reset} className="h-7">
              <X className="h-3 w-3 mr-1" />
              Скинути
            </Button>
          )}
        </div>
        </div>
      </div>
    </>
  );
}

function ChipGroup({
  options,
  current,
  onSelect,
  ariaLabel,
}: {
  options: Option[];
  current: string;
  onSelect: (value: string) => void;
  ariaLabel: string;
}) {
  return (
    <div role="group" aria-label={ariaLabel} className="flex flex-wrap gap-1.5">
      {options.map((opt) => {
        const isActive = opt.value === current;
        const Icon = opt.icon;
        return (
          <button
            key={opt.value || "all"}
            type="button"
            onClick={() => onSelect(opt.value)}
            aria-pressed={isActive}
            className={`
              inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs sm:text-sm transition-colors
              ${
                isActive
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-border hover:border-blue-400 hover:text-blue-600"
              }
            `}
          >
            {Icon && <Icon className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">{opt.label}</span>
            <span className="sm:hidden">{opt.short ?? opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
