# Coverage report — Legacy ↔ Native

Згенеровано: 2026-05-22. Джерела: `audit/legacy-hubs.json` (1328 HTML записів з прода), `audit/native-hubs.md` (96 refs у 11 native файлах).

---

## 1. Підсумкові цифри

### Legacy сторона (1328 HTML)
| Категорія | К-сть | Опис |
|-----------|-------|------|
| `pure_hub` | 517 | ≥3 article links, <120 слів (чиста навігація) |
| `mixed_hub` | 72 | ≥3 article links, ≥120 слів (нав + intro) |
| `content_with_links` | 174 | 1-2 article links + контент |
| `content_pure` | 563 | 0 article links, чистий контент |
| `missing` | 2 | файл не знайдено на диску |
| **Разом** | **1328** | |

**Hubs: 589 (44%)**, content: 737 (56%).

### Native сторона
- **11 файлів**, **96 hard-coded refs** на `/api/articles/X/file`, **88 унікальних** IDs.
- **73 з 88** native IDs фігурують серед `linked_article_ids` в legacy hubs (тобто native в основному перенесли посилання на ті ж самі PDFs).
- **15 native IDs** не лінкуються з жодного legacy hub (нові PDFs, для яких раніше не було hub-сторінки).

---

## 2. Native ↔ Legacy mapping

| Native файл | IDs | Top legacy hub | Overlap | Точність |
|-------------|-----|----------------|---------|----------|
| **AntiBullying** | 6 | `#530 Протидія булінгу` | 6/6 | **100%** ✓ |
| **teachers.tsx (Педагогічна скарбниця)** | 38 | `#3255 Педагогічна скарбниця` | 26/38 | **68%** ≈ |
| **ElectiveCourses** | 1 | `#170, #247, #251` (per-spec) | 1/1 | 100% (single doc) |
| **entrance-2025** | 1 | `#4570 Ліцензії` | 1/1 | 100% (single doc) |
| **attestation.data** | 13 | `#2180, #59, #2144` | 5/13, 4/13, 4/13 | ~30-38% |
| **ScholarshipRating** | 16 | `#4793` etc. | 4/16 | 25% |
| **SelfGovernance** | 5 | `#149 Нормативно-правова база ВВ` | 1/5 | 20% |
| **Science** | 12 | `#118, #3325, #1213` | 1/12 | <10% |
| **PracticalTraining** | 2 | `#24, #247, #251` | 1/2 | 50% (1 of 2) |
| **CodeOfConduct** | 1 | — | 0/1 | (no match) |
| **SocialScholarships** | 1 | — | 0/1 | (no match) |

**Інтерпретація:** лише `AntiBullying` і `teachers/Педагогічна скарбниця` — точні портування legacy hubs. Решта native компонентів — **це нові ad-hoc дизайни** з нуля, які лише позичили деякі PDFs.

З застосуванням порогу "≥60% children overlap" → **7 з 589 legacy hubs покриті native**. Решта **582 — uncovered backlog**.

---

## 3. Що linked з hubs

З 589 legacy hubs виходить **5592 посилань** (з повторами) на **5199 унікальних** IDs:

| Тип target | Occurrences | Унікальних IDs | % |
|------------|-------------|----------------|---|
| → PDF (вже у `documents`) | 4398 | 4144 | **78%** |
| → HTML (стане Page) | 1194 | 1055 | 22% |

З 1055 унікальних HTML-targets:
- `content_pure`: 465
- `content_with_links`: 122
- `pure_hub`: **419**
- `mixed_hub`: **49**

**Ключовий висновок:** **468 з 1055** HTML-targets — це самі hubs. Тобто hubs масово містять посилання на інші hubs (sub-hubs). Це навігаційне дерево, не плоский список.

---

## 4. Топ-30 uncovered hubs за патернами

З 582 uncovered hubs дуже багато повторюваних patterns:

| Pattern (за title) | Приклад | Природа |
|-------------------|---------|---------|
| **"Заходи ЦК X"** | `#2024 Заходи ЦК Авіоніки` (84 links) | Список подій ЦК → автогенерується з documents.category |
| **"Семінари за спеціальністю N"** | `#3571 ...спеціальністю 073` (88 links) | Те ж саме за specialty |
| **"Розклад занять YYYY-YYYY"** | `#3607 ...2023-2024` (43 links) | Schedule listing |
| **"Спеціальність N — Нормативні дисципліни"** | `#1976` (30 links) | Curriculum listing |
| **"Силабуси спеціальності N"** | `#2425` (33 links) | Syllabi listing |
| **"Положення коледжу"** | `#148` (34 links) | Normative documents |
| **"Книжкові виставки бібліотеки"** | (повтор) | Events listing |
| **"Архів"** | (3 hubs) | Аrchive listings |

**Інтерпретація:** ~70% uncovered hubs — це **lists of documents filtered by category/specialty/year/department**, не унікальні сторінки. Тобто **їх не треба портувати окремо**. Достатньо мати:
- Documents collection з кращим тегуванням (`department`, `specialty`, `year`, `event_type`).
- Generic route `/documents?category=...&specialty=...` рендерить листинг.

