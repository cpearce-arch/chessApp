# Pokémon Chess 3D

Local **3D chess** with stylized **Pokémon-themed** pieces (original low-poly models, not official Nintendo assets). Built with React, React Three Fiber, `chess.js`, and **Electron** for a Mac desktop app.

## Requirements (Mac)

- [Node.js](https://nodejs.org/) 20+ (22 recommended)
- npm 10+

## Quick start — browser (fastest)

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`). Click a piece, then a highlighted square to move. Drag with the mouse to orbit the board.

## Mac desktop app (Electron)

Development (hot reload + Electron window):

```bash
npm run dev:app
```

Production build (creates `.dmg` / `.zip` under `release/`):

```bash
npm run pack:mac
```

Open the generated app from `release/` or run the `.app` bundle directly.

## Controls

| Action | Input |
|--------|--------|
| Orbit camera | Click + drag |
| Zoom | Scroll / trackpad pinch |
| Select / move | Click square |
| New game | **New game** in the header |

When a Pichu (pawn) reaches the last rank, pick an evolution (promotion).

## Piece roster

| Chess | Pokémon |
|-------|---------|
| Pawn | Pichu |
| Rook | Snorlax |
| Knight | Rapidash |
| Bishop | Alakazam |
| Queen | Mewtwo |
| King | Arceus |

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Vite dev server only |
| `npm run dev:app` | Vite + Electron (Mac/local desktop) |
| `npm run build` | Typecheck + production web build |
| `npm run test` | Unit tests |
| `npm run pack:mac` | Build + package for macOS |

## Project layout

```
electron/          Electron main process
src/components/    3D board and Pokémon piece meshes
src/hooks/         Game UI state
src/lib/           chess.js wrapper
src/pokemon/       Species names and colors per role
```

## License

Chess rules via [chess.js](https://github.com/jhlywa/chess.js). Pokémon names and trademarks belong to Nintendo/Creatures/Game Freak; this project uses **original 3D shapes** and names for fan-style local play only.
