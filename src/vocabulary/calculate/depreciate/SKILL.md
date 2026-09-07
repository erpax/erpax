---
name: depreciate
description: "Use when reasoning about depreciate — ports the etrima/erpax depreciation calculators verbatim (calculate, port): given cost, salvage, useful-life (and units for activity-based), compute the per-period charge by method"
atomPath: "vocabulary/calculate/depreciate"
coordinate: "vocabulary/calculate/depreciate · 4/weave · 1b7a178c"
contentUuid: "98116cdd-d7d0-5fe5-a6e6-8c3d7279e47c"
diamondUuid: "ccf7ec9e-69ca-8c51-bdb1-9a2310f6a623"
uuid: "1b7a178c-c497-8879-b01d-443ab0db828a"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 13
standards: []
bindings: []
signatures:
  computationUuid: "9d71fa5b-7d1f-810f-a1b8-5995f8c0edf6"
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
      stageUuid: "c86fde85-2b25-8259-8fc6-171da507410f"
    - stage: seal
      stageUuid: "3d5bef02-950d-8fb8-8dfc-dc8cd8576e34"
    - stage: uuid
      stageUuid: "d7a90e5a-aab9-89c1-8210-62da42c7e43d"
version: 2
---
# depreciate — depreciation schedules (pure compute)

`calculate/depreciate` ports the etrima/erpax depreciation calculators verbatim ([[calculate]], [[port]]): given cost, salvage, useful-life (and units for activity-based), compute the per-period charge by method — **straight-line**, **declining-balance (DDB)**, **sum-of-years-digits**, **units-of-activity**. Pure function, no persistence; the result feeds [[accounting]] (the depreciation journal), but the calc holds no state. Cite the standard (IAS-16 / US-GAAP ASC-360). Money is amount + [[currency]].

## Common mistakes
- Storing the schedule as state in the calculator — it's pure; persist the resulting journal in [[accounting]].
- Conflating the method formulas — one leaf per method-family, or branch explicitly.
