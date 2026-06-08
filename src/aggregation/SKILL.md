---
name: aggregation
description: "Use when computing summarized metrics — GROUP BY semantics, rollup/cube hierarchies, dimensional analysis, summary statistics (sum, count, avg, min, max, percentile), pre-computed aggregates vs on-demand queries."
atomPath: aggregation
coordinate: aggregation · 1/base · 2f524358
contentUuid: "71712cf3-f12c-5539-9567-9488ca99215d"
diamondUuid: "4b99de90-4839-8c46-80df-494b7495d7bb"
uuid: "2f524358-417b-8d2d-b13d-6139cb8b20a0"
horo: 1
bonds:
  in:
    - calculate
    - cohort
    - dimension
    - distribution
    - forecast
    - law
    - outlier
    - queries
    - sampling
    - science
    - wellbeing
  out:
    - calculate
    - cohort
    - dimension
    - distribution
    - forecast
    - law
    - outlier
    - queries
    - sampling
    - science
    - wellbeing
typography:
  partition: aggregation
  bondDegree: 33
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - calculate
    - dimension
    - law
    - outlier
    - queries
  matrix:
    - calculate
    - cohort
    - dimension
    - distribution
    - forecast
    - law
    - outlier
    - queries
    - sampling
    - science
    - wellbeing
  backlinks:
    - calculate
    - cohort
    - dimension
    - distribution
    - forecast
    - law
    - outlier
    - queries
    - sampling
    - science
    - wellbeing
signatures:
  computationUuid: "92252984-d5a9-82b8-9a07-99abfa797ff8"
  stages:
    - stage: path
      stageUuid: "f125c6b4-26ad-83a7-97a3-b571c95f2ad9"
    - stage: trinity
      stageUuid: "052b6abf-9412-87f4-a053-2ba4dd58293e"
    - stage: boundary
      stageUuid: "85b68de7-43c8-85a4-9cb6-4dbca8dd37b8"
    - stage: links
      stageUuid: "28b7e548-0b31-846a-b442-2443c9799877"
    - stage: horo
      stageUuid: "f5fa2a2d-b3c7-875f-bcb1-b85b756c050b"
    - stage: seal
      stageUuid: "331a81a2-f8a3-8a5e-aa45-98013f07b44d"
    - stage: uuid
      stageUuid: "ef101ab0-a6f6-8c80-871e-d1e9826583c5"
version: 2
---
# aggregation

Use when computing summarized metrics — GROUP BY semantics, rollup/cube hierarchies, dimensional analysis, summary statistics (sum, count, avg, min, max, percentile), pre-computed aggregates vs on-demand queries.

Composes: [[calculate]] · [[queries]] · [[dimension]] · [[outlier]].

## Standards
- SQL GROUP BY / CUBE / ROLLUP (SQL:2016)
- OLAP

**Law — [[law]]: every summarized metric is fully derived from its grouped base rows, so an aggregate is a cache that must reproduce exactly from the underlying detail and never carries truth the rows do not.**
