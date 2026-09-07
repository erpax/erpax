---
name: pipeline
description: "Use when tracking the progression of deals through sales stages — lead → qualified → proposal → negotiation → won/lost. The sales funnel state at each stage with value, probability, and close date."
atomPath: "vocabulary/pipeline"
coordinate: "vocabulary/pipeline · 5/round · 4921cb4b"
contentUuid: "04bf9831-eb36-54a2-9e64-c0201aefa437"
diamondUuid: "39bb342b-6321-810d-a501-aa65caa6d1f4"
uuid: "4921cb4b-de43-80ae-88eb-c2b882fc7b26"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 26
standards: []
bindings: []
signatures:
  computationUuid: "e3ada081-0846-85f5-bd6b-b67699ecc7fd"
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
      stageUuid: "089e89d1-6e25-8aa7-9a52-4a4b95c3492f"
    - stage: seal
      stageUuid: "25c3ee30-5ffd-86fe-b993-a421968c913f"
    - stage: uuid
      stageUuid: "e9c134b0-6f72-81d9-9cf9-8342a244cea1"
version: 2
---
# pipeline

Use when tracking the progression of deals through sales stages — lead → qualified → proposal → negotiation → won/lost. The sales funnel state at each stage with value, probability, and close date.

Composes: [[Opportunities]] · [[Leads]] · [[forecast]] · [[customers/sales/orders]].

## Standards
- CRM-generic

**Law — [[law]]: a pipeline is one deal's monotonic progression through ordered sales stages (lead → qualified → proposal → negotiation → won/lost); the funnel position carries value, probability and close date and is the deal's stage on the ring, never an arbitrary flag.**
