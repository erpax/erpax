---
name: churn
description: "Use when measuring customer retention/attrition — monthly/annual churn %, cohort analysis, at-risk indicators, retention drivers."
atomPath: "vocabulary/churn"
coordinate: "vocabulary/churn · 4/weave · 806bcdf9"
contentUuid: "b6d7ef1d-ba3c-5410-82c5-4bd8734655a9"
diamondUuid: "a3ffcd33-178b-8398-add5-0ecdcd84ad92"
uuid: "806bcdf9-6a6c-8737-8d32-176935aec1ae"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 24
standards: []
bindings: []
signatures:
  computationUuid: "28cdbc7d-5c43-8842-8a0c-5cf6e86930b0"
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
      stageUuid: "592ceec1-b2f5-80c2-9165-4c55f75094db"
    - stage: seal
      stageUuid: "4321b59e-830e-8972-8f2f-5962ef83bc94"
    - stage: uuid
      stageUuid: "7254f04e-171a-8e8e-a154-0adc1f99bbde"
version: 2
---
# churn

Use when measuring customer retention/attrition — monthly/annual churn %, cohort analysis, at-risk indicators, retention drivers.

Composes: [[Customers]] · [[Subscriptions]] · [[revenue]] · [[forecast]] · [[cohort]].

**Law — [[law]]: churn measures customer attrition — the rate (monthly/annual %), the cohort it is read over, the at-risk indicators, and the retention drivers — the inverse face of retention.**

## Standards
- CRM-generic
