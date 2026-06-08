---
name: degreeday
description: "Use when crop development is predicted from accumulated heat rather than the calendar — growing degree days (GDD = (Tmax+Tmin)/2 − Tbase, capped) measure the heat a crop banks toward maturity, so a warm spring advances harvest and a cool one delays it. The heat-unit clock that makes a fixed-week calendar drift; pairs with frost and evapotranspiration."
atomPath: degreeday
coordinate: degreeday · 4/weave · 241701aa
contentUuid: "293ec105-99da-5e26-82ee-768ae6cfeaf8"
diamondUuid: "bb829caf-51bb-8acb-a195-09d698dbd3f0"
uuid: "241701aa-8b6b-87f8-8529-8d15ee6c2685"
horo: 4
bonds:
  in:
    - agriculture
    - dormancy
    - evapotranspiration
    - forecast
    - frost
    - harvest
    - law
    - maturity
    - measure
    - planting
    - season
    - terroir
  out:
    - agriculture
    - dormancy
    - evapotranspiration
    - forecast
    - frost
    - harvest
    - law
    - maturity
    - measure
    - planting
    - season
    - terroir
typography:
  partition: degreeday
  bondDegree: 40
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - agriculture
    - evapotranspiration
    - forecast
    - frost
    - harvest
    - law
    - maturity
    - measure
    - planting
    - season
  matrix:
    - agriculture
    - dormancy
    - evapotranspiration
    - forecast
    - frost
    - harvest
    - law
    - maturity
    - measure
    - planting
    - season
    - terroir
  backlinks:
    - agriculture
    - dormancy
    - evapotranspiration
    - forecast
    - frost
    - harvest
    - law
    - maturity
    - measure
    - planting
    - season
    - terroir
signatures:
  computationUuid: "fa8efe09-49e0-8f7d-bc5e-e05cbe799b70"
  stages:
    - stage: path
      stageUuid: "232bbb2e-6235-8f4e-ada9-c156f1eee287"
    - stage: trinity
      stageUuid: "101977e4-dfa7-8a2b-9d5f-b987cbf0655e"
    - stage: boundary
      stageUuid: "90b36066-5744-8427-9a9f-32c963c3149c"
    - stage: links
      stageUuid: "0aa9818b-9a25-88f7-a3be-40f0bb8beb8d"
    - stage: horo
      stageUuid: "559927e6-9086-834b-ace0-a2022ef43d21"
    - stage: seal
      stageUuid: "4ad2664e-818e-893a-8612-f79b76dc0936"
    - stage: uuid
      stageUuid: "c587bed6-3910-89c0-8cdc-a2aa3dbbbec9"
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
