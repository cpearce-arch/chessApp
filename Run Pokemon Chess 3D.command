#!/bin/zsh
# Double-click this file in Finder to launch the game (no Terminal, Node, or npm required
# after the Mac app has been downloaded once).
set -e
ROOT="$(cd "$(dirname "$0")" && pwd)"
APP="$ROOT/apps/mac/Pokemon Chess 3D.app"
LOCAL_BUILD="$ROOT/release/mac/Pokemon Chess 3D.app"

launch() {
  open "$APP"
}

if [[ -d "$APP" ]]; then
  launch
  exit 0
fi

if [[ -d "$LOCAL_BUILD" ]]; then
  mkdir -p "$ROOT/apps/mac"
  cp -R "$LOCAL_BUILD" "$APP"
  launch
  exit 0
fi

CHOICE=$(osascript -e 'display dialog "First launch: downloading the Mac app (one time, ~150MB). Needs internet." buttons {"Cancel", "Download"} default button "Download" with title "Pokémon Chess 3D"' -e 'button returned of result' 2>/dev/null || echo "Cancel")

if [[ "$CHOICE" != "Download" ]]; then
  exit 0
fi

"$ROOT/scripts/fetch-mac-app.sh"
launch
