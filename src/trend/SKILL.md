---
name: trend
description: "Use when tracking metric evolution, forecasting, or detecting patterns over time — moving averages, velocity, burndown, growth curves. The temporal analysis dimension."
atomPath: trend
coordinate: "trend · 1/base · dd30d520"
contentUuid: "f2c5bc6c-b682-5e4b-9346-dd4274ac7847"
diamondUuid: "24d017b9-dbc3-8f65-a761-0e00a6d90ee7"
uuid: "dd30d520-c913-8033-b0b3-aac2ed415c62"
horo: 1
typography:
  partition: trend
  bondDegree: 30
standards: []
bindings: []
signatures:
  computationUuid: "5c38a981-f48a-8991-af26-0b887fe0a161"
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
      stageUuid: "79e69516-3453-8b6e-a905-1f778785ecc5"
    - stage: seal
      stageUuid: "8b851da9-b905-8166-b718-0f21778d4d61"
    - stage: uuid
      stageUuid: "a0371720-b403-8b02-b0b0-ca0a35bb3465"
version: 2
---
# trend

Use when tracking metric evolution, forecasting, or detecting patterns over time — moving averages, velocity, burndown, growth curves. The temporal analysis dimension.

Composes: [[metric]] · [[schedule]] · [[measure]] · [[outlier]].

**Law — [[law]]: trend is the temporal-analysis dimension — it reads a [[metric]]'s evolution over time (moving averages, velocity, burndown, growth curves) to forecast and detect patterns; the value alone is a point, the trend is its motion.**

## Standards
- Forecasting methodologies
- time-series statistics
