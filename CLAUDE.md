# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Trizbort.io is a browser-based TypeScript implementation of Trizbort, the adventure game mapping and code generation software. It's a JAMstack application with no server backend - everything runs client-side. Users create interactive maps for text adventure games and generate code for various adventure design systems.

The repository contains **two independent builds**:

1. **The app** (repo root) - the Trizbort editor itself, built with Vite. Deployed to `https://www.trizbort.io/app/`.
2. **The marketing site** (`site/`) - a blog/landing site built with Eleventy (11ty). Deployed to `https://www.trizbort.io/`.

They have separate `package.json` files, separate `node_modules`, and are built and deployed separately.

## Build Commands

### App (repo root)

```bash
npm install           # Install dependencies
npm run dev           # Vite dev server on port 3000 (HMR)
npm run build         # Production build -> dist/
npm run preview       # Serve the production build locally
npm run build:icons   # Regenerate public/icons.svg from svg/
```

The app uses `base: '/app/'`, so the dev server serves it under `http://localhost:3000/app/`.

### Marketing site (`site/`)

```bash
cd site
npm install
npm run dev           # Eleventy with --serve
npm run build         # Production build -> site/_site/
```

Blog posts are Markdown files in `site/posts/` named `YYYY-MM-DD-slug.markdown`, with front matter (`layout: post`, `title`, `date`, `categories`). Eleventy's permalink scheme derives the output filename from the **title**, not the source filename.

## Build Pipeline

Vite bundles `src/main.ts` into hashed ES modules in `dist/`. There is no intermediate compile step and no single `app.js` bundle.

- **TypeScript** - type-checked via `tsconfig.json` (target ES2020, ESNext modules, `noEmit: true`). Vite/esbuild does the actual transpiling; tsc never emits.
- **CSS** - plain CSS in `css/`, entry `css/main.css`, which `@import`s the rest. Processed by PostCSS (`postcss-nesting`, `autoprefixer`). Imported from `src/main.ts`.
- **Handlebars** - templates live next to the code that uses them as `.handlebars` files. `src/templates/index.ts` imports every one with Vite's `?raw` suffix, compiles them at runtime, and registers them on `Handlebars.templates`. The wrapper sets `allowProtoPropertiesByDefault`/`allowProtoMethodsByDefault` so templates can read class getters (e.g. `map.rooms`). Handlebars is also assigned to `window.Handlebars` for backward compatibility. **Adding a new template means adding an import and a registry entry in `src/templates/index.ts`** - they are not auto-discovered.
- **SVG sprite** - `scripts/build-svg-sprite.js` combines `svg/*.svg` into `public/icons.svg`. A custom Vite plugin (`svgSpritePlugin` in `vite.config.ts`) runs it at the start of every build and watches `svg/` in dev. `public/icons.svg` is generated and gitignored.
- **Legacy support** - `@vitejs/plugin-legacy` emits parallel `*-legacy-*.js` chunks plus polyfills (targets: `defaults, not IE 11`).
- **PWA** - `vite-plugin-pwa` in `generateSW` mode with `registerType: 'prompt'`, emitting `sw.js` and `workbox-*.js`.
- **Static copy** - `vite-plugin-static-copy` copies `maps/` (sample maps) into `dist/`.
- Source maps are enabled for production builds.

Key config files:
- `vite.config.ts` - build config, base path, plugins
- `tsconfig.json` - TypeScript config (type-checking only)
- `postcss.config.js` - PostCSS plugins
- `site/.eleventy.js` - Eleventy config for the marketing site

Note: `dist/`, `site/_site/` and `public/icons.svg` are all gitignored. Build artifacts never get committed.

## Deployment

**Deployment is entirely manual. There is no CI/CD.** No GitHub Actions workflow, no Netlify/Vercel/Firebase config, no deploy script. Merging a PR on GitHub changes nothing on the live site - somebody has to build locally and upload.

The live site is served from cPanel-style shared hosting running LiteSpeed. Credentials are not in this repo.

### Procedure

