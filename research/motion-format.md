# The faceless motion format: teardown

**What this is.** A frame-level teardown of five reels Wajahat sent on 2026-11-26 as the target
look for Wajdan's faceless content. Analysed from the actual video files, not from memory.

**Headline finding:** all five are the same creator, **@benmeer** (Ben Meer, "System Sunday").
This is not five styles to blend. It is one house system, run repeatedly, and that is why it looks
consistent and unique rather than templated.

---

## The sample

| Shortcode | Posted | Length | Plays | Likes | Topic |
|---|---|---|---|---|---|
| `CoHxmpZAw0f` | 2023-02-01 | 14.8s | 2,553,819 | 23,972 | Success comes down to a simple choice |
| `Coe6VsJAMse` | 2023-02-10 | 29.3s | 4,422,267 | 38,564 | How to budget (50-30-20) |
| `CppmIwLALyt` | 2023-03-11 | 36.2s | 8,243,698 | 122,684 | How to go minimalist |
| `C6gZfO3Asye` | 2024-05-03 | 55.5s | 7,748,386 | 18,088 | 5 steps to conquer procrastination |
| `DB8zCkZxVih` | 2024-11-04 | 22.2s | 4,451,856 | 16,945 | How to be productive (3-3-3) |

Total across five: **27.4M plays.** All 720x1280, 30fps (the 2024 one 24fps).

Note the like-rate collapse between the 2023 and 2024 reels: 1.49% of plays on the minimalist reel
versus 0.23% on procrastination. Same account, same format, ten times the engagement on the older
ones. Worth understanding before copying the newer style.

---

## The single most important finding

**Zero hard cuts. In any of the five.**

Scene-change detection at thresholds of 0.3, 0.1, 0.05 and 0.02 returns **0 cuts** on every file.
A 55-second reel with no cut in it at all.

Every transition is a continuous transform. A square does not cut to a notebook, it *unfolds*
into one. Dots do not cut to a list, they *slide into* rows. Three shapes do not cut to an
exclamation mark, they *converge* into one.

This is the whole reason it does not read as AI or as a template. Template motion graphics cut
between pre-made scenes. Generative video drifts and warps. This morphs, deliberately, with one
object carrying through. **Object permanence is the signature.** Copy nothing else and copy this.

---

## Design system, measured

| Token | Value | Notes |
|---|---|---|
| Background | `#010000` | Effectively pure black. Never a gradient, never a texture |
| Accent | `#FEB600` | Sampled from a flat fill. One amber, one only, used in every reel |
| Secondary | `#FFFFFF` | Line work and type |
| Stroke weight | ~3px at 720px wide | Constant. Lines never taper or vary |
| Palette size | **3 colours** | Black, amber, white. No fourth colour appears anywhere |

Three colours across 27M plays. The discipline is the brand.

**Type.** Geometric sans, close to Poppins or Futura. Two distinct caption systems:

- **2023 style** (the high-engagement ones): ALL CAPS, ~22px, letterspaced wide, medium weight,
  centred, and **split across two fixed zones** at roughly 25% and 78% of frame height. A phrase
  breaks across the vertical gap: `THIS TINY` on top, `2-MINUTE HABIT` underneath, with the
  animation living in the space between. The two zones act as a call and response.
- **2024 style** (procrastination reel): sentence case, bold, larger, left-aligned low in frame,
  with **word-by-word highlighting** — the spoken word is white, the rest grey. Standard karaoke
  captioning.

The older split-zone system is the more distinctive of the two and it is on the better-performing
reels.

## Beat rate, measured

Frame-differencing to count major visual changes:

| Reel | Beats | Seconds per beat |
|---|---|---|
| `DB8zCkZxVih` | 15 | **1.5s** |
| `Coe6VsJAMse` | 14 | **2.1s** |
| `CoHxmpZAw0f` | 6 | **2.5s** |
| `CppmIwLALyt` | 12 | **3.0s** |
| `C6gZfO3Asye` | 10 | 5.6s |

**One idea every 1.5 to 3 seconds**, each with its own visual. The 55-second narrated reel runs at
less than half that density and is the weakest performer by like-rate.

This is the hard constraint on scripting. A 30-second reel in this format needs roughly **twelve
to eighteen discrete visual beats**. It is not a script with pictures added. The beat *is* the
unit of writing, and every beat owes the viewer one new object on screen.

