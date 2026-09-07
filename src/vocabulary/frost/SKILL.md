---
name: frost
description: "Use when the freeze event bounds the growing season — the last spring frost and first fall frost define the frost-free period that caps which crops are feasible; frost dates are probabilistic (per-station, at a confidence level), not fixed calendar dates. The hard bound of the season; the event tunnels and hardiness buffer against."
atomPath: "vocabulary/frost"
coordinate: "vocabulary/frost · 7/descent · 51cac1d3"
contentUuid: "d5cd30ba-323f-5c82-a6d0-650d09f09d00"
diamondUuid: "63027ce8-508a-847f-b8a0-5017e2e4a450"
uuid: "51cac1d3-5b5a-8967-ab0f-623d32ad5bf7"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 34
standards: []
bindings: []
signatures:
  computationUuid: "22e88ed2-4be7-85a8-872c-ed9dd2fd12c1"
  stages:
    - stage: path
      stageUuid: "f2af83be-c68a-801c-a835-7d156a328033"
    - stage: trinity
      stageUuid: "e3788c73-c103-8fad-8c31-c99d6f2f597f"
    - stage: boundary
      stageUuid: "7692201c-7c10-868f-a986-417f92a1aede"
    - stage: links
      stageUuid: "ad226b6b-5031-8efc-aa3d-c93ad63b2ebb"
    - stage: horo
      stageUuid: "65e21f1e-2dba-81ce-81b2-f0e44ad2e5cc"
    - stage: seal
      stageUuid: "4eb9c495-35af-88ef-9b18-ecfcf23e0295"
    - stage: uuid
      stageUuid: "41aecdc2-b608-8ee9-9165-db50236ad926"
version: 2
---
# frost — the freeze event that bounds the season

**frost** is the freeze event that bounds the growing [[season]]: the **last spring frost** and **first fall frost** define the **frost-free period** — the window that caps which [[crop]]s are even feasible (a 180-day frost-free belt grows melons; a 90-day one forces quick crops). Frost dates are **probabilistic, not fixed** — derived per weather station at a confidence level (e.g. "50% chance of 32 °F after this date") — so the relevant date is the *local* one; a copied or town-average date misfires.

Frost is the hard bound the [[season]] is cut from, and the event two things buffer against: **[[tunnel]]s** (row cover, high tunnel — built protection) and crop **[[hardiness]]** (biological cold tolerance — hardy crops shrug off light frost, tender ones die at it). It anchors all the date math the [[degreeday]] heat-clock then paces.

## Standards
- NC State / land-grant extension — average first/last frost dates (probabilistic, per-station)
- USDA Plant Hardiness Zone Map (2023); NOAA climate normals (freeze/frost probabilities)

Composes [[agriculture]] · [[season]] · [[crop]] · [[tunnel]] · [[hardiness]] · [[degreeday]] · [[planting]].

**Law — [[law]]: frost is the freeze event that bounds the [[season]] — last-spring and first-fall frost define the frost-free window that caps which [[crop]]s are feasible; the dates are probabilistic per-station, never a fixed calendar.**
