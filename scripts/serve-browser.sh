#!/usr/bin/env bash
# Serves the built Vite app on localhost and opens the default browser (no Electron .app).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIST=""

for candidate in "$ROOT/dist" "$ROOT/player/dist"; do
  if [[ -f "$candidate/index.html" ]]; then
    DIST="$candidate"
    break
  fi
done

if [[ -z "$DIST" ]]; then
  echo "No built game found. Run npm run build or download the player zip from GitHub Releases." >&2
  exit 1
fi

PORT="${CHESSAPP_PORT:-8765}"
while ! python3 - <<PY
import socket
s = socket.socket()
try:
    s.bind(("127.0.0.1", ${PORT}))
except OSError:
    raise SystemExit(1)
finally:
    s.close()
PY
do
  PORT=$((PORT + 1))
done

echo "Serving Fantasy Chess 3D from $DIST"
echo "Open http://127.0.0.1:${PORT}/ in your browser (should open automatically)."

python3 -m http.server "$PORT" --bind 127.0.0.1 --directory "$DIST" &
SERVER_PID=$!

cleanup() {
  kill "$SERVER_PID" 2>/dev/null || true
}
trap cleanup EXIT INT TERM

sleep 0.6
open "http://127.0.0.1:${PORT}/"

wait "$SERVER_PID"
