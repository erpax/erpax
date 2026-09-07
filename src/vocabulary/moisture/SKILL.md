---
name: moisture
description: "Use when modelling soil water as a managed reservoir — the plant-available water held between field capacity (after drainage) and the permanent wilting point, the slice irrigation refills and evapotranspiration drains. A capacity reservoir on the water axis, the twin of the soil's nutrient budget."
atomPath: "vocabulary/moisture"
coordinate: "vocabulary/moisture · 2/share · 943e277a"
contentUuid: "80c14ea8-c21b-5a72-b71a-ba99e2a14eca"
diamondUuid: "09db9ba0-45ce-85c9-9f95-d000a9d09d9b"
uuid: "943e277a-c21b-8dcb-aca5-3524d4e42366"
horo: 2
typography:
  partition: vocabulary
  bondDegree: 43
standards: []
bindings: []
signatures:
  computationUuid: "34f37606-9f6a-8a11-b8d3-000b4e58a915"
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
      stageUuid: "3c18049f-ee0f-82d7-9f83-697dee011ae3"
    - stage: seal
      stageUuid: "5bc06a5b-23a6-8642-9211-d376b5714397"
    - stage: uuid
      stageUuid: "cee3be1e-36f1-8ccd-953f-2b7ad6c94814"
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
