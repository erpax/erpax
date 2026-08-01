---
name: aggregation
description: "Use when computing summarized metrics — GROUP BY semantics, rollup/cube hierarchies, dimensional analysis, summary statistics (sum, count, avg, min, max, percentile), pre-computed aggregates vs on-demand queries."
atomPath: "vocabulary/aggregation"
coordinate: "vocabulary/aggregation · 8/crest · ec3a1954"
contentUuid: "52c9a5c9-370b-5afd-ba65-c116c30d2543"
diamondUuid: "5c787f93-8ff2-8276-b8d2-f8b927dbff77"
uuid: "ec3a1954-66d8-83eb-8855-ec6e92d4f3c4"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 33
standards: []
bindings: []
signatures:
  computationUuid: "46d5cbf6-a0ba-8817-8e60-b6da1c8e1fd8"
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
      stageUuid: "6e8ea8e7-44d8-808a-b804-e11b4edcdeb2"
    - stage: seal
      stageUuid: "ae7dfc1e-52f5-8bb9-98c0-d4433c58a0ca"
    - stage: uuid
      stageUuid: "c5da9c5e-7b21-82d2-b43c-9f355d4a186e"
version: 2
---
# aggregation

Use when computing summarized metrics — GROUP BY semantics, rollup/cube hierarchies, dimensional analysis, summary statistics (sum, count, avg, min, max, percentile), pre-computed aggregates vs on-demand queries.

Composes: [[calculate]] · [[queries]] · [[dimension]] · [[outlier]].

## Standards
- SQL GROUP BY / CUBE / ROLLUP (SQL:2016)
- OLAP

**Law — [[law]]: every summarized metric is fully derived from its grouped base rows, so an aggregate is a cache that must reproduce exactly from the underlying detail and never carries truth the rows do not.**
