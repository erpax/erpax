---
name: amortize
description: "Use when reasoning about amortize — ports the bond discount/premium amortization calculators verbatim (calculate, port): **effective-interest** (or straight-line where permitted) amortization of a discount/premium ov"
atomPath: "vocabulary/calculate/amortize"
coordinate: "vocabulary/calculate/amortize · 7/descent · 82d14fdf"
contentUuid: "6a3d503f-d990-5628-93cd-c3eec730ff8d"
diamondUuid: "8aae1615-0f16-8cd2-8e73-fa071f566670"
uuid: "82d14fdf-52e2-8f99-9889-0d93b3a4e065"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 16
standards: []
bindings: []
signatures:
  computationUuid: "a7b2a61d-a7fb-83ce-bcb4-5b850163b8cc"
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
      stageUuid: "518e2beb-34df-8405-9930-df61f58b8441"
    - stage: seal
      stageUuid: "ec943acf-67a7-8530-8057-ffe20dc6e884"
    - stage: uuid
      stageUuid: "595efb3d-6a44-89cb-beff-e0d9fca0f6fe"
version: 2
---
# amortize — amortization schedules (pure compute)

`calculate/amortize` ports the bond discount/premium amortization calculators verbatim ([[calculate]], [[port]]): **effective-interest** (or straight-line where permitted) amortization of a discount/premium over the instrument's life; also intangible/loan amortization. Pure function, no persistence; feeds [[accounting]] (the interest/amortization journal). Cite the standard (IFRS-9 effective-interest / US-GAAP). Money is amount + [[currency]].

## Common mistakes
- Straight-line where the standard requires effective-interest — follow the cited standard.
- Persisting state in the calculator — it's pure; the journal lives in [[accounting]].
