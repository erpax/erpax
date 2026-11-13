---
name: metric
description: "Use when recording a periodic quantitative observation — daily/weekly/monthly snapshot of performance (headcount, utilization %, defect rate, cost-per-unit, customer-satisfaction score). The data point."
atomPath: "vocabulary/metric"
coordinate: "vocabulary/metric · 4/weave · b1cafbf1"
contentUuid: "8e9da7e4-9e14-5b6e-a32b-357eadb1e15c"
diamondUuid: "2b49ee26-5680-8fad-8f5e-eb163c118736"
uuid: "b1cafbf1-f926-8808-b00a-23562ee00dd2"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 47
standards: []
bindings: []
signatures:
  computationUuid: "68935d3a-7124-8e57-881a-44a38fb83836"
  stages:
    - stage: path
      stageUuid: "c910d55b-72c8-8019-a887-862f5f746d1b"
    - stage: trinity
      stageUuid: "690f0bc3-9d1d-872d-b230-240b6e9cf04c"
    - stage: boundary
      stageUuid: "fb2a21f7-ec11-8ca0-a489-0fd099056712"
    - stage: links
      stageUuid: "97a5823a-aaa4-8311-92e8-7911d0ed9f54"
    - stage: horo
      stageUuid: "3ae10566-3463-8644-94fe-e62c5ec8c11b"
    - stage: seal
      stageUuid: "e5e9c6cc-587d-8e46-8bd9-f3575c86a9af"
    - stage: uuid
      stageUuid: "ec8df03e-5322-8774-956f-04f9fac5e3f5"
version: 2
---
# metric

Use when recording a periodic quantitative observation — daily/weekly/monthly snapshot of performance (headcount, utilization %, defect rate, cost-per-unit, customer-satisfaction score). The data point.

Composes: [[kpi]] · [[measure]] · schedule · [[defect]].

**Law — [[law]]: a metric is one quantitative observation pinned to a period — the dated data point a [[kpi]] aggregates, so performance is a [[measure]] taken on a schedule, not a standing assertion.**

## Standards
- ISO-8402 (quality metrics)
- COBIT (IT governance metrics)
