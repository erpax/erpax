---
name: aggregation
description: "Use when computing summarized metrics — GROUP BY semantics, rollup/cube hierarchies, dimensional analysis, summary statistics (sum, count, avg, min, max, percentile), pre-computed aggregates vs on-demand queries."
atomPath: "vocabulary/aggregation"
coordinate: "vocabulary/aggregation · 1/base · 5d9ef81d"
contentUuid: "78c619f0-1708-56b8-a0b5-b2e37cc5e3d2"
diamondUuid: "a92326e7-ce13-80e8-a64c-bd48254b76e4"
uuid: "5d9ef81d-449f-8cb2-a366-8153164c60c8"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 24
standards: []
bindings: []
signatures:
  computationUuid: "5ecb4eda-cd8b-8bc0-847e-f4f0dee6aef6"
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
      stageUuid: "ecd24ee0-e78a-8fc3-83c8-c32a005b5d59"
    - stage: seal
      stageUuid: "2d3b70a8-1045-8705-93aa-0dcffac2776d"
    - stage: uuid
      stageUuid: "6a787797-55e5-8d9e-aec8-046bb59d66a3"
version: 2
---
# aggregation

Use when computing summarized metrics — GROUP BY semantics, rollup/cube hierarchies, dimensional analysis, summary statistics (sum, count, avg, min, max, percentile), pre-computed aggregates vs on-demand queries.

Composes: [[calculate]] · [[queries]] · [[dimension]] · [[outlier]].

## Standards
- SQL GROUP BY / CUBE / ROLLUP (SQL:2016)
- OLAP

**Law — [[law]]: every summarized metric is fully derived from its grouped base rows, so an aggregate is a cache that must reproduce exactly from the underlying detail and never carries truth the rows do not.**
