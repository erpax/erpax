---
name: cmyk
description: "Use when reasoning about color/signal from sequence position in erpax — the four print primaries ARE the first four rodin digits {0=K, 3=C, 6=M, 9=Y}; color comes from the slot, the C↔M polarity gap is closed by Y at 9 and anchored by K at 0. The signal model under links/tags/admin hue. Nested under rodin."
atomPath: rodin/cmyk
coordinate: rodin/cmyk · 8/crest · 5d5d78c8
contentUuid: "33e680fc-5baa-514a-8ce3-8436f164d2be"
diamondUuid: "af7a52b5-98db-8504-aa20-d40fee87a706"
uuid: "5d5d78c8-d139-817d-a445-63804748e286"
horo: 8
bonds:
  in:
    - analog
    - aura
    - axis
    - balance
    - biophoton
    - breath
    - chakra
    - coil
    - config
    - decompression
    - give
    - horo
    - identity
    - localize
    - notes
    - oid
    - phase
    - polarity
    - rodin
    - science
    - signal
    - tags
    - take
    - theme
    - vibration
  out:
    - analog
    - aura
    - axis
    - balance
    - biophoton
    - breath
    - chakra
    - coil
    - config
    - decompression
    - give
    - horo
    - identity
    - localize
    - notes
    - oid
    - phase
    - polarity
    - rodin
    - science
    - signal
    - tags
    - take
    - theme
    - vibration
typography:
  partition: rodin
  bondDegree: 79
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - axis
    - balance
    - coil
    - config
    - give
    - horo
    - identity
    - polarity
    - rodin
    - tags
    - take
  matrix:
    - analog
    - aura
    - axis
    - balance
    - biophoton
    - breath
    - chakra
    - coil
    - config
    - decompression
    - give
    - horo
    - identity
    - localize
    - notes
    - oid
    - phase
    - polarity
    - rodin
    - science
    - signal
    - tags
    - take
    - theme
    - vibration
  backlinks:
    - analog
    - aura
    - axis
    - balance
    - biophoton
    - breath
    - chakra
    - coil
    - config
    - decompression
    - give
    - horo
    - identity
    - localize
    - notes
    - oid
    - phase
    - polarity
    - rodin
    - science
    - signal
    - tags
    - take
    - theme
    - vibration
signatures:
  computationUuid: "3aa75d55-34fd-8f39-a962-6ff8e434c5cf"
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
      stageUuid: "cbddaf19-16e9-8ad9-84a0-88bdbccf8552"
    - stage: seal
      stageUuid: "413a6bb8-237d-84cd-a74d-e95c17479789"
    - stage: uuid
      stageUuid: "97930d4e-7603-8c53-8684-04d0831c1529"
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
