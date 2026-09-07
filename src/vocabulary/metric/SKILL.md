---
name: metric
description: "Use when recording a periodic quantitative observation — daily/weekly/monthly snapshot of performance (headcount, utilization %, defect rate, cost-per-unit, customer-satisfaction score). The data point."
atomPath: "vocabulary/metric"
coordinate: "vocabulary/metric · 7/descent · c0bd2f60"
contentUuid: "e477e4a2-0ac6-5353-997d-86f62d5b0f8e"
diamondUuid: "188c5412-5de3-89a8-91b5-a1cb6664e300"
uuid: "c0bd2f60-ea8f-8afb-87eb-1d8014b27625"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 57
standards: []
bindings: []
signatures:
  computationUuid: "23eb4c35-91ff-8f61-9dfd-8603da839117"
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
      stageUuid: "b21d3e12-dcf1-824a-b785-d1be43a24227"
    - stage: seal
      stageUuid: "e5e9c6cc-587d-8e46-8bd9-f3575c86a9af"
    - stage: uuid
      stageUuid: "2cc1062b-5a7d-8743-9de1-82b4b52f67ca"
version: 2
---
# metric

Use when recording a periodic quantitative observation — daily/weekly/monthly snapshot of performance (headcount, utilization %, defect rate, cost-per-unit, customer-satisfaction score). The data point.

Composes: [[kpi]] · [[measure]] · [[schedule]] · [[defect]].

**Law — [[law]]: a metric is one quantitative observation pinned to a period — the dated data point a [[kpi]] aggregates, so performance is a [[measure]] taken on a [[schedule]], not a standing assertion.**

## Standards
- ISO-8402 (quality metrics)
- COBIT (IT governance metrics)
