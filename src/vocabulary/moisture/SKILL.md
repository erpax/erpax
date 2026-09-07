---
name: moisture
description: "Use when modelling soil water as a managed reservoir — the plant-available water held between field capacity (after drainage) and the permanent wilting point, the slice irrigation refills and evapotranspiration drains. A capacity reservoir on the water axis, the twin of the soil's nutrient budget."
atomPath: "vocabulary/moisture"
coordinate: "vocabulary/moisture · 4/weave · 8f7e0d78"
contentUuid: "c1db8a2b-a336-5a84-b90b-0ff99f74350f"
diamondUuid: "c0ef577e-d3c4-871e-a907-89f0d6ea07fd"
uuid: "8f7e0d78-bb74-8295-949d-f9a9bc105504"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 43
standards: []
bindings: []
signatures:
  computationUuid: "465aadff-a1a7-82b0-be19-3d3683e89a0d"
  stages:
    - stage: path
      stageUuid: "15f7f7fc-2d17-8ba2-8f8c-e128d0144663"
    - stage: trinity
      stageUuid: "2b684a30-6b7b-89f9-a97f-4282d0709466"
    - stage: boundary
      stageUuid: "46441f3c-68f4-8aeb-a580-e09e8adfc629"
    - stage: links
      stageUuid: "a36af703-96f0-841d-802d-d05061d07418"
    - stage: horo
      stageUuid: "775f27ec-87d2-87d1-b77b-2784a7a76f19"
    - stage: seal
      stageUuid: "5bc06a5b-23a6-8642-9211-d376b5714397"
    - stage: uuid
      stageUuid: "9219594b-e0ce-8f51-87f1-757936a47ab0"
version: 2
---
# moisture — soil water held as a plant-available reservoir

**moisture** is water held in [[soil]] pores — the managed supply pool of [[agriculture]]'s water axis. Its bounds: **field capacity** (water remaining after free drainage, ≈ −⅓ bar) and the **permanent wilting point** (≈ −15 bar, below which plants cannot recover turgor); the slice between them is **available water capacity (AWC)** — the plant-usable reservoir (a loam holds ≈ 3.8 in/ft).

Moisture is a [[capacity]] reservoir on the water axis — the twin of [[fertility]]'s nutrient budget: **[[irrigation]]** and rain credit it, **[[evapotranspiration]]** debits it, and the grower replaces the deficit before the crop hits stress ([[balance]]). It is raised by organic matter, [[mulch]], and reduced [[tillage]] (more pore space holds more water). Soil-water tension drives both plant uptake and sensor-based [[schedule|scheduling]].

## Standards
- Cornell NRCCA — soil water (field capacity, wilting point, AWC); USDA-NRCS — available water capacity
- METER Group — plant-available-water measurement (matric potential)

Composes [[agriculture]] · [[soil]] · [[irrigation]] · [[evapotranspiration]] · [[capacity]] · [[balance]] · [[fertility]] · [[mulch]] · [[schedule]].

**Law — [[law]]: soil moisture is a [[capacity]] reservoir bounded by field capacity and the wilting point — irrigation/rain credit it, evapotranspiration debits it, and the deficit is refilled before crop stress ([[balance]]); the water-axis twin of the nutrient budget.**
