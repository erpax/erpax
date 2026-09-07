---
name: moisture
description: "Use when modelling soil water as a managed reservoir — the plant-available water held between field capacity (after drainage) and the permanent wilting point, the slice irrigation refills and evapotranspiration drains. A capacity reservoir on the water axis, the twin of the soil's nutrient budget."
atomPath: "vocabulary/moisture"
coordinate: "vocabulary/moisture · 8/crest · 7d7cb270"
contentUuid: "aa4a1ad9-1c51-501b-bb4b-da47d89ea0e0"
diamondUuid: "26516651-8f49-816d-857f-a5504dae9b6a"
uuid: "7d7cb270-98f6-842d-b992-98061f1a66a1"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 43
standards: []
bindings: []
signatures:
  computationUuid: "4156e383-6907-89aa-b919-0f86c8bc4d06"
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
      stageUuid: "3c9a4e5e-8edf-8b9f-b756-e35bf4a054b1"
    - stage: seal
      stageUuid: "5bc06a5b-23a6-8642-9211-d376b5714397"
    - stage: uuid
      stageUuid: "02795b75-ef27-8dd6-b2ef-e20e10a131a6"
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
