---
name: sampling
description: "Use when selecting a representative subset — random sampling, stratified sampling, systematic sampling, sample size calculation, sampling error/confidence intervals, weighted sampling for survey design."
atomPath: sampling
coordinate: sampling · 4/weave · 1ade217c
contentUuid: "53fcf265-9050-54ad-a2ec-cd0c2d888743"
diamondUuid: "845dafba-95f4-89dc-b623-97a6c0f61b69"
uuid: "1ade217c-a095-809a-8785-7a35c1bc694b"
horo: 4
bonds:
  in:
    - aggregation
    - baseline
    - calculate
    - distribution
    - empirical
    - law
    - metric
    - observability
    - outlier
    - science
  out:
    - aggregation
    - baseline
    - calculate
    - distribution
    - empirical
    - law
    - metric
    - observability
    - outlier
    - science
typography:
  partition: sampling
  bondDegree: 30
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - aggregation
    - calculate
    - distribution
    - law
    - metric
  matrix:
    - aggregation
    - baseline
    - calculate
    - distribution
    - empirical
    - law
    - metric
    - observability
    - outlier
    - science
  backlinks:
    - aggregation
    - baseline
    - calculate
    - distribution
    - empirical
    - law
    - metric
    - observability
    - outlier
    - science
signatures:
  computationUuid: "64f072a1-1238-897a-af9c-877119fde613"
  stages:
    - stage: path
      stageUuid: "291cc8ee-9fe9-8257-97ec-f53b19226060"
    - stage: trinity
      stageUuid: "13195e5a-59a0-85eb-bd07-9b92b6caf111"
    - stage: boundary
      stageUuid: "e552fe2c-7ae4-8f4f-9206-3cfb4e367d18"
    - stage: links
      stageUuid: "a02b977a-ecff-88d1-91c9-dcf3cb4cd2e5"
    - stage: horo
      stageUuid: "023f290a-2d13-89b9-9f69-85ea45409db3"
    - stage: seal
      stageUuid: "d6ef2479-7729-872e-be0f-e1efe7a0610c"
    - stage: uuid
      stageUuid: "a86292d1-f7dc-8cb6-8105-516afcb42714"
version: 2
---
# sampling

Use when selecting a representative subset — random sampling, stratified sampling, systematic sampling, sample size calculation, sampling error/confidence intervals, weighted sampling for survey design.

Composes: [[calculate]] · [[distribution]] · [[aggregation]] · [[metric]].

## Standards
- ISO 2859 (sampling plans)
- Statistical sampling (ISO 3534)

**Law — [[law]]: a sample is a representative subset drawn by a stated method (random/stratified/systematic) with a [[calculate]]d sample size and quantified sampling error, so an inference about the whole carries a known confidence.**
