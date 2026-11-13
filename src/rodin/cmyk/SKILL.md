---
name: cmyk
description: "Use when reasoning about color/signal from sequence position in erpax — the four print primaries ARE the first four rodin digits {0=K, 3=C, 6=M, 9=Y}; color comes from the slot, the C↔M polarity gap is closed by Y at 9 and anchored by K at 0. The signal model under links/tags/admin hue. Nested under rodin."
atomPath: "rodin/cmyk"
coordinate: "rodin/cmyk · 4/weave · 689c9c28"
contentUuid: "a8ebc880-f219-51b9-96cc-c963527d45ac"
diamondUuid: "7bad7921-6a9d-818e-b75c-5b96c07d5e75"
uuid: "689c9c28-fee5-8e07-8793-e3e961d2a645"
horo: 4
typography:
  partition: rodin
  bondDegree: 58
standards: []
bindings: []
signatures:
  computationUuid: "54e18387-d69c-8729-89ee-6fba2bb5383c"
  stages:
    - stage: path
      stageUuid: "44e9fde9-ad35-8c46-b850-0680d8da2a8d"
    - stage: trinity
      stageUuid: "f016bd36-8b34-832e-a8a2-c17613671b2d"
    - stage: boundary
      stageUuid: "26a9d35b-9d5d-8d89-a052-6287a7c01b25"
    - stage: links
      stageUuid: "cdb356fd-17ad-8de1-bd92-b69160e35476"
    - stage: horo
      stageUuid: "e3e0ff38-4eab-87c0-98ee-ed36ed3f66ca"
    - stage: seal
      stageUuid: "d3718c06-185f-8362-931c-c510e5f71ebf"
    - stage: uuid
      stageUuid: "9b0812ec-8a35-8014-a084-a9f4f583e8b4"
version: 2
---
# cmyk — color from position (the gamut is {0,3,6,9})

`cmyk` is the **signal/color** law of the [[rodin]] vortex: the four print primaries **are the first four digits of the sequence** — color is decoded from position, never chosen freely.

| digit | channel | role | erpax signal |
|---|---|---|---|
| `0` | **K** key/black | origin / substrate | the record itself ([[identity]], [[config]]) |
| `3` | **C** cyan | forward [[polarity]] (×2) | outbound links / give |
| `6` | **M** magenta | reverse [[polarity]] (×5) | inbound links / take |
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
