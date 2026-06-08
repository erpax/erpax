---
name: spacing
description: "Use when plant geometry sets density and yield — in-row × between-row spacing and rows-per-bed determine plants per area (plants/acre = rows ÷ in-row-spacing ÷ bed-center × 43,560), which sets seed/transplant counts and, with per-plant yield, total yield. Tighter is not linearly more: beyond an optimum, plants compete and per-plant size falls."
atomPath: spacing
coordinate: spacing · 7/descent · b37a5175
contentUuid: "121b55d8-d0dd-5819-a8e9-e754740a3207"
diamondUuid: "0b6edd47-6d64-8ad1-8c62-b84492eefb9e"
uuid: "b37a5175-b00e-8f53-86a4-209761171f6b"
horo: 7
bonds:
  in:
    - agriculture
    - bottleneck
    - crop
    - cultivation
    - law
    - measure
    - perennial
    - planting
    - propagation
    - rootstock
    - seed
    - transplant
    - yield
  out:
    - agriculture
    - bottleneck
    - crop
    - cultivation
    - law
    - measure
    - perennial
    - planting
    - propagation
    - rootstock
    - seed
    - transplant
    - yield
typography:
  partition: spacing
  bondDegree: 42
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - agriculture
    - bottleneck
    - crop
    - cultivation
    - law
    - measure
    - planting
    - seed
    - transplant
    - yield
  matrix:
    - agriculture
    - bottleneck
    - crop
    - cultivation
    - law
    - measure
    - perennial
    - planting
    - propagation
    - rootstock
    - seed
    - transplant
    - yield
  backlinks:
    - agriculture
    - bottleneck
    - crop
    - cultivation
    - law
    - measure
    - perennial
    - planting
    - propagation
    - rootstock
    - seed
    - transplant
    - yield
signatures:
  computationUuid: "a5aaac69-733a-8c54-9f99-4c9c133ac7f6"
  stages:
    - stage: path
      stageUuid: "9107f483-3d39-8418-9cd7-12b9c7d9a6db"
    - stage: trinity
      stageUuid: "3c5f0935-37cb-842e-bb88-e3373c3d58db"
    - stage: boundary
      stageUuid: "1e44ac34-f6c7-898c-a019-476a2d290085"
    - stage: links
      stageUuid: "7bdeba80-0814-8baa-abd5-0f3149453108"
    - stage: horo
      stageUuid: "96fe4799-61fc-85f9-ae2c-13ef70e88088"
    - stage: seal
      stageUuid: "a9f67add-d132-8784-9aa8-e59000067d2f"
    - stage: uuid
      stageUuid: "36ccfec8-8823-8cc4-92fa-1de199dc624e"
version: 2
---
# spacing — plant geometry that sets density and yield

**spacing** is the planting geometry — **in-row** distance × **between-row** distance × **rows per bed** — that fixes **plant density** (plants per unit area) and through it the [[seed]]/[[transplant]] count and the [[yield]]. The arithmetic (UGA C1313): `plants per acre = rows-per-bed ÷ in-row-spacing(ft) ÷ bed-center-spacing(ft) × 43,560`. Density × per-plant yield = area yield — so spacing is the lever between [[crop]] geometry and [[yield]].

The trap is non-linearity: **tighter spacing does not scale yield linearly** — beyond an optimum, plants compete for light/water/nutrients, per-plant size and quality fall, and total yield plateaus then drops. Spacing also sets the [[cultivation]] room (can a wheel hoe pass?) and the bed footprint a demand plan consumes ([[bottleneck]]). It is a [[measure]] (length) feeding [[agriculture]]'s [[yield]] geometry.

**Law — [[law]]: planting geometry (in-row × between-row × rows-per-bed) fixes plant density and through it the [[seed]]/[[transplant]] count and the area [[yield]] (density × per-plant yield) — but tighter is not linearly more: beyond an optimum plants compete and per-plant size falls, so yield plateaus then drops.**

## Standards
- UGA Extension C1313 — plants-per-acre geometry; Johnny's Selected Seeds — crop spacing charts
- Coleman / Fortier — standardized bed widths and multi-row spacing

Composes [[agriculture]] · [[crop]] · [[yield]] · [[seed]] · [[transplant]] · [[planting]] · [[cultivation]] · [[measure]] · [[bottleneck]].
