---
name: metric
description: "Use when recording a periodic quantitative observation — daily/weekly/monthly snapshot of performance (headcount, utilization %, defect rate, cost-per-unit, customer-satisfaction score). The data point."
atomPath: "vocabulary/metric"
coordinate: "vocabulary/metric · 7/descent · c14628c6"
contentUuid: "ebdc2d92-d20a-5744-9606-9c679eedc57c"
diamondUuid: "583aee68-bee1-8663-854f-aa49a8eabf22"
uuid: "c14628c6-a8e7-88c8-b79d-daad4ea5a1db"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 56
standards: []
bindings: []
signatures:
  computationUuid: "a252ed75-c863-8570-8b74-c0ba514f38b0"
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
      stageUuid: "f7eeea68-c8b9-8da3-9235-df6f89e994fb"
    - stage: seal
      stageUuid: "f5e195d8-5fd1-8234-82c8-839612b6d45e"
    - stage: uuid
      stageUuid: "fe1c060f-cb6b-83e0-96c3-0b011b099706"
version: 2
---
# metric

Use when recording a periodic quantitative observation — daily/weekly/monthly snapshot of performance (headcount, utilization %, defect rate, cost-per-unit, customer-satisfaction score). The data point.

Composes: [[kpi]] · [[measure]] · [[schedule]] · [[defect]].

**Law — [[law]]: a metric is one quantitative observation pinned to a period — the dated data point a [[kpi]] aggregates, so performance is a [[measure]] taken on a [[schedule]], not a standing assertion.**

## Standards
- ISO-8402 (quality metrics)
- COBIT (IT governance metrics)
