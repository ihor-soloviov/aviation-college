/**
 * Source of truth for Document category taxonomy.
 *
 * Used by:
 *   - `src/collections/Documents.ts` — drives the `category` select options
 *   - `src/scripts/migration/normalize-categories.ts` — auto-tagging from legacy hub titles
 *
 * Ordering matters for auto-tagging: first matching pattern wins.
 * More specific rules go above broader ones; `inshe` catch-all goes last.
 * `bez_katehorii` is assigned manually by the migrator (no patterns).
 */
export interface DocumentCategory {
    value: string
    label: string
    patterns?: RegExp[]
}

export const DOCUMENT_CATEGORIES: DocumentCategory[] = [
    {
        value: 'zastrile',
        label: 'Застаріле',
        patterns: [/\[\s*застарі/i, /\(\s*застарі/i, /застарі[лв]/i],
    },
    {
        value: 'akadem_dobr',
        label: 'Академічна доброчесність',
        patterns: [/академічн[аеі]\s+доброчесніст/i, /доброчесніст/i, /плагіат/i],
    },
    {
        value: 'pryim',
        label: 'Приймальна комісія та вступ',
        patterns: [/приймальн[аеоі]?.*комісі/i, /зарахуванн/i, /вступ/i, /абітурієнт/i],
    },
    {
        value: 'konferentsii',
        label: 'Конференції та наукова робота',
        patterns: [/конференці/i, /науков/i, /краусс/i, /(?:^|\s|«)секці[яії]/i],
    },
    {
        value: 'opytuvannya',
        label: 'Опитування та моніторинг',
        patterns: [/опитуван/i, /анкетуван/i, /моніторинг/i],
    },
    {
        value: 'npb',
        label: 'Нормативно-правова база та служби',
        patterns: [/нормативно-правов/i, /охорон.*прац/i, /(?:^|\s)служб/i],
    },
    {
        value: 'sertyfikaty',
        label: 'Сертифікати',
        patterns: [/сертифікат/i, /акредитац/i],
    },
    {
        value: 'kadry',
        label: 'Кадровий склад та викладачі',
        patterns: [/кадров/i, /склад\s+педагогічн/i, /список.*викладач/i, /співробітник/i],
    },
    {
        value: 'nakazy',
        label: 'Накази',
        patterns: [/наказ/i],
    },
    {
        value: 'rozklad',
        label: 'Розклади',
        patterns: [/розклад/i, /графік\s+(?:занять|сесі|екзамен|іспит|освітн)/i],
    },
    {
        value: 'sylabusy',
        label: 'Силабуси',
        patterns: [/силабус/i],
    },
    {
        value: 'prohramy',
        label: 'Програми',
        patterns: [/(?:робоч[аеі]\s+)?програм/i],
    },
    {
        value: 'normatyvni',
        label: 'Нормативні дисципліни',
        patterns: [
            /нормативн[іыа]?\s.*дисциплін/i,
            /обов[`'’]язкові?\s.*(дисциплін|компонент)/i,
            /нормативні\s.*компонент/i,
        ],
    },
    {
        value: 'vybirkovi',
        label: 'Вибіркові дисципліни',
        patterns: [/вибіркові?\s.*(дисциплін|компонент|освітніх)/i],
    },
    {
        value: 'seminary',
        label: 'Семінари, вебінари, тренінги',
        patterns: [/семінар/i, /вебінар/i, /тренінг/i],
    },
    {
        value: 'kursy',
        label: 'Курси підвищення кваліфікації',
        patterns: [/курси?\s+підвищ/i, /підвищ.*кваліфікаці/i],
    },
    {
        value: 'atestatsiya',
        label: 'Атестація',
        patterns: [/атестаці/i],
    },
    {
        value: 'dyplomuvannya',
        label: 'Дипломування',
        patterns: [/дипломуван/i, /дипломн/i, /кваліфікаційн/i],
    },
    {
        value: 'zakhody',
        label: 'Заходи / Здобутки',
        patterns: [
            /заходи/i,
            /здобутк/i,
            /досягненн/i,
            /новин.*діяльн/i,
            /тиждень.*(?:ЦК|комісі)/i,
            /підсумк.*тижн/i,
            /галерея/i,
        ],
    },
    {
        value: 'zvitnist',
        label: 'Звітність',
        patterns: [/звіт(ніст|у|и|ів)?/i],
    },
    {
        value: 'spivpratsa',
        label: 'Співпраця та партнери',
        patterns: [/співпрац/i, /співробітн/i, /партнер/i],
    },
    {
        value: 'polozhennya',
        label: 'Положення',
        patterns: [/положен/i, /статут/i],
    },
    {
        value: 'pedahohichna',
        label: 'Педагогічна та методична діяльність',
        patterns: [/педагогічн/i, /методичн/i, /матеріальн[аеі]?\s+баз/i, /скарбниц/i],
    },
    {
        value: 'praktyka',
        label: 'Практика',
        patterns: [/практик/i],
    },
    {
        value: 'navch_plany',
        label: 'Навчальні плани',
        patterns: [/навчальн[іыа]\s+план/i, /опп/i, /^плани\s*$/i, /каталог.*дисциплін/i],
    },
    {
        value: 'spetsialnosti',
        label: 'Спеціальності та освітні програми',
        patterns: [/спеціальніст/i, /освітн[ьоія].*програм/i, /стейкхолдер/i, /витяги.*протокол/i],
    },
    {
        value: 'pidrozdily',
        label: 'Підрозділи (циклові комісії, кафедри)',
        patterns: [/циклов.*комісі/i, /кафедр/i, /відділенн/i, /(?:^|\s)ЦК\s/],
    },
    {
        value: 'mat_baza',
        label: 'Матеріально-технічна база',
        patterns: [/матеріальн.*тех/i, /матеріально-?техн/i, /лабор[аоі]тор/i, /матеріальн.*баз/i, /корпус/i],
    },
    {
        value: 'student_zhyttya',
        label: 'Студентське життя та самоврядування',
        patterns: [
            /студентськ.*самовряд/i,
            /самоврядуванн/i,
            /виховн.*(відділ|робот)/i,
            /проблемн.*груп/i,
            /рейтинг.*здобувач/i,
            /здобувач.*освіт/i,
        ],
    },
    {
        value: 'dystsypliny',
        label: 'Окремі дисципліни / література',
        patterns: [
            /література$/i,
            /предмет/i,
            /\bмова\b/i,
            /(?:україн|англ|нім|франц|іспан|польськ|іноземн)[а-яії']*\s+мова/i,
            /мова\s+\(/i,
        ],
    },
    {
        value: 'arkhiv',
        label: 'Архів',
        patterns: [/архів/i],
    },
    {
        value: 'inshe',
        label: 'Інше',
        patterns: [/.*/],
    },
    {
        value: 'bez_katehorii',
        label: 'Без категорії',
    },
]

export function getDocumentCategoryOptions(): Array<{ label: string; value: string }> {
    return DOCUMENT_CATEGORIES.map((c) => ({ label: c.label, value: c.value }))
}

export function resolveDocumentCategory(title: string): DocumentCategory {
    for (const cat of DOCUMENT_CATEGORIES) {
        if (cat.patterns && cat.patterns.some((re) => re.test(title))) return cat
    }
    return DOCUMENT_CATEGORIES.find((c) => c.value === 'inshe')!
}
