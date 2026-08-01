---
name: depreciate
description: "Use when reasoning about depreciate — ports the etrima/erpax depreciation calculators verbatim (calculate, port): given cost, salvage, useful-life (and units for activity-based), compute the per-period charge by method"
atomPath: "vocabulary/calculate/depreciate"
coordinate: "vocabulary/calculate/depreciate · 1/base · 27f56771"
contentUuid: "fd57d96d-8d61-5830-9aae-eac588de80db"
diamondUuid: "7f9685b9-b200-8e11-8dfe-f938045a7119"
uuid: "27f56771-45ae-8fd0-bc06-c213509431a0"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 13
standards: []
bindings: []
signatures:
  computationUuid: "4784611d-2716-803d-aaa1-ea98c9d6e2fb"
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
      stageUuid: "668df847-924e-8bbf-a66b-29173c9266b2"
    - stage: seal
      stageUuid: "c26c328f-a5b2-840e-b329-b5ee4e511f89"
    - stage: uuid
      stageUuid: "05aab8cf-ee02-8c78-aa7c-5cb3000fd377"
version: 2
---
# depreciate — depreciation schedules (pure compute)

`calculate/depreciate` ports the etrima/erpax depreciation calculators verbatim ([[calculate]], [[port]]): given cost, salvage, useful-life (and units for activity-based), compute the per-period charge by method — **straight-line**, **declining-balance (DDB)**, **sum-of-years-digits**, **units-of-activity**. Pure function, no persistence; the result feeds [[accounting]] (the depreciation journal), but the calc holds no state. Cite the standard (IAS-16 / US-GAAP ASC-360). Money is amount + [[currency]].

## Common mistakes
- Storing the schedule as state in the calculator — it's pure; persist the resulting journal in [[accounting]].
- Conflating the method formulas — one leaf per method-family, or branch explicitly.
