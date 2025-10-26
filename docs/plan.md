## Implementation Plan

### Scope
Build a visual no-code site builder (editor + API + runtime) with persistence, publishing, and responsive editing.

### Milestones

#### M1 — Drag & Drop Canvas
- Goals: Drag/resize blocks with grid snapping; keyboard nudge; selection.
- Tasks: Integrate interact.js; implement snap logic; visual guides; store updates.
- Exit: Blocks can be positioned/resized reliably with undo/redo.

#### M2 — Inline Text Editing
- Goals: Rich text for Text/Hero blocks with TipTap; basic marks and headings.
- Tasks: Add TipTap; map content to block props; sanitize/serialize.
- Exit: Text is edited inline and saved in state.

#### M3 — Persistence API (Pages)
- Goals: CRUD for Projects/Pages; Prisma service; DTO validation; errors.
- Tasks: Define contracts; implement NestJS controllers/services; Prisma queries.
- Exit: Editor can save/load pages from API.

#### M4 — Runtime Rendering
- Goals: SSR render JSON tree to HTML/CSS; route by slug.
- Tasks: Create rendering helper; dynamic page route; block mapping.
- Exit: Visiting runtime shows stored page content.

#### M5 — Assets
- Goals: Upload files; store metadata; serve via S3/MinIO.
- Tasks: Upload endpoint; storage adapter; UI picker; reference assets in blocks.
- Exit: Images upload and render in editor/runtime.

#### M6 — Authentication
- Goals: Basic auth (email/password or Auth.js/JWT); protected routes.
- Tasks: User model usage; sessions/JWT; guards in API; editor login UI.
- Exit: Projects and pages scoped to user/workspace.

#### M7 — Responsive Editing
- Goals: Breakpoint switcher; per-breakpoint styles/areas.
- Tasks: Extend block style schema; UI to edit per-breakpoint; preview sizes.
- Exit: Layout and styles differ per breakpoint.

#### M8 — Publishing Pipeline
- Goals: Build artifacts; host on public URL; track status.
- Tasks: Job queue; static export; upload to storage/CDN; status entity updates.
- Exit: Project can be published and accessed publicly.

#### M9 — QA, Tests, CI
- Goals: Type safety; linting; unit/e2e tests; CI workflows.
- Tasks: Vitest/Playwright; GitHub Actions; pre-push hooks.
- Exit: Green CI with tests and checks.

### Dependencies & Ordering
M1 → M2 → M3 → M4, then M5/M6 can proceed in parallel, followed by M7 and M8, wrap with M9.

### Deliverables per Milestone
- Code changes, docs update (`docs/status.md`), and demo notes.


