# Play on Mac (no Node, no npm)

The game ships as a normal **Mac application**. You do **not** need Homebrew, Node, or npm to play.

## Easiest: double-click launcher (included in this repo)

1. Clone or download this repository.
2. In Finder, open the project folder.
3. **Double-click** `Run Pokemon Chess 3D.command`.
4. The first time only, click **Download** when asked. The script uses **curl** and **python3** (built into macOS) to fetch the prebuilt app from GitHub Releases.
5. Later launches open instantly from `apps/mac/Pokemon Chess 3D.app`.

If macOS blocks the launcher: **Right-click → Open** on `Run Pokemon Chess 3D.command`, or allow it under **System Settings → Privacy & Security**.

If macOS blocks the game app: **Right-click → Open** on `Pokemon Chess 3D.app`.

## Alternative: download the installer

1. Open [GitHub Releases](https://github.com/cpearce-arch/chessApp/releases).
2. Open the **`latest-mac`** release and download the **`.zip`** (always built on Linux CI).
3. Double-click the zip to extract **Pokemon Chess 3D.app**, then drag it to **Applications** (or run from the extracted folder).
4. If a **`.dmg`** is also attached (optional macOS runner build), you can use that instead.

### If the GitHub workflow fails

Older workflows used `macos-latest` runners, which can fail with *“job was not acquired”* or capacity errors. Pull the latest `main` and re-run **Release Mac app** — it now builds the Mac zip on **ubuntu-latest** first. You only need the `.zip` to play.

## Controls

| Action | Input |
|--------|--------|
| Orbit camera | Click + drag |
| Zoom | Trackpad pinch / scroll |
| Move | Click your piece, then a highlighted square |
| New game | **New game** in the header |

## Developers only

To change the source code, see the main [README](../README.md) (`npm install`, `npm run dev:app`).
