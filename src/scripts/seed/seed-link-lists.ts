/**
 * Seed linkLists collection from hard-coded native-component data.
 *
 * Idempotent: each definition has a unique `slug`; we upsert by slug.
 * For documents, legacyId is looked up against the existing `documents`
 * collection — if the document isn't found, the item is skipped with a
 * warning (so a partial seed never silently drops the slot).
 *
 * Run locally (or inside the prod next container):
 *   node_modules/.bin/tsx src/scripts/seed/seed-link-lists.ts
 *
 * Restrict via env:
 *   SEED_SLUGS=self-governance,anti-bullying  node_modules/.bin/tsx ...
 */

import { getPayload, type Payload } from 'payload'
import config from '../../../payload.config'

type SeedItem = {
    title: string
    description?: string
    icon?: string
    color?: string
    badge?: string
} & (
    | { kind: 'document'; legacyId: number }
    | { kind: 'article'; articleSlug: string }
    | { kind: 'external'; targetUrl: string }
    | { kind: 'group'; children: SeedItem[] }
    | { kind: 'info' }
)

type SeedList = {
    slug: string
    title: string
    description?: string
    items: SeedItem[]
}

const SEEDS: SeedList[] = [
    {
        slug: 'self-governance',
        title: 'Курсантське самоврядування',
        description:
            'Курсантське (студентське) самоврядування забезпечує захист прав та інтересів здобувачів освіти, сприяє їх участі в управлінні закладом.',
        items: [
            {
                title: 'Положення про курсантське (студентське) самоврядування',
                description: 'Нормативний документ, що регламентує діяльність органів студентського самоврядування',
                icon: 'FileText',
                color: 'blue',
                kind: 'document',
                legacyId: 175,
            },
            // TODO: replace external→article kind after Articles migration (Phase 2).
            // These three legacy IDs are HTML hubs in articles_v2, not PDFs, so for
            // now they resolve through /article/:id which still proxies to MySQL.
            {
                title: 'План роботи органів курсантського (студентського) самоврядування',
                description: 'Календарний план заходів та подій, організованих студентським самоврядуванням',
                icon: 'Calendar',
                color: 'purple',
                kind: 'external',
                targetUrl: '/article/1906',
            },
            {
                title: 'Склад органів курсантського (студентського) самоврядування',
                description: 'Інформація про членів та керівництво органів студентського самоврядування',
                icon: 'UserCheck',
                color: 'green',
                kind: 'external',
                targetUrl: '/article/674',
            },
            {
                title: 'Звітність',
                description: 'Протоколи засідань, звіти про діяльність та результати роботи самоврядування',
                icon: 'BarChart3',
                color: 'orange',
                kind: 'group',
                children: [
                    { title: 'Протокол №1 конференції самоврядування', icon: 'FileText', kind: 'document', legacyId: 1907 },
                    { title: 'Протокол №13 конференції самоврядування', icon: 'FileText', kind: 'document', legacyId: 670 },
                    { title: 'Протокол №16 конференції самоврядування', icon: 'FileText', kind: 'document', legacyId: 6278 },
                    { title: 'Протокол засідання 05.03.2020', icon: 'FileText', kind: 'document', legacyId: 1478 },
                    { title: 'Протокол засідання 03.09.2020', icon: 'FileText', kind: 'document', legacyId: 1479 },
                    { title: 'Протокол засідання 06.10.2020', icon: 'FileText', kind: 'document', legacyId: 1480 },
                    { title: 'Протокол засідання 12.11.2020', icon: 'FileText', kind: 'document', legacyId: 1481 },
                    { title: 'Протокол засідання 02.12.2020', icon: 'FileText', kind: 'document', legacyId: 1482 },
                    { title: 'Протокол засідання 02.02.2021', icon: 'FileText', kind: 'document', legacyId: 1483 },
                    { title: 'Протокол засідання 07.04.2021', icon: 'FileText', kind: 'document', legacyId: 1484 },
                    { title: 'Перевірка гуртожитків. Клопотання 09.09.2020', icon: 'FileText', kind: 'document', legacyId: 671 },
                    { title: 'Перевірка гуртожитків. Рапорт 29.09.2020', icon: 'FileText', kind: 'document', legacyId: 672 },
                    { title: 'Перевірка їдальні. Рапорт 09.09.2020', icon: 'FileText', kind: 'document', legacyId: 673 },
                    { title: 'Графік перевірки їдальні травень 2021', icon: 'Calendar', kind: 'document', legacyId: 1525 },
                    // TODO: 1568 — HTML article (article migration Phase 2), переключити на kind:article
                    { title: 'Звіт за 9 травня 2021', icon: 'FileText', kind: 'external', targetUrl: '/article/1568' },
                ],
            },
            {
                title: 'Галерея',
                description: 'Фотоматеріали заходів та подій, організованих студентським самоврядуванням',
                icon: 'Image',
                color: 'pink',
                kind: 'document',
                legacyId: 3382,
            },
        ],
    },
    {
        slug: 'anti-bullying',
        title: 'Протидія булінгу',
        description:
            'Криворізький фаховий коледж НАУ активно працює над створенням безпечного освітнього середовища. Нормативні документи, методичні та інформаційні матеріали з протидії булінгу.',
        items: [
            {
                title: 'Методичний посібник',
                description: 'Протидія булінгу в закладі освіти: системний підхід',
                icon: 'BookOpen',
                color: 'blue',
                kind: 'document',
                legacyId: 526,
            },
            {
                title: 'Зупинимо булінг разом',
                description: 'Інформаційні матеріали про протидію булінгу',
                icon: 'Heart',
                color: 'pink',
                kind: 'document',
                legacyId: 527,
            },
            {
                title: 'Зупинимо булінг разом - поради',
                description: 'Практичні рекомендації для здобувачів освіти',
                icon: 'AlertTriangle',
                color: 'amber',
                kind: 'document',
                legacyId: 528,
            },
            {
                title: 'Зупинимо булінг разом - відповідальність',
                description: 'Інформація про відповідальність за булінг',
                icon: 'Scale',
                color: 'red',
                kind: 'document',
                legacyId: 529,
            },
            {
                title: 'План протидії булінгу',
                description: 'Комплексний план заходів з протидії булінгу в коледжі',
                icon: 'ClipboardList',
                color: 'green',
                kind: 'document',
                legacyId: 3899,
            },
            {
                title: 'Положення про протидію булінгу',
                description: 'Нормативний документ, що регламентує протидію булінгу',
                icon: 'FileText',
                color: 'purple',
                kind: 'document',
                legacyId: 983,
            },
        ],
    },
    {
        slug: 'attestation-mon',
        title: 'Міністерство освіти і науки України про атестацію (листи, накази)',
        description: 'Нормативні документи МОН України щодо атестації педагогічних працівників.',
        items: [
            {
                title: 'Про проведення атестації педагогічних працівників у 2024/2025 навчальному році',
                kind: 'document',
                legacyId: 5562,
            },
            {
                title: 'Положення про атестацію педагогічних працівників, затверджене наказом МОН України 10.09.2024 № 1277',
                kind: 'document',
                legacyId: 3398,
            },
            {
                title: 'Щодо підвищення кваліфікації',
                kind: 'document',
                legacyId: 2143,
            },
            {
                title: 'Порядок підвищення кваліфікації',
                kind: 'document',
                legacyId: 2141,
            },
        ],
    },
    {
        slug: 'attestation-orders',
        title: 'Накази щодо атестації педагогічних (науково-педагогічних) працівників',
        description: 'Архів наказів коледжу щодо атестації педагогічних працівників.',
        items: [
            {
                title: 'Наказ № 107-од від 08.09.2025 Про склад атестаційної комісії та проведення атестації педагогічних працівників в 2025/2026 році',
                kind: 'document',
                legacyId: 6281,
            },
            {
                title: 'Наказ № 29-од від 01.04.2025 «Про результати атестації педагогічних та бібліотечних працівників коледжу»',
                kind: 'document',
                legacyId: 5690,
            },
            {
                title: 'Наказ № 14-од від 13.11.2024 Про склад атестаційної комісії та проведення атестації педагогічних працівників в 2024-2025 р.',
                kind: 'document',
                legacyId: 4907,
            },
            {
                title: 'Наказ № 18-од від 01.04.2024 Про результати атестації педагогічних працівників коледжу',
                kind: 'document',
                legacyId: 4562,
            },
            {
                title: 'Наказ № 88-од від 15.09.2023 Про склад атестаційної комісії та проведення атестації педагогічних працівників в 2023/2024 н.р.',
                kind: 'document',
                legacyId: 3339,
            },
        ],
    },
    {
        slug: 'social-scholarships',
        title: 'Соціальні стипендії — пільгові категорії',
        description:
            'Категорії здобувачів освіти, які мають право на соціальну стипендію відповідно до Порядку призначення і виплати стипендій (постанова КМУ від 12.07.2004 № 882).',
        items: [
            {
                title: 'Діти-сироти та діти, позбавлені батьківського піклування',
                description: 'Та особи з їх числа у разі продовження навчання до 23 років',
                icon: 'Baby',
                color: 'blue',
                kind: 'info',
            },
            {
                title: 'Особи, які залишились без батьків',
                description: 'У віці від 18 до 23 років (батьки померли/загинули/зникли безвісти)',
                icon: 'Heart',
                color: 'purple',
                kind: 'info',
            },
            {
                title: 'Постраждалі внаслідок Чорнобильської катастрофи',
                description: 'Особи, які мають статус постраждалих від аварії на ЧАЕС',
                icon: 'AlertCircle',
                color: 'amber',
                kind: 'info',
            },
            {
                title: 'Учасники бойових дій та їх діти',
                description: 'Визнані учасниками Революції Гідності, учасниками бойових дій',
                icon: 'Shield',
                color: 'green',
                kind: 'info',
            },
            {
                title: 'Особи з інвалідністю I-III групи',
                description: 'Діти з інвалідністю та особи з інвалідністю внаслідок війни',
                icon: 'Accessibility',
                color: 'orange',
                kind: 'info',
            },
            {
                title: 'Внутрішньо переміщені особи',
                description: 'Діти, зареєстровані як ВПО (до 23 років)',
                icon: 'Home',
                color: 'pink',
                kind: 'info',
            },
            {
                title: 'Малозабезпечені сім\'ї',
                description: 'Студенти із сімей, які отримують державну соціальну допомогу',
                icon: 'Users',
                color: 'red',
                kind: 'info',
            },
            {
                title: 'Діти загиблих захисників України',
                description: 'Діти загиблих/померлих учасників бойових дій (до 23 років)',
                icon: 'Scale',
                color: 'indigo',
                kind: 'info',
            },
        ],
    },
    {
        slug: 'practical-training',
        title: 'Практична підготовка — документи',
        description: 'Нормативні документи та перелік баз практичного навчання здобувачів освіти.',
        items: [
            {
                title: 'Положення про проведення практики',
                description: 'Нормативний документ, що регламентує організацію та проведення практичної підготовки здобувачів освіти',
                icon: 'FileText',
                color: 'blue',
                kind: 'document',
                legacyId: 192,
            },
            // TODO §1.5: 28 — HTML-стаття "Співпраця з підприємствами", переключити на kind:article після міграції.
            {
                title: 'Бази практичного навчання',
                description: 'Перелік підприємств та організацій, з якими коледж має договори про співпрацю',
                icon: 'Building2',
                color: 'orange',
                kind: 'external',
                targetUrl: '/article/28',
            },
        ],
    },
    {
        slug: 'practice-bases',
        title: 'Бази практичного навчання — підприємства-партнери',
        description: 'Підприємства та організації, з якими коледж має договори про проходження практики.',
        items: [
            {
                title: 'Авіаційні підприємства-партнери',
                icon: 'Plane',
                color: 'blue',
                kind: 'group',
                children: [
                    { title: 'АТ "Мотор Січ"', icon: 'Plane', kind: 'info' },
                    { title: 'ТОВ "Скорзонеря" філія "Міжнародного аеропорту "Івано-Франківськ"', icon: 'Plane', kind: 'info' },
                    { title: 'ОКП "Міжнародний аеропорт Рівне"', icon: 'Plane', kind: 'info' },
                    { title: 'КП "Міжнародний аеропорт "Запоріжжя"', icon: 'Plane', kind: 'info' },
                    { title: 'КП "Міжнародний аеропорт Черкаси"', icon: 'Plane', kind: 'info' },
                    { title: 'ТОВ "Міжнародний аеропорт "Дніпропетровськ"', icon: 'Plane', kind: 'info' },
                    { title: 'ТОВ "Чорноморські авіалінії"', icon: 'Plane', kind: 'info' },
                    { title: 'ТОВ "Укрейр"', icon: 'Plane', kind: 'info' },
                    { title: 'ТОВ "Конкорд Аеротехнік"', icon: 'Plane', kind: 'info' },
                    { title: 'КП Херсонської обласної ради "Херсонські авіалінії"', icon: 'Plane', kind: 'info' },
                    { title: 'КП "Міжнародний Аеропорт Кривий Ріг"', icon: 'Plane', kind: 'info' },
                    { title: 'КП "Міжнародний аеропорт "Чернівці" ім. Леоніда Каденюка"', icon: 'Plane', kind: 'info' },
                    { title: 'ДП "Луцький ремонтний завод "МОТОР"', icon: 'Plane', kind: 'info' },
                    { title: 'ДП "ЗДАРС" Мігремонт"', icon: 'Plane', kind: 'info' },
                    { title: 'ТОВ "Не старі пілоти"', icon: 'Plane', kind: 'info' },
                ],
            },
            {
                title: 'Інші підприємства-партнери',
                icon: 'Building2',
                color: 'slate',
                kind: 'group',
                children: [
                    { title: 'Товариство з обмеженою відповідальністю "КОМ ТРАНС СЕРВІС"', icon: 'Building2', kind: 'info' },
                    { title: 'ПП "Одіум-престиж"', icon: 'Building2', kind: 'info' },
                    { title: 'Товариство з обмеженою відповідальністю "Електропривод"', icon: 'Building2', kind: 'info' },
                    { title: 'ТОВ "КАРРЕРА"', icon: 'Building2', kind: 'info' },
                    { title: 'ТОВ "Прогрессор", м. Кривий Ріг', icon: 'Building2', kind: 'info' },
                    { title: 'ТОВ "Криворіжелектрострой", м. Кривий Ріг', icon: 'Building2', kind: 'info' },
                    { title: 'ТОВ "Венбест", м. Кривий Ріг', icon: 'Building2', kind: 'info' },
                    { title: 'ТОВ "Виробничо-інноваційна компанія "ДЕВІРО", м. Дніпро', icon: 'Building2', kind: 'info' },
                    { title: 'ТОВ "Тайпан - Агенство безпеки"', icon: 'Building2', kind: 'info' },
                    { title: 'ТОВ "Ертанз"', icon: 'Building2', kind: 'info' },
                    { title: 'ТОВ "Фаєр" (системи протипожежного захисту)', icon: 'Building2', kind: 'info' },
                    { title: 'ПрАТ "Електроград"', icon: 'Building2', kind: 'info' },
                    { title: 'ТОВ "ТОРГ О.П.Т."', icon: 'Building2', kind: 'info' },
                    { title: 'ТОВ "ПРАДО ПЛЮС"', icon: 'Building2', kind: 'info' },
                    { title: 'ПОГ Криворізьке учбово-виробниче підприємство УТОС', icon: 'Building2', kind: 'info' },
                ],
            },
        ],
    },
    {
        slug: 'code-of-conduct',
        title: 'Правила поведінки здобувача освіти',
        description: 'Офіційний документ із правилами поведінки здобувачів освіти у закладі.',
        items: [
            {
                title: 'Правила поведінки здобувача освіти в закладі освіти',
                description: 'Повний текст правил поведінки для здобувачів освіти Криворізького фахового коледжу НАУ. Документ містить вимоги щодо поведінки під час освітнього процесу, на території закладу та у гуртожитках.',
                icon: 'FileText',
                color: 'green',
                kind: 'document',
                legacyId: 3898,
            },
        ],
    },
    {
        slug: 'scholarship-rating',
        title: 'Рейтинг для призначення стипендій',
        description:
            'Рейтинги успішності здобувачів освіти за відділеннями та семестрами для призначення академічних стипендій.',
        items: [
            {
                title: 'Відділення «Транспортні технології»',
                icon: 'Truck',
                color: 'blue',
                kind: 'group',
                children: [
                    {
                        title: '2025-2026 н.р.',
                        kind: 'group',
                        children: [
                            { title: 'І семестр', kind: 'document', legacyId: 4789 },
                            { title: 'ІІ семестр', kind: 'document', legacyId: 4790 },
                        ],
                    },
                    {
                        title: '2024-2025 н.р.',
                        kind: 'group',
                        children: [
                            { title: 'І семестр', kind: 'document', legacyId: 4311 },
                            { title: 'ІІ семестр', kind: 'document', legacyId: 4550 },
                        ],
                    },
                ],
            },
            {
                title: 'Відділення «Експлуатації та ремонту авіатехніки»',
                icon: 'Plane',
                color: 'purple',
                kind: 'group',
                children: [
                    {
                        title: '2025-2026 н.р.',
                        kind: 'group',
                        children: [
                            { title: 'І семестр', kind: 'document', legacyId: 4791 },
                            { title: 'ІІ семестр', kind: 'document', legacyId: 4792 },
                        ],
                    },
                    {
                        title: '2024-2025 н.р.',
                        kind: 'group',
                        children: [
                            { title: 'І семестр', kind: 'document', legacyId: 4312 },
                            // TODO §1.5: 4551 — HTML (заголовок не збігається з міткою, перевірити), kind:external поки.
                            { title: 'ІІ семестр', kind: 'external', targetUrl: '/article/4551' },
                        ],
                    },
                ],
            },
            {
                title: 'Відділення «Комп\'ютерна і програмна інженерія»',
                icon: 'Monitor',
                color: 'green',
                kind: 'group',
                children: [
                    {
                        title: '2025-2026 н.р.',
                        kind: 'group',
                        children: [
                            // TODO §1.5: 4793 — HTML (заголовок не збігається з міткою, перевірити), kind:external поки.
                            { title: 'І семестр', kind: 'external', targetUrl: '/article/4793' },
                            { title: 'ІІ семестр', kind: 'document', legacyId: 4794 },
                        ],
                    },
                    {
                        title: '2024-2025 н.р.',
                        kind: 'group',
                        children: [
                            { title: 'І семестр', kind: 'document', legacyId: 4313 },
                            { title: 'ІІ семестр', kind: 'document', legacyId: 4552 },
                        ],
                    },
                ],
            },
            {
                title: 'Відділення «Загальноосвітня підготовка»',
                icon: 'BookOpen',
                color: 'orange',
                kind: 'group',
                children: [
                    {
                        title: '2025-2026 н.р.',
                        kind: 'group',
                        children: [
                            { title: 'І курс', kind: 'document', legacyId: 4795 },
                            { title: 'ІІ курс', kind: 'document', legacyId: 4796 },
                            { title: 'ІІ семестр', kind: 'document', legacyId: 4797 },
                        ],
                    },
                ],
            },
        ],
    },
    {
        slug: 'science',
        title: 'Наукова діяльність',
        description:
            'Наукове товариство курсантів (студентів), конференції, олімпіади та нормативна база наукової роботи коледжу.',
        items: [
            {
                title: 'Загальна інформація',
                icon: 'FileText',
                color: 'blue',
                kind: 'group',
                children: [
                    { title: 'Положення про НТК', description: 'Нормативний документ, що регламентує діяльність наукового товариства', icon: 'FileText', color: 'blue', kind: 'document', legacyId: 3270 },
                    { title: 'Положення про студентські наукові гуртки та проблемні групи', description: 'Правила організації та функціонування наукових гуртків', icon: 'Users', color: 'purple', kind: 'document', legacyId: 3271 },
                    { title: 'Перелік наукових секцій НТК', description: 'Студентські наукові гуртки та проблемні групи коледжу', icon: 'BookOpen', color: 'green', kind: 'document', legacyId: 3272 },
                ],
            },
            {
                title: 'Конференції',
                icon: 'Presentation',
                color: 'sky',
                kind: 'group',
                children: [
                    { title: 'Авіація і космонавтика', description: 'Науково-практична конференція з питань авіації та космонавтики', icon: 'Plane', color: 'sky', kind: 'document', legacyId: 3273 },
                    // TODO: 3274 відсутній у legacy articles_v2 (зламаний лінк ще до міграції) — перевірити/прибрати в адмінці.
                    { title: 'Козацтво - традиції через роки!', description: 'Конференція присвячена історії та традиціям українського козацтва', icon: 'History', color: 'amber', kind: 'external', targetUrl: '/article/3274' },
                    { title: 'Сучасний науково-педагогічний досвід при викладанні фундаментальних дисциплін', description: 'Обмін досвідом викладання фундаментальних дисциплін у закладах освіти', icon: 'BookOpen', color: 'emerald', kind: 'document', legacyId: 3275 },
                    { title: 'Всесвітній день інформації', description: 'Науково-практична конференція з питань інформаційних технологій', icon: 'Monitor', color: 'cyan', kind: 'document', legacyId: 3276 },
                    { title: 'Академічна доброчесність: основи теорії та практики', description: 'Конференція з питань академічної доброчесності в освіті', icon: 'GraduationCap', color: 'indigo', kind: 'document', legacyId: 4089 },
                ],
            },
            {
                title: 'Олімпіади та досягнення',
                icon: 'Trophy',
                color: 'rose',
                kind: 'group',
                children: [
                    { title: 'Математика', description: 'Перемоги та досягнення на олімпіадах з математики', icon: 'Calculator', color: 'rose', kind: 'document', legacyId: 3277 },
                    { title: 'Комп\'ютерна графіка', description: 'Досягнення здобувачів у галузі комп\'ютерної графіки та дизайну', icon: 'Monitor', color: 'violet', kind: 'document', legacyId: 3278 },
                ],
            },
            {
                title: 'Нормативно-правова база',
                icon: 'ScrollText',
                color: 'slate',
                kind: 'group',
                children: [
                    { title: 'Положення про олімпіади', description: 'Нормативний документ щодо проведення олімпіад', icon: 'ScrollText', color: 'slate', kind: 'document', legacyId: 3279 },
                ],
            },
        ],
    },
    {
        slug: 'teachers-nav',
        title: 'Навігація «Викладачам»',
        description: 'Меню розділу «Викладачам»: категорії з посиланнями на документи та сторінки.',
        items: [
            {
                title: 'Атестація',
                description: 'Матеріали та документи з атестації педагогічних працівників.',
                icon: 'Award',
                kind: 'group',
                children: [
                    { title: 'Загальна інформація про атестацію', kind: 'external', targetUrl: '/teachers/attestation/general-info' },
                    { title: 'Графік засідань атестаційної комісії', kind: 'document', legacyId: 3861 },
                    { title: 'Список педагогічних працівників, які підлягають атестації в 2026 році', kind: 'document', legacyId: 3668 },
                    { title: 'Адреса електронної пошти атестаційної комісії', kind: 'external', targetUrl: '/teachers/attestation/email' },
                    { title: 'План підвищення кваліфікації педагогічних (науково-педагогічних) працівників на 2026 рік', kind: 'document', legacyId: 5563 },
                    { title: 'Міністерство освіти і науки України про атестацію (листи, накази)', kind: 'external', targetUrl: '/teachers/attestation/mon' },
                    { title: 'Положення про атестацію педагогічних працівників', kind: 'document', legacyId: 53 },
                    { title: 'Накази щодо атестації педагогічних працівників', kind: 'external', targetUrl: '/teachers/attestation/orders' },
                    { title: 'Вимоги до кваліфікаційних категорій та педагогічних звань', kind: 'external', targetUrl: '/teachers/attestation/qualification-requirements' },
                    { title: 'Інформаційний порадник "Атестація педагогічних працівників"', kind: 'external', targetUrl: 'https://heyzine.com/flip-book/4b9b7e6f61.html' },
                ],
            },
            {
                title: 'Правила внутрішнього розпорядку працівників коледжу',
                description: 'Внутрішні правила та регламенти для працівників.',
                icon: 'ScrollText',
                kind: 'group',
                children: [
                    { title: 'Правила внутрішнього розпорядку працівників коледжу', kind: 'document', legacyId: 1389 },
                ],
            },
            {
                title: 'Рейтинг 2024–2025 н.р.',
                description: 'Рейтингові матеріали та документи за навчальний рік.',
                icon: 'Trophy',
                kind: 'group',
                children: [
                    { title: 'Рейтинг 2024–2025 н.р.', kind: 'document', legacyId: 2268 },
                ],
            },
            {
                title: 'Дистанційне навчання',
                description: 'Матеріали та сервіси для онлайн-навчання.',
                icon: 'Monitor',
                kind: 'group',
                children: [
                    { title: 'Онлайн-навчання для НПП', kind: 'external', targetUrl: '/teachers/online-npp' },
                    { title: 'Збірка сервісів для дистанційного навчання', kind: 'document', legacyId: 5864 },
                    { title: 'Методичні рекомендації. Дистанційне навчання', kind: 'document', legacyId: 5863 },
                ],
            },
            {
                title: 'Педагогічна скарбниця',
                description: 'Методичні матеріали, напрацювання та корисні ресурси.',
                icon: 'BookOpen',
                kind: 'group',
                children: [
                    { title: 'Дроздова А.М. (атестація 2025)', kind: 'document', legacyId: 6651 },
                    { title: 'Кутін А.І. (атестація 2025)', kind: 'document', legacyId: 6649 },
                    { title: 'Герасименко Ю.А. (атестація 2025)', kind: 'document', legacyId: 6650 },
                    { title: 'Рашевський М.О. (атестація 2023)', kind: 'document', legacyId: 3254 },
                    { title: 'Пасічна О.В. (атестація 2023)', kind: 'document', legacyId: 3253 },
                    { title: 'Кравчук І.В. (атестація 2023)', kind: 'document', legacyId: 3252 },
                    { title: 'Кравченко Л.О. (атестація 2023)', kind: 'document', legacyId: 3251 },
                    { title: 'Гребенюк В.С. (атестація 2023)', kind: 'document', legacyId: 3250 },
                    { title: 'ЦК ФМД (наукова діяльність 2023)', kind: 'document', legacyId: 4257 },
                    { title: 'ЦК ТТ (наукова діяльність 2023)', kind: 'document', legacyId: 4256 },
                    { title: 'ЦК КСМ (наукова діяльність 2023)', kind: 'document', legacyId: 4255 },
                    { title: 'ЦК ІМ (наукова діяльність 2023)', kind: 'document', legacyId: 4254 },
                    { title: 'ЦК Авіоніки (наукова діяльність 2023)', kind: 'document', legacyId: 4253 },
                    { title: 'ЦК ПОД ПЗ (наукова діяльність 2023)', kind: 'document', legacyId: 4252 },
                    { title: 'ЦК ПС та АД (наукова діяльність 2023)', kind: 'document', legacyId: 4251 },
                    { title: 'ЦК РТ та ЕМ (наукова діяльність 2023)', kind: 'document', legacyId: 4250 },
                    { title: 'ЦК СГД (наукова діяльність 2023)', kind: 'document', legacyId: 4249 },
                    { title: 'ЦК ФПД (наукова діяльність 2023)', kind: 'document', legacyId: 4248 },
                    { title: 'Кравчук І.В. (методичний звіт 2023)', kind: 'document', legacyId: 5626 },
                    { title: 'Олена Пасічна (методичний звіт 2023)', kind: 'document', legacyId: 4246 },
                    { title: 'Ірина Петреченко (методичний звіт 2023)', kind: 'document', legacyId: 4247 },
                    { title: 'Алла Тарадуда (методичний звіт 2023)', kind: 'document', legacyId: 4244 },
                    { title: 'Надія Смирнова (методичний звіт 2023)', kind: 'document', legacyId: 4245 },
                    { title: 'Світлана Терьошіна (методичний звіт 2023)', kind: 'document', legacyId: 4243 },
                    { title: 'Вікторія Тихоступ (методичний звіт 2023)', kind: 'document', legacyId: 4242 },
                    { title: 'Олена Щигрінцова (методичний звіт 2023)', kind: 'document', legacyId: 4241 },
                ],
            },
            {
                title: 'Методичні надбання викладачів коледжу',
                description: 'Публікації та матеріали викладачів.',
                icon: 'GraduationCap',
                kind: 'group',
                children: [
                    { title: 'Кислова М.А.', kind: 'document', legacyId: 3278 },
                    { title: 'Кравчук І.В.', kind: 'document', legacyId: 3277 },
                    { title: 'Петреченко І.Б.', kind: 'document', legacyId: 3276 },
                    { title: 'Пасічна О.В.', kind: 'document', legacyId: 3275 },
                ],
            },
        ],
    },
    {
        slug: 'elective-courses',
        title: 'Дисципліни за вибором — каталог',
        description: 'Каталог дисциплін за вибором здобувачів освіти на навчальний рік.',
        items: [
            {
                title: 'Повний каталог дисциплін за вибором 2025/2026',
                description: 'Перегляньте повний перелік дисциплін за вибором для всіх спеціальностей на 2025/2026 навчальний рік',
                icon: 'FileText',
                color: 'violet',
                kind: 'document',
                legacyId: 3752,
            },
        ],
    },
]

