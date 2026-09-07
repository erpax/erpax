---
name: spacing
description: "Use when plant geometry sets density and yield — in-row × between-row spacing and rows-per-bed determine plants per area (plants/acre = rows ÷ in-row-spacing ÷ bed-center × 43,560), which sets seed/transplant counts and, with per-plant yield, total yield. Tighter is not linearly more: beyond an optimum, plants compete and per-plant size falls."
atomPath: spacing
coordinate: "spacing · 5/round · 1fe7c840"
contentUuid: "6b7f371b-bdf9-5192-b8a8-be5fae0ed5e2"
diamondUuid: "0c9406ad-0e94-8ca0-8487-652361f3f06b"
uuid: "1fe7c840-dfda-836b-831d-22b8636fc2b8"
horo: 5
typography:
  partition: spacing
  bondDegree: 42
standards: []
bindings: []
signatures:
  computationUuid: "4633b278-1ff5-89bf-a7cc-574ec06f903c"
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
      stageUuid: "f0cad7f9-ee1c-8904-8fdb-e36b06b48dc2"
    - stage: seal
      stageUuid: "2ec627dd-5e83-8c1f-bccc-2b796fefade1"
    - stage: uuid
      stageUuid: "db518a9c-3f02-8a13-9ed9-01d88ae492cd"
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
