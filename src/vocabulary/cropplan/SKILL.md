---
name: cropplan
description: "Use when converting a sales/yield goal into what to grow, how much, when, and where — the crop plan (the what/how-much: quantities, seed, beds) and its spatial twin the field plan/map (the where: each succession assigned to a bed/block). The master planning document of a market farm; the backward demand→land calculation made concrete and recorded."
atomPath: "vocabulary/cropplan"
coordinate: "vocabulary/cropplan · 5/round · 44ef17c0"
contentUuid: "a8e26ecc-14fd-56cb-9940-f6b6ee2c2f9c"
diamondUuid: "a6dc9628-c04e-8445-970e-8d8d2c9433e5"
uuid: "44ef17c0-85ac-8f8a-b027-407f1a3bba4a"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 53
standards: []
bindings: []
signatures:
  computationUuid: "421e810f-296c-807e-985a-77529a116b32"
  stages:
    - stage: path
      stageUuid: "f27c968f-bb0d-83a9-b2a6-62b4ded9436e"
    - stage: trinity
      stageUuid: "d1aa40e8-3c4f-8251-9356-facee25fed18"
    - stage: boundary
      stageUuid: "730e9003-12c1-8535-8220-2630989b3990"
    - stage: links
      stageUuid: "fc5948fc-76fc-8c1f-b12f-da9feae498b8"
    - stage: horo
      stageUuid: "6d63410c-2a5e-82c7-9b4f-1d28b1f03f58"
    - stage: seal
      stageUuid: "0b98bb08-cfeb-86d6-9682-0e233eed552b"
    - stage: uuid
      stageUuid: "1bf2464b-99e6-8840-a24b-6b492178614c"
version: 2
---
# cropplan — the document that turns a sales goal into what/how-much/when/where

A **crop plan** is the master planning document that converts a sales/[[yield]] goal into **what to grow, how much, when, and where** — [[agriculture]]'s backward demand→land calculation made concrete and recorded. Its two faces: the **crop plan** proper (the *what/how-much*: quantities per [[crop]], [[seed]] order, bed-feet, [[planting]] dates) and the **field plan / map** (the *where*: each [[planting|succession]] assigned to a bed/block — the spatial [[allocation]] that also drives [[rotation]]). Flattened and sorted by date, it becomes the field planting [[schedule]] that runs the [[season]].

The crop plan is the recorded, re-runnable form of the planning chain — demand → units → bed-feet → [[seed]] + inputs → [[forecast|availability]]. It closes the loop with field/[[harvest]] records: actuals refine next year's [[yield]] coefficients and buffers, so the plan is a [[version|versioned]] document, not a one-shot. It is the [[manufacturing|MRP]] run-sheet of the farm.

## Standards
- CEFS / NC State — *Planning Spreadsheets for CSA and Farmers' Markets* (the source artifact); Brookfield Farm crop planning
- Coleman / Fortier — the crop plan & field map; UMN Extension — crop & field planning tools
- Wiswall — crop plan tied to enterprise budgets

Composes [[agriculture]] · [[crop]] · [[planting]] · [[seed]] · [[yield]] · [[rotation]] · [[allocation]] · [[schedule]] · [[forecast]] · [[season]] · [[harvest]] · [[manufacturing]] · [[version]].

**Law — [[law]]: a crop plan is the recorded, re-runnable backward computation from a sales/[[yield]] goal to what/how-much/when/where (demand → units → bed-feet → [[seed]]); actuals feed back to refine next year's coefficients, so it is versioned, never a one-shot.**
