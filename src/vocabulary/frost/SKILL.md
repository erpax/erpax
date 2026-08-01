---
name: frost
description: "Use when the freeze event bounds the growing season — the last spring frost and first fall frost define the frost-free period that caps which crops are feasible; frost dates are probabilistic (per-station, at a confidence level), not fixed calendar dates. The hard bound of the season; the event tunnels and hardiness buffer against."
atomPath: "vocabulary/frost"
coordinate: "vocabulary/frost · 1/base · 45f3e656"
contentUuid: "c320c171-447f-51f5-8f6c-c1a84d339ded"
diamondUuid: "0b742fb0-5d9e-80e6-bece-26b09e42427e"
uuid: "45f3e656-1f80-8334-a67a-2573f9113b3b"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 34
standards: []
bindings: []
signatures:
  computationUuid: "766d4cf3-02ae-83a2-b625-6a4cd3909a44"
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
      stageUuid: "1fe400f4-df0c-8312-a7f5-65be3407f344"
    - stage: seal
      stageUuid: "d99af9e3-b54d-8e58-b211-56b6e12acab5"
    - stage: uuid
      stageUuid: "898ff082-a218-8b48-875b-0f8571c06870"
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
