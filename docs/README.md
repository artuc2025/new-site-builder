# 🧱 No-Code Website Builder (Tilda-style)

## 📖 Overview

**No-Code Builder** — визуальный конструктор сайтов в стиле **Tilda/Webflow**.  
Позволяет создавать страницы из готовых блоков (Hero, Gallery, Footer и т.д.), редактировать контент прямо на Canvas (inline), изменять layout drag-and-drop интерфейсом и публиковать сайты без кода.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL 14+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Generate Prisma client
npm run prisma:generate --workspace=@site-builder/api

# Run database migrations
npm run migration:apply --workspace=@site-builder/api
```

### Development

```bash
# Start all apps in development mode
npm run dev

# Or start individual apps:
npm run dev:editor    # Visual editor (Nuxt 3)
npm run dev:api       # Backend API (NestJS)
npm run dev:runtime   # SSR runtime (Nuxt 3)
```

### Environment Setup

Create `.env` file in `apps/api/`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/sitebuilder"
JWT_SECRET="your-secret-key"
```

### Building

```bash
# Build all apps
npm run build

# Build individual apps
npm run build --workspace=@site-builder/editor
npm run build --workspace=@site-builder/api
npm run build --workspace=@site-builder/runtime
```

---

## ⚙️ Tech Stack

### Frontend
- **Nuxt 3 + Vue 3 + TypeScript**
- **Pinia** — управление состоянием редактора и проектов
- **TailwindCSS** — дизайн-токены и сетка
- **interact.js** — drag & resize по DIV’ам
- **TipTap** — inline text editor
- **Immer** — undo/redo через патчи
- **Axios / Fetch API** — взаимодействие с API
- **Vite** — сборка

### Backend
- **NestJS (Fastify)** — REST API
- **PostgreSQL + Prisma ORM**
- **S3 / MinIO** — хранение ассетов
- **BullMQ** — задачи публикации и генерации превью
- **Auth.js** — аутентификация (email + OAuth)

---

## 🧩 Monorepo Structure

/apps
/editor → Visual builder (Nuxt3)
/runtime → SSR-render engine
/api → Backend (NestJS)
/packages
/ui → UI kit components
/blocks → Library of predefined blocks
/schemas → JSON schemas for page structure
/types → Shared TypeScript types
/docs
/architecture.md
/api-contracts.md
/components.md
/deployment.md
/changelog.md


---

## 🗂️ Core Entities

| Entity | Purpose |
|--------|----------|
| **User** | Аккаунт пользователя |
| **Workspace** | Пространство для проектов |
| **Project** | Отдельный сайт |
| **Page** | Страница внутри проекта |
| **Block** | Компонент (Hero, Text, Image...) |
| **Revision** | История изменений страницы |
| **Asset** | Медиа-файл |
| **Template** | Сохранённый набор блоков |
| **Publish** | Сборка и публикация проекта |

---

## 🧠 Page Tree Schema (JSON)

```json
{
  "version": 1,
  "meta": { "breakpoints": ["lg", "md", "sm"] },
  "body": [
    {
      "type": "Section",
      "id": "sec_1",
      "grid": { "cols": 12, "gap": 16 },
      "children": [
        {
          "type": "Hero",
          "id": "hero_1",
          "gridArea": {
            "lg": "1 / 1 / span 4 / span 12"
          },
          "props": {
            "title": { "text": "Build faster", "variant": "h1" },
            "subtitle": { "text": "No-code sites in minutes" },
            "cta": { "label": "Get started", "href": "#" },
            "image": { "assetId": "asset_123" }
          }
        }
      ]
    }
  ]
}

🧱 Editor Architecture
Canvas

CSS Grid (12 columns, snap grid)

Drag/Resize (interact.js)

Inline text editing (TipTap)

Inspector (отступы, фон, цвет, типографика)

Layers panel + Breakpoint switcher

State Example

``` typescript
interface EditorState {
  tree: PageTree
  selectedId: string | null
  history: Patch[]
  future: Patch[]
  breakpoint: 'lg' | 'md' | 'sm'
}
🔄 Undo / Redo Logic

