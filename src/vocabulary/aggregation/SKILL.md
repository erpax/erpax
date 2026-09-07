---
name: aggregation
description: "Use when computing summarized metrics — GROUP BY semantics, rollup/cube hierarchies, dimensional analysis, summary statistics (sum, count, avg, min, max, percentile), pre-computed aggregates vs on-demand queries."
atomPath: "vocabulary/aggregation"
coordinate: "vocabulary/aggregation · 5/round · c105663b"
contentUuid: "7a72b6b6-b554-508b-8d25-876e99b8be5c"
diamondUuid: "b20bdf50-e8b5-8754-9740-f30c53b3ead0"
uuid: "c105663b-a7c6-8442-bb42-49456891eb46"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 33
standards: []
bindings: []
signatures:
  computationUuid: "55a5849f-547c-8253-bb84-26005f2a89c2"
  stages:
    - stage: path
      stageUuid: "b9f105a3-acd7-8f6b-9eba-94fae8cd355c"
    - stage: trinity
      stageUuid: "2ad0f09a-7366-8a29-9dec-2635b9de9183"
    - stage: boundary
      stageUuid: "f8f81b30-ba8e-872a-b8dc-553ac068cd31"
    - stage: links
      stageUuid: "6b104238-3bc2-8c22-b1d9-a484b233582f"
    - stage: horo
      stageUuid: "49ad53a1-f9a9-8fcc-8287-536c45ea4fd6"
    - stage: seal
      stageUuid: "2d3b70a8-1045-8705-93aa-0dcffac2776d"
    - stage: uuid
      stageUuid: "77eafdc7-6b32-8be5-9829-404046c34d29"
version: 2
---
# aggregation

Use when computing summarized metrics — GROUP BY semantics, rollup/cube hierarchies, dimensional analysis, summary statistics (sum, count, avg, min, max, percentile), pre-computed aggregates vs on-demand queries.

Composes: [[calculate]] · [[queries]] · [[dimension]] · [[outlier]].

## Standards
- SQL GROUP BY / CUBE / ROLLUP (SQL:2016)
- OLAP

**Law — [[law]]: every summarized metric is fully derived from its grouped base rows, so an aggregate is a cache that must reproduce exactly from the underlying detail and never carries truth the rows do not.**
