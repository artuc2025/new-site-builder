# Project Status — Site Builder

## Current State (as of today)

- Backend API (NestJS) runs with environment config via `ConfigModule`.
- PostgreSQL connected; Prisma schema and initial migration present and applied.
- Data model covers Users, Workspaces, Projects, Pages, Revisions, Assets, Publishes.
- Editor (Nuxt 3) runs; Pinia store implements block tree, selection, undo/redo, breakpoints.
- Blocks package provides base blocks and configs used by the editor.
- Runtime (Nuxt 3) available for SSR rendering (baseline skeleton present).
- Monorepo wired with Turbo; root scripts start individual apps or all in dev.

## Verified Artifacts

- Prisma schema at `apps/api/prisma/schema.prisma` with core entities.
- Initial SQL migration at `apps/api/prisma/migrations/20251026113700_init/migration.sql`.
- Editor store at `apps/editor/stores/editor.ts` with history and block ops.
- API module at `apps/api/src/app.module.ts` loading env and base controller/service.

## What Works End-to-End

- Start API and Editor locally; connect to Postgres via `DATABASE_URL`.
- Add blocks in the editor and manage state with undo/redo.

## Gaps and Limitations

- No drag-and-drop/resize interactions yet.
- No inline rich text editing (TipTap) yet.
- Editor is not persisting pages to the API; no CRUD endpoints wired for pages.
- Runtime SSR integration with editor data not implemented.
- Authentication and asset upload pipeline not implemented.

## 📋 M1 — Drag & Drop Canvas

- Status: In progress
- Focus: Native Pointer Events; selection, drag/resize with 8px snapping, keyboard nudging; undo/redo coalescing; basic visual guides.

### M1 Progress
- [x] Data model: frame `{ x, y, width, height }`, `zIndex`
- [x] Store: selection state and `interactionMode`
- [x] Pointer input layer: `pointerdown/move/up/cancel` with capture
- [x] Hit-testing: topmost block by `zIndex` and frame
- [x] Drag with 8px grid snapping and bounds clamping
- [ ] Resize handles with min-size constraints
- [x] Marquee selection (rubber-band)
- [ ] Keyboard: arrows (1px), Shift+arrows (10px), Delete, Esc
- [ ] Visual aids: grid overlay, selection rect, handles
- [x] Undo/redo: coalesce during interaction, commit on end
- [ ] Edge cases QA: high-DPI, iframes overlay, 200+ blocks perf

## Next Plans (Short-Term)

1. Implement drag-and-drop in editor canvas using native Pointer Events (no external libs) with grid snapping.
2. Add inline text editing (TipTap) for text blocks.
3. Define API contracts for Page CRUD and connect editor save/load.
4. Add Prisma service and Page endpoints in API; wire to Postgres.
5. Implement runtime page rendering from stored JSON tree.

## Next Plans (Mid-Term)

6. Asset management: upload API, S3/MinIO storage, and UI.
7. Authentication: session/JWT, basic email login.
8. Responsive preview and breakpoint-specific styles in editor.
9. Publishing pipeline: build artifacts and expose publish URL.
10. Tests and type-check CI, linting across workspaces.

## Operational Notes

- Use `npm run prisma:generate --workspace=@site-builder/api` after schema changes.
- Run `npm run dev` at repo root to start all apps.
- Ensure `.env` exists in `apps/api/` with `DATABASE_URL`.
