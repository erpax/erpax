---
name: moisture
description: "Use when modelling soil water as a managed reservoir — the plant-available water held between field capacity (after drainage) and the permanent wilting point, the slice irrigation refills and evapotranspiration drains. A capacity reservoir on the water axis, the twin of the soil's nutrient budget."
atomPath: "vocabulary/moisture"
coordinate: "vocabulary/moisture · 1/base · 80844c31"
contentUuid: "ba324881-1692-587a-8247-455e8f993c29"
diamondUuid: "3696e02d-fe22-8357-8bd4-05ddab02e402"
uuid: "80844c31-6f95-8d93-9e9e-0c2970ecaf4d"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 43
standards: []
bindings: []
signatures:
  computationUuid: "eb2f8fd1-5c6f-885b-92b8-b3d524f43e50"
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
      stageUuid: "948d7f03-13d6-81f1-8a96-3f82a4294b02"
    - stage: seal
      stageUuid: "7fe08d26-996d-8e41-aa3b-910d156bb49d"
    - stage: uuid
      stageUuid: "3eace41d-477a-8335-924a-692240bc2141"
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
