---
name: attribution
description: "Use when tracking which touchpoint/channel caused a conversion — first-touch, last-touch, multi-touch models; credit value allocation across channels."
atomPath: "vocabulary/attribution"
coordinate: "vocabulary/attribution · 7/descent · 8e8f2fff"
contentUuid: "08a97b91-172e-5b48-bb64-900ce868c1bf"
diamondUuid: "839194bf-a0d9-8bdd-83bf-0170d31864b9"
uuid: "8e8f2fff-c7a9-8775-b8e9-e36bd3dd9ede"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 21
standards: []
bindings: []
signatures:
  computationUuid: "e8bab45b-3e36-8176-a7d4-f38311eb0319"
  stages:
    - stage: path
      stageUuid: "0f82d580-ac07-8617-8e23-f8c5d7e7cd13"
    - stage: trinity
      stageUuid: "189124c7-8ff9-8127-9e4f-c1ba67f1c7c9"
    - stage: boundary
      stageUuid: "ae0e9659-7a7a-8a17-87bc-770056cb9b28"
    - stage: links
      stageUuid: "d5ee2d11-fe50-88f8-9015-8cce4e16b6c3"
    - stage: horo
      stageUuid: "bddc38e6-78f8-858b-8987-725d4ff16a47"
    - stage: seal
      stageUuid: "2cc214f1-a59b-83f0-bfe4-3214bb769b49"
    - stage: uuid
      stageUuid: "b483c56b-f2a1-86a0-918d-4a9fae937dc2"
version: 2
---
# attribution

Use when tracking which touchpoint/channel caused a conversion — first-touch, last-touch, multi-touch models; credit value allocation across channels.

Composes: [[campaign]] · [[Activities]] · [[customers/sales/orders]] · [[Opportunities]] · [[conversion]].

**Law — [[law]]: a [[conversion]]'s credit is allocated back across the touchpoints that caused it (first/last/multi-touch) — every attributed share sums to the one whole conversion.**

## Standards
- CRM-generic
