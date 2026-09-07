---
name: pipeline
description: "Use when tracking the progression of deals through sales stages — lead → qualified → proposal → negotiation → won/lost. The sales funnel state at each stage with value, probability, and close date."
atomPath: "vocabulary/pipeline"
coordinate: "vocabulary/pipeline · 8/crest · cba0ec58"
contentUuid: "94d3109f-b17c-5bb1-b51a-79e892bd30f2"
diamondUuid: "5c7ea079-e0fd-8b52-bb2c-fac26d87d1b0"
uuid: "cba0ec58-8afd-871b-9f90-d2a9d54242ee"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 26
standards: []
bindings: []
signatures:
  computationUuid: "8c0c0c4a-980c-85cb-9aaf-34daa9f0dc48"
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
      stageUuid: "d04fdd77-2a66-8bb3-8644-53e1ab48e01d"
    - stage: seal
      stageUuid: "25c3ee30-5ffd-86fe-b993-a421968c913f"
    - stage: uuid
      stageUuid: "15b8c459-7979-8e9a-9bba-682e6c08b930"
version: 2
---
# pipeline

Use when tracking the progression of deals through sales stages — lead → qualified → proposal → negotiation → won/lost. The sales funnel state at each stage with value, probability, and close date.

Composes: [[Opportunities]] · [[Leads]] · [[forecast]] · [[customers/sales/orders]].

## Standards
- CRM-generic

**Law — [[law]]: a pipeline is one deal's monotonic progression through ordered sales stages (lead → qualified → proposal → negotiation → won/lost); the funnel position carries value, probability and close date and is the deal's stage on the ring, never an arbitrary flag.**
