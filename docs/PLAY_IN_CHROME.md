# Play in Chrome (recommended)

No download, no `.app`, no `.command` scripts, and no Gatekeeper.

## Live web app

After GitHub Pages is enabled (see below), open in **Google Chrome**:

**https://cpearce-arch.github.io/chessApp/**

Bookmark that URL or use **Chrome → Install Pokémon Chess 3D** (install icon in the address bar) to run it like a desktop web app.

Works in Safari, Firefox, and Edge as well; Chrome is recommended for WebGL performance.

## One-time repo setup (maintainer)

1. GitHub repo **Settings → Pages**
2. **Build and deployment → Source:** **GitHub Actions**
3. Push to `main` or run workflow **Deploy Chrome web app (GitHub Pages)**

The [deploy-pages.yml](../.github/workflows/deploy-pages.yml) workflow builds with base path `/chessApp/` and publishes `dist/`.

## Local development in Chrome

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## Offline / local zip (optional)

If you cannot use the hosted URL, use the **browser-mac** zip and `Play Pokemon Chess 3D.command` from [PLAY_ON_MAC.md](PLAY_ON_MAC.md).
