---
name: metric
description: "Use when recording a periodic quantitative observation — daily/weekly/monthly snapshot of performance (headcount, utilization %, defect rate, cost-per-unit, customer-satisfaction score). The data point."
atomPath: "vocabulary/metric"
coordinate: "vocabulary/metric · 4/weave · 37cc1202"
contentUuid: "ded3976e-1548-5bcd-a0f5-bda7e280bdd2"
diamondUuid: "30187b41-b618-8a78-b8c8-6491d3510e7b"
uuid: "37cc1202-f57a-8495-9175-97be28dfbb92"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 57
standards: []
bindings: []
signatures:
  computationUuid: "f7cc04f1-4670-86c0-b164-5f9b1b0f9952"
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
      stageUuid: "308b4ed3-6a5d-8e37-b874-a6d94bd60b89"
    - stage: seal
      stageUuid: "e5e9c6cc-587d-8e46-8bd9-f3575c86a9af"
    - stage: uuid
      stageUuid: "0b41fd83-218b-8a25-a857-4f6c8f20058e"
version: 2
---
# metric

Use when recording a periodic quantitative observation — daily/weekly/monthly snapshot of performance (headcount, utilization %, defect rate, cost-per-unit, customer-satisfaction score). The data point.

Composes: [[kpi]] · [[measure]] · [[schedule]] · [[defect]].

**Law — [[law]]: a metric is one quantitative observation pinned to a period — the dated data point a [[kpi]] aggregates, so performance is a [[measure]] taken on a [[schedule]], not a standing assertion.**

## Standards
- ISO-8402 (quality metrics)
- COBIT (IT governance metrics)
