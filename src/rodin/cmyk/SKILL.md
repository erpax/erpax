---
name: cmyk
description: "Use when reasoning about color/signal from sequence position in erpax — the four print primaries ARE the first four rodin digits {0=K, 3=C, 6=M, 9=Y}; color comes from the slot, the C↔M polarity gap is closed by Y at 9 and anchored by K at 0. The signal model under links/tags/admin hue. Nested under rodin."
atomPath: "rodin/cmyk"
coordinate: "rodin/cmyk · 8/crest · b3a8a0e8"
contentUuid: "101f3f8f-8b9a-5dee-bd70-4e9c3c014421"
diamondUuid: "baf03e42-4438-8f8b-abb8-8f979c5df91b"
uuid: "b3a8a0e8-d7d0-8ff1-9f20-dcd777ddd493"
horo: 8
typography:
  partition: rodin
  bondDegree: 82
standards: []
bindings: []
signatures:
  computationUuid: "c04cb388-ba8f-8bdc-bcce-e7a53c0bfba2"
  stages:
    - stage: path
      stageUuid: "44e9fde9-ad35-8c46-b850-0680d8da2a8d"
    - stage: trinity
      stageUuid: "f016bd36-8b34-832e-a8a2-c17613671b2d"
    - stage: boundary
      stageUuid: "7c3a14d4-cbe6-8c35-9b20-6dde1bd7c9a5"
    - stage: links
      stageUuid: "81b5c1f8-723f-84ee-80a0-d0e5b68e28d2"
    - stage: horo
      stageUuid: "f2361324-2462-8db1-b556-a01ddb72a187"
    - stage: seal
      stageUuid: "d3718c06-185f-8362-931c-c510e5f71ebf"
    - stage: uuid
      stageUuid: "a96082cc-5fd4-8393-a2d4-c14dbe4c44f8"
version: 2
---
# cmyk — color from position (the gamut is {0,3,6,9})

`cmyk` is the **signal/color** law of the [[rodin]] vortex: the four print primaries **are the first four digits of the sequence** — color is decoded from position, never chosen freely.

| digit | channel | role | erpax signal |
|---|---|---|---|
| `0` | **K** key/black | origin / substrate | the record itself ([[identity]], [[config]]) |
| `3` | **C** cyan | forward [[polarity]] (×2) | outbound links / [[give]] |
| `6` | **M** magenta | reverse [[polarity]] (×5) | inbound links / [[take]] |
| `9` | **Y** yellow | [[axis]] close (triad) | categorical / [[tags]] |

The doubling helix (`1·2·4·8·7·5`) carries **no native channel** — it winds as tonal/saturation steps *within* this four-primary gamut ([[coil]]).

## Where the polarity changes and the gap closes (walk `0·3·6·9·1·2·4·8·7·5`)
- `0 → K` lays the **substrate** (origin, no hue).
- `3 → 6` is the **polarity change**: C (forward/out) flips to M (reverse/in) — the [[polarity]] boundary.
- C and M span only **two** of three subtractive primaries → a **color gap** (the missing yellow).
- `9 → Y` **closes the gap**: the [[axis]] close supplies the third primary, completing CMY; `K` (0) anchors it. So `{0,3,6,9}` = `{K,C,M,Y}` spans the full gamut **before** the helix even begins to wind.

This is the [[balance]] of the ring rendered as color: forward↔reverse ([[polarity]]) resolved by the triad close, anchored at the origin — the visible twin of "value from position" ([[horo]]). Every brand color, link hue, and tag color derives from these four via `cmyk(c,m,y,k)` — no hex lives outside the derivation.

Source: `~/github/ceccec/svilena-me/.vitepress/rodin.js` (`CMYK`, `RODIN_HUE`, `CHANNEL`, `cmyk()`).

Composes: [[rodin]] · [[axis]] · [[polarity]] · [[coil]] · [[horo]] · [[tags]] · [[balance]].
