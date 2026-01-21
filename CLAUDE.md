# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Trizbort.io is a browser-based TypeScript implementation of Trizbort, the adventure game mapping and code generation software. It's a JAMstack application with no server backend - everything runs client-side. Users create interactive maps for text adventure games and generate code for various adventure design systems.

## Build Commands

```bash
npm install           # Install dependencies
grunt build           # Full build (compiles TS, Stylus, Handlebars, creates SVG sprite, minifies)
grunt watch           # Watch mode - auto-rebuild on file changes
npm run start:dev     # Start Express dev server on port 3000
```

Individual build tasks:
```bash
grunt css             # Build CSS only (Stylus → style.css)
grunt typescript      # Compile TypeScript only
```

Access the app at `http://localhost:3000/index.html` after starting the dev server.

## Build Pipeline

TypeScript compiles to a single bundled file `dist/app.js` using SystemJS module format. Handlebars templates compile to `dist/handlebars.js`. Both are uglified into `dist/app.min.js`.

Key config files:
- `tsconfig.json` - TypeScript config (target ES5, SystemJS modules, single output file)
- `Gruntfile.js` - Build task definitions

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
- `alan2/`, `alan3/`, `inform7/`, `quest/`, `tads/`, `textadventurejs/`, `yaml/`, `zil/`

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
