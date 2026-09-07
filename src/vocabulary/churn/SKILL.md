---
name: churn
description: "Use when measuring customer retention/attrition — monthly/annual churn %, cohort analysis, at-risk indicators, retention drivers."
atomPath: "vocabulary/churn"
coordinate: "vocabulary/churn · 5/round · e721c704"
contentUuid: "616b3ed9-9209-53b9-b42a-5909829d21da"
diamondUuid: "a8f610ec-2980-8dfc-88f0-c6ec1981b0fc"
uuid: "e721c704-f0f6-844c-b7a7-a10d3ee0e549"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 24
standards: []
bindings: []
signatures:
  computationUuid: "6aa689ef-897e-8f3f-9d8a-7af587edc306"
  stages:
    - stage: path
      stageUuid: "afef8cc3-16d7-84d5-9b62-6064cb290e37"
    - stage: trinity
      stageUuid: "69c6e560-624b-8c56-98f7-0b5416d2fec6"
    - stage: boundary
      stageUuid: "9379113a-a8eb-87ce-b7e9-ef987545947f"
    - stage: links
      stageUuid: "2c95de05-c7e6-8d68-a14f-eedd228447a3"
    - stage: horo
      stageUuid: "ed16a8c6-aa96-8eec-8029-1db39ba0ac48"
    - stage: seal
      stageUuid: "4321b59e-830e-8972-8f2f-5962ef83bc94"
    - stage: uuid
      stageUuid: "d9760c7a-6241-8e9c-9bbd-354647556c0f"
version: 2
---
# churn

Use when measuring customer retention/attrition — monthly/annual churn %, cohort analysis, at-risk indicators, retention drivers.

Composes: [[Customers]] · [[Subscriptions]] · [[revenue]] · [[forecast]] · [[cohort]].

**Law — [[law]]: churn measures customer attrition — the rate (monthly/annual %), the cohort it is read over, the at-risk indicators, and the retention drivers — the inverse face of retention.**

## Standards
- CRM-generic
