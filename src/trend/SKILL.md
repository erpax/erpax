---
name: trend
description: "Use when tracking metric evolution, forecasting, or detecting patterns over time — moving averages, velocity, burndown, growth curves. The temporal analysis dimension."
atomPath: trend
coordinate: "trend · 1/base · 306e2171"
contentUuid: "2f87d339-0ff2-5676-a9ee-7b05be8e2dfa"
diamondUuid: "c69ad831-f94a-8bd6-b20f-d6e0fe535f3a"
uuid: "306e2171-0927-8102-8bc9-7a7c37b98879"
horo: 1
typography:
  partition: trend
  bondDegree: 30
standards: []
bindings: []
signatures:
  computationUuid: "b0cc33eb-b234-81b0-8070-1214465ed891"
  stages:
    - stage: path
      stageUuid: "4a01ca74-5c50-8740-b312-01ef4f4dba70"
    - stage: trinity
      stageUuid: "f485e878-2781-8ee7-b378-f969db74d2ab"
    - stage: boundary
      stageUuid: "1934fc05-1e3d-8096-a68f-66521bd8482c"
    - stage: links
      stageUuid: "1463288a-c5d8-8b98-acec-a20289dcebff"
    - stage: horo
      stageUuid: "9a18e5bc-b895-855e-87e3-03968a1034ab"
    - stage: seal
      stageUuid: "8b851da9-b905-8166-b718-0f21778d4d61"
    - stage: uuid
      stageUuid: "a15df148-f026-8dbf-be9e-36d7e4953062"
version: 2
---
# trend

Use when tracking metric evolution, forecasting, or detecting patterns over time — moving averages, velocity, burndown, growth curves. The temporal analysis dimension.

Composes: [[metric]] · [[schedule]] · [[measure]] · [[outlier]].

**Law — [[law]]: trend is the temporal-analysis dimension — it reads a [[metric]]'s evolution over time (moving averages, velocity, burndown, growth curves) to forecast and detect patterns; the value alone is a point, the trend is its motion.**

## Standards
- Forecasting methodologies
- time-series statistics
