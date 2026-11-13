---
name: churn
description: "Use when measuring customer retention/attrition — monthly/annual churn %, cohort analysis, at-risk indicators, retention drivers."
atomPath: "vocabulary/churn"
coordinate: "vocabulary/churn · 5/round · 8f21284b"
contentUuid: "dfc709cd-1d51-5a03-85d4-277bbaa5f625"
diamondUuid: "e7a0a439-303b-841d-8946-fa1c3bffb6a1"
uuid: "8f21284b-d01e-82e8-a71b-c4617acee7d8"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 18
standards: []
bindings: []
signatures:
  computationUuid: "592252f9-fbeb-8481-bde2-749a29ea53a0"
  stages:
    - stage: path
      stageUuid: "afef8cc3-16d7-84d5-9b62-6064cb290e37"
    - stage: trinity
      stageUuid: "69c6e560-624b-8c56-98f7-0b5416d2fec6"
    - stage: boundary
      stageUuid: "e97feedd-bbc1-8230-b875-688d9805131b"
    - stage: links
      stageUuid: "d06762ff-c324-8b17-9f70-e905d7cac2ac"
    - stage: horo
      stageUuid: "29656471-8e96-844e-a393-90efa64fe965"
    - stage: seal
      stageUuid: "4321b59e-830e-8972-8f2f-5962ef83bc94"
    - stage: uuid
      stageUuid: "ee6142f6-b4f5-87da-aca8-30373f1fe3af"
version: 2
---
# churn

Use when measuring customer retention/attrition — monthly/annual churn %, cohort analysis, at-risk indicators, retention drivers.

Composes: [[Customers]] · [[Subscriptions]] · revenue · [[forecast]] · [[cohort]].

**Law — [[law]]: churn measures customer attrition — the rate (monthly/annual %), the cohort it is read over, the at-risk indicators, and the retention drivers — the inverse face of retention.**

## Standards
- CRM-generic
