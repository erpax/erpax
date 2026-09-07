---
name: sampling
description: "Use when selecting a representative subset — random sampling, stratified sampling, systematic sampling, sample size calculation, sampling error/confidence intervals, weighted sampling for survey design."
atomPath: sampling
coordinate: "sampling · 4/weave · 16b35192"
contentUuid: "618567da-28e8-5bfd-8ba4-2b037371bbd6"
diamondUuid: "d9c613b5-03af-8745-b877-875d515783e7"
uuid: "16b35192-f4a6-8e1e-9daf-91b893671bb2"
horo: 4
typography:
  partition: sampling
  bondDegree: 30
standards: []
bindings: []
signatures:
  computationUuid: "9c5a5f41-75c5-855e-9b4b-a7489c0f8594"
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
      stageUuid: "d9322de2-f090-8649-98ae-10effcd0b217"
    - stage: seal
      stageUuid: "ebc123d6-2cbb-82e8-9756-9476522f16b4"
    - stage: uuid
      stageUuid: "bdefe04f-1c6b-8c89-a26c-3c325efe9fd1"
version: 2
---
# sampling

Use when selecting a representative subset — random sampling, stratified sampling, systematic sampling, sample size calculation, sampling error/confidence intervals, weighted sampling for survey design.

Composes: [[calculate]] · [[distribution]] · [[aggregation]] · [[metric]].

## Standards
- ISO 2859 (sampling plans)
- Statistical sampling (ISO 3534)

**Law — [[law]]: a sample is a representative subset drawn by a stated method (random/stratified/systematic) with a [[calculate]]d sample size and quantified sampling error, so an inference about the whole carries a known confidence.**
