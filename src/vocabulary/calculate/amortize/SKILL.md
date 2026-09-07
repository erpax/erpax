---
name: amortize
description: "Use when reasoning about amortize — ports the bond discount/premium amortization calculators verbatim (calculate, port): **effective-interest** (or straight-line where permitted) amortization of a discount/premium ov"
atomPath: "vocabulary/calculate/amortize"
coordinate: "vocabulary/calculate/amortize · 7/descent · 93d1446e"
contentUuid: "aee53f33-6947-5ee5-93f8-c08d50ee7fe8"
diamondUuid: "e81be7db-3dc5-8e04-a9de-29f5f86dfed0"
uuid: "93d1446e-984c-8414-89fb-3f645803b5d3"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 16
standards: []
bindings: []
signatures:
  computationUuid: "0ca17f9c-e0e7-81ff-8bc5-7434749cd55a"
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
      stageUuid: "53d881e5-3bec-8a33-a582-5e25175f1ec9"
    - stage: seal
      stageUuid: "ec943acf-67a7-8530-8057-ffe20dc6e884"
    - stage: uuid
      stageUuid: "2c19b01d-6105-8460-ba13-bf6d46416859"
version: 2
---
# amortize — amortization schedules (pure compute)

`calculate/amortize` ports the bond discount/premium amortization calculators verbatim ([[calculate]], [[port]]): **effective-interest** (or straight-line where permitted) amortization of a discount/premium over the instrument's life; also intangible/loan amortization. Pure function, no persistence; feeds [[accounting]] (the interest/amortization journal). Cite the standard (IFRS-9 effective-interest / US-GAAP). Money is amount + [[currency]].

## Common mistakes
- Straight-line where the standard requires effective-interest — follow the cited standard.
- Persisting state in the calculator — it's pure; the journal lives in [[accounting]].
