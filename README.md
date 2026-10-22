# Pokémon Chess 3D

**3D chess** with stylized **Pokémon-themed** pieces (original low-poly models, not official Nintendo assets). Runs as a **web app in Chrome** — no Mac installer required.

---

## Play in Chrome (easiest)

Open:

### **https://cpearce-arch.github.io/chessApp/**

- No download, no Gatekeeper, no Terminal  
- Use **Chrome’s “Install app”** (⊕ in the address bar) for a window without browser tabs  

If the link 404s, enable Pages once: **Repo Settings → Pages → Source: GitHub Actions**, then run [Deploy Chrome web app](https://github.com/cpearce-arch/chessApp/actions/workflows/deploy-pages.yml) or push to `main`.

Details: [docs/PLAY_IN_CHROME.md](docs/PLAY_IN_CHROME.md)

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

## Developers

Requires [Node.js](https://nodejs.org/) 20+ and npm.

```bash
npm install
npm run dev          # Chrome → http://localhost:5173
npm run build:web    # same as GitHub Pages build
npm run test
npm run dev:app      # optional unsigned Electron shell
```

### Workflows

| Workflow | Purpose |
|----------|---------|
| [deploy-pages.yml](.github/workflows/deploy-pages.yml) | Publish Chrome web app on every `main` push |
| [release-mac.yml](.github/workflows/release-mac.yml) | Optional offline **browser-mac** zip |

Pokémon names/trademarks belong to Nintendo/Creatures/Game Freak; this project uses original 3D shapes for fan-style play.
