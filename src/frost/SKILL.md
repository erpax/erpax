---
name: frost
description: "Use when the freeze event bounds the growing season — the last spring frost and first fall frost define the frost-free period that caps which crops are feasible; frost dates are probabilistic (per-station, at a confidence level), not fixed calendar dates. The hard bound of the season; the event tunnels and hardiness buffer against."
atomPath: frost
coordinate: frost · 4/weave · 6a388bab
contentUuid: "accf8e2b-0c3b-597b-957e-2309f95e627c"
diamondUuid: "18e79f2d-a2c9-8b0a-8b8a-27415306bf83"
uuid: "6a388bab-00d8-82f5-914d-63f4a31417be"
horo: 4
bonds:
  in:
    - agriculture
    - crop
    - degreeday
    - dormancy
    - hardiness
    - law
    - planting
    - season
    - terroir
    - tunnel
  out:
    - agriculture
    - crop
    - degreeday
    - dormancy
    - hardiness
    - law
    - planting
    - season
    - terroir
    - tunnel
typography:
  partition: frost
  bondDegree: 34
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - agriculture
    - crop
    - degreeday
    - hardiness
    - law
    - planting
    - season
    - tunnel
  matrix:
    - agriculture
    - crop
    - degreeday
    - dormancy
    - hardiness
    - law
    - planting
    - season
    - terroir
    - tunnel
  backlinks:
    - agriculture
    - crop
    - degreeday
    - dormancy
    - hardiness
    - law
    - planting
    - season
    - terroir
    - tunnel
signatures:
  computationUuid: "2e0c50b8-d3be-80e9-9476-cc3a7d022a44"
  stages:
    - stage: path
      stageUuid: "c12a504f-0d2f-813f-b619-e1e33f741bc7"
    - stage: trinity
      stageUuid: "2639e3e1-9fef-87cc-b1a7-c26bc0dcb371"
    - stage: boundary
      stageUuid: "4740883c-cdc6-8d93-b93b-a5e535ed3e21"
    - stage: links
      stageUuid: "f1716a1d-3462-889d-9c1e-195ebb343061"
    - stage: horo
      stageUuid: "6d6b4421-65c2-8c1f-b54e-8da2762a9723"
    - stage: seal
      stageUuid: "cc9d291b-9871-86d1-89c9-4cfab7243e4e"
    - stage: uuid
      stageUuid: "85ca71cb-d691-81a8-969b-a5d0e738aab5"
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
