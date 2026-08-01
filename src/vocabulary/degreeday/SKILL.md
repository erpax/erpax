---
name: degreeday
description: "Use when crop development is predicted from accumulated heat rather than the calendar — growing degree days (GDD = (Tmax+Tmin)/2 − Tbase, capped) measure the heat a crop banks toward maturity, so a warm spring advances harvest and a cool one delays it. The heat-unit clock that makes a fixed-week calendar drift; pairs with frost and evapotranspiration."
atomPath: "vocabulary/degreeday"
coordinate: "vocabulary/degreeday · 5/round · 4b69764c"
contentUuid: "dbc0395e-e86c-5106-a36a-23e9b14a30a2"
diamondUuid: "7d34b183-da49-8a9c-a930-1752a55175bf"
uuid: "4b69764c-139e-87f9-8bb7-894be64c2f7f"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 40
standards: []
bindings: []
signatures:
  computationUuid: "5c49f17b-7a66-85ea-b16a-3b5a14ccd033"
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
      stageUuid: "8980c5b7-63b3-8eca-a006-8b37d83dc58f"
    - stage: seal
      stageUuid: "f0686474-2a84-8a3d-9f2f-bb338412e572"
    - stage: uuid
      stageUuid: "bd8bf22d-7680-836a-bc83-005ec49f46c3"
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
