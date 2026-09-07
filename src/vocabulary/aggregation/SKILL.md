---
name: aggregation
description: "Use when computing summarized metrics — GROUP BY semantics, rollup/cube hierarchies, dimensional analysis, summary statistics (sum, count, avg, min, max, percentile), pre-computed aggregates vs on-demand queries."
atomPath: "vocabulary/aggregation"
coordinate: "vocabulary/aggregation · 5/round · a0fd1721"
contentUuid: "54be72c6-c80c-5221-870a-f22074945ef2"
diamondUuid: "df0218f4-7029-8dc0-9711-35f8aff5320a"
uuid: "a0fd1721-d908-8cee-bee4-410892233fd6"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 33
standards: []
bindings: []
signatures:
  computationUuid: "247aacd5-1ae0-82db-86f1-a1b967b17ffd"
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
      stageUuid: "32ddc6d6-976b-88af-9b22-aeae78e1644c"
    - stage: seal
      stageUuid: "2d3b70a8-1045-8705-93aa-0dcffac2776d"
    - stage: uuid
      stageUuid: "8de46817-6658-8e5b-a782-842fb06b7785"
version: 2
---
# aggregation

Use when computing summarized metrics — GROUP BY semantics, rollup/cube hierarchies, dimensional analysis, summary statistics (sum, count, avg, min, max, percentile), pre-computed aggregates vs on-demand queries.

Composes: [[calculate]] · [[queries]] · [[dimension]] · [[outlier]].

## Standards
- SQL GROUP BY / CUBE / ROLLUP (SQL:2016)
- OLAP

**Law — [[law]]: every summarized metric is fully derived from its grouped base rows, so an aggregate is a cache that must reproduce exactly from the underlying detail and never carries truth the rows do not.**
