---
name: cropplan
description: "Use when converting a sales/yield goal into what to grow, how much, when, and where — the crop plan (the what/how-much: quantities, seed, beds) and its spatial twin the field plan/map (the where: each succession assigned to a bed/block). The master planning document of a market farm; the backward demand→land calculation made concrete and recorded."
atomPath: "vocabulary/cropplan"
coordinate: "vocabulary/cropplan · 8/crest · da3202ca"
contentUuid: "d2cfe947-6c22-51d4-a8af-bf02fde3de8f"
diamondUuid: "6494f2f3-2993-803b-97ca-b58d14ea525e"
uuid: "da3202ca-fcf0-85dc-a398-636fc4e8bdd6"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 41
standards: []
bindings: []
signatures:
  computationUuid: "0d085bdb-bcc4-8b52-9103-d9fbbb1c552e"
  stages:
    - stage: path
      stageUuid: "f27c968f-bb0d-83a9-b2a6-62b4ded9436e"
    - stage: trinity
      stageUuid: "d1aa40e8-3c4f-8251-9356-facee25fed18"
    - stage: boundary
      stageUuid: "cedfe258-13f0-822a-82c8-9d4447c5a68b"
    - stage: links
      stageUuid: "dadcb7a1-540e-8143-a3eb-3a7c3625226b"
    - stage: horo
      stageUuid: "a6fb2ce9-75ed-88f4-9c00-b6e3ec30166d"
    - stage: seal
      stageUuid: "0b98bb08-cfeb-86d6-9682-0e233eed552b"
    - stage: uuid
      stageUuid: "e0ec8890-2d2f-8627-90c3-180135ecd20b"
version: 2
---
# cropplan — the document that turns a sales goal into what/how-much/when/where

A **crop plan** is the master planning document that converts a sales/yield goal into **what to grow, how much, when, and where** — [[agriculture]]'s backward demand→land calculation made concrete and recorded. Its two faces: the **crop plan** proper (the *what/how-much*: quantities per [[crop]], [[seed]] order, bed-feet, [[planting]] dates) and the **field plan / map** (the *where*: each [[planting|succession]] assigned to a bed/block — the spatial [[allocation]] that also drives rotation). Flattened and sorted by date, it becomes the field planting schedule that runs the season.

The crop plan is the recorded, re-runnable form of the planning chain — demand → units → bed-feet → [[seed]] + inputs → [[forecast|availability]]. It closes the loop with field/[[harvest]] records: actuals refine next year's yield coefficients and buffers, so the plan is a [[version|versioned]] document, not a one-shot. It is the [[manufacturing|MRP]] run-sheet of the farm.

## Standards
- CEFS / NC State — *Planning Spreadsheets for CSA and Farmers' Markets* (the source artifact); Brookfield Farm crop planning
- Coleman / Fortier — the crop plan & field map; UMN Extension — crop & field planning tools
- Wiswall — crop plan tied to enterprise budgets

Composes [[agriculture]] · [[crop]] · [[planting]] · [[seed]] · yield · rotation · [[allocation]] · schedule · [[forecast]] · season · [[harvest]] · [[manufacturing]] · [[version]].

**Law — [[law]]: a crop plan is the recorded, re-runnable backward computation from a sales/yield goal to what/how-much/when/where (demand → units → bed-feet → [[seed]]); actuals feed back to refine next year's coefficients, so it is versioned, never a one-shot.**
