---
name: moisture
description: "Use when modelling soil water as a managed reservoir — the plant-available water held between field capacity (after drainage) and the permanent wilting point, the slice irrigation refills and evapotranspiration drains. A capacity reservoir on the water axis, the twin of the soil's nutrient budget."
atomPath: moisture
coordinate: moisture · 5/round · 1a5376fe
contentUuid: "f355e028-d6f6-5594-b3df-d9ef4923a6f9"
diamondUuid: "d3b476d2-0a68-82a0-a9dd-39505440ae19"
uuid: "1a5376fe-4c4c-8769-b3e8-e10cb5d2c26b"
horo: 5
bonds:
  in:
    - agriculture
    - balance
    - capacity
    - evapotranspiration
    - fertility
    - irrigation
    - law
    - mulch
    - mycorrhizae
    - salinity
    - schedule
    - soil
    - tillage
  out:
    - agriculture
    - balance
    - capacity
    - evapotranspiration
    - fertility
    - irrigation
    - law
    - mulch
    - mycorrhizae
    - salinity
    - schedule
    - soil
    - tillage
typography:
  partition: moisture
  bondDegree: 43
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - agriculture
    - balance
    - capacity
    - evapotranspiration
    - fertility
    - irrigation
    - law
    - mulch
    - schedule
    - soil
    - tillage
  matrix:
    - agriculture
    - balance
    - capacity
    - evapotranspiration
    - fertility
    - irrigation
    - law
    - mulch
    - mycorrhizae
    - salinity
    - schedule
    - soil
    - tillage
  backlinks:
    - agriculture
    - balance
    - capacity
    - evapotranspiration
    - fertility
    - irrigation
    - law
    - mulch
    - mycorrhizae
    - salinity
    - schedule
    - soil
    - tillage
signatures:
  computationUuid: "ee4a2f81-7cfe-811d-8dcf-e213cff044f4"
  stages:
    - stage: path
      stageUuid: "89ac1aaf-f32b-8ae8-89e7-82ee355663ac"
    - stage: trinity
      stageUuid: "8dfc94f8-8e0b-87a5-8748-48f2e7a8161f"
    - stage: boundary
      stageUuid: "d9ebbc0c-6a48-8dbc-b16e-1439d79e223c"
    - stage: links
      stageUuid: "84075f70-dd9f-8e8f-8701-45d2da843aa1"
    - stage: horo
      stageUuid: "98f1dc5d-1068-8358-a876-8851f396311a"
    - stage: seal
      stageUuid: "c7ba25f7-35de-871f-a7e6-e2fb3e2b4390"
    - stage: uuid
      stageUuid: "e1d0b418-5df3-8196-8931-7a8778eebde3"
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