const requested = process.env.SEED_SLUGS?.split(',').map((s) => s.trim()).filter(Boolean) ?? null

async function resolveDocId(payload: Payload, legacyId: number): Promise<number | string | null> {
    const res = await payload.find({
        collection: 'documents',
        where: { legacyId: { equals: legacyId } },
        limit: 1,
        depth: 0,
    })
    return res.docs[0]?.id ?? null
}

async function resolveArticleId(payload: Payload, slug: string): Promise<number | string | null> {
    const res = await payload.find({
        collection: 'articles',
        where: { slug: { equals: slug } },
        limit: 1,
        depth: 0,
    })
    return res.docs[0]?.id ?? null
}

async function buildItemForPayload(payload: Payload, item: SeedItem, ctxPath: string, depth = 1): Promise<Record<string, unknown> | null> {
    const base = {
        title: item.title,
        description: item.description,
        icon: item.icon,
        color: item.color,
        badge: 'badge' in item ? item.badge : undefined,
        kind: item.kind,
    }
    if (item.kind === 'document') {
        const id = await resolveDocId(payload, item.legacyId)
        if (id == null) {
            console.warn(`  ! ${ctxPath}: document legacyId=${item.legacyId} not found, skipping`)
            return null
        }
        return { ...base, targetDoc: id }
    }
    if (item.kind === 'article') {
        const id = await resolveArticleId(payload, item.articleSlug)
        if (id == null) {
            console.warn(`  ! ${ctxPath}: article slug="${item.articleSlug}" not found, skipping`)
            return null
        }
        return { ...base, targetArticle: id }
    }
    if (item.kind === 'external') {
        return { ...base, targetUrl: item.targetUrl }
    }
    if (item.kind === 'info') {
        return base
    }
    if (item.kind === 'group') {
        // Schema nests L2 under `children` (level-1 items) and L3 under `entries` (level-2 items).
        const nestedKey = depth === 1 ? 'children' : 'entries'
        const childrenBuilt: Record<string, unknown>[] = []
        for (let i = 0; i < item.children.length; i++) {
            const built = await buildItemForPayload(payload, item.children[i], `${ctxPath}.${nestedKey}[${i}]`, depth + 1)
            if (built) childrenBuilt.push(built)
        }
        return { ...base, [nestedKey]: childrenBuilt }
    }
    return null
}

