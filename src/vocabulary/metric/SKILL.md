---
name: metric
description: "Use when recording a periodic quantitative observation — daily/weekly/monthly snapshot of performance (headcount, utilization %, defect rate, cost-per-unit, customer-satisfaction score). The data point."
atomPath: "vocabulary/metric"
coordinate: "vocabulary/metric · 5/round · 7747d26c"
contentUuid: "10b185e6-d023-50c3-931c-8c7ac1196ef7"
diamondUuid: "78ef94e8-bef9-864c-bc4e-dbfdcf2bead0"
uuid: "7747d26c-1b0c-8868-89b8-6dbff3baa3ab"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 57
standards: []
bindings: []
signatures:
  computationUuid: "c7c68f8a-83da-8e6f-a059-b2f60d836cb7"
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
      stageUuid: "d585e2c2-4b74-8cce-871c-89fbfd2dfe35"
    - stage: seal
      stageUuid: "e5e9c6cc-587d-8e46-8bd9-f3575c86a9af"
    - stage: uuid
      stageUuid: "f5358314-3592-8d21-bf17-2e4fa3ad9596"
version: 2
---
# metric

Use when recording a periodic quantitative observation — daily/weekly/monthly snapshot of performance (headcount, utilization %, defect rate, cost-per-unit, customer-satisfaction score). The data point.

Composes: [[kpi]] · [[measure]] · [[schedule]] · [[defect]].

**Law — [[law]]: a metric is one quantitative observation pinned to a period — the dated data point a [[kpi]] aggregates, so performance is a [[measure]] taken on a [[schedule]], not a standing assertion.**

## Standards
- ISO-8402 (quality metrics)
- COBIT (IT governance metrics)
