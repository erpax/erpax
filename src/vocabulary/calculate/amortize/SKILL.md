---
name: amortize
description: "Use when reasoning about amortize — ports the bond discount/premium amortization calculators verbatim (calculate, port): **effective-interest** (or straight-line where permitted) amortization of a discount/premium ov"
atomPath: "vocabulary/calculate/amortize"
coordinate: "vocabulary/calculate/amortize · 5/round · db1d207e"
contentUuid: "af7a7692-9de9-5294-9ce0-7fc62db303e7"
diamondUuid: "5b33b503-00be-8d82-8efa-01db6a68d0c8"
uuid: "db1d207e-35ed-8f9d-a218-c19a19a15a54"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 16
standards: []
bindings: []
signatures:
  computationUuid: "a3f267cf-0922-8b40-a1db-26eec080b7ec"
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
      stageUuid: "b89a87ab-1741-8b89-b1e5-d9b5e56d7352"
    - stage: seal
      stageUuid: "ec943acf-67a7-8530-8057-ffe20dc6e884"
    - stage: uuid
      stageUuid: "ccf0eadf-e6d2-8592-b38c-a65a00dcc00c"
version: 2
---
# amortize — amortization schedules (pure compute)

`calculate/amortize` ports the bond discount/premium amortization calculators verbatim ([[calculate]], [[port]]): **effective-interest** (or straight-line where permitted) amortization of a discount/premium over the instrument's life; also intangible/loan amortization. Pure function, no persistence; feeds [[accounting]] (the interest/amortization journal). Cite the standard (IFRS-9 effective-interest / US-GAAP). Money is amount + [[currency]].

## Common mistakes
- Straight-line where the standard requires effective-interest — follow the cited standard.
- Persisting state in the calculator — it's pure; the journal lives in [[accounting]].
