# 🎯 Tasks & Progress

Track all implementation tasks with their completion status.

## 📋 M1 — Drag & Drop Canvas

- [ ] Install interact.js in editor package
- [ ] Create drag/drop service utility
- [ ] Implement grid snapping logic (12-column grid)
- [ ] Add visual grid guides on canvas
- [ ] Hook up drag events to update block positions in store
- [ ] Add resize handles with constraints
- [ ] Implement keyboard nudging (arrow keys)
- [ ] Add selection highlighting on canvas
- [ ] Ensure undo/redo works with position changes

**Status**: Not started  
**Exit Criteria**: Blocks can be dragged/resized with grid snapping, undo/redo preserved

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


