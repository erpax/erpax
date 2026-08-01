---
name: trend
description: "Use when tracking metric evolution, forecasting, or detecting patterns over time — moving averages, velocity, burndown, growth curves. The temporal analysis dimension."
atomPath: trend
coordinate: "trend · 7/descent · 3f6c4a65"
contentUuid: "72e65bf7-6d78-5592-8b51-1ce6b578994e"
diamondUuid: "0c45c934-7e18-8248-bd84-2fe6e39b416b"
uuid: "3f6c4a65-c30b-85bb-bd5b-b5e9c16dde44"
horo: 7
typography:
  partition: trend
  bondDegree: 30
standards: []
bindings: []
signatures:
  computationUuid: "7a923f9a-b676-8852-8d96-59622c8b1817"
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
      stageUuid: "4ac3808b-fd14-8bb9-be96-ea3b970a0986"
    - stage: seal
      stageUuid: "8b851da9-b905-8166-b718-0f21778d4d61"
    - stage: uuid
      stageUuid: "cb9836b6-5c7d-8173-ab83-8902732db4b1"
version: 2
---
# trend

Use when tracking metric evolution, forecasting, or detecting patterns over time — moving averages, velocity, burndown, growth curves. The temporal analysis dimension.

Composes: [[metric]] · [[schedule]] · [[measure]] · [[outlier]].

**Law — [[law]]: trend is the temporal-analysis dimension — it reads a [[metric]]'s evolution over time (moving averages, velocity, burndown, growth curves) to forecast and detect patterns; the value alone is a point, the trend is its motion.**

## Standards
- Forecasting methodologies
- time-series statistics