Лише ~10-15% uncovered hubs — це справді унікальні composed сторінки (з власним описом, hero, кастомним layout).

---

## 5. 736 content pages — що там

Розподіл за richness:
- **363 з зображеннями** (49%)
- **25 з YouTube iframes** (3%)
- **174 з cross-links** на інші статті
- **Median word count: 98 слів** — більшість дуже короткі

Найдовші — реальний цінний контент:
- `#XXXX Пам'ять. Прийоми запам'ятовування` (3780w)
- `#XXXX Положення про проведення практики` (3093w)
- `#XXXX Загальна інформація про коледж` (1336w)
- `#XXXX Шляхи уникнення ризиків у цифровому середовищі` (1147w)
- `#XXXX Як готуватись до ЗНО` (1145w)
- `#XXXX Історія коледжу` (960w)

736 рядків content — це переоцінено. Якщо викинути все <50 слів (короткі застарілі записи), залишиться ~400 реально цінних сторінок.

---

## 6. Архітектурні висновки

### 6.1 Pages collection — реально потрібна

Для 400-500 content pages (з 737), які мають вагомий текст/зображення/youtube. **Звичайна `pages` колекція з блоками** — як планували.

### 6.2 Hub-конструктор — два рівні рішення

**Рівень A. Auto-list hubs (потенційно ~70% uncovered).** Не вимагають окремого hub-block. Замість цього:
- Documents отримують додаткові поля: `department`, `specialty`, `year`, `event_type`, `cycle_commission`.
- Generic page-component `<DocumentListByFilter filter={...}>` рендерить листинг.
- В Pages collection block `documentList` зі схемою фільтра.

**Рівень B. Composed hubs (унікальні).** ~7 вже мають native (AntiBullying тощо) + ще ~10-30 з legacy. Тут реально потрібен hub-block:
- Pages з block `linkGroup` (рекурсивна, max 2-3 рівні).
- Leaf-елементи — relation до Documents AND Pages (бо 22% target = HTML/Page).
- Опційний `Hero` block, `InfoBanner` block — як обгортка.

### 6.3 Native vs CMS — стратегія

| Native компонент | Стратегія |
|------------------|-----------|
| AntiBullying | Замінити на CMS (Page з blocks: Hero + LinkGroup). |
| SelfGovernance, CodeOfConduct, SocialScholarships, Science | Так само — Pages з blocks. |
| teachers.tsx (Педагогічна скарбниця) | Pages з LinkGroup (tree-3). |
| ScholarshipRating | Розглянути — це річний документ, що оновлюється. CMS дозволить редагувати без коду. |
| ElectiveCourses, PracticalTraining | Залишити native — кастомний UX навколо catalog-doc. |
| entrance-2025 | Залишити native — складна tree-4 структура, річна сторінка. |
| attestation.data | Замінити на CMS — оновлюється щороку. |

### 6.4 Поля Documents — пропоновані доповнення

| Поле | Значення | Покриває патерни |
|------|----------|-------------------|
| `department` | "Авіоніка", "Транспорт", "Комп. інженерія" | "Заходи ЦК X" |
| `specialty` | 073, 141, 173, 275... | "Спеціальність N", "Семінари за спеціальністю" |
| `year` | "2023-2024", "2025" | "Розклад N", "Заходи 2025" |
| `event_type` | "семінар", "конференція", "тренінг", "захід" | "Семінари, вебінари" |
| `cycle_commission` | "КСМ", "ПОД та ПЗ", "ТТ", "ФПД"... | "Здобутки ЦК X", "Заходи ЦК X" |
| `kind` | "регуляторне", "положення", "рейтинг", "розклад"... | "Положення коледжу", "Розклад занять" |

---

## 7. Рекомендована послідовність робіт

1. **Розширити Documents** (поля з 6.4) + backfill з legacy hub→tag mapping.
2. **Generic listing route** (`/documents?filter=...`) + Page-block `documentList`.
3. **Pages collection** (paragraph+heading+image+gallery+youtube + новий `linkGroup` + новий `documentList`).
4. **Migration script** для ~400 content pages (відсіч <50 слів).
5. **Поступове перенесення** native компонентів у CMS (по 1-2 на тиждень).
6. **Legacy fallback** — `/article/:id` route шукає у documents, потім pages, інакше 404.

Не критично робити все одразу — Pages + Page-renderer розблоковує крок 4, далі ітеративно.

---

## 8. Що ще варто витягнути з даних (опційно)

- Top-30 uncovered hubs з повними titles → list cluster pattern matching → визначити точніше скільки реально category-list vs custom.
- Cross-link cluster: яка частина 419 hub→hub посилань утворює дерева глибиною 1, 2, 3+?
- Зображення в content: яких розмірів очікувати при міграції (треба для Media sharp resize).
