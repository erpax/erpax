---
name: attribution
description: "Use when tracking which touchpoint/channel caused a conversion — first-touch, last-touch, multi-touch models; credit value allocation across channels."
atomPath: "vocabulary/attribution"
coordinate: "vocabulary/attribution · 7/descent · 31e4bbd0"
contentUuid: "48e9f904-d46e-567d-b7d8-5fd6bab6acac"
diamondUuid: "76a9e1b2-d1e4-8a8c-b1a1-d6ed517cbf19"
uuid: "31e4bbd0-e2cb-81a4-846f-38823d8e5a4e"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 21
standards: []
bindings: []
signatures:
  computationUuid: "3a7b7271-53c8-8f16-9c7f-4f054ce3ad3e"
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
      stageUuid: "de1fbed4-b33e-82aa-9f3b-ee4a47351771"
    - stage: seal
      stageUuid: "2cc214f1-a59b-83f0-bfe4-3214bb769b49"
    - stage: uuid
      stageUuid: "69b7affc-7388-88f4-9882-31b634b64faf"
version: 2
---
# attribution

Use when tracking which touchpoint/channel caused a conversion — first-touch, last-touch, multi-touch models; credit value allocation across channels.

Composes: [[campaign]] · [[Activities]] · [[customers/sales/orders]] · [[Opportunities]] · [[conversion]].

**Law — [[law]]: a [[conversion]]'s credit is allocated back across the touchpoints that caused it (first/last/multi-touch) — every attributed share sums to the one whole conversion.**

## Standards
- CRM-generic
