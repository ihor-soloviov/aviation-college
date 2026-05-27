// Резолв color-value (з COLOR_OPTIONS) у ЛІТЕРАЛЬНІ Tailwind-класи.
// Класи мусять бути повними рядками — динамічні `bg-${c}-600` Tailwind вирізає при purge.
// Використовується рендерером блоків (Hero gradient, CardGrid icon-badge тощо).

export type ColorClasses = {
    iconBg: string // фон контейнера іконки
    iconText: string // колір іконки
    gradient: string // from-...-to-... для hero/банерів
    border: string // hover-бордер картки
}

const MAP: Record<string, ColorClasses> = {
    blue: { iconBg: 'bg-blue-100 dark:bg-blue-900/30', iconText: 'text-blue-600 dark:text-blue-400', gradient: 'from-blue-600 to-blue-800', border: 'hover:border-blue-500/50' },
    indigo: { iconBg: 'bg-indigo-100 dark:bg-indigo-900/30', iconText: 'text-indigo-600 dark:text-indigo-400', gradient: 'from-indigo-600 to-indigo-800', border: 'hover:border-indigo-500/50' },
    purple: { iconBg: 'bg-purple-100 dark:bg-purple-900/30', iconText: 'text-purple-600 dark:text-purple-400', gradient: 'from-purple-600 to-purple-800', border: 'hover:border-purple-500/50' },
    pink: { iconBg: 'bg-pink-100 dark:bg-pink-900/30', iconText: 'text-pink-600 dark:text-pink-400', gradient: 'from-pink-600 to-pink-800', border: 'hover:border-pink-500/50' },
    red: { iconBg: 'bg-red-100 dark:bg-red-900/30', iconText: 'text-red-600 dark:text-red-400', gradient: 'from-red-600 to-red-800', border: 'hover:border-red-500/50' },
    orange: { iconBg: 'bg-orange-100 dark:bg-orange-900/30', iconText: 'text-orange-600 dark:text-orange-400', gradient: 'from-orange-600 to-orange-800', border: 'hover:border-orange-500/50' },
    amber: { iconBg: 'bg-amber-100 dark:bg-amber-900/30', iconText: 'text-amber-600 dark:text-amber-400', gradient: 'from-amber-500 to-amber-700', border: 'hover:border-amber-500/50' },
    green: { iconBg: 'bg-green-100 dark:bg-green-900/30', iconText: 'text-green-600 dark:text-green-400', gradient: 'from-green-600 to-green-800', border: 'hover:border-green-500/50' },
    emerald: { iconBg: 'bg-emerald-100 dark:bg-emerald-900/30', iconText: 'text-emerald-600 dark:text-emerald-400', gradient: 'from-emerald-600 to-emerald-800', border: 'hover:border-emerald-500/50' },
    teal: { iconBg: 'bg-teal-100 dark:bg-teal-900/30', iconText: 'text-teal-600 dark:text-teal-400', gradient: 'from-teal-600 to-teal-800', border: 'hover:border-teal-500/50' },
    sky: { iconBg: 'bg-sky-100 dark:bg-sky-900/30', iconText: 'text-sky-600 dark:text-sky-400', gradient: 'from-sky-600 to-sky-800', border: 'hover:border-sky-500/50' },
    cyan: { iconBg: 'bg-cyan-100 dark:bg-cyan-900/30', iconText: 'text-cyan-600 dark:text-cyan-400', gradient: 'from-cyan-600 to-cyan-800', border: 'hover:border-cyan-500/50' },
    violet: { iconBg: 'bg-violet-100 dark:bg-violet-900/30', iconText: 'text-violet-600 dark:text-violet-400', gradient: 'from-violet-600 to-violet-800', border: 'hover:border-violet-500/50' },
    rose: { iconBg: 'bg-rose-100 dark:bg-rose-900/30', iconText: 'text-rose-600 dark:text-rose-400', gradient: 'from-rose-600 to-rose-800', border: 'hover:border-rose-500/50' },
    slate: { iconBg: 'bg-slate-100 dark:bg-slate-800/50', iconText: 'text-slate-600 dark:text-slate-300', gradient: 'from-slate-700 to-slate-900', border: 'hover:border-slate-500/50' },
}

export function getColorClasses(color?: string | null): ColorClasses {
    return (color && MAP[color]) || MAP.blue
}
