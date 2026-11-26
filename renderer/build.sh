#!/usr/bin/env bash
# usage: ./build.sh scenes/<scene>.json
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SCENE="$1"
NAME="$(basename "$SCENE" .json)"
FRAMES="$ROOT/out/frames_$NAME"
OUT="$ROOT/out/$NAME.mp4"

FPS=$(jq -r .fps        "$ROOT/brand/tokens.json")
SUB=$(jq -r .subframes  "$ROOT/brand/tokens.json")

node "$ROOT/renderer/render.mjs" "$SCENE" "$FRAMES"

# average every SUB frames -> real motion blur, then drop to FPS
ffmpeg -v error -y -framerate $((FPS*SUB)) -i "$FRAMES/f%05d.png" \
  -vf "tmix=frames=$SUB:weights=$(printf '1 %.0s' $(seq $SUB)),fps=$FPS,format=yuv420p" \
  -c:v libx264 -preset slow -crf 18 -movflags +faststart "$OUT"

echo "built: $OUT"
ffprobe -v error -show_entries format=duration,size -show_entries stream=width,height,r_frame_rate \
  -of default=noprint_wrappers=1 "$OUT"
