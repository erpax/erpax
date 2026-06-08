---
name: outlier
description: "Use when detecting or handling statistical anomalies — outlier detection methods (z-score, IQR, isolation-forest), treatment (trim, robust stats, flag, investigate), impact on metrics and reporting."
atomPath: outlier
coordinate: outlier · 2/share · 8a7572e8
contentUuid: "76b5808a-ced7-5834-90c3-39b155ffa73f"
diamondUuid: "c1042a8d-042f-8533-9af0-5d78c8b899c4"
uuid: "8a7572e8-a34a-8864-af82-83fd37b2d4c1"
horo: 2
bonds:
  in:
    - aggregation
    - calculate
    - empirical
    - metric
    - sampling
    - trend
  out:
    - aggregation
    - calculate
    - empirical
    - metric
    - sampling
    - trend
typography:
  partition: outlier
  bondDegree: 18
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - calculate
    - metric
    - sampling
  matrix:
    - aggregation
    - calculate
    - empirical
    - metric
    - sampling
    - trend
  backlinks:
    - aggregation
    - calculate
    - empirical
    - metric
    - sampling
    - trend
signatures:
  computationUuid: "e513b3fe-7a02-8253-923a-66ab63562668"
  stages:
    - stage: path
      stageUuid: "82e1c06a-0f5f-8e3c-8332-518f1672cc73"
    - stage: trinity
      stageUuid: "4136124f-41c2-85a7-93ea-235752946f40"
    - stage: boundary
      stageUuid: "681adcd6-e65f-895f-9493-2c66edad5558"
    - stage: links
      stageUuid: "ed505fe6-d198-854a-8f44-0a2f32df713b"
    - stage: horo
      stageUuid: "ed7f30a1-2a6f-8f95-b3cd-7e09f172d345"
    - stage: seal
      stageUuid: "513dbea2-0cc3-864a-a58b-e0b901d26a41"
    - stage: uuid
      stageUuid: "2539830d-abdd-8f2f-93c4-ec4bf619fa54"
version: 2
---
# outlier

Use when detecting or handling statistical anomalies — outlier detection methods (z-score, IQR, isolation-forest), treatment (trim, robust stats, flag, investigate), impact on metrics and reporting.

Composes: [[calculate]] · [[metric]] · [[sampling]].

## Standards
- Statistical outlier detection
- Robust statistics (ISO 3534-1)
