---
name: evapotranspiration
description: "Use when quantifying crop water demand — evapotranspiration (ET) = soil evaporation + plant transpiration, the daily withdrawal from the soil-moisture reservoir that drives irrigation scheduling. The debit side of the water budget; reference ET × crop coefficient gives the crop's actual draw."
atomPath: evapotranspiration
coordinate: evapotranspiration · 7/descent · da4758ee
contentUuid: "90d58088-6461-5b41-96fb-08eec4bed4e3"
diamondUuid: "1c0accdf-3a26-82f3-acdb-b0cf21c4f3a9"
uuid: "da4758ee-d16d-8505-88f5-695e954c1d7f"
horo: 7
bonds:
  in:
    - agriculture
    - balance
    - degreeday
    - irrigation
    - law
    - maturity
    - measure
    - moisture
    - rate
    - season
  out:
    - agriculture
    - balance
    - degreeday
    - irrigation
    - law
    - maturity
    - measure
    - moisture
    - rate
    - season
typography:
  partition: evapotranspiration
  bondDegree: 33
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - agriculture
    - balance
    - degreeday
    - irrigation
    - law
    - maturity
    - measure
    - moisture
    - rate
    - season
  matrix:
    - agriculture
    - balance
    - degreeday
    - irrigation
    - law
    - maturity
    - measure
    - moisture
    - rate
    - season
  backlinks:
    - agriculture
    - balance
    - degreeday
    - irrigation
    - law
    - maturity
    - measure
    - moisture
    - rate
    - season
signatures:
  computationUuid: "b1cf31bf-8534-8ef2-8ebf-16beec084137"
  stages:
    - stage: path
      stageUuid: "52cbb9fa-0047-8d74-ae67-cebd84874c71"
    - stage: trinity
      stageUuid: "fe130ee7-a9cf-853c-bf6c-9c3ddead9f90"
    - stage: boundary
      stageUuid: "fcd87f6a-2834-8b7c-bea2-ef80b9a37c0b"
    - stage: links
      stageUuid: "73443a59-fb6a-8824-b4dc-b2d6ff98265a"
    - stage: horo
      stageUuid: "ee176d08-a990-886e-8b85-f65f7073a41a"
    - stage: seal
      stageUuid: "3adb33fb-af55-839c-842d-1635eba6aaaf"
    - stage: uuid
      stageUuid: "83141db2-f115-8331-8be0-acd8808c327e"
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
