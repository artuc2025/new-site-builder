# 🧱 Site Builder

Visual no-code website builder in the style of Tilda/Webflow.

## Quick Start

```bash
# Install dependencies
npm install  # ✅ Dependencies installed successfully

# Set up database (copy env example in apps/api/)
# cp apps/api/env.example apps/api/.env

# Generate Prisma client
npm run prisma:generate --workspace=@site-builder/api

# Start development
npm run dev
```

### Available Commands

```bash
npm run dev          # Start all apps
npm run dev:editor   # Start editor only
npm run dev:api      # Start API only
npm run dev:runtime  # Start runtime only
```

### URLs

- Editor: http://localhost:3000
- API: http://localhost:3001

## Current Implementation

✅ **Monorepo Setup**
- Workspace configuration with Turbo
- Shared packages: types, blocks, schemas, UI
- Proper package resolution with Vite aliases in Nuxt

✅ **Packages**
- `@site-builder/types` - TypeScript definitions
- `@site-builder/blocks` - Vue components (Hero, Text, Image, Button, Gallery, Section)
- `@site-builder/ui` - Reusable UI components
- `@site-builder/schemas` - Zod validation schemas

✅ **Editor App**  
- Pinia store with Immer for state management
- Canvas component for rendering blocks
- Undo/redo support structure
- Block configuration system

✅ **API & Database**
- PostgreSQL connected via `DATABASE_URL`
- Prisma schema and initial migration applied
- NestJS API with environment-based configuration

## Next Up

- Finish M1 gaps in `apps/editor`:
  - Keyboard: coalesced nudges while key is held
  - Helpers/selectors: `coalesceHistory`
  - Edge cases & QA: HiDPI/zoom, iframe overlay, perf with 200+ blocks

### Next 10 Micro-steps
- Snap toggle in canvas toolbar (default on)
- Snap threshold control (default 5–8px)
- Guides toggle (default on)
- Throttle pointermove with requestAnimationFrame
- Ephemeral drag preview; commit on pointerup
- Ephemeral resize preview; commit on pointerup
- Show resize handles only on hover
- Improve selection rectangle styling
- Maintain id→index map in store
- Preview mode toggle (re-enable pointer events)
- M2: Inline text editing (TipTap) for Text/Hero blocks
- M3: Page persistence (API contracts, Prisma service, CRUD; connect editor)
- DX: add `.env.example` for API, add runtime URL here, unify scripts

Suggested default: close remaining M1 items, then start M2 while drafting M3 contracts.

### Priority 1 (M1 Edge Cases)
- HiDPI/zoom correctness: introduce canvas scale/zoom, transform pointer coords to world space; make snap/grid/guides scale-aware; verify at DPR 1.25/1.5/2.
- Media/iframes overlay during interactions to prevent event stealing.
- Performance with 200+ blocks: rAF throttle pointermove; ephemeral drag/resize preview; id→index map; benchmark and watch FPS/jank.
- Helpers/history: implement `coalesceHistory` util, avoid empty steps.
- Toggles after stabilization: Snap toggle + threshold, Guides toggle, Preview mode.
- Seed/backfill (last): add `frame`/`zIndex` to seeds/existing pages.

## 📋 M1 — Drag & Drop Canvas (no external libs)

**Goal**: Native drag, resize, and selection on the editor canvas using Pointer Events and Vue reactivity. No external DnD/gesture libraries.

### Constraints
- Use native Pointer Events and passive listeners where appropriate
- Single source of truth in Pinia; all mutations go through store actions
- Integrate with undo/redo history; coalesce moves into a single history step
- Grid snapping default: 8px; configurable later
- Respect canvas bounds; enforce minimum block size

### Tasks
1) Data model for layout
   - Add `frame` to blocks: `{ x, y, width, height }` in canvas pixels
   - Add `zIndex` field (simple stacking order)
   - Derived selectors for hit-testing rectangles

2) Selection state in store
   - `selectedBlockIds`, `hoveredBlockId`
   - `interactionMode`: 'idle' | 'drag' | 'resize' | 'marquee'

3) Pointer input layer on canvas
   - Unified handlers: `pointerdown`, `pointermove`, `pointerup`, `pointercancel`
   - Pointer capture on drag start; prevent text selection during interactions
   - Touch support (no gestures; single-pointer for M1)

4) Hit-testing and focus
   - Determine topmost block under pointer by `zIndex` and frame
   - Click to select; Shift-click to toggle selection

5) Drag move with grid snapping
   - Compute deltas from initial pointer position
   - Apply snapping to grid; clamp to canvas bounds
   - Coalesce move updates; commit final state on `pointerup`

6) Resize handles (N, S, E, W, NE, NW, SE, SW)
   - Show handles when a single block is selected
   - Resize with snap and min-size constraints

7) Marquee selection (rubber-band)
   - Drag on empty space creates a rect; select blocks intersecting the rect

8) Keyboard interactions
   - Arrow keys nudge by 1px; Shift+Arrow by 10px
   - Delete removes selected blocks; Esc clears selection

9) Visual aids
   - Grid overlay toggle; selection rectangle and resize handles
   - Optional alignment guides to nearest edges (basic, no magnetism in M1)

10) Undo/redo integration
   - Begin history step on interaction start; finalize on end
   - Nudge keys create single coalesced steps while key is held

11) Edge cases and QA
   - High-DPI/zoom scaling correctness
   - Interaction over iframes/media blocks (use overlay)
   - Performance with 200+ blocks

### Out of scope for M1 (planned next)
- Rich text inline editing
- Persistence (Page CRUD) and SSR runtime wiring
- Responsive breakpoints and per-breakpoint frames
- Advanced alignment guides with magnetic snapping

### Quick Links
- [ ] Tasks for M1 — see [docs/tasks.md#-m1--drag--drop-canvas](docs/tasks.md#-m1--drag--drop-canvas)
- [ ] Status tracker — see [docs/status.md#-m1--drag--drop-canvas](docs/status.md#-m1--drag--drop-canvas)

### Contribution Rule: Document Enhancements
- After each implementation, record optimization ideas and “better variants” in `docs/enhancements.md`.
- Focus on: reducing component size/complexity, avoiding duplication, performance (rAF, preview state), and maintainability (pure helpers/composables).

### Troubleshooting

- Windows: If you see a casing error like
  "File name ... differs from already included file name only in casing",
  ensure TypeScript doesn't enforce file name casing. We've set
  `forceConsistentCasingInFileNames: false` across tsconfigs to avoid
  mixed-path casing from tools and global Vue types on Windows.

## Documentation

See [docs/README.md](docs/README.md) for complete documentation. Also see status updates in [docs/status.md](docs/status.md), the implementation plan in [docs/plan.md](docs/plan.md), and track progress in [docs/tasks.md](docs/tasks.md).

## Project Structure

- `apps/editor` - Visual page editor (Nuxt 3)
- `apps/runtime` - SSR rendering engine  
- `apps/api` - Backend API (NestJS + Prisma)
- `packages/` - Shared packages (types, schemas, UI, blocks)

## Tech Stack

- **Frontend**: Nuxt 3, Vue 3, Pinia, TailwindCSS
- **Backend**: NestJS, PostgreSQL, Prisma
- **Monorepo**: Turbo

## License

MIT

