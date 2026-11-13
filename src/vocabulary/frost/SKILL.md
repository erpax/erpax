---
name: frost
description: "Use when the freeze event bounds the growing season — the last spring frost and first fall frost define the frost-free period that caps which crops are feasible; frost dates are probabilistic (per-station, at a confidence level), not fixed calendar dates. The hard bound of the season; the event tunnels and hardiness buffer against."
atomPath: "vocabulary/frost"
coordinate: "vocabulary/frost · 8/crest · 7c967d9e"
contentUuid: "0b1f6baa-f619-5355-9256-b491cc2d1a0e"
diamondUuid: "d5b07ac5-0be3-8ab3-9729-fbeb4830ee75"
uuid: "7c967d9e-86a6-8d35-b30a-fbd790fd1eb4"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 23
standards: []
bindings: []
signatures:
  computationUuid: "6597f6c7-022a-8a2b-bb54-86e6f0219c90"
  stages:
    - stage: path
      stageUuid: "f2af83be-c68a-801c-a835-7d156a328033"
    - stage: trinity
      stageUuid: "e3788c73-c103-8fad-8c31-c99d6f2f597f"
    - stage: boundary
      stageUuid: "7b5c3305-7570-86a3-a2c1-88226f0e8451"
    - stage: links
      stageUuid: "5100b4c0-4601-8c7a-ac2a-132dc6d60cef"
    - stage: horo
      stageUuid: "42308c04-55b1-8587-a834-7cb71d7b7b24"
    - stage: seal
      stageUuid: "4eb9c495-35af-88ef-9b18-ecfcf23e0295"
    - stage: uuid
      stageUuid: "05be1453-8867-84de-807e-c959577c84bd"
version: 2
---
# frost — the freeze event that bounds the season

**frost** is the freeze event that bounds the growing season: the **last spring frost** and **first fall frost** define the **frost-free period** — the window that caps which [[crop]]s are even feasible (a 180-day frost-free belt grows melons; a 90-day one forces quick crops). Frost dates are **probabilistic, not fixed** — derived per weather station at a confidence level (e.g. "50% chance of 32 °F after this date") — so the relevant date is the *local* one; a copied or town-average date misfires.

Frost is the hard bound the season is cut from, and the event two things buffer against: **tunnels** (row cover, high tunnel — built protection) and crop **[[hardiness]]** (biological cold tolerance — hardy crops shrug off light frost, tender ones die at it). It anchors all the date math the [[degreeday]] heat-clock then paces.

## Standards
- NC State / land-grant extension — average first/last frost dates (probabilistic, per-station)
- USDA Plant Hardiness Zone Map (2023); NOAA climate normals (freeze/frost probabilities)

Composes [[agriculture]] · season · [[crop]] · tunnel · [[hardiness]] · [[degreeday]] · [[planting]].

**Law — [[law]]: frost is the freeze event that bounds the season — last-spring and first-fall frost define the frost-free window that caps which [[crop]]s are feasible; the dates are probabilistic per-station, never a fixed calendar.**
