---
name: trend
description: "Use when tracking metric evolution, forecasting, or detecting patterns over time — moving averages, velocity, burndown, growth curves. The temporal analysis dimension."
atomPath: trend
coordinate: "trend · 5/round · 7ba0cf23"
contentUuid: "cddc4913-68bb-5145-97fa-56611d424a90"
diamondUuid: "4a4187c2-0409-8c6b-8744-8e696efb3d9f"
uuid: "7ba0cf23-8488-86c1-ba92-1d16f8b3bd46"
horo: 5
typography:
  partition: trend
  bondDegree: 30
standards: []
bindings: []
signatures:
  computationUuid: "c5ac2633-171c-8e78-94f0-5a2696089341"
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
      stageUuid: "e8241d58-efb8-8432-96b6-67bdc9d3c043"
    - stage: seal
      stageUuid: "8b851da9-b905-8166-b718-0f21778d4d61"
    - stage: uuid
      stageUuid: "ab73b87b-c06a-8b8b-9338-a3be09b96aa3"
version: 2
---
# trend

Use when tracking metric evolution, forecasting, or detecting patterns over time — moving averages, velocity, burndown, growth curves. The temporal analysis dimension.

Composes: [[metric]] · [[schedule]] · [[measure]] · [[outlier]].

**Law — [[law]]: trend is the temporal-analysis dimension — it reads a [[metric]]'s evolution over time (moving averages, velocity, burndown, growth curves) to forecast and detect patterns; the value alone is a point, the trend is its motion.**

## Standards
- Forecasting methodologies
- time-series statistics
