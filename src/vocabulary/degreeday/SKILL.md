---
name: degreeday
description: "Use when crop development is predicted from accumulated heat rather than the calendar — growing degree days (GDD = (Tmax+Tmin)/2 − Tbase, capped) measure the heat a crop banks toward maturity, so a warm spring advances harvest and a cool one delays it. The heat-unit clock that makes a fixed-week calendar drift; pairs with frost and evapotranspiration."
atomPath: "vocabulary/degreeday"
coordinate: "vocabulary/degreeday · 2/share · 5438f4cd"
contentUuid: "694b6892-f82c-5a04-831e-8a11406490b5"
diamondUuid: "ef29d4d8-671e-8955-ab29-094f47bd709c"
uuid: "5438f4cd-a7da-891f-9d43-3fe6e9086dbc"
horo: 2
typography:
  partition: vocabulary
  bondDegree: 40
standards: []
bindings: []
signatures:
  computationUuid: "07c5a7dc-77f6-811d-8c36-0f09af646981"
  stages:
    - stage: path
      stageUuid: "dc7940ba-2ab3-89b9-a710-5fadef681ed8"
    - stage: trinity
      stageUuid: "6fa2287d-aad7-8f8a-a68a-0ae186383454"
    - stage: boundary
      stageUuid: "764cd583-67bb-83fd-bdf3-ed8ed5d0c9c4"
    - stage: links
      stageUuid: "a070e8f0-b980-80b9-9de2-e2a54d607954"
    - stage: horo
      stageUuid: "80fdd33e-5b57-880b-8347-bad34663c702"
    - stage: seal
      stageUuid: "a070a948-c81e-8ac6-adf8-09e880632e16"
    - stage: uuid
      stageUuid: "96a6cc3b-b1ff-87ef-b077-85519788c702"
version: 2
---
# degreeday — the heat-unit clock that paces crop development

A **growing degree day (GDD)** is a unit of accumulated heat above a crop's base temperature: `GDD = (Tmax + Tmin)/2 − Tbase`, floored at zero and often capped (e.g. the 86/50 °F method for warm-season crops). Crops develop by **banked heat, not calendar days** — a hybrid needs a fixed GDD total to reach [[maturity]] regardless of date — so a warm spring advances the [[harvest]] week and a cool one delays it. This is precisely why a fixed-week availability calendar **drifts** year to year and is only ever a [[forecast|projection]].

degreeday is the heat clock of the [[season]]: the time-base that predicts [[maturity]] and [[harvest]] more reliably than calendar-DTM, the twin of the water-demand [[evapotranspiration]] (both are weather integrals) and the partner of the [[frost]] bound. It is a [[measure]] (°-days) the [[planting]] schedule is calibrated against.

## Standards
- Ohio State AGF-101 — growing degree days (the 86/50 method); OSU Croptime / UC IPM — degree-day crop models
- Michigan State / Purdue Extension — GDD & phenology

Composes [[agriculture]] · [[season]] · [[maturity]] · [[harvest]] · [[frost]] · [[evapotranspiration]] · [[planting]] · [[forecast]] · [[measure]].

**Law — [[law]]: crops develop by banked heat, not calendar days — a fixed GDD total to [[maturity]] makes any fixed-week calendar drift, so degreeday is the true time-base the [[planting]] schedule is calibrated against ([[forecast]], never a fixed date).**