Against `craft.md` principle 1, this format does not need a peak every 20-30 seconds. It peaks
every two. The flat-middle problem cannot occur here, which is a real argument for the format.

---

## Motion vocabulary

The complete list of moves observed. There are not many, which is the point.

1. **Morph.** One shape becomes another, continuously. Square to notebook, circle to globe,
   dots to list rows. The most-used move in the set.
2. **Converge / diverge.** Scattered elements fly into formation, or a formation scatters.
   Always with motion blur on the travel.
3. **Fill rise.** An amber mass rises inside a white outline like liquid, used for proportion
   (50% needs, 30% wants, 20% savings).
4. **Isometric build.** A flat shape tilts into 3/4 perspective and assembles — the notebook
   opening, the card grid, the dial.
5. **Orbit.** Elements rotate around a centre point, used for the dial and the bucket allocation.
6. **Draw-on.** A line icon draws itself along its own path.
7. **Outer glow.** Reserved. Used on the single hero object in a beat, never on everything.
8. **Motion blur.** On every fast travel, without exception. The streaks are visible in almost
   every sampled frame.

Easing is consistently fast-out, slow-in, with overshoot. Nothing moves linearly.

**Icon style.** Flat line drawings, uniform stroke, slightly loose geometry — a house that is not
quite square, a tree that is not quite symmetrical. Hand-corrected, not auto-generated. That
looseness is a meaningful part of why it does not read as stock.

---

## How it is actually made

Inference from the evidence, not a confirmed answer.

**Most likely After Effects**, with shape layers and path interpolation, exported straight out.
What points there: true path morphing between unrelated shapes, per-layer motion blur, consistent
custom easing with overshoot, and outer-glow treatment on isolated layers. Lottie and Rive could
produce much of it but the glow and blur work is more natural in AE.

**Estimated effort: hours per reel, not minutes.** This is the honest problem with copying it
directly. `brand.md` sets a hard ceiling of under an hour per piece.

**The way around it.** The entire vocabulary above is reproducible in code — SVG and CSS or canvas
animation, rendered headless through Playwright and assembled with ffmpeg. Both are already
installed in this environment. Morph, converge, fill-rise, orbit, draw-on and motion blur are all
standard techniques in SVG animation. Build the system once, then every future reel is a content
file against a fixed renderer, and the look stays identical by construction rather than by
discipline.

That is the recommendation: **do not imitate the output, rebuild the system that produces it.**

---

## What transfers to Wajdan, and what does not

**Transfers directly:**

- Zero cuts, continuous morph. The signature.
- Three-colour discipline. Wajdan's existing dark brand sits close to this already.
- The split-zone caption, phrase broken top and bottom.
- One idea per 1.5-3 seconds.
- The vocabulary of eight moves.

**Does not transfer:**

- **The subject matter.** Ben Meer writes generic self-improvement for a mass audience. Wajdan
  sells qualified calls to consultancy owners. `craft.md` principle 6 is explicit that mechanism
  explainers underperform by roughly ten times, and the 50-30-20 reel is a pure mechanism
  explainer. It works for him because the mechanism *is* the subject for a mass productivity
  audience. For us it is the trap.
- **The amber.** `#FEB600` is his. We need our own accent, locked the same way.
- **The 55-second narrated style.** Lowest like-rate in the sample. Skip it.

**The open question this format forces.** Going faceless settles the brand-versus-person decision
left open in `brand.md` by default, and settles it toward the brand account. Wajdan's single best
reel was Wajahat on camera. Worth deciding deliberately rather than by drift. A reasonable answer
is both: Wajahat on camera for subject-led content, this format for the animated comparison reels
that `brand.md` already notes carry the highest multiples and need no recording.

---

## Open items

- Accent colour for Wajdan. Needs deciding before anything is built.
- Font. Needs to be a licensed geometric sans we can embed in the renderer.
- Voice. Wajahat's ElevenLabs clone is not yet connected to this environment.
- Whether the renderer is built here as a reusable system, or the first few are hand-built.

**Source files:** videos and contact sheets were pulled to the session scratchpad, which is
temporary. Re-pull with the Apify Instagram scraper if they are needed again.
