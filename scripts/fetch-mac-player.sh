#!/usr/bin/env bash
# Downloads browser player zip (dist + launcher) — curl + python3 only.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PLAYER_DIR="$ROOT/player"
REPO="${CHESSAPP_GITHUB_REPO:-cpearce-arch/chessApp}"
RELEASE_TAG="${CHESSAPP_RELEASE_TAG:-latest-mac}"

WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

echo "Fetching player bundle from ${REPO} (release: ${RELEASE_TAG})..."

META="$(REPO="$REPO" RELEASE_TAG="$RELEASE_TAG" python3 - <<'PY'
import json
import os
import sys
import urllib.request

repo = os.environ["REPO"]
tag = os.environ["RELEASE_TAG"]
api = f"https://api.github.com/repos/{repo}/releases/tags/{tag}"
if tag == "latest":
    api = f"https://api.github.com/repos/{repo}/releases/latest"

req = urllib.request.Request(api, headers={"Accept": "application/vnd.github+json"})
try:
    with urllib.request.urlopen(req) as resp:
        data = json.load(resp)
except urllib.error.HTTPError as e:
    print(f"Release not found ({e.code}).", file=sys.stderr)
    sys.exit(1)

assets = data.get("assets") or []
zips = [a for a in assets if a.get("name", "").endswith(".zip")]
# Prefer browser player bundle over legacy Electron zip
browser = [a for a in zips if "browser" in a.get("name", "").lower()]
pick = browser[0] if browser else (zips[0] if zips else None)
if not pick:
    print("No .zip on that release yet.", file=sys.stderr)
    sys.exit(1)
print(json.dumps(pick))
PY
)"

URL="$(python3 -c "import json,sys; print(json.load(sys.stdin)['browser_download_url'])" <<<"$META")"
NAME="$(python3 -c "import json,sys; print(json.load(sys.stdin)['name'])" <<<"$META")"

ZIP="$WORK/$NAME"
curl -fsSL -o "$ZIP" "$URL"
ditto -x -k "$ZIP" "$WORK/extracted"

# New layout: zip root contains dist/ and scripts/
if [[ -d "$WORK/extracted/dist" ]]; then
  rm -rf "$PLAYER_DIR"
  mkdir -p "$PLAYER_DIR"
  cp -R "$WORK/extracted/dist" "$PLAYER_DIR/dist"
  echo "Installed player bundle to $PLAYER_DIR/dist"
  exit 0
fi

# Legacy Electron zip: extract .app for old launchers
APP_NAME="Fantasy Chess 3D.app"
APP_SRC="$(find "$WORK/extracted" -maxdepth 4 -name "$APP_NAME" -type d | head -1)"
if [[ -n "$APP_SRC" ]]; then
  mkdir -p "$ROOT/apps/mac"
  rm -rf "$ROOT/apps/mac/$APP_NAME"
  cp -R "$APP_SRC" "$ROOT/apps/mac/$APP_NAME"
  echo "Installed legacy Electron app (Gatekeeper may block). Prefer re-running CI for browser zip." >&2
  exit 0
fi

echo "Unrecognized zip layout in $NAME" >&2
exit 1
