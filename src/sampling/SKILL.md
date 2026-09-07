---
name: sampling
description: "Use when selecting a representative subset — random sampling, stratified sampling, systematic sampling, sample size calculation, sampling error/confidence intervals, weighted sampling for survey design."
atomPath: sampling
coordinate: "sampling · 4/weave · acb4c21c"
contentUuid: "634f0a8f-5369-5642-8574-ee2ad2729d37"
diamondUuid: "7e179c83-e9c0-8278-9f1b-a81f586220f7"
uuid: "acb4c21c-1c8a-800e-94cd-aded0da561d4"
horo: 4
typography:
  partition: sampling
  bondDegree: 30
standards: []
bindings: []
signatures:
  computationUuid: "31cc1f7d-3a57-86ee-95dc-08fa0dae37cd"
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
      stageUuid: "9aea3f21-c43c-88fe-a015-e2bf903fa564"
    - stage: seal
      stageUuid: "ebc123d6-2cbb-82e8-9756-9476522f16b4"
    - stage: uuid
      stageUuid: "87b96cec-50c6-87b8-ae6d-c6f99f8b466f"
version: 2
---
# sampling

Use when selecting a representative subset — random sampling, stratified sampling, systematic sampling, sample size calculation, sampling error/confidence intervals, weighted sampling for survey design.

Composes: [[calculate]] · [[distribution]] · [[aggregation]] · [[metric]].

## Standards
- ISO 2859 (sampling plans)
- Statistical sampling (ISO 3534)

**Law — [[law]]: a sample is a representative subset drawn by a stated method (random/stratified/systematic) with a [[calculate]]d sample size and quantified sampling error, so an inference about the whole carries a known confidence.**
