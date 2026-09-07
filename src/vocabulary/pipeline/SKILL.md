---
name: pipeline
description: "Use when tracking the progression of deals through sales stages — lead → qualified → proposal → negotiation → won/lost. The sales funnel state at each stage with value, probability, and close date."
atomPath: "vocabulary/pipeline"
coordinate: "vocabulary/pipeline · 5/round · 2c55d53c"
contentUuid: "dcc48279-89aa-57cd-b36a-1400bf647b5e"
diamondUuid: "4443d60d-462c-88a3-9588-856716364ce0"
uuid: "2c55d53c-49aa-8d27-a28a-a6a007a529b1"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 26
standards: []
bindings: []
signatures:
  computationUuid: "54146682-6924-8426-9993-f8df4c07ab1e"
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
      stageUuid: "d605a6a5-8528-8b46-9845-0696466f657f"
    - stage: seal
      stageUuid: "25c3ee30-5ffd-86fe-b993-a421968c913f"
    - stage: uuid
      stageUuid: "d1985d88-4f3a-8e41-affd-4d104de4fcd9"
version: 2
---
# pipeline

Use when tracking the progression of deals through sales stages — lead → qualified → proposal → negotiation → won/lost. The sales funnel state at each stage with value, probability, and close date.

Composes: [[Opportunities]] · [[Leads]] · [[forecast]] · [[customers/sales/orders]].

## Standards
- CRM-generic

**Law — [[law]]: a pipeline is one deal's monotonic progression through ordered sales stages (lead → qualified → proposal → negotiation → won/lost); the funnel position carries value, probability and close date and is the deal's stage on the ring, never an arbitrary flag.**
