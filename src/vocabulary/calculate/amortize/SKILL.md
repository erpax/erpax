---
name: amortize
description: "Use when reasoning about amortize — ports the bond discount/premium amortization calculators verbatim (calculate, port): **effective-interest** (or straight-line where permitted) amortization of a discount/premium ov"
atomPath: "vocabulary/calculate/amortize"
coordinate: "vocabulary/calculate/amortize · 8/crest · e7430f1b"
contentUuid: "ed7e45a2-af6d-509d-b1ed-2df24ce07c87"
diamondUuid: "1a3fcc5c-1fd4-8a9d-8708-04c98ec9b49f"
uuid: "e7430f1b-7e36-8bd5-b6d1-cb4dfecbe005"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 16
standards: []
bindings: []
signatures:
  computationUuid: "e3454692-942e-8682-8723-30224cbbd5cd"
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
      stageUuid: "c56ed1c7-3f13-8242-ba80-97900f5da8f9"
    - stage: seal
      stageUuid: "ec943acf-67a7-8530-8057-ffe20dc6e884"
    - stage: uuid
      stageUuid: "5a30e4fe-53ff-815c-a0ea-fee3ad68e88b"
version: 2
---
# amortize — amortization schedules (pure compute)

`calculate/amortize` ports the bond discount/premium amortization calculators verbatim ([[calculate]], [[port]]): **effective-interest** (or straight-line where permitted) amortization of a discount/premium over the instrument's life; also intangible/loan amortization. Pure function, no persistence; feeds [[accounting]] (the interest/amortization journal). Cite the standard (IFRS-9 effective-interest / US-GAAP). Money is amount + [[currency]].

## Common mistakes
- Straight-line where the standard requires effective-interest — follow the cited standard.
- Persisting state in the calculator — it's pure; the journal lives in [[accounting]].
