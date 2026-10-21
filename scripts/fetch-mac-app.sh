#!/usr/bin/env bash
# Downloads the prebuilt Mac .app from GitHub Releases (curl + python3 only — no Node/npm).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST_DIR="$ROOT/apps/mac"
APP_NAME="Pokemon Chess 3D.app"
REPO="${CHESSAPP_GITHUB_REPO:-cpearce-arch/chessApp}"
RELEASE_TAG="${CHESSAPP_RELEASE_TAG:-latest-mac}"

mkdir -p "$DEST_DIR"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

echo "Fetching Mac build from ${REPO} (release: ${RELEASE_TAG})..."

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
    print(f"Trigger a build: https://github.com/{repo}/actions/workflows/release-mac.yml", file=sys.stderr)
    sys.exit(1)

assets = data.get("assets") or []
zip_asset = next((a for a in assets if a.get("name", "").endswith(".zip")), None)
if not zip_asset:
    print("No .zip on that release yet.", file=sys.stderr)
    sys.exit(1)

print(json.dumps(zip_asset))
PY
)"

URL="$(python3 -c "import json,sys; print(json.load(sys.stdin)['browser_download_url'])" <<<"$META")"
NAME="$(python3 -c "import json,sys; print(json.load(sys.stdin)['name'])" <<<"$META")"

ZIP="$WORK/$NAME"
curl -fsSL -o "$ZIP" "$URL"
ditto -x -k "$ZIP" "$WORK/extracted"

APP_SRC="$(find "$WORK/extracted" -maxdepth 4 -name "$APP_NAME" -type d | head -1)"
if [[ -z "$APP_SRC" ]]; then
  echo "Could not find $APP_NAME inside downloaded archive." >&2
  exit 1
fi

rm -rf "$DEST_DIR/$APP_NAME"
cp -R "$APP_SRC" "$DEST_DIR/$APP_NAME"
echo "Installed: $DEST_DIR/$APP_NAME"
