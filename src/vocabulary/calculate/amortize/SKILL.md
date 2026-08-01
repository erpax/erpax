---
name: amortize
description: "Use when reasoning about amortize — ports the bond discount/premium amortization calculators verbatim (calculate, port): **effective-interest** (or straight-line where permitted) amortization of a discount/premium ov"
atomPath: "vocabulary/calculate/amortize"
coordinate: "vocabulary/calculate/amortize · 1/base · 96d5476e"
contentUuid: "ee2d3f7c-7ae2-5586-93b8-acf1679ff7f7"
diamondUuid: "44102a06-a4b5-82e0-9f05-5f4ea668e0ab"
uuid: "96d5476e-d022-8d50-bc58-32d5e054ebe3"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 16
standards: []
bindings: []
signatures:
  computationUuid: "a99d5c81-69f6-8ebb-8848-86c1e4afc83e"
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
      stageUuid: "83ecf0a9-af3c-8134-bc6f-c01d2e789b2a"
    - stage: seal
      stageUuid: "c6d75694-08a5-82f9-8463-73b39afe690f"
    - stage: uuid
      stageUuid: "1dca3389-9dad-874a-af9c-6a4c677cb24d"
version: 2
---
# amortize — amortization schedules (pure compute)

`calculate/amortize` ports the bond discount/premium amortization calculators verbatim ([[calculate]], [[port]]): **effective-interest** (or straight-line where permitted) amortization of a discount/premium over the instrument's life; also intangible/loan amortization. Pure function, no persistence; feeds [[accounting]] (the interest/amortization journal). Cite the standard (IFRS-9 effective-interest / US-GAAP). Money is amount + [[currency]].

## Common mistakes
- Straight-line where the standard requires effective-interest — follow the cited standard.
- Persisting state in the calculator — it's pure; the journal lives in [[accounting]].
