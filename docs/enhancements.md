# Enhancements and Optimization Proposals

This document captures follow-up improvements after each implementation. Focus areas: performance, UX polish, code quality, maintainability.

## M1 — Drag & Drop Canvas

### Current Choices
- Native Pointer Events; no external DnD libs
- Store-driven source of truth (Pinia)
- History commits on interaction end; live updates during move/resize
- 8px snapping; bounds clamp; min-size 32px

### Proposed Improvements
1) Ephemeral Preview Layer (recommended)
- Do not mutate store during move/resize. Keep `previewRect(s)` locally (component or composable) and render via inline style or CSS transform.
- Commit a single change to the store on pointerup. Pros: fewer writes, simpler undo, avoids proxy conflicts, smoother FPS.

2) Pure Geometry Helpers
- Add utils:
  - `snap(value, grid)` / `snapPoint(x, y, grid)`
  - `clampRect(rect, bounds)`
  - `resizeByHandle(baseRect, dir, dx, dy, minSize)`
  - `applyDelta(baseRect, dx, dy)`
- Unit-test helpers (min size, bounds, negative deltas).

3) rAF Throttling
- Throttle pointermove with `requestAnimationFrame`.
- Keep last event and apply per frame to reduce layout work.

4) Zoom and Scroll Awareness
- Track canvas scale/scroll; transform pointer coords accordingly.
- Snap in consistent space (world/grid).

5) Group Resize (future)
- Compute group bbox and scale children; enforce per-child min-size.

6) Re-enable Immer Auto-Freeze
- After ephemeral preview, restore `setAutoFreeze(true)` for safer immutable updates in store.

7) Code Organization
- Extract interactions into a composable (e.g. `useCanvasInteractions.ts`).
- Split overlays into components: `SelectionOverlay.vue`, `ResizeHandles.vue`.

8) Testing
- Unit tests for geometry helpers.
- Playwright e2e: select, drag, resize, marquee, keyboard nudge.

9) Selector Performance
- `getBlockById` getter currently performs a linear search through `tree.body`.
- For large pages, consider maintaining an `id -> index` map in store state, updating on add/remove/reorder. This reduces lookups to O(1) and simplifies multi-selection operations.
 - Adopted: introduced `idToIndex` map in editor store; rebuilds on undo/redo/delete; updates on add. Callers now use O(1) lookup paths.

10) Adoption Status
- Introduced `snapToGrid(value, grid=8)` in `apps/editor/composables/geometry.ts`.
- Refactored drag/resize code paths in `CanvasComponent.vue` to use it.
 - Added Delete/Esc keyboard handling; consider debounced delete confirmation for multi-select to avoid accidental removal.
 - Applied rAF throttling for `@pointermove` in `CanvasComponent.vue`: keep last pointer coords, gate updates with `requestAnimationFrame`, compute guides and snapping once per frame. Observed smoother drag and fewer store writes.
 - Implemented ephemeral drag preview: during drag we only update a local `dragPreview` map and render via `transform: translate(...)`; on `pointerup` commit absolute frames once and push a single history step.
 - Implemented ephemeral resize preview: during resize, compute clamped/snapped rect each frame into `resizePreview` and render size/position live; commit final rect on `pointerup`.

11) Focus & Pointer Interop in Editor
- Wrapped rendered block content with `pointer-events: none` and `select-none` in the editor canvas to prevent inner links/controls (e.g., Hero CTA) from stealing focus.
- Used `@click.prevent` on selection wrapper to avoid navigation in edit mode.
- Adopted: explicit Preview mode toggles pointer events back on and disables editor interactions; toolbar button in `apps/editor/pages/editor.vue` switches modes.
 - Added UX: visible "Preview" badge on canvas and Ctrl/Cmd+P hotkey to toggle.
- Disabled text selection during interactions (set `user-select: none` on root and cleared selection) and set `touch-action: none` on canvas to avoid browser gestures interfering with drag/resize.

12) Geometry Helper Adoption
- Added `clampToCanvas(value, min, max)` and refactored drag clamping to use it.
- Completed: reused in resize and keyboard nudge paths for consistency.

13) Grid Overlay
- Implemented simple 8px grid overlay with CSS gradients; non-interactive and toggleable.
- Future: color/opacity settings, adaptive density per zoom, and subgrid highlights at larger scales.

14) Selection & Handles UX
- Selection ring: thinner, higher-contrast ring with subtle offset and shadow for better visibility on light/dark content.
- Handles: 6px size, hover scale, slightly stronger border on hover; positioned with half-size offsets to sit flush at edges.
- Marquee: dashed border, повышенный контраст и лёгкая подложка для лучшей видимости на разном фоне.
- Future: show handles only on hover when selected, and keyboard-focus outline for accessibility.

15) Add Flow UX
- New blocks are auto-selected and assigned topmost `zIndex` (max+1) to ensure visibility and immediate editability.

16) Alignment Guides
- Added simple non-magnetic alignment guides within 5px tolerance (edges and centers).
- Future: snapping (magnetism) with threshold, guide prioritization, and toggle.
 - Enabled basic magnetism: blocks snap to nearest guide within 5px.

17) Guides Visibility vs Magnetism
- Развязать визуальные направляющие и магнитизм: `guidesEnabled` управляет только отрисовкой линий, а `snapEnabled` и `snapThreshold` — логикой прилипания.
- Пользователь может скрывать линии, сохраняя выравнивание по сетке/направляющим.

### Migration Plan (small steps)
- Step 1: Introduce pure helpers and switch callers.
- Step 2: Drag preview state + commit on release.
- Step 3: Resize preview state + commit; re-enable Immer auto-freeze.
- Step 4: rAF throttling.
- Step 5: Zoom/scroll support.

---

Add future entries here for subsequent milestones (M2, M3, ...).
