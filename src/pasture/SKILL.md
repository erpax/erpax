---
name: pasture
description: "Use when modelling the managed forage land livestock graze — pasture (improved/tame forage) and rangeland (native), divided into paddocks for rotational grazing. The grazing land-unit; the livestock counterpart of a crop field, its productivity a fertility/capacity measure."
atomPath: pasture
coordinate: pasture · 8/crest · 2a9ac8a7
contentUuid: "77cbe2f7-3f9e-5727-9686-dd0dfbacfbc9"
diamondUuid: "e81e2656-0ca3-8dbb-aa40-edf244c4c693"
uuid: "2a9ac8a7-0ccb-858f-873d-dc24aac0fceb"
horo: 8
bonds:
  in:
    - allocation
    - bottleneck
    - capacity
    - crop
    - fertility
    - grazing
    - herd
    - law
    - leases
    - livestock
    - manure
    - rotation
    - season
  out:
    - allocation
    - bottleneck
    - capacity
    - crop
    - fertility
    - grazing
    - herd
    - law
    - leases
    - livestock
    - manure
    - rotation
    - season
typography:
  partition: pasture
  bondDegree: 42
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - allocation
    - bottleneck
    - capacity
    - crop
    - fertility
    - grazing
    - herd
    - law
    - leases
    - livestock
    - manure
    - rotation
    - season
  matrix:
    - allocation
    - bottleneck
    - capacity
    - crop
    - fertility
    - grazing
    - herd
    - law
    - leases
    - livestock
    - manure
    - rotation
    - season
  backlinks:
    - allocation
    - bottleneck
    - capacity
    - crop
    - fertility
    - grazing
    - herd
    - law
    - leases
    - livestock
    - manure
    - rotation
    - season
signatures:
  computationUuid: "420132f5-cf35-8a8f-babe-bfcf89e03106"
  stages:
    - stage: path
      stageUuid: "26ff3bff-b9bf-8f4e-92c0-af8b61813e36"
    - stage: trinity
      stageUuid: "56796e0a-2515-8d63-8479-2e2c0c3eaa6c"
    - stage: boundary
      stageUuid: "5675207c-91c0-8f1d-a833-b39a7ac86bb0"
    - stage: links
      stageUuid: "984cb19b-700e-8ca3-811d-5607b5033876"
    - stage: horo
      stageUuid: "1fd1589e-c4e5-825f-9cb7-3c9a7a0a4c95"
    - stage: seal
      stageUuid: "78a78f1e-c4a4-8c97-bba9-85458ed90ddf"
    - stage: uuid
      stageUuid: "cab70238-182d-8274-8305-99532cee9c9e"
version: 2
---
# pasture — the managed forage land livestock graze

A **pasture** is managed land of forage that [[livestock]] [[grazing|graze]] — improved/tame forage or native **rangeland** (a sub-type, a field). It is divided into **paddocks** (rotational sub-units) the [[herd]] moves through ([[rotation]]). It is the livestock counterpart of a [[crop]] field: its forage productivity is a [[fertility]] / [[capacity]] measure (the carrying capacity in animal-units), raised by rest, [[manure]], and species mix.

Pasture is the land [[allocation]] of the grazing system — what the land × [[season]] [[bottleneck]] yields as forage rather than harvested [[crop]]. It is often a [[leases|leased]] resource priced per animal-unit-month.

## Standards
- USDA-NRCS (pasture/rangeland management, carrying capacity); OSU / extension (pasture productivity)
- FAO (grazing land); Savory (holistic planned grazing)

Composes [[livestock]] · [[grazing]] · [[herd]] · [[crop]] · [[rotation]] · [[fertility]] · [[capacity]] · [[manure]] · [[allocation]] · [[season]] · [[bottleneck]] · [[leases]].

**Law — [[law]]: pasture is the grazing land-unit whose forage productivity is a carrying-[[capacity]] measure (animal-units), bounded by the land × [[season]] [[bottleneck]] — the livestock counterpart of a [[crop]] field.**
