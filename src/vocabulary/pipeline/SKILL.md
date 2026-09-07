---
name: pipeline
description: "Use when tracking the progression of deals through sales stages — lead → qualified → proposal → negotiation → won/lost. The sales funnel state at each stage with value, probability, and close date."
atomPath: "vocabulary/pipeline"
coordinate: "vocabulary/pipeline · 2/share · 129eb8e9"
contentUuid: "2bc56173-7a69-51ee-b65f-863bc8098b12"
diamondUuid: "50b6f852-d604-82ed-ba91-4a3821d48307"
uuid: "129eb8e9-7875-89fb-9401-6e77e75743c6"
horo: 2
typography:
  partition: vocabulary
  bondDegree: 26
standards: []
bindings: []
signatures:
  computationUuid: "13cabd6f-6644-8ca5-9251-e938bbb1a919"
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
      stageUuid: "da051ae0-2dfa-8724-b277-f913b5322ca0"
    - stage: seal
      stageUuid: "25c3ee30-5ffd-86fe-b993-a421968c913f"
    - stage: uuid
      stageUuid: "3e3de762-2eaa-85ab-b876-885027bd400d"
version: 2
---
# pipeline

Use when tracking the progression of deals through sales stages — lead → qualified → proposal → negotiation → won/lost. The sales funnel state at each stage with value, probability, and close date.

Composes: [[Opportunities]] · [[Leads]] · [[forecast]] · [[customers/sales/orders]].

## Standards
- CRM-generic

**Law — [[law]]: a pipeline is one deal's monotonic progression through ordered sales stages (lead → qualified → proposal → negotiation → won/lost); the funnel position carries value, probability and close date and is the deal's stage on the ring, never an arbitrary flag.**
