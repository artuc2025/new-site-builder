# 🎯 Tasks & Progress

Track all implementation tasks with their completion status.

## 📋 M1 — Drag & Drop Canvas

- [x] Data model: add `frame { x, y, width, height }` and `zIndex`
- [x] Store: selection state and `interactionMode`
- [x] Pointer input layer: `pointerdown/move/up/cancel` with capture
- [x] Hit-testing: topmost block by `zIndex` and frame
- [x] Drag with 8px grid snapping and bounds clamping
- [x] Resize handles (N,S,E,W,NE,NW,SE,SW) with min-size
- [x] Marquee selection (rubber-band) on empty canvas drag
- [x] Keyboard: arrows (1px) and Shift+arrows (10px), Delete, Esc
- [ ] Visual aids: grid overlay toggle, selection rect and handles
- [x] Undo/redo: coalesce during interaction, commit on end
- [ ] Edge cases: high-DPI scaling, iframes overlay, 200+ blocks perf

### M1.1 — Data model
- [x] Define `Frame` type in `@site-builder/types` (`{ x, y, width, height }`)
- [x] Extend block base type with `frame: Frame` and `zIndex: number`
- [x] Provide defaults for blocks in `@site-builder/blocks` (sensible initial sizes)
- [x] Update editor store state to include `selectedBlockIds`, `hoveredBlockId`, `interactionMode`
- [x] Add selectors: `getBlockById`
- [x] Add selectors: `getTopmostAtPoint`, `getBlocksInRect`
- [ ] Add util helpers: `snapToGrid(8)`, `clampToCanvas`, `coalesceHistory`
- [x] Ensure Immer-based immutable updates for move/resize primitives
- [ ] Backfill existing pages/seed to include `frame` and `zIndex`

### M1.2 — Pointer and Selection
- [x] Click selection (single/multi with Shift)
- [x] Hover highlight on blocks
- [x] Empty-area click clears selection
- [x] Marquee selection with overlay rectangle
- [x] Group drag when multiple selected (click on any selected)

### M1.3 — Drag Move
- [x] Pointer capture and drag-start state
- [x] Absolute updates from initial frames (no compounding)
- [x] Snap to 8px grid during move
- [x] Clamp origin to canvas bounds (x,y ≥ 0)
- [x] One-step history commit on release

### M1.4 — Resize (next)
- [x] Display resize handles for single selection
- [x] Start resize with pointer capture and handle direction
- [x] Apply size deltas with min-size constraints
- [x] Snap edges to 8px grid and clamp to canvas
- [x] Commit one history step on release

### M1.5 — Keyboard (next)
- [x] Arrow keys nudge 1px; Shift+Arrow nudge 10px
- [x] Delete removes selection; Esc clears selection
- [x] Coalesce nudges into single history step while key held

### M1.6 — Visual Aids (next)
- [x] Grid overlay toggle
- [x] Selection rectangle and handle styling
- [ ] Basic alignment guides (non-magnetic)

### M1.7 — Edge Cases & QA (next)
- [ ] HiDPI/zoom correctness of pointer coords and snapping
- [ ] Interaction overlay for media/iframes
- [ ] Perf sanity with 200+ blocks
- [x] Smoke test: render frames in canvas positioning (no interactions yet)

**Status**: In progress  
**Exit Criteria**: Blocks can be selected, dragged and resized with 8px snapping; keyboard nudging works; undo/redo preserves interactions without extra steps

---

## 📝 M2 — Inline Text Editing

- [ ] Install TipTap in editor package
- [ ] Create rich text editor component
- [ ] Map TipTap content to block props
- [ ] Add text sanitization
- [ ] Implement serialization/deserialization
- [ ] Integrate with Text block
- [ ] Integrate with Hero block (title/subtitle)
- [ ] Add basic formatting toolbar

**Status**: Not started  
**Exit Criteria**: Text can be edited inline, saved in state, with rich formatting

---

## 💾 M3 — Persistence API (Pages)

