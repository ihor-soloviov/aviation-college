# Native hubs — локальний аудит

Згенеровано: 2026-05-22.

Скан: `src/components/**` + `src/lib/**` + `src/app/(frontend)/**`.
Hard-coded refs на legacy file API (`/api/articles/N/file`) і структурні дані, що задають hub-сторінки.

## Зведена таблиця

| # | Файл | Hub title | Refs | Унік. IDs | Форма |
|---|------|-----------|------|-----------|-------|
| 1 | `src/components/Students/SelfGovernance/SelfGovernancePage.tsx` | Курсантське самоврядування | 5 | 5 | flat-grid (5 cards, color+icon per card) |
| 2 | `src/components/Students/CodeOfConduct/CodeOfConductPage.tsx` | Кодекс поведінки | 1 | 1 | main-doc + 4 narrative sections (без url) |
| 3 | `src/components/Students/AntiBullying/AntiBullyingPage.tsx` | Протидія булінгу | 6 | 6 | flat-grid (title + subtitle + url) |
| 4 | `src/components/Students/SocialScholarships/SocialScholarshipsPage.tsx` | Соціальні стипендії | 1 | 1 | main-doc + 8 категорій-описів |
| 5 | `src/components/Students/Science/SciencePage.tsx` | Науково-технічна творчість | 12 | 12 | main-doc + ~11 sub-docs в групах |
| 6 | `src/components/Students/ElectiveCourses/data.ts` | Вибіркові курси | 1 | 1 | catalog-url + 8 спеціальностей |
| 7 | `src/components/Students/PracticalTraining/data.ts` | Практика | 2 | 2 | 2 regulation-docs + 30 баз-практик |
| 8 | `src/components/Students/ScholarshipRating/ScholarshipRatingPage.tsx` | Рейтинг для стипендії | 16 | 16 | **tree 3-level**: відділення → курс/семестр → url |
| 9 | `src/lib/teachers.tsx` | Викладачам (hub-page) | 38 | 36 | **tree 3-level**: тема → група → list (з 1-30 items per group) |
| 10 | `src/lib/teachers/attestation.data.ts` | Атестація викладачів | 13 | 13 | flat + 3 під-секції-наказів |
| 11 | `src/lib/entrants/entrance-2025-documents.ts` | Вступнику 2025 | ? | ? | **tree 4-level**: розділ → підрозділ → форма → url |

**Разом:** 96 refs у 11 файлах, ~88 унікальних article IDs. (Усі вони — PDF, які вже у Payload `documents`.)

## Класифікація за патерном

### A. Flat-grid (5 файлів)
SelfGovernance, AntiBullying, CodeOfConduct, SocialScholarships, attestation.data.ts.

**Shape:**
```ts
sections = [{ title, description?, subtitle?, url, icon?, color? }]
```

Найпростіший. UI: hero + grid карток. Кандидат №1 на CMS-driven блок.

### B. Catalog + sub-list (3 файли)
ElectiveCourses, PracticalTraining, Science.

**Shape:**
```ts
mainDoc = "/api/articles/X/file"
items = [{ name|title, type?, url? }]
```

Один "головний" документ (positionement, catalog) + список похідних. UI: hero card + grid дочірніх.

### C. Tree 3-level (3 файли)
ScholarshipRating, teachers.tsx, Science (групи).

**Shape:**
```ts
[{
  title: "Відділення X",
  courses: [{
    title: "Курс N",
    semesters: [{ title: "І семестр", url }]
  }]
}]
```

UI: accordion або tabs. Кандидат на блок `linkGroupList` з 1-2 рівнями вкладеності.

### D. Tree 4-level (1 файл)
entrance-2025-documents.ts.

**Shape:**
```ts
[{
  title: "Списки рекомендованих",
  subgroups: [{
    title: "Бюджет",
    forms: [{
      title: "Денна",
      links: [{ title, url }]
    }]
  }]
}]
```

Найскладніший. Питання: реально треба 4 рівні чи це історичний overdesign? У 2025 році це актуальна сторінка-вступу. Можна або:
- Дозволити рекурсію в блоці (Payload вміє, але UX редагування важкий).
- Спросити до 3 рівнів + текстова "freeform group" розширення.
- Залишити entrance-* як native поза CMS — це річний документ-довідник.

## Спостереження для архітектури конструктора

1. **88 з ~88** refs — це PDFs у `documents`. Тобто конструктор оперує **document-relation**, не page-relation.
2. **3 з 4 патернів покриваються 2-рівневою вкладеністю** (A, B, C). Тільки D потребує 4 рівні.
3. **Метаполя на елементах різні:** icon+color (A); subtitle (B); type (PracticalTraining); isExternal (teachers). Конструктор має бути permissive.
4. **Hero + Info-banner шапки** — у 80% компонентів. Це повторюваний "narrative wrapper" навколо link-tree.
5. **Static text (paragraph blocks)** часто є між sections — це означає, що hub-сторінка ≠ просто link-tree, це **сторінка з блоками** + один із блоків = link-tree.

## Висновок (preliminary)

Hub = page з blocks. Конкретно блок `LinkGroup` з рекурсивною структурою (max-depth 3) + relation-to-documents для leaf-elements.

Тобто **Pages collection покриває обидва use-cases**:
- "Content page" (former HTML article) = paragraph + heading + image + ... blocks (вже спроектовано).
- "Hub page" (replace native components) = LinkGroup + Hero + InfoBanner blocks.

**Один тип сторінки, різні блоки** — варіант (A) з попереднього обговорення (Generic Hub Block), але глибший. Це ховається за `pages.content` як блокова композиція.

Native компоненти (`SelfGovernancePage.tsx` etc.) майбутньому стають **дві речі**:
- Загальний `<PagesRenderer page={...}>` що рендерить blocks (так само як вже зроблено для News).
- Custom-route override для тих 1-2 сторінок, де UX надто складний (entrance-2025).

Після цього `src/components/Students/*` стає переважно empty — їхній зміст переїде у CMS і рендериться dynamic-route'ом `/students/:slug` (або через root pages collection).

---

**Наступний крок:** запустити legacy audit на проді (інструкція в `audit/README.md`), щоб cross-reference з 88 native IDs і побачити повну картину 1328 HTML legacy сторінок.
