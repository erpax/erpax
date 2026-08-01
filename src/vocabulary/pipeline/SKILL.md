---
name: pipeline
description: "Use when tracking the progression of deals through sales stages — lead → qualified → proposal → negotiation → won/lost. The sales funnel state at each stage with value, probability, and close date."
atomPath: "vocabulary/pipeline"
coordinate: "vocabulary/pipeline · 7/descent · 8d6b9db4"
contentUuid: "dd90ffca-4ccc-52d8-beb6-c4b2925edfe0"
diamondUuid: "59cb85ee-65c3-8171-af68-23ea9000b07e"
uuid: "8d6b9db4-65d0-862f-a0d8-15491a7a33ea"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 22
standards: []
bindings: []
signatures:
  computationUuid: "7aaac50b-7b3d-8b90-a2e4-b794d156c223"
  stages:
    - stage: path
      stageUuid: "d12cfc50-071b-8ace-959f-0f00786fab60"
    - stage: trinity
      stageUuid: "e54aacaf-760a-8b17-a9c4-a5c8c0204cae"
    - stage: boundary
      stageUuid: "e100b0f7-e47e-8a4b-91de-a55934c1dabb"
    - stage: links
      stageUuid: "c3984f88-4a56-8f76-8e90-9e6bcfd254eb"
    - stage: horo
      stageUuid: "e6e338af-adc1-8710-b1fa-2e9f8d4507ea"
    - stage: seal
      stageUuid: "be9928d3-c6a2-850a-a871-1f6ed59ab39d"
    - stage: uuid
      stageUuid: "0c4e3f80-8e88-8029-92d7-51351051fa82"
version: 2
---
# pipeline

Use when tracking the progression of deals through sales stages — lead → qualified → proposal → negotiation → won/lost. The sales funnel state at each stage with value, probability, and close date.

Composes: [[Opportunities]] · [[Leads]] · [[forecast]] · [[customers/sales/orders]].

## Standards
- CRM-generic

**Law — [[law]]: a pipeline is one deal's monotonic progression through ordered sales stages (lead → qualified → proposal → negotiation → won/lost); the funnel position carries value, probability and close date and is the deal's stage on the ring, never an arbitrary flag.**
