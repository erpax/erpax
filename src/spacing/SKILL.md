---
name: spacing
description: "Use when plant geometry sets density and yield — in-row × between-row spacing and rows-per-bed determine plants per area (plants/acre = rows ÷ in-row-spacing ÷ bed-center × 43,560), which sets seed/transplant counts and, with per-plant yield, total yield. Tighter is not linearly more: beyond an optimum, plants compete and per-plant size falls."
atomPath: spacing
coordinate: "spacing · 4/weave · bee84055"
contentUuid: "f42c614e-8563-5bf4-849f-02de6900a7be"
diamondUuid: "8932c9e5-384b-817e-9f55-82943910f748"
uuid: "bee84055-6b3b-8db9-8bee-726a048a48f0"
horo: 4
typography:
  partition: spacing
  bondDegree: 42
standards: []
bindings: []
signatures:
  computationUuid: "b1ec1e3e-617a-83b4-851f-6d5a7fa8a903"
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
      stageUuid: "f8f6db48-abfc-87c8-81f7-17f17327bdfe"
    - stage: seal
      stageUuid: "2ec627dd-5e83-8c1f-bccc-2b796fefade1"
    - stage: uuid
      stageUuid: "c7179c4c-2e77-85f7-9c12-422274a82888"
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
