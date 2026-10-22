#!/usr/bin/env bash
set -euo pipefail
DIR="$(cd "$(dirname "$0")/.." && pwd)/public/pokemon"
mkdir -p "$DIR"
for id in 172 143 78 65 150 493; do
  curl -fsSL -o "$DIR/${id}.png" \
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png"
  echo "Fetched $id"
done
