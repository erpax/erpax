---
name: trend
description: "Use when tracking metric evolution, forecasting, or detecting patterns over time — moving averages, velocity, burndown, growth curves. The temporal analysis dimension."
atomPath: trend
coordinate: "trend · 1/base · eea0fe24"
contentUuid: "417c10fc-fd4d-5326-af70-551498e57481"
diamondUuid: "0f3935e3-5a80-89d6-93eb-d941144cb6c1"
uuid: "eea0fe24-e4c2-88dd-9e07-ef9b095c80e5"
horo: 1
typography:
  partition: trend
  bondDegree: 30
standards: []
bindings: []
signatures:
  computationUuid: "94e6cfe4-b76d-829c-afa8-c021cbc0ef52"
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
      stageUuid: "1948e25d-eb4b-83ad-b28a-c5c2fce05b88"
    - stage: seal
      stageUuid: "8b851da9-b905-8166-b718-0f21778d4d61"
    - stage: uuid
      stageUuid: "623e9f88-62c3-8f7d-9412-dafef817d678"
version: 2
---
# trend

Use when tracking metric evolution, forecasting, or detecting patterns over time — moving averages, velocity, burndown, growth curves. The temporal analysis dimension.

Composes: [[metric]] · [[schedule]] · [[measure]] · [[outlier]].

**Law — [[law]]: trend is the temporal-analysis dimension — it reads a [[metric]]'s evolution over time (moving averages, velocity, burndown, growth curves) to forecast and detect patterns; the value alone is a point, the trend is its motion.**

## Standards
- Forecasting methodologies
- time-series statistics
