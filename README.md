# Pokémon Chess 3D

Local **3D chess** with stylized **Pokémon-themed** pieces (original low-poly models, not official Nintendo assets).

---

## Play on Mac — **no Node or npm**

The player build opens in **your browser** via a local server (no unsigned Electron `.app`).

1. [Download **`*-browser-mac.zip`**](https://github.com/cpearce-arch/chessApp/releases/tag/latest-mac) from **latest-mac** (or run the [Release Mac app](https://github.com/cpearce-arch/chessApp/actions/workflows/release-mac.yml) workflow once).
2. Unzip and double-click **`Play Pokemon Chess 3D.command`**.
3. If macOS warns about the script: **Right-click → Open → Open** (once).

More detail: [docs/PLAY_ON_MAC.md](docs/PLAY_ON_MAC.md) · Gatekeeper: [docs/MAC_GATEKEEPER.md](docs/MAC_GATEKEEPER.md)

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
