---
name: churn
description: "Use when measuring customer retention/attrition — monthly/annual churn %, cohort analysis, at-risk indicators, retention drivers."
atomPath: "vocabulary/churn"
coordinate: "vocabulary/churn · 8/crest · 4916f900"
contentUuid: "1b360d22-f5d7-57b5-971d-08ee89f4bd4a"
diamondUuid: "e36683fe-e93f-80ca-84b0-464f6fdc5bde"
uuid: "4916f900-a072-867a-965d-90bb6a0a593c"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 24
standards: []
bindings: []
signatures:
  computationUuid: "205d72a3-d762-82e6-80a7-3841da60ccea"
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
      stageUuid: "c88ac9e8-1af8-8175-85c5-b14ae8d36db7"
    - stage: seal
      stageUuid: "4321b59e-830e-8972-8f2f-5962ef83bc94"
    - stage: uuid
      stageUuid: "4687d437-8c43-8214-85bf-324a0efe1adb"
version: 2
---
# churn

Use when measuring customer retention/attrition — monthly/annual churn %, cohort analysis, at-risk indicators, retention drivers.

Composes: [[Customers]] · [[Subscriptions]] · [[revenue]] · [[forecast]] · [[cohort]].

**Law — [[law]]: churn measures customer attrition — the rate (monthly/annual %), the cohort it is read over, the at-risk indicators, and the retention drivers — the inverse face of retention.**

## Standards
- CRM-generic
