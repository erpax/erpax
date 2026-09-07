---
name: moisture
description: "Use when modelling soil water as a managed reservoir — the plant-available water held between field capacity (after drainage) and the permanent wilting point, the slice irrigation refills and evapotranspiration drains. A capacity reservoir on the water axis, the twin of the soil's nutrient budget."
atomPath: "vocabulary/moisture"
coordinate: "vocabulary/moisture · 8/crest · e73b3e79"
contentUuid: "b7eeda05-ec15-5621-917b-19d1acf618db"
diamondUuid: "1aad1f90-9601-8c64-82ee-cd6aed394301"
uuid: "e73b3e79-272c-80f8-8571-d2162fb2b42a"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 43
standards: []
bindings: []
signatures:
  computationUuid: "6a99aa7e-4b25-8483-b5bf-29ec24c8c85b"
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
      stageUuid: "f6421a44-e247-807b-b832-fc2060263ab1"
    - stage: seal
      stageUuid: "5bc06a5b-23a6-8642-9211-d376b5714397"
    - stage: uuid
      stageUuid: "dbcc230e-0504-806a-beef-2126844b86c3"
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
