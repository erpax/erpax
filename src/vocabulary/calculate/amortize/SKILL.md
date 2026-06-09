---
name: amortize
description: "Use when reasoning about amortize — ports the bond discount/premium amortization calculators verbatim (calculate, port): **effective-interest** (or straight-line where permitted) amortization of a discount/premium ov"
atomPath: calculate/amortize
coordinate: calculate/amortize · 7/descent · 44dbc87b
contentUuid: "9beda778-dfd5-5404-ada2-f33d376f871a"
diamondUuid: "c49bfb7a-a987-84c1-a08b-f008f6b13d19"
uuid: "44dbc87b-78a6-8275-8c6e-cd6a2f997133"
horo: 7
bonds:
  in:
    - accounting
    - calculate
    - currency
    - intangible
    - port
  out:
    - accounting
    - calculate
    - currency
    - intangible
    - port
typography:
  partition: calculate
  bondDegree: 16
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
    - intangible
    - port
  backlinks:
    - accounting
    - calculate
    - currency
    - intangible
    - port
signatures:
  computationUuid: "b3ef4be3-741d-8a22-a4c8-93c42f426302"
  stages:
    - stage: path
      stageUuid: "6ab65087-6953-82e0-a1d4-eae76bd0e9ae"
    - stage: trinity
      stageUuid: "c2e9fa62-1dfd-822b-a588-dd4a6ee03c9d"
    - stage: boundary
      stageUuid: "47ec5240-dda9-8a30-965b-7b266498160c"
    - stage: links
      stageUuid: "94c8949b-7ad5-8af3-a773-d94e8150aa59"
    - stage: horo
      stageUuid: "3ff7c3df-a9f4-83da-a262-58cd27d36739"
    - stage: seal
      stageUuid: "cce2c195-d842-8fa3-ba28-9f578a43d416"
    - stage: uuid
      stageUuid: "58d24504-311b-8eac-ad8d-c560c99a1180"
version: 2
---
# amortize — amortization schedules (pure compute)

`calculate/amortize` ports the bond discount/premium amortization calculators verbatim ([[calculate]], [[port]]): **effective-interest** (or straight-line where permitted) amortization of a discount/premium over the instrument's life; also intangible/loan amortization. Pure function, no persistence; feeds [[accounting]] (the interest/amortization journal). Cite the standard (IFRS-9 effective-interest / US-GAAP). Money is amount + [[currency]].

## Common mistakes
- Straight-line where the standard requires effective-interest — follow the cited standard.
- Persisting state in the calculator — it's pure; the journal lives in [[accounting]].