async function upsertList(payload: Payload, def: SeedList): Promise<void> {
    console.log(`\n[${def.slug}] "${def.title}"`)
    const items: Record<string, unknown>[] = []
    for (let i = 0; i < def.items.length; i++) {
        const built = await buildItemForPayload(payload, def.items[i], `items[${i}]`)
        if (built) items.push(built)
    }
    if (items.length === 0) {
        console.warn(`  ! 0 items resolved, skipping list`)
        return
    }

    const existing = await payload.find({
        collection: 'linkLists',
        where: { slug: { equals: def.slug } },
        limit: 1,
        depth: 0,
    })

    const data = {
        slug: def.slug,
        title: def.title,
        description: def.description,
        items,
    }

    if (existing.docs[0]) {
        await payload.update({
            collection: 'linkLists',
            id: existing.docs[0].id,
            data: data as never,
        })
        console.log(`  ✓ updated id=${existing.docs[0].id}, items=${items.length}`)
    } else {
        const created = await payload.create({
            collection: 'linkLists',
            data: data as never,
        })
        console.log(`  ✓ created id=${created.id}, items=${items.length}`)
    }
}

async function main() {
    const payload = await getPayload({ config })

    const toRun = requested
        ? SEEDS.filter((s) => requested.includes(s.slug))
        : SEEDS

    if (toRun.length === 0) {
        console.warn(`No matching seeds for filter: ${requested?.join(',')}`)
        process.exit(0)
    }

    console.log(`Seeding ${toRun.length} linkLists...`)
    for (const def of toRun) {
        await upsertList(payload, def)
    }
    console.log(`\nDone.`)
    process.exit(0)
}

main().catch((err) => {
    console.error(err)
    process.exit(1)
})
