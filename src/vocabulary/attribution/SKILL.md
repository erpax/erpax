---
name: attribution
description: "Use when tracking which touchpoint/channel caused a conversion — first-touch, last-touch, multi-touch models; credit value allocation across channels."
atomPath: "vocabulary/attribution"
coordinate: "vocabulary/attribution · 7/descent · 3ae2f039"
contentUuid: "7b3f8f20-6a70-5f62-af38-0acda692196d"
diamondUuid: "a71b3122-981f-8bbc-9067-afbee79e43bf"
uuid: "3ae2f039-8306-8a15-8da7-0a7b4aa5fee3"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 21
standards: []
bindings: []
signatures:
  computationUuid: "4186e8f6-1652-8737-b317-c11f7e687a6d"
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
      stageUuid: "0e437eeb-bff9-8364-978e-fa5f92d08513"
    - stage: seal
      stageUuid: "2cc214f1-a59b-83f0-bfe4-3214bb769b49"
    - stage: uuid
      stageUuid: "5f08fe7d-38cf-879b-8437-47302600e7ad"
version: 2
---
# attribution

Use when tracking which touchpoint/channel caused a conversion — first-touch, last-touch, multi-touch models; credit value allocation across channels.

Composes: [[campaign]] · [[Activities]] · [[customers/sales/orders]] · [[Opportunities]] · [[conversion]].

**Law — [[law]]: a [[conversion]]'s credit is allocated back across the touchpoints that caused it (first/last/multi-touch) — every attributed share sums to the one whole conversion.**

## Standards
- CRM-generic
