# Pokémon Chess 3D

Local **3D chess** with stylized **Pokémon-themed** pieces (original low-poly models, not official Nintendo assets).

---

## Play on Mac — **no Node or npm**

You do **not** need to install Node, Homebrew, or run `npm`.

### Option 1: Double-click (in this repo)

1. Open the project folder in **Finder**.
2. Double-click **`Run Pokemon Chess 3D.command`**.
3. First launch only: click **Download** (~150MB, uses built-in macOS tools).
4. The game opens from **`apps/mac/Pokemon Chess 3D.app`** on every later launch.

If macOS warns about an unidentified developer: **Right-click → Open**.

More detail: [docs/PLAY_ON_MAC.md](docs/PLAY_ON_MAC.md)

### Option 2: Download the Mac app

1. [GitHub Releases → **latest-mac**](https://github.com/cpearce-arch/chessApp/releases/tag/latest-mac)
2. Download the **`.dmg`** or **`.zip`**, install, and open **Pokemon Chess 3D**.

> **Note:** The Mac **`.zip`** is built on GitHub **Linux** runners (reliable; no macOS runner queue). Open [Release Mac app](https://github.com/cpearce-arch/chessApp/actions/workflows/release-mac.yml) → **Run workflow**, wait for the green **build-mac-pack** job, then use Option 1 or 2. An optional `.dmg` may appear later if a macOS runner is free.

---

## Controls

| Action | Input |
|--------|--------|
| Orbit camera | Click + drag |
| Zoom | Trackpad pinch / scroll |
| Select / move | Click piece, then highlighted square |
| New game | **New game** in the header |

Pawn promotion: choose an evolution when Pichu reaches the last rank.

## Piece roster

| Chess | Pokémon |
|-------|---------|
| Pawn | Pichu |
| Rook | Snorlax |
| Knight | Rapidash |
| Bishop | Alakazam |
| Queen | Mewtwo |
| King | Arceus |

---

## Developers (change the source)

Requires [Node.js](https://nodejs.org/) 20+ and npm.

```bash
npm install
npm run dev:app      # Electron + hot reload
npm run dev          # browser at http://localhost:5173
npm run test
npm run build
npm run pack:mac     # local .dmg / .zip in release/
```

Runtime libraries are bundled into `dist/` (no CDN fonts at play time). `npm install` verifies all declared packages are present.

### Project layout

```
Run Pokemon Chess 3D.command   ← players double-click this
apps/mac/                      ← installed .app (after first launch)
scripts/fetch-mac-app.sh       ← download helper (curl + python3)
electron/                      ← desktop shell
src/                           ← React + Three.js game
.github/workflows/release-mac.yml
```

Pokémon names/trademarks belong to Nintendo/Creatures/Game Freak; this project uses original 3D shapes for local fan-style play.
