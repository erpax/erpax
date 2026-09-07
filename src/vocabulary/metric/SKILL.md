---
name: metric
description: "Use when recording a periodic quantitative observation — daily/weekly/monthly snapshot of performance (headcount, utilization %, defect rate, cost-per-unit, customer-satisfaction score). The data point."
atomPath: "vocabulary/metric"
coordinate: "vocabulary/metric · 5/round · a383c05c"
contentUuid: "624e8321-098e-5802-bbce-e14d28023c48"
diamondUuid: "9548ac4c-b8a6-896d-9f35-eabf74b7923b"
uuid: "a383c05c-af60-87fb-b253-8ab592e379f6"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 57
standards: []
bindings: []
signatures:
  computationUuid: "1177bc65-320d-89e0-a83a-8af8581bb769"
  stages:
    - stage: path
      stageUuid: "c910d55b-72c8-8019-a887-862f5f746d1b"
    - stage: trinity
      stageUuid: "690f0bc3-9d1d-872d-b230-240b6e9cf04c"
    - stage: boundary
      stageUuid: "bf127a26-f084-8871-b7cc-96b9d494ae24"
    - stage: links
      stageUuid: "5f36684c-e643-84eb-bfa5-dca4a78fe6f9"
    - stage: horo
      stageUuid: "f507d789-0f25-8646-be0b-4e03bb64bd17"
    - stage: seal
      stageUuid: "e5e9c6cc-587d-8e46-8bd9-f3575c86a9af"
    - stage: uuid
      stageUuid: "ee66f917-9c63-81e4-922b-6bcbffbfd2ce"
version: 2
---
# metric

Use when recording a periodic quantitative observation — daily/weekly/monthly snapshot of performance (headcount, utilization %, defect rate, cost-per-unit, customer-satisfaction score). The data point.

Composes: [[kpi]] · [[measure]] · [[schedule]] · [[defect]].

**Law — [[law]]: a metric is one quantitative observation pinned to a period — the dated data point a [[kpi]] aggregates, so performance is a [[measure]] taken on a [[schedule]], not a standing assertion.**

## Standards
- ISO-8402 (quality metrics)
- COBIT (IT governance metrics)