1. `git pull` to get the merged PRs.
2. `npm install` in whichever tree has dependency changes (skip if the lockfiles haven't moved).
3. Build whichever half changed:
   - App source changed -> `npm run build` (repo root)
   - Blog post or site content changed -> `cd site && npm run build`
4. Upload:
   - `dist/*` -> the server's `/app/` directory
   - `site/_site/*` -> the server's web root

Uploading is done by zipping the build output, transferring the single archive, and extracting it in place on the server. Paths inside the archive are relative to the build output root (so `index.html` sits at the top level, not nested under `dist/`).

### Things to watch out for

- **Vite empties `dist/` on every build.** Any zip left sitting in `dist/` from a previous deploy is destroyed by the next `npm run build`. Create the archive after building, not before.
- **Asset filenames are content-hashed.** Extracting a new build over an old one leaves orphaned `index-*.js`/`index-*.css` files behind. They're harmless - nothing references them - but the `/app/` directory accumulates cruft over time and benefits from an occasional clean-out.
- **The two halves are independent.** A PR that only touches `src/` needs only the `/app/` upload; a new blog post needs only the web root upload.
- **A service worker is in play.** Because `registerType` is `'prompt'`, returning visitors may need a reload before they pick up a new app build.

## Architecture

### Core Components

**App** (`src/App.ts`) - Singleton holding global state:
- `App.map` - Current map being edited
- `App.zoom`, `App.centerX`, `App.centerY` - View state
- `App.undoStack` - Undo history (JSON snapshots, max 100)
- `App.selection` - Current selection

**Dispatcher** (`src/Dispatcher.ts`) - Central event system using Observer pattern:
- `Dispatcher.subscribe(subscriber)` / `Dispatcher.unsubscribe(subscriber)`
- `Dispatcher.notify(event, obj)` - Broadcasts events to all subscribers
- Subscribers implement `notify(event: AppEvent, obj: any)` method

**Editor** (`src/Editor.ts`) - Main controller handling canvas interaction, mouse/keyboard events, and rendering orchestration.

Entry point is `src/main.ts`, which imports the stylesheet, registers Handlebars templates, calls `App.initialize()`, and adds the `loaded` class to `<body>` to reveal the UI (avoiding FOUC).

### Model-View Separation

**Models** (`src/models/`):
- `Model` - Base class with ID, dirty flag, clone support, z-ordering
- `Room`, `Connector`, `Note`, `Block` - Map entities
- `Map`, `MapSettings` - Map container and configuration

**Views** (`src/views/`):
- Corresponding view classes handle rendering logic
- `ViewFactory` creates appropriate view for each model type

### UI Structure

**Controls** (`src/controls/`) - Reusable UI components (idInput, idColorPicker, idCheck, idTextarea, idRange, etc.)

**Panels** (`src/panels/`) - Side panels for editing properties (roomPanel, connectorPanel, notePanel, blockPanel, mapPanel, renderPanel, menuPanel, toolPanel)

**Popups** (`src/popups/`) - Dialog popups for detailed entity editing

### Code Generation

**CodeGenerator** (`src/codegen/CodeGenerator.ts`) - Base class with utility methods (removeAccents, camelCase, className, dirToStr)

Concrete generators in `src/codegen/`:
- `alan2/`, `alan3/`, `inform6/`, `inform7/`, `quest/`, `tads/`, `textadventurejs/`, `yaml/`, `zil/`

Each implements `generate(): string` to produce code for that system.

### Rendering

Two canvas layers:
- `bg-canvas` - Background grid
- `main-canvas` - Map elements

Hit testing uses a 1x1 pixel canvas with color-coded IDs for click detection.

### Serialization

`src/io/` contains:
- `mapJSON.ts` - JSON serialization (used for undo, local storage)
- `mapXML.ts` - XML import/export
- `@Xml` decorator for XML field metadata

## Key Patterns

- **Singleton**: App class for global state
- **Observer**: Dispatcher for event propagation
- **Factory**: ViewFactory for view creation
- **Template Method**: CodeGenerator base with concrete implementations
