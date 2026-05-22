# Audit — Phase 0

Дослідницький артефакт перед проектуванням Pages collection і hub-конструктора.

## Файли

- `native-hubs.md` — локальний аудит hard-coded native компонентів (готовий).
- `legacy-hubs.json` — вихід `audit-legacy-hubs.ts`, потрібно згенерувати на проді (див. нижче).
- `coverage.md` — буде створено після того, як з'явиться `legacy-hubs.json`.

## Як запустити legacy audit на проді

Скрипт: `src/scripts/audit/audit-legacy-hubs.ts`. Він читає `articles_v2` (тільки HTML/docx_to_html), парсить кожен файл, класифікує і виводить JSON у stdout.

### Варіант A — через git pull (рекомендовано)

```bash
# Локально:
git add src/scripts/audit/audit-legacy-hubs.ts audit/
git commit -m "audit: legacy-hubs script + native baseline"
git push

# На проді:
ssh aviation
cd /home/deploy/aviation
git pull

docker compose --env-file .env.production exec -T next \
  node_modules/.bin/tsx src/scripts/audit/audit-legacy-hubs.ts \
  > /tmp/audit-legacy-hubs.json

# Перевірити розмір та зведення:
ls -lh /tmp/audit-legacy-hubs.json
jq '.totals' /tmp/audit-legacy-hubs.json

# Скачати локально:
exit
scp aviation:/tmp/audit-legacy-hubs.json audit/legacy-hubs.json
```

### Варіант B — без commit (scp)

```bash
# Локально:
scp src/scripts/audit/audit-legacy-hubs.ts \
    aviation:/home/deploy/aviation/src/scripts/audit/

ssh aviation
cd /home/deploy/aviation

docker compose --env-file .env.production exec -T next \
  node_modules/.bin/tsx src/scripts/audit/audit-legacy-hubs.ts \
  > /tmp/audit-legacy-hubs.json

exit
scp aviation:/tmp/audit-legacy-hubs.json audit/legacy-hubs.json
```

## Що в результаті JSON

```jsonc
{
  "generated_at": "2026-05-22T...",
  "config": {
    "hub_threshold": 3,
    "pure_hub_word_max": 120,
    "snippet_len": 300,
    "uploads_dir": "/var/www/uploads"
  },
  "totals": {
    "scanned": 1328,
    "pure_hub": 0,        // ≥3 article links + <120 слів
    "mixed_hub": 0,       // ≥3 article links + ≥120 слів
    "content_with_links": 0,
    "content_pure": 0,
    "missing": 0
  },
  "records": [
    {
      "old_id": 175,
      "title_db": "Положення про курсантське самоврядування",
      "title_h1": "...",
      "view_mode": "html",
      "file_size_bytes": 8123,
      "kind": "content_pure",
      "linked_article_ids": [],
      "word_count": 145,
      "text_snippet": "...",
      // ...
    }
  ]
}
```

## Env-vars (опційно)

- `HUB_THRESHOLD=3` — змінити поріг для класифікації pure/mixed hub.
- `PURE_HUB_WORD_MAX=120` — поріг слів для відсічення "pure-nav" від "mixed" хабів.
- `SNIPPET_LEN=300` — довжина text snippet у кожному запису.

## Після генерації

Дай знати, що `audit/legacy-hubs.json` готовий — я зроблю cross-reference з `native-hubs.md` і складу `coverage.md`:

- Скільки legacy hubs уже мають native двійника?
- Які legacy hubs ще треба портувати?
- Чи всі 88 native IDs реально PDF (як ми думаємо), чи там є HTML?
- Розподіл за `kind` для аргументації hub-конструктора.
