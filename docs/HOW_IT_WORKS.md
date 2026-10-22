# How Fantasy Chess 3D works

This document explains the app in plain language: what you see on screen, how a move travels from a click to the board, and how the 3D world is built. No prior game-engine experience required.

---

## What the app is

Fantasy Chess 3D is a **web page** that runs a normal chess game in your browser. The rules come from a well-known chess library (`chess.js`). You play **White**; **Black** is controlled by a simple computer opponent. Instead of flat icons, each piece is a **3D fantasy figure** (goblin, dragon, and so on) on a board inside a **cathedral / tabletop scene**.

The same project can also be wrapped in **Electron** for a desktop window, but the live version most people use is the **GitHub Pages** build in Chrome.

---

## Big picture: layers from click to pixels

Think of four layers stacked bottom to top:

```text
┌─────────────────────────────────────────┐
│  App.tsx — menus, labels, promotion UI  │
├─────────────────────────────────────────┤
│  useChessGame — rules, turns, AI timing │
├─────────────────────────────────────────┤
│  chessGame + chess.js — legal moves     │
├─────────────────────────────────────────┤
│  SceneRoot + Three.js — 3D world        │
└─────────────────────────────────────────┘
```

1. **Chess rules** — Is this move allowed? Is it checkmate?
2. **Game hook** — Which square is selected? When should the AI move?
3. **UI shell** — Headline, difficulty, “New game”, promotion dialog.
4. **3D view** — Camera, lights, environment, pieces on squares.

When you click a square, the 3D layer sends that square name (like `e4`) upward. The hook decides whether you selected a piece, moved, or cancelled. If the move is legal, the chess engine updates; React re-renders; the 3D board shows pieces in their new places.

---

## Chess logic (no graphics)

### `ChessGame` (`src/lib/chessGame.ts`)

A thin wrapper around `chess.js`:

- Holds the **current position** (where every piece sits).
- **`legalMovesFrom(square)`** — lists squares you may move to from a selected piece.
- **`move(from, to, promotion?)`** — applies a move if legal; returns success or failure.
- **`snapshot()`** — whose turn, check, game over, result message.

Invalid moves are caught so the app never crashes on a bad click.

### Computer opponent (`src/lib/chessAI.ts`)

Black uses a **minimax** search: it looks a few moves ahead and picks the line that favors Black.

Plain-language version of minimax:

- Imagine you try each legal move Black can make.
- For each try, imagine White’s best replies, then Black again, for a fixed **depth** (easy = 1 ply, hard = 3).
- At the end of each line, **score the position**: material (queen worth more than pawn), center control, check bonus.
- Black picks the move with the **lowest** score from White’s point of view (best for Black).

**Alpha–beta pruning** skips branches that cannot change the final choice — same answer, less work.

Easy mode sometimes picks a random move or a move from the worst few, so it feels less perfect.

---

## React game flow (`src/hooks/useChessGame.ts`)

The hook is the **single source of truth** for the UI:

| State | Meaning |
|--------|---------|
| `selected` | Square of the piece you tapped (if any). |
| `legalTargets` | Green highlights — squares you can move to. |
| `pendingPromotion` | Pawn reached the last rank; waiting for queen/rook/bishop/knight choice. |
| `aiThinking` | Black is “thinking” (short delay, then AI move). |
| `tick` | Bump counter to re-read the engine after each move. |

**Click handling:**

1. If game over or Black’s turn (vs AI), ignore clicks.
2. If you already selected a piece and click a legal target → move (or open promotion).
3. If you click your own piece → select it.
4. Otherwise → clear selection.

**AI:** When it becomes Black’s turn, a timer fires (longer on hard), then `chooseAIMove` runs and `completeMove` applies the result.

---

## 2D UI (`src/App.tsx`)

Layout:

- **Header** — title, turn text, check warning, AI difficulty, New game.
- **Main viewport** — full-size `SceneRoot` (the 3D canvas).
- **Sidebar** — piece names (goblin = pawn, etc.).
- **Modal** — pawn promotion buttons with fantasy names.

The 3D scene does not know about HTML; it only receives `board`, `selected`, `legalTargets`, and `onSquareClick`.

---

## 3D world (`src/components/`)

### React Three Fiber

**Three.js** draws 3D with WebGL. **React Three Fiber** lets us describe the scene with React components (`<mesh>`, `<light>`, `<Canvas>`). When `board` changes, React updates mesh positions.

### `SceneRoot.tsx`

