---
name: degreeday
description: "Use when crop development is predicted from accumulated heat rather than the calendar — growing degree days (GDD = (Tmax+Tmin)/2 − Tbase, capped) measure the heat a crop banks toward maturity, so a warm spring advances harvest and a cool one delays it. The heat-unit clock that makes a fixed-week calendar drift; pairs with frost and evapotranspiration."
atomPath: "vocabulary/degreeday"
coordinate: "vocabulary/degreeday · 8/crest · 056dddfe"
contentUuid: "75d5bede-5fa7-5f8a-b914-3da7fda4535c"
diamondUuid: "e22da756-5dbe-80b0-8c58-b67e856c262e"
uuid: "056dddfe-5643-8063-ab41-6468e4fab199"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 33
standards: []
bindings: []
signatures:
  computationUuid: "768ad798-3894-85e8-90ac-a050cf3e00df"
  stages:
    - stage: path
      stageUuid: "dc7940ba-2ab3-89b9-a710-5fadef681ed8"
    - stage: trinity
      stageUuid: "6fa2287d-aad7-8f8a-a68a-0ae186383454"
    - stage: boundary
      stageUuid: "d07c54ce-44e2-8f24-965f-0d03e2c0dc05"
    - stage: links
      stageUuid: "39c95586-e4b5-82d8-aed2-75eb80bd2392"
    - stage: horo
      stageUuid: "326a0781-1e2f-834e-b0ce-0c06ba161455"
    - stage: seal
      stageUuid: "a070a948-c81e-8ac6-adf8-09e880632e16"
    - stage: uuid
      stageUuid: "8e18bc2c-9bc7-8808-9e24-7de508eb454c"
version: 2
---
# degreeday — the heat-unit clock that paces crop development

A **growing degree day (GDD)** is a unit of accumulated heat above a crop's base temperature: `GDD = (Tmax + Tmin)/2 − Tbase`, floored at zero and often capped (e.g. the 86/50 °F method for warm-season crops). Crops develop by **banked heat, not calendar days** — a hybrid needs a fixed GDD total to reach [[maturity]] regardless of date — so a warm spring advances the [[harvest]] week and a cool one delays it. This is precisely why a fixed-week availability calendar **drifts** year to year and is only ever a [[forecast|projection]].

degreeday is the heat clock of the season: the time-base that predicts [[maturity]] and [[harvest]] more reliably than calendar-DTM, the twin of the water-demand [[evapotranspiration]] (both are weather integrals) and the partner of the [[frost]] bound. It is a [[measure]] (°-days) the [[planting]] schedule is calibrated against.

## Standards
- Ohio State AGF-101 — growing degree days (the 86/50 method); OSU Croptime / UC IPM — degree-day crop models
- Michigan State / Purdue Extension — GDD & phenology

Composes [[agriculture]] · season · [[maturity]] · [[harvest]] · [[frost]] · [[evapotranspiration]] · [[planting]] · [[forecast]] · [[measure]].

**Law — [[law]]: crops develop by banked heat, not calendar days — a fixed GDD total to [[maturity]] makes any fixed-week calendar drift, so degreeday is the true time-base the [[planting]] schedule is calibrated against ([[forecast]], never a fixed date).**
