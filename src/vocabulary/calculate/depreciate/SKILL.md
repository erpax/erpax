---
name: depreciate
description: "Use when reasoning about depreciate — ports the etrima/erpax depreciation calculators verbatim (calculate, port): given cost, salvage, useful-life (and units for activity-based), compute the per-period charge by method"
atomPath: "vocabulary/calculate/depreciate"
coordinate: "vocabulary/calculate/depreciate · 4/weave · 98773855"
contentUuid: "cf744a3a-6760-50c5-ac35-bcf344b3e4d9"
diamondUuid: "459b8207-40ea-89f5-82c5-7c0df3085065"
uuid: "98773855-fef6-8e8d-a5fb-6c63518b053b"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 13
standards: []
bindings: []
signatures:
  computationUuid: "df219c8b-2ee4-8abb-aeca-13cb391a81ea"
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
      stageUuid: "04127945-c228-8bc1-b61f-978be887382d"
    - stage: seal
      stageUuid: "3d5bef02-950d-8fb8-8dfc-dc8cd8576e34"
    - stage: uuid
      stageUuid: "a376eef7-6ba9-8cc4-9456-83d30eb9941b"
version: 2
---
# depreciate — depreciation schedules (pure compute)

`calculate/depreciate` ports the etrima/erpax depreciation calculators verbatim ([[calculate]], [[port]]): given cost, salvage, useful-life (and units for activity-based), compute the per-period charge by method — **straight-line**, **declining-balance (DDB)**, **sum-of-years-digits**, **units-of-activity**. Pure function, no persistence; the result feeds [[accounting]] (the depreciation journal), but the calc holds no state. Cite the standard (IAS-16 / US-GAAP ASC-360). Money is amount + [[currency]].

## Common mistakes
- Storing the schedule as state in the calculator — it's pure; persist the resulting journal in [[accounting]].
- Conflating the method formulas — one leaf per method-family, or branch explicitly.
