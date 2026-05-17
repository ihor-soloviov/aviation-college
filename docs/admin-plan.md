# Admin flow plan

Roadmap for the moderator/admin functionality being added to `aviation-college`.

## Architectural decisions

1. **No separate admin service.** All moderator UI lives inside the same Next.js app under `/admin/*`.
2. **Files stay on server, dual-mode upload.** A `lib/uploads.ts` abstraction switches between two backends via `UPLOAD_MODE`:
   - `remote` (current production) — POSTs to `aviation-files-api` at `${FILES_API_URL}/api/uploads/image` with a shared token.
   - `local` (after planned server upgrade) — writes directly to `UPLOADS_DIR` via `fs`. A Next route handler at `/uploads/[...path]` serves files back.
3. **Extend `news_v2`, do not split into a new table.** Add `format`, `hero_image_path`, `excerpt`, `content_blocks`. Legacy rows (`format='legacy_html'`) keep being rendered from `content_path`. New rows (`format='structured'`) are rendered from typed blocks stored in `content_blocks` (JSON).
4. **Block-based news content.** A news body is an ordered array of typed blocks — `paragraph`, `heading`, `image`, `gallery` (slider), `youtube`, `links`. New block types can be added later without DB migrations because `content_blocks` is JSON. `hero_image_path` is the single top-of-page image, separate from any image block.
5. **Hidden, minimal auth.** Single env-configured moderator credential (`MODERATOR_USERNAME` + `MODERATOR_PASSWORD_HASH`), signed httpOnly cookie. No users table, no next-auth. Hidden `/admin` route — login form if no cookie, dashboard if cookie. **No public navigation links to admin anywhere.**
6. **Server-to-server upload, never browser-direct.** Browser → `POST /api/admin/news` on aviation-college (admin cookie) → forwards multipart to aviation-files-api with token. The upload token never reaches the browser.

## Block types (initial set)

```ts
type Block =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: 2 | 3; text: string }
  | { type: 'image'; path: string; alt?: string; caption?: string }
  | { type: 'gallery'; images: { path: string; alt?: string }[] }
  | { type: 'youtube'; url: string }
  | { type: 'links'; items: { label: string; url: string }[] }
```

## Stages

### Stage 1 — DB migration ✅

`migrations/001_news_v2_structured.sql`:

```sql
ALTER TABLE news_v2
  ADD COLUMN format ENUM('legacy_html','structured') NOT NULL DEFAULT 'legacy_html' AFTER tags,
  ADD COLUMN hero_image_path VARCHAR(255) NULL AFTER format,
  ADD COLUMN excerpt TEXT NULL AFTER hero_image_path,
  ADD COLUMN content_blocks JSON NULL AFTER excerpt;
```

### Stage 2 — Upload + serve in `aviation-files-api` ✅

- `POST /api/uploads/image` — `multer` memoryStorage, 10MB cap, `image/jpeg|png|webp` only, requires `x-upload-token` header. Subdir validated against `^[a-z0-9-]+$`. Filename is `randomUUID().<ext>`. Returns `201 { path: "<subdir>/<uuid>.<ext>" }`.
- `GET /uploads/*` — `express.static(UPLOADS_DIR)` with `dotfiles: deny`, 7d cache.
- Dependency added: `multer ^1.4.5-lts.1`.
- Env added: `FILES_API_UPLOAD_TOKEN`.

### Stage 3 — Upload abstraction in `aviation-college` ✅

- `src/lib/uploads.ts` — `uploadImage(file, subdir = 'news'): Promise<{ path }>` and `UploadError`. Dispatches by `UPLOAD_MODE`. Validates mime/size before either backend.
- `src/lib/files-url.ts` — added `getUploadedFileUrl(relativePath)` which returns either `${FILES_API_URL}/uploads/${path}` (remote) or `/uploads/${path}` (local).
- `src/app/uploads/[...path]/route.ts` — local-mode static serve. Returns 404 unless `UPLOAD_MODE=local`. Path-traversal guarded.
- `.env.example` created at repo root documenting all relevant variables.

### Stage 4 — Auth ⬜

- ENV: `MODERATOR_USERNAME`, `MODERATOR_PASSWORD_HASH` (bcrypt), `AUTH_SECRET` (HMAC for cookie signing).
- `POST /api/admin/login` — verifies creds, sets `admin_session` httpOnly + signed + sameSite=strict cookie, ~7 day TTL.
- `POST /api/admin/logout` — clears cookie.
- `middleware.ts` — protects `/admin/*` (redirect to `/admin` login form) and `/api/admin/*` (401 JSON).
- `/admin` page — renders login form if not authed, dashboard if authed. No public nav exposes this.

### Stage 5 — Admin pages + news CRUD API ⬜

- Pages:
  - `/admin` — login form / dashboard
  - `/admin/news` — list of news with edit/delete
  - `/admin/news/new` — create form *(UI design intentionally deferred — discuss separately)*
  - `/admin/news/[id]/edit` — edit form
- API:
  - `POST /api/admin/news` — create. Receives multipart with hero image + JSON `blocks` field. Forwards images to uploads, persists row with `format='structured'`.
  - `PATCH /api/admin/news/[id]` — update.
  - `DELETE /api/admin/news/[id]` — delete (consider soft-delete column later).
- Render side: `/news/[id]/page.tsx` branches on `format`. For `structured`, iterates `content_blocks` and dispatches to per-block React components.
- List side: `getNewsList` and `NewsCard` start using real `excerpt` + `hero_image_path` (via `getUploadedFileUrl`).

## Manual ops checklist (before stage 5 can ship)

- [ ] Run `migrations/001_news_v2_structured.sql` on production MySQL.
- [ ] In `aviation-files-api`: `npm install`, set `FILES_API_UPLOAD_TOKEN` in prod env, restart.
- [ ] In `aviation-college` (local `.env.local` + Vercel env): set matching `FILES_API_UPLOAD_TOKEN` and `UPLOAD_MODE=remote`.
- [ ] Smoke-test upload: `curl -F file=@image.jpg -F subdir=news -H "x-upload-token: <token>" $FILES_API_URL/api/uploads/image` → confirm `201` + `{ path }` + image accessible via `GET $FILES_API_URL/uploads/<path>`.

## After server upgrade (when ready to switch to local mode)

- Set `UPLOAD_MODE=local` and ensure `UPLOADS_DIR` is writable by the Next.js process.
- Decide whether `aviation-files-api` is retired or kept (legacy `content_path` HTML files still flow through it via `/api/news/:id/file` and `/api/articles/:id/file`).