- Creates the **Canvas** (WebGL context).
- **Camera** — perspective view from above the table; **OrbitControls** — drag to rotate, scroll to zoom.
- **Lights** — sun-like directional light (shadows), fill lights, hemisphere (sky/ground tint).
- **Environment** — image-based lighting from an HDRI preset (night sky reflection on metal).
- **Tone mapping** — ACES filmic curve so brights (fire, glass) look cinematic, not blown out.
- **SceneEffects** — bloom (glow), vignette (darker corners), slight depth of field.
- Renders **GrimdarkEnvironment**, **ChessBoard3D**, **ContactShadows** (soft shadows under pieces).

### `ChessBoard3D.tsx`

- Builds an 8×8 list of squares from `board/coords.ts` (world X/Z positions).
- Each square is a **box** with stone-like physical material; selected/target squares change color and emissive glow.
- Each occupied cell gets a **FantasyPiece** at the right height.

### `FantasyPiece.tsx`

Maps chess piece type (from FEN letter) to a **3D model component** and **color palette**:

- White uses **Dawn** palettes; Black uses **Umbral** (defined in `src/fantasy/pieces.ts`).
- Black pieces rotate 180° on Y so they face White.

### Piece models (`fantasyCreatureModels.tsx`)

Each piece is **procedural geometry**: many small Three.js shapes (spheres, boxes, capsules) grouped together. Not downloaded sculpts — all code. Materials come from **PBR helpers** (`pbrMaterials.tsx`).

### Environment

- **`GrimdarkEnvironment.tsx`** — cathedral walls, columns, stained glass, braziers, floor mosaic, fog, particles. Sits around the board.
- **`TabletopScenery.tsx`** — table surface, felt, props (d20, scroll, mug) on the rim of the play area.

### Materials and “realistic” look

**PBR (physically based rendering)** means surfaces react to light like real materials: metal is shiny, stone is rough, ghost mesh is partly see-through.

- **`proceduralTextures.ts`** — builds small random **roughness maps** on the fly (no image files) so stone and metal look varied.
- **`pbrMaterials.tsx`** — `pbr()`, `mat()`, `ghostSheet()`, etc. wrap `meshPhysicalMaterial` with sensible defaults (clearcoat on scales, transmission on ghosts).

Complex words, simple ideas:

| Term | Plain meaning |
|------|----------------|
| **HDRI / Environment map** | A 360° photo used only for reflections and ambient light. |
| **Bloom** | Bright areas bleed a little — torches and runes glow. |
| **Contact shadows** | Fake soft shadow disk under objects on the table. |
| **FEN** | One-line text describing the whole board; the AI reads this to think. |

---

## Coordinates (`src/board/coords.ts`)

Chess squares are named `a1`–`h8`. The helper **`squareToWorld`** converts to 3D coordinates:

- **X** = file (a→h).
- **Z** = rank (1→8).
- **Y** = up (pieces sit above the square tops).

White’s side is toward **positive Z** by convention in this project.

---

## Build and deploy

- **Vite** bundles TypeScript + React for the browser.
- **`npm run build:web`** sets base path `/chessApp/` for GitHub Pages.
- **GitHub Actions** (`deploy-pages.yml`) runs tests, builds, uploads `dist/` to Pages.

---

## Electron (optional desktop)

`electron/main.cjs` opens a window and loads either the dev server URL or the built `dist/index.html` from the packaged app. Same React app; different shell.

---

## File map (quick reference)

| Path | Role |
|------|------|
| `src/main.tsx` | Entry: mount React, preload deps. |
| `src/App.tsx` | HTML UI + 3D viewport. |
| `src/hooks/useChessGame.ts` | Turns, selection, AI. |
| `src/lib/chessGame.ts` | Rules wrapper. |
| `src/lib/chessAI.ts` | Black minimax AI. |
| `src/board/coords.ts` | Square → 3D position. |
| `src/fantasy/pieces.ts` | White/Black color palettes. |
| `src/components/SceneRoot.tsx` | Canvas, lights, effects. |
| `src/components/ChessBoard3D.tsx` | Board squares + piece placement. |
| `src/components/FantasyPiece.tsx` | Pick model + colors per piece. |
| `src/components/fantasyCreatureModels.tsx` | 3D meshes per creature. |
| `src/components/fantasy/GrimdarkEnvironment.tsx` | Cathedral set. |
| `src/components/fantasy/pbrMaterials.tsx` | Realistic materials. |
| `src/components/rendering/SceneEffects.tsx` | Post-processing. |
| `src/setup/runtimeDependencies.ts` | Eager imports for offline bundle. |

---

## Extending the game

- **New piece look** — add a model in `fantasyCreatureModels.tsx`, register in `FantasyPiece.tsx`, colors in `fantasy/pieces.ts`.
- **Stronger AI** — increase depth in `chessAI.ts` (slower) or improve `evaluate()`.
- **Scene** — add meshes to `GrimdarkEnvironment` or `TabletopScenery`; keep props outside the 8×8 click area so they do not block moves.
