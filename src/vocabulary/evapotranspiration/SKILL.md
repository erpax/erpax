---
name: evapotranspiration
description: "Use when quantifying crop water demand — evapotranspiration (ET) = soil evaporation + plant transpiration, the daily withdrawal from the soil-moisture reservoir that drives irrigation scheduling. The debit side of the water budget; reference ET × crop coefficient gives the crop's actual draw."
atomPath: "vocabulary/evapotranspiration"
coordinate: "vocabulary/evapotranspiration · 4/weave · 3d6e4936"
contentUuid: "5e01039d-7ee9-5873-b67e-1318e78fe108"
diamondUuid: "8a323b55-e1bb-8f0a-8aae-97302ecdb775"
uuid: "3d6e4936-9d18-81db-af29-2db88b34ddac"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 30
standards: []
bindings: []
signatures:
  computationUuid: "dbfe8e34-3a8e-873c-8932-5e038ddc4c27"
  stages:
    - stage: path
      stageUuid: "a1d03fb7-0b18-8937-911f-aac9f4e6d011"
    - stage: trinity
      stageUuid: "7480b26c-3605-88a9-acdd-e039f2f1015e"
    - stage: boundary
      stageUuid: "56edcc8b-328e-8b1a-a803-6ded58dab19a"
    - stage: links
      stageUuid: "c6637abe-0865-867d-9bcb-810d98fb3281"
    - stage: horo
      stageUuid: "20a47e53-1a45-85e6-94e8-d5a43ded3fe9"
    - stage: seal
      stageUuid: "d5d6ddf4-9104-8dc7-ab97-378d1f606d33"
    - stage: uuid
      stageUuid: "d182b13d-219f-8567-a88e-b95377dd57b4"
version: 2
---
# evapotranspiration — the crop's water demand (the budget's debit)

**evapotranspiration (ET)** is the combined water loss from **soil evaporation** + plant **transpiration** — the demand side of [[agriculture]]'s water [[balance]] and the daily **withdrawal** from the [[moisture]] reservoir that [[irrigation]] and rain must replace. Reference ET (ET₀, a weather-station potential) × a stage-specific **crop coefficient (Kc)** gives a crop's *actual* draw — the [[rate]] (depth per day) that sizes irrigation.

ET rises with heat, wind, and canopy; it is the water twin of the heat-driven [[degreeday]] that paces [[maturity]]. Track it and the checkbook stays solvent: deposits (rain + irrigation) − withdrawals (ET) = remaining [[moisture]] ([[balance]]).

## Standards
- FAO-56 — reference ET (ET₀) and crop coefficients (Kc); UMN / UC Extension — ET-based scheduling
- METER Group — ET and plant-available water

Composes [[agriculture]] · [[moisture]] · [[irrigation]] · [[balance]] · [[rate]] · [[degreeday]] · season · [[measure]].

**Law — [[law]]: evapotranspiration is the debit of the water budget, so remaining soil moisture equals deposits (rain + irrigation) minus this withdrawal; the reservoir cannot be drawn past zero without a deposit.**
