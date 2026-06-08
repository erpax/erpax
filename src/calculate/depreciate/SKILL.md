---
name: depreciate
description: "Use when reasoning about depreciate — ports the etrima/erpax depreciation calculators verbatim (calculate, port): given cost, salvage, useful-life (and units for activity-based), compute the per-period charge by method"
atomPath: calculate/depreciate
coordinate: calculate/depreciate · 8/crest · 27db78ce
contentUuid: "998f24ba-e2e5-5a37-b623-a2df51f13a91"
diamondUuid: "e1f3724a-44ba-876c-8032-34d0f01c856e"
uuid: "27db78ce-d56b-8fed-81d5-e9a43eb91459"
horo: 8
bonds:
  in:
    - accounting
    - calculate
    - currency
    - port
  out:
    - accounting
    - calculate
    - currency
    - port
typography:
  partition: calculate
  bondDegree: 13
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - accounting
    - calculate
    - currency
    - port
  matrix:
    - accounting
    - calculate
    - currency
    - port
  backlinks:
    - accounting
    - calculate
    - currency
    - port
signatures:
  computationUuid: "658b9122-5811-836c-aacf-249517a98765"
  stages:
    - stage: path
      stageUuid: "4909eb44-3c1c-8702-af12-0943088a2823"
    - stage: trinity
      stageUuid: "108470d2-2ec3-86ff-b513-b0101ac2ac41"
    - stage: boundary
      stageUuid: "df7c6710-04a3-85ad-8b36-7d6c963f5d81"
    - stage: links
      stageUuid: "965e4b0a-1517-8431-9b1c-aebe70b67153"
    - stage: horo
      stageUuid: "e0a8945a-52d6-8f0c-9701-c31ecc703a53"
    - stage: seal
      stageUuid: "22c58448-2c5e-8186-84a9-19a12c36dca1"
    - stage: uuid
      stageUuid: "e3c0ba5d-a046-8bf5-b915-2ee5495f9020"
version: 2
---
# depreciate — depreciation schedules (pure compute)

`calculate/depreciate` ports the etrima/erpax depreciation calculators verbatim ([[calculate]], [[port]]): given cost, salvage, useful-life (and units for activity-based), compute the per-period charge by method — **straight-line**, **declining-balance (DDB)**, **sum-of-years-digits**, **units-of-activity**. Pure function, no persistence; the result feeds [[accounting]] (the depreciation journal), but the calc holds no state. Cite the standard (IAS-16 / US-GAAP ASC-360). Money is amount + [[currency]].

## Common mistakes
- Storing the schedule as state in the calculator — it's pure; persist the resulting journal in [[accounting]].
- Conflating the method formulas — one leaf per method-family, or branch explicitly.
