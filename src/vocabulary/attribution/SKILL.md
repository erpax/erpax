---
name: attribution
description: "Use when tracking which touchpoint/channel caused a conversion — first-touch, last-touch, multi-touch models; credit value allocation across channels."
atomPath: "vocabulary/attribution"
coordinate: "vocabulary/attribution · 5/round · 3bef05aa"
contentUuid: "ca6bb4d1-543d-5782-a833-d8f1b38d031e"
diamondUuid: "a85fb07c-a0d5-8455-a1ce-0327d2ea7b92"
uuid: "3bef05aa-5957-8439-84c5-88f75a17496f"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 21
standards: []
bindings: []
signatures:
  computationUuid: "2aae3f4c-49f0-8304-aa59-a1ad93f451dd"
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
      stageUuid: "89eff190-86ec-83fd-8e7b-c476a584dd0c"
    - stage: seal
      stageUuid: "2cc214f1-a59b-83f0-bfe4-3214bb769b49"
    - stage: uuid
      stageUuid: "16ddb5d6-04c3-8b37-8ef2-adc66270e5b3"
version: 2
---
# attribution

Use when tracking which touchpoint/channel caused a conversion — first-touch, last-touch, multi-touch models; credit value allocation across channels.

Composes: [[campaign]] · [[Activities]] · [[customers/sales/orders]] · [[Opportunities]] · [[conversion]].

**Law — [[law]]: a [[conversion]]'s credit is allocated back across the touchpoints that caused it (first/last/multi-touch) — every attributed share sums to the one whole conversion.**

## Standards
- CRM-generic
