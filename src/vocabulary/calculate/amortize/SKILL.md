---
name: amortize
description: "Use when reasoning about amortize — ports the bond discount/premium amortization calculators verbatim (calculate, port): **effective-interest** (or straight-line where permitted) amortization of a discount/premium ov"
atomPath: "vocabulary/calculate/amortize"
coordinate: "vocabulary/calculate/amortize · 8/crest · 7b9d2acf"
contentUuid: "b273093b-13c6-5465-93d0-49c7c7febbd8"
diamondUuid: "947218b5-9551-8193-8ae9-a232ad3ba6c9"
uuid: "7b9d2acf-ac77-83b2-baa8-0d0e2c616c86"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 16
standards: []
bindings: []
signatures:
  computationUuid: "190d4b5e-0d32-8ec9-adbb-7002f9fb2669"
  stages:
    - stage: path
      stageUuid: "ac42360a-d5da-830c-8ae9-1cd31e4c425e"
    - stage: trinity
      stageUuid: "b74cf055-62e6-84bc-a02f-fc60434eac09"
    - stage: boundary
      stageUuid: "573ebb12-5aeb-8f96-8855-f665cb262294"
    - stage: links
      stageUuid: "34eac497-f725-81a9-8fd0-068d1dec5adc"
    - stage: horo
      stageUuid: "07a5689c-afbf-82db-9e8a-d12f4605a899"
    - stage: seal
      stageUuid: "ec943acf-67a7-8530-8057-ffe20dc6e884"
    - stage: uuid
      stageUuid: "5cb5a9f0-c943-8779-a1ec-9f0ec4c18a8d"
version: 2
---
# amortize — amortization schedules (pure compute)

`calculate/amortize` ports the bond discount/premium amortization calculators verbatim ([[calculate]], [[port]]): **effective-interest** (or straight-line where permitted) amortization of a discount/premium over the instrument's life; also intangible/loan amortization. Pure function, no persistence; feeds [[accounting]] (the interest/amortization journal). Cite the standard (IFRS-9 effective-interest / US-GAAP). Money is amount + [[currency]].

## Common mistakes
- Straight-line where the standard requires effective-interest — follow the cited standard.
- Persisting state in the calculator — it's pure; the journal lives in [[accounting]].
