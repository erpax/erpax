---
name: evapotranspiration
description: "Use when quantifying crop water demand — evapotranspiration (ET) = soil evaporation + plant transpiration, the daily withdrawal from the soil-moisture reservoir that drives irrigation scheduling. The debit side of the water budget; reference ET × crop coefficient gives the crop's actual draw."
atomPath: "vocabulary/evapotranspiration"
coordinate: "vocabulary/evapotranspiration · 1/base · 46c95c1b"
contentUuid: "964f0a6a-7a0b-547a-9821-89a495ea615f"
diamondUuid: "14a5fc99-cf05-82d1-a50c-ca7c5af5af82"
uuid: "46c95c1b-2239-8662-9df1-3e487a46dab5"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 33
standards: []
bindings: []
signatures:
  computationUuid: "a5e4c49b-5631-8b36-834a-183e898162a0"
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
      stageUuid: "93053040-58c1-8b5b-b2d8-e9390ce727a5"
    - stage: seal
      stageUuid: "d5d6ddf4-9104-8dc7-ab97-378d1f606d33"
    - stage: uuid
      stageUuid: "05c43515-bb6e-80b7-99d3-c48f7f1d500f"
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
