# Play on Mac (no Node, no npm)

The game runs in **your default browser** from a tiny local server (Python, built into macOS). There is **no unsigned `.app`** in the normal player build, so you avoid most Gatekeeper “malware verify” dialogs.

## Easiest: double-click launcher

1. Download **`Pokemon-Chess-3D-*-browser-mac.zip`** from [latest-mac](https://github.com/cpearce-arch/chessApp/releases/tag/latest-mac) and unzip, **or** clone this repo and run the workflow once.
2. Double-click **`Play Pokemon Chess 3D.command`** (or **`Run Pokemon Chess 3D.command`** — same thing).
3. Safari/Chrome opens to `http://127.0.0.1:8765/` with the 3D board.

First time only, if macOS blocks the **`.command` script**: **Right-click → Open → Open**. You are approving the launcher script, not a separate `.app`.

From a clone with no build yet: the launcher can **Download** the zip via curl/python3 (~4MB).

## Alternative: from GitHub Releases

1. [Releases → latest-mac](https://github.com/cpearce-arch/chessApp/releases/tag/latest-mac)
2. Download **`*-browser-mac.zip`**
3. Unzip → double-click **`Play Pokemon Chess 3D.command`**

### Legacy Electron `.app`

Older releases shipped an unsigned **Pokemon Chess 3D.app** (Gatekeeper warnings). Prefer the **browser** zip. Developers can still run `npm run pack:mac` locally.

### If the GitHub workflow fails

Ignore errors mentioning **`build-macos-dmg`** on old runs — that job was removed. The only job should be **`build-mac-pack`** on **ubuntu-latest**. If you still see *Internal server error*, wait a few minutes and **Run workflow** again (GitHub-side glitch). Check the green job and download the **`.zip`** from [latest-mac](https://github.com/cpearce-arch/chessApp/releases/tag/latest-mac).

## Controls

| Action | Input |
|--------|--------|
| Orbit camera | Click + drag |
| Zoom | Trackpad pinch / scroll |
| Move | Click your piece, then a highlighted square |
| New game | **New game** in the header |

## Developers only

To change the source code, see the main [README](../README.md) (`npm install`, `npm run dev:app`).
