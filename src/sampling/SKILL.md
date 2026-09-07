---
name: sampling
description: "Use when selecting a representative subset — random sampling, stratified sampling, systematic sampling, sample size calculation, sampling error/confidence intervals, weighted sampling for survey design."
atomPath: sampling
coordinate: "sampling · 5/round · ad1e50e2"
contentUuid: "f5147468-94eb-569f-b4ee-288b66cf40df"
diamondUuid: "e1c610ed-9ee8-8c0f-be35-d3a5cdbd2abb"
uuid: "ad1e50e2-a0c9-8926-9e5d-8a97d591df0b"
horo: 5
typography:
  partition: sampling
  bondDegree: 30
standards: []
bindings: []
signatures:
  computationUuid: "5155c40b-4c1e-85a6-99de-4c2d1f17f919"
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
      stageUuid: "1353f29f-4b10-80a8-bc4a-49cc538b23cc"
    - stage: seal
      stageUuid: "ebc123d6-2cbb-82e8-9756-9476522f16b4"
    - stage: uuid
      stageUuid: "0ecd4bbd-8baf-85ca-91cf-3e55ae05214f"
version: 2
---
# sampling

Use when selecting a representative subset — random sampling, stratified sampling, systematic sampling, sample size calculation, sampling error/confidence intervals, weighted sampling for survey design.

Composes: [[calculate]] · [[distribution]] · [[aggregation]] · [[metric]].

## Standards
- ISO 2859 (sampling plans)
- Statistical sampling (ISO 3534)

**Law — [[law]]: a sample is a representative subset drawn by a stated method (random/stratified/systematic) with a [[calculate]]d sample size and quantified sampling error, so an inference about the whole carries a known confidence.**
