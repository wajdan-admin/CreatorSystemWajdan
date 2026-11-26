# Renderer

Build a reel:

```bash
./renderer/build.sh scenes/<scene>.json     # -> out/<scene>.mp4
node renderer/icons-preview.mjs             # -> out/_icons.png (icon sheet)
```

## Pieces

| File | Job |
|---|---|
| `brand/tokens.json` | Locked colours, fonts, fps. Single source of truth |
| `renderer/engine.html` | `draw(t)` — deterministic canvas. Same `t`, same pixels, always |
| `renderer/icons.json` | Line-icon library, SVG paths on a 0-100 box |
| `renderer/render.mjs` | Playwright steps the timeline, pulls frames off the canvas |
| `renderer/build.sh` | Renders, then ffmpeg averages subframes into motion blur |
| `scenes/*.json` | One file per reel: timing, captions, VO lines, voice config |

Rendering runs at `fps * subframes` (90fps) and ffmpeg's `tmix` averages every 3
frames down to 30. That is where the motion blur comes from — it is real sampled
blur, not a filter.

## Using an icon

```js
icon(name, cx, cy, size, {
  draw: 0..1,        // draw-on along true arc length
  fill: 0..1,        // accent fill rising inside the icon's closed path
  alpha, lw,         // opacity, stroke weight
  color, accentColor,
  glow               // colour to glow, omit for none
})
```

`draw` spreads across sub-paths by measured length, so an icon draws in the order
a hand would draw it rather than wiping on. `fill` needs the icon to declare a
`fillPath`.

## Adding an icon

Add an entry to `icons.json`: paths on a 0-100 box, ordered the way you would draw
them. `accent` lists sub-path indices to stroke in `#FD9421`. `fillPath` marks the
closed path that fill-rise pours into. Then run the preview and look at it.

## Rules that keep the look

- **Never cut.** Transform the objects already on screen. Zero hard cuts is the
  signature of the format — check with
  `ffmpeg -i out/x.mp4 -vf "select='gt(scene,0.02)',showinfo" -f null -`
- One idea every 1.5-3 seconds.
- Three colours only.
- Nothing moves linearly. Ease out, with overshoot on arrivals.
