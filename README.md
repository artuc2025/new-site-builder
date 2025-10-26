# 🧱 Site Builder

Visual no-code website builder in the style of Tilda/Webflow.

## Quick Start

```bash
# Install dependencies
npm install  # ✅ Dependencies installed successfully

# Set up database (create .env file in apps/api/)
# DATABASE_URL="postgresql://user:password@localhost:5432/sitebuilder"

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

## Next Steps

- Implement drag-and-drop (interact.js) with grid snapping
- Add inline rich text editing (TipTap) for text blocks
- Connect editor to API: Page CRUD (save/load) with Prisma
- Implement runtime SSR rendering from stored JSON tree
- Add responsive breakpoint preview and per-breakpoint styles

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

