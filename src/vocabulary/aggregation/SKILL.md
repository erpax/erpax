---
name: aggregation
description: "Use when computing summarized metrics — GROUP BY semantics, rollup/cube hierarchies, dimensional analysis, summary statistics (sum, count, avg, min, max, percentile), pre-computed aggregates vs on-demand queries."
atomPath: "vocabulary/aggregation"
coordinate: "vocabulary/aggregation · 4/weave · 3efc5d47"
contentUuid: "3c9299a8-cbc8-52d5-bf02-e939183a8c3d"
diamondUuid: "5ea5ab7c-71a8-8415-8d2f-58465cb8cfa5"
uuid: "3efc5d47-d737-825d-ab99-11339af41c07"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 33
standards: []
bindings: []
signatures:
  computationUuid: "bdbe76cb-2a07-8a80-aadf-2047c488b823"
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
      stageUuid: "e04787cc-abd2-8728-bb51-dbd2d79e5014"
    - stage: seal
      stageUuid: "2d3b70a8-1045-8705-93aa-0dcffac2776d"
    - stage: uuid
      stageUuid: "b7bc0f0c-14d3-83a9-aab4-a5a93f812a4e"
version: 2
---
# aggregation

Use when computing summarized metrics — GROUP BY semantics, rollup/cube hierarchies, dimensional analysis, summary statistics (sum, count, avg, min, max, percentile), pre-computed aggregates vs on-demand queries.

Composes: [[calculate]] · [[queries]] · [[dimension]] · [[outlier]].

## Standards
- SQL GROUP BY / CUBE / ROLLUP (SQL:2016)
- OLAP

**Law — [[law]]: every summarized metric is fully derived from its grouped base rows, so an aggregate is a cache that must reproduce exactly from the underlying detail and never carries truth the rows do not.**
