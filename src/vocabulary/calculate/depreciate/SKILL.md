---
name: depreciate
description: "Use when reasoning about depreciate — ports the etrima/erpax depreciation calculators verbatim (calculate, port): given cost, salvage, useful-life (and units for activity-based), compute the per-period charge by method"
atomPath: "vocabulary/calculate/depreciate"
coordinate: "vocabulary/calculate/depreciate · 4/weave · b0225df4"
contentUuid: "0dc98849-13ec-5d9a-a237-7725514e2f11"
diamondUuid: "4c7a5883-fbcd-8f43-be3b-f1f9f5323a2b"
uuid: "b0225df4-4668-8d7b-88e8-1edbc4be34fe"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 13
standards: []
bindings: []
signatures:
  computationUuid: "b4896600-e859-8e81-902a-16cf475d9bb9"
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
      stageUuid: "9de0c7e7-cdbe-8c01-9f53-bcb4b1887ab4"
    - stage: seal
      stageUuid: "3d5bef02-950d-8fb8-8dfc-dc8cd8576e34"
    - stage: uuid
      stageUuid: "c56aa184-da37-894a-acbf-a2fa4f7ebb04"
version: 2
---
# depreciate — depreciation schedules (pure compute)

`calculate/depreciate` ports the etrima/erpax depreciation calculators verbatim ([[calculate]], [[port]]): given cost, salvage, useful-life (and units for activity-based), compute the per-period charge by method — **straight-line**, **declining-balance (DDB)**, **sum-of-years-digits**, **units-of-activity**. Pure function, no persistence; the result feeds [[accounting]] (the depreciation journal), but the calc holds no state. Cite the standard (IAS-16 / US-GAAP ASC-360). Money is amount + [[currency]].

## Common mistakes
- Storing the schedule as state in the calculator — it's pure; persist the resulting journal in [[accounting]].
- Conflating the method formulas — one leaf per method-family, or branch explicitly.
