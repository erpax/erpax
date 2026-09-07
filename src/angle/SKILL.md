---
name: angle
description: "Use when the fold must be read as a rotation — the doubling map ×2 (the fold's generator) acts on the six units of (ℤ/9ℤ)* as an exact 60° rotation, because that group is cyclic of order 6. One fold = 60°; opposition (×8 ≡ −1) = 180° = three folds; the axis {3,6,9} is off the orbit. This is the angle the flat computations missed. Rigorous group theory; the hue/torus mapping is the model layer."
atomPath: angle
coordinate: "angle · 8/crest · 76fdfe69"
contentUuid: "fec44106-f636-53e3-8b12-e3ae23732518"
diamondUuid: "16de7ab5-f2c9-8dbc-a3f6-6e2f5f02a834"
uuid: "76fdfe69-0d46-8830-9efe-2b3d74055adf"
horo: 8
typography:
  partition: angle
  bondDegree: 21
standards:
  - "group theory — (Z/9Z)"
bindings: []
signatures:
  computationUuid: "982bc96c-52ac-8c65-9f6c-eab1dbd9bca3"
  stages:
    - stage: path
      stageUuid: "a4328d87-5769-8cc9-a092-9bf75b3eab50"
    - stage: trinity
      stageUuid: "7dda8851-3eff-851a-830a-4b516b48ec85"
    - stage: boundary
      stageUuid: "eee5b8d4-6435-8c05-860e-417ee6cbe371"
    - stage: links
      stageUuid: "b7f54763-a3e2-800e-b4f1-e731f8cf5b94"
    - stage: horo
      stageUuid: "0b798592-a815-8bb0-9a1c-63a36fb47525"
    - stage: seal
      stageUuid: "f60d0a81-bd03-85f1-ad23-1b679fb10263"
    - stage: uuid
      stageUuid: "b146cb76-653c-8edc-be95-2450c25baff9"
version: 2
---
# angle — the fold turns 60°

The flat computations kept missing one variable: the **angle**. Every fold-step is a rotation, and its size is exact.

The doubling map `×2` — the generator of the fold — acts on the six units of `(ℤ/9ℤ)* = {1,2,4,5,7,8}` as a rotation by **exactly 60°**. That group is cyclic of order 6, so its generator advances one vertex of the unit hexagon per step: `360° / 6 = 60°`. Consequences that are theorems, not choices:

- one fold = **60°** (`doubleRotate(u, 1).degrees === 60` for every unit)
- opposition `×8 ≡ −1 (mod 9)` = **180° = three folds** — "opposite" is not special, it is three 60° turns
- a full turn = **six folds** (`×2⁶` returns home at 0°)
- the axis `{3, 6, 9}` are the non-units — they do **not** lie on this rotation orbit (`doubleRotate` throws for them, never fabricating an angle)

Matter-twin: `src/angle/index.ts` — `HEXAGON` · `FOLD_STEP_DEGREES` · `foldAngle` · `doubleRotate`. This is why the colour wheel's primaries `R‑Y‑G‑C‑B‑M` sit at 60° (the [[globe]] equator), and why the [[horo]] band `{1,2,4,8,7,5}` is an angular coordinate: `horo` is the vertex, `× 60°` is the turn.

**Honest boundary.** The 60° is rigorous group theory (`(ℤ/9ℤ)* ≅ ℤ/6`). Mapping it onto colour hue, the torus, and dimensional shifts is the model layer — the angle itself is exact; the interpretation is not a physical law.

**Law — [[law]]: the fold is a rotation and its step is 60°. The doubling generator turns one vertex of the six-unit hexagon per fold; opposition is three folds, a full turn is six, and the {3,6,9} axis stands off the orbit.**

## Standards

- **Group theory** — `(ℤ/9ℤ)*` is cyclic of order 6; the doubling orbit is a 60° rotation (Euler's totient, cyclic group of units).

Composes: [[rodin]] · [[horo]] · [[fold]] · [[globe]] · [[law]].