import { defineStore } from 'pinia'
import produce, { enablePatches } from 'immer'
enablePatches()

export const useEditor = defineStore('editor', {
  state: () => ({ tree: {}, past: [], future: [] }),
  actions: {
    apply(mutator) {
      const [next, patches, inverse] = produce.withPatches(this.tree, mutator)
      this.past.push(inverse)
      this.future = []
      this.tree = next
    },
    undo() { /* ... */ },
    redo() { /* ... */ }
  }
})


🧮 DnD Snap Logic
function snapToGrid(x: number, colWidth: number, cols: number) {
  const colStart = Math.max(1, Math.round(x / colWidth))
  return Math.min(colStart, cols)
}
🚀 Publishing Flow

SSR-рендер страниц (Nuxt runtime).

Генерация HTML + CSS + assets.

Загрузка на S3/CDN.

Доступ по публичному URL:

https://{workspace}.yourbuilder.app/{project}


🧾 Development Rules

Все файлы строго типизированы (.ts, <script setup lang="ts">)

Компоненты ≤ 200 строк; бизнес-логика в composables/

Каждый новый модуль описывается в /docs/architecture.md

PR без обновления README — отклоняется

Визуальные изменения — Figma link или screenshot

Коммиты следуют формату Conventional Commits:

feat(editor): add DnD snap grid
fix(api): correct asset upload url
docs(readme): update sprint summary

---

## 📋 Current Implementation Status

### ✅ Completed (Foundation Ready)
- **Monorepo Setup**: Turbo-based monorepo with workspace configuration ✅
- **Dependencies Installed**: All packages successfully installed and configured ✅
- **Shared Packages**: 
  - Types package with TypeScript interfaces ✅
  - Schemas package with Zod validation ✅
  - UI kit with Button, Input, Modal, Card components ✅
  - Blocks library with Hero, Text, Image, Button, Gallery, Section ✅
- **Editor App**: Nuxt 3 app with:
  - Pinia store with undo/redo (Immer patches) ✅
  - Editor interface (toolbar, sidebar, canvas, inspector) ✅
  - Block insertion and tree management ✅
- **API Backend**: NestJS with Prisma schema ✅
- **Runtime App**: Nuxt SSR rendering engine ✅
- **Database Schema**: PostgreSQL schema with all core entities ✅

### 🚧 Next Implementation Tasks
1. **Database Setup**: Configure PostgreSQL and run migrations
2. **Drag & Drop**: Implement interact.js integration for visual editing
3. **Inline Editing**: Add TipTap for rich text editing
4. **Inspector Panel**: Complete style editing (colors, spacing, typography)
5. **Asset Management**: File upload and S3 integration
6. **Authentication**: User auth with Auth.js
7. **Publishing Pipeline**: Build and deploy workflow
8. **Responsive Breakpoints**: Device preview and switching

### 🎯 Immediate Next Plan
1. Set up PostgreSQL database connection
2. Generate Prisma client and run migrations
3. Start development servers (`npm run dev`)
4. Test editor interface and block insertion
5. Begin implementing drag-and-drop functionality

---

## 📁 Project Structure

```
site-builder/
├── apps/
│   ├── editor/          # Visual page editor (Nuxt 3)
│   ├── runtime/         # SSR rendering engine (Nuxt 3)
│   └── api/             # Backend API (NestJS + Prisma)
├── packages/
│   ├── types/           # Shared TypeScript types
│   ├── schemas/         # JSON schemas & validation
│   ├── ui/              # UI kit components
│   └── blocks/          # Reusable page blocks
└── docs/                # Documentation
```

---

## 🤝 Contributing

1. Create a feature branch from `main`
2. Implement changes following the architecture guidelines
3. Update documentation in `/docs`
4. Follow Conventional Commits for commit messages
5. Submit PR with description of changes