- [ ] Define API contracts (DTOs for Project/Page CRUD)
- [ ] Create PrismaService in API
- [ ] Create Project repository/service
- [ ] Create Page repository/service
- [ ] Implement GET /projects endpoint
- [ ] Implement POST /projects endpoint
- [ ] Implement GET /projects/:id/pages endpoint
- [ ] Implement POST /projects/:id/pages endpoint
- [ ] Implement PUT /pages/:id endpoint
- [ ] Implement GET /pages/:id endpoint
- [ ] Add validation with Zod
- [ ] Add error handling middleware
- [ ] Connect editor to API (save/load pages)
- [ ] Wire up project selector in editor UI

**Status**: Not started  
**Exit Criteria**: Editor can save/load pages from API, all CRUD operations work

---

## 🌐 M4 — Runtime Rendering

- [ ] Create rendering helper function (JSON tree → HTML)
- [ ] Implement dynamic page route `[...slug].vue`
- [ ] Map all block types to runtime components
- [ ] Add block prop serialization
- [ ] Implement SSR rendering pipeline
- [ ] Test rendering with real page data
- [ ] Add error boundaries for invalid blocks
- [ ] Optimize rendering performance

**Status**: Not started  
**Exit Criteria**: Visiting runtime shows fully rendered stored page content

---

## 🖼️ M5 — Asset Management

- [ ] Install S3/MinIO SDK
- [ ] Create asset upload API endpoint
- [ ] Implement storage adapter interface
- [ ] Add file validation (type, size)
- [ ] Create asset picker UI component
- [ ] Connect to Image block props
- [ ] Add asset library sidebar in editor
- [ ] Implement asset deletion
- [ ] Add asset preview/thumbnail generation

**Status**: Not started  
**Exit Criteria**: Images upload to storage, accessible in editor/runtime

---

## 🔐 M6 — Authentication

- [ ] Install Auth.js or configure JWT
- [ ] Create login/register UI in editor
- [ ] Implement authentication endpoints
- [ ] Add session management
- [ ] Create auth guards in API
- [ ] Protect project/page routes
- [ ] Add workspace management
- [ ] Implement role-based access

**Status**: Not started  
**Exit Criteria**: Users can sign up/login, projects scoped to user/workspace

---

## 📱 M7 — Responsive Editing

- [ ] Extend block style schema with breakpoint support
- [ ] Create breakpoint switcher UI
- [ ] Update editor store to handle per-breakpoint styles
- [ ] Add responsive canvas container
- [ ] Implement per-breakpoint grid areas
- [ ] Add device preview sizes
- [ ] Create responsive property panel
- [ ] Save breakpoint data to PageTree

**Status**: Not started  
**Exit Criteria**: Layout/styles differ per breakpoint, editor supports responsive editing

---

## 🚀 M8 — Publishing Pipeline

- [ ] Install job queue (BullMQ)
- [ ] Create publishing service
- [ ] Implement static HTML export
- [ ] Generate CSS from block styles
- [ ] Upload artifacts to CDN
- [ ] Create publish status tracking
- [ ] Add publish button in editor
- [ ] Implement publish history
- [ ] Add rollback functionality

**Status**: Not started  
**Exit Criteria**: Projects publish to public URL, status tracked in DB

---

## ✅ M9 — QA, Tests & CI

- [ ] Set up Vitest for unit tests
- [ ] Write tests for editor store
- [ ] Write tests for API endpoints
- [ ] Write tests for rendering logic
- [ ] Set up Playwright for e2e tests
- [ ] Configure GitHub Actions CI
- [ ] Add type-checking step
- [ ] Add linting step
- [ ] Add test coverage reporting
- [ ] Fix all type errors
- [ ] Pass all tests

**Status**: Not started  
**Exit Criteria**: CI is green, tests pass, no type errors

---

## 🎉 Additional Enhancements

- [ ] Add dark mode
- [ ] Add animations/transitions to blocks
- [ ] Create template library
- [ ] Add undo tree UI (not just linear)
- [ ] Add block duplication
- [ ] Add block grouping/nesting
- [ ] Add custom CSS support
- [ ] Add SEO meta fields
- [ ] Add analytics integration

---

**Last Updated**: Today  
**Progress**: 0/9 milestones complete


