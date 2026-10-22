#!/bin/zsh
# Opens the game in your default browser via a local server (no unsigned .app).
set -e
ROOT="$(cd "$(dirname "$0")" && pwd)"
export CHESSAPP_PORT="${CHESSAPP_PORT:-8765}"

has_dist() {
  [[ -f "$ROOT/dist/index.html" ]] || [[ -f "$ROOT/player/dist/index.html" ]]
}

if has_dist; then
  exec "$ROOT/scripts/serve-browser.sh"
fi

CHOICE=$(osascript -e 'display dialog "Download the game files once (~4MB web build)? Needs internet." buttons {"Cancel", "Download"} default button "Download" with title "Fantasy Chess 3D"' -e 'button returned of result' 2>/dev/null || echo "Cancel")

if [[ "$CHOICE" != "Download" ]]; then
  exit 0
fi

"$ROOT/scripts/fetch-mac-player.sh"
exec "$ROOT/scripts/serve-browser.sh"
