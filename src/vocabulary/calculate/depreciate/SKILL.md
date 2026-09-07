---
name: depreciate
description: "Use when reasoning about depreciate — ports the etrima/erpax depreciation calculators verbatim (calculate, port): given cost, salvage, useful-life (and units for activity-based), compute the per-period charge by method"
atomPath: "vocabulary/calculate/depreciate"
coordinate: "vocabulary/calculate/depreciate · 1/base · 3080cf70"
contentUuid: "3c518ecf-9929-59cc-b32c-0ca8a6b2cc2f"
diamondUuid: "c4294951-64e7-83dd-bc53-48349e67b954"
uuid: "3080cf70-02a3-8df5-ae30-57e3352e85fa"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 13
standards: []
bindings: []
signatures:
  computationUuid: "e24dc10a-de6b-8b47-8b81-56422353f03c"
  stages:
    - stage: path
      stageUuid: "77e91b0c-24f9-843d-92a0-67a993c85081"
    - stage: trinity
      stageUuid: "3b4d899b-c6f6-8d0d-b6a5-8edfa446eda1"
    - stage: boundary
      stageUuid: "4a3b2383-85ec-895e-84f5-0b3e8e01b367"
    - stage: links
      stageUuid: "c391e1e4-148e-85ce-91d5-08ea04452294"
    - stage: horo
      stageUuid: "d199fb10-ed89-8e28-b390-65177cc6cc60"
    - stage: seal
      stageUuid: "3d5bef02-950d-8fb8-8dfc-dc8cd8576e34"
    - stage: uuid
      stageUuid: "8ad052ba-d821-89fc-b49b-68e4d7d9b980"
version: 2
---
# depreciate — depreciation schedules (pure compute)

`calculate/depreciate` ports the etrima/erpax depreciation calculators verbatim ([[calculate]], [[port]]): given cost, salvage, useful-life (and units for activity-based), compute the per-period charge by method — **straight-line**, **declining-balance (DDB)**, **sum-of-years-digits**, **units-of-activity**. Pure function, no persistence; the result feeds [[accounting]] (the depreciation journal), but the calc holds no state. Cite the standard (IAS-16 / US-GAAP ASC-360). Money is amount + [[currency]].

## Common mistakes
- Storing the schedule as state in the calculator — it's pure; persist the resulting journal in [[accounting]].
- Conflating the method formulas — one leaf per method-family, or branch explicitly.
