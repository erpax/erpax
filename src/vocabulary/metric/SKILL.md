---
name: metric
description: "Use when recording a periodic quantitative observation — daily/weekly/monthly snapshot of performance (headcount, utilization %, defect rate, cost-per-unit, customer-satisfaction score). The data point."
atomPath: "vocabulary/metric"
coordinate: "vocabulary/metric · 7/descent · f3892352"
contentUuid: "5f9c146c-6653-5ab7-8959-c5222ac11e8e"
diamondUuid: "58189be7-a8ad-81a6-a12f-4394154dead6"
uuid: "f3892352-1086-84da-a43a-66e34fe186ac"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 57
standards: []
bindings: []
signatures:
  computationUuid: "1bc4904d-57ab-83f6-8a30-1d73749b970d"
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
      stageUuid: "fe0a209c-8021-8b91-b884-4522a9329d81"
    - stage: seal
      stageUuid: "e5e9c6cc-587d-8e46-8bd9-f3575c86a9af"
    - stage: uuid
      stageUuid: "05e82f44-baed-859b-a5df-595e413c3c3b"
version: 2
---
# metric

Use when recording a periodic quantitative observation — daily/weekly/monthly snapshot of performance (headcount, utilization %, defect rate, cost-per-unit, customer-satisfaction score). The data point.

Composes: [[kpi]] · [[measure]] · [[schedule]] · [[defect]].

**Law — [[law]]: a metric is one quantitative observation pinned to a period — the dated data point a [[kpi]] aggregates, so performance is a [[measure]] taken on a [[schedule]], not a standing assertion.**

## Standards
- ISO-8402 (quality metrics)
- COBIT (IT governance metrics)
