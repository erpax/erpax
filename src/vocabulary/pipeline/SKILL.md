---
name: pipeline
description: "Use when tracking the progression of deals through sales stages — lead → qualified → proposal → negotiation → won/lost. The sales funnel state at each stage with value, probability, and close date."
atomPath: "vocabulary/pipeline"
coordinate: "vocabulary/pipeline · 8/crest · 01cb466a"
contentUuid: "6969e0c5-38e1-5938-8897-02855ec0651b"
diamondUuid: "c20d7759-1f97-8cae-87e5-7c63b670729e"
uuid: "01cb466a-49f2-8137-883d-bfe37359818a"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 26
standards: []
bindings: []
signatures:
  computationUuid: "977b3180-40ad-85ad-8953-b113e4cf678c"
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
      stageUuid: "0de26694-835b-8281-8c94-22400ded3eef"
    - stage: seal
      stageUuid: "25c3ee30-5ffd-86fe-b993-a421968c913f"
    - stage: uuid
      stageUuid: "3d79d149-5d51-8c98-ae6d-598d3253097e"
version: 2
---
# pipeline

Use when tracking the progression of deals through sales stages — lead → qualified → proposal → negotiation → won/lost. The sales funnel state at each stage with value, probability, and close date.

Composes: [[Opportunities]] · [[Leads]] · [[forecast]] · [[customers/sales/orders]].

## Standards
- CRM-generic

**Law — [[law]]: a pipeline is one deal's monotonic progression through ordered sales stages (lead → qualified → proposal → negotiation → won/lost); the funnel position carries value, probability and close date and is the deal's stage on the ring, never an arbitrary flag.**
