---
name: evapotranspiration
description: "Use when quantifying crop water demand — evapotranspiration (ET) = soil evaporation + plant transpiration, the daily withdrawal from the soil-moisture reservoir that drives irrigation scheduling. The debit side of the water budget; reference ET × crop coefficient gives the crop's actual draw."
atomPath: "vocabulary/evapotranspiration"
coordinate: "vocabulary/evapotranspiration · 1/base · 5445c068"
contentUuid: "9e059f42-3ea0-5f7a-b98e-977c1cd729ab"
diamondUuid: "9dd5492d-40b4-8640-9e6b-120e39a722d0"
uuid: "5445c068-c41b-8155-9f89-4843db9d11c8"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 33
standards: []
bindings: []
signatures:
  computationUuid: "f8522bdb-9041-8d93-a16a-392574b69bfc"
  stages:
    - stage: path
      stageUuid: "a1d03fb7-0b18-8937-911f-aac9f4e6d011"
    - stage: trinity
      stageUuid: "7480b26c-3605-88a9-acdd-e039f2f1015e"
    - stage: boundary
      stageUuid: "2ae5e710-ed5d-8a9f-b4a9-af0e869bfd43"
    - stage: links
      stageUuid: "c6117d8c-420a-8a3b-a4e1-81db97dd4513"
    - stage: horo
      stageUuid: "235c1f1e-12eb-87de-840c-54efc8e9dc04"
    - stage: seal
      stageUuid: "d5d6ddf4-9104-8dc7-ab97-378d1f606d33"
    - stage: uuid
      stageUuid: "03b6ed37-f7ba-8ba6-ad9e-f9661b714699"
version: 2
---
# evapotranspiration — the crop's water demand (the budget's debit)

**evapotranspiration (ET)** is the combined water loss from **soil evaporation** + plant **transpiration** — the demand side of [[agriculture]]'s water [[balance]] and the daily **withdrawal** from the [[moisture]] reservoir that [[irrigation]] and rain must replace. Reference ET (ET₀, a weather-station potential) × a stage-specific **crop coefficient (Kc)** gives a crop's *actual* draw — the [[rate]] (depth per day) that sizes irrigation.

ET rises with heat, wind, and canopy; it is the water twin of the heat-driven [[degreeday]] that paces [[maturity]]. Track it and the checkbook stays solvent: deposits (rain + irrigation) − withdrawals (ET) = remaining [[moisture]] ([[balance]]).

## Standards
- FAO-56 — reference ET (ET₀) and crop coefficients (Kc); UMN / UC Extension — ET-based scheduling
- METER Group — ET and plant-available water

Composes [[agriculture]] · [[moisture]] · [[irrigation]] · [[balance]] · [[rate]] · [[degreeday]] · [[season]] · [[measure]].

**Law — [[law]]: evapotranspiration is the debit of the water budget, so remaining soil moisture equals deposits (rain + irrigation) minus this withdrawal; the reservoir cannot be drawn past zero without a deposit.**
