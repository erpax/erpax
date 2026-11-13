---
name: attribution
description: "Use when tracking which touchpoint/channel caused a conversion — first-touch, last-touch, multi-touch models; credit value allocation across channels."
atomPath: "vocabulary/attribution"
coordinate: "vocabulary/attribution · 8/crest · 8b2dfde7"
contentUuid: "435628d2-92fc-571f-b74c-2b807046d58a"
diamondUuid: "24b8dae0-5fc6-8ef1-9c42-f86abea3f2cc"
uuid: "8b2dfde7-9a03-8ab3-a87e-9a9389ba60e5"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 18
standards: []
bindings: []
signatures:
  computationUuid: "9432db78-d6f7-8c2f-8f23-5710a6855f5e"
  stages:
    - stage: path
      stageUuid: "0f82d580-ac07-8617-8e23-f8c5d7e7cd13"
    - stage: trinity
      stageUuid: "189124c7-8ff9-8127-9e4f-c1ba67f1c7c9"
    - stage: boundary
      stageUuid: "90f17207-1f3b-8c5d-a580-fb95b42fd8bd"
    - stage: links
      stageUuid: "38ed7c04-74e0-8ae0-850e-5f9273e7177b"
    - stage: horo
      stageUuid: "7fb1678b-0061-8a70-97a5-df3778e29991"
    - stage: seal
      stageUuid: "2cc214f1-a59b-83f0-bfe4-3214bb769b49"
    - stage: uuid
      stageUuid: "297e2283-0c70-8c26-bb53-0378c525325d"
version: 2
---
# attribution

Use when tracking which touchpoint/channel caused a conversion — first-touch, last-touch, multi-touch models; credit value allocation across channels.

Composes: [[campaign]] · [[Activities]] · [[customers/sales/orders]] · [[Opportunities]] · conversion.

**Law — [[law]]: a conversion's credit is allocated back across the touchpoints that caused it (first/last/multi-touch) — every attributed share sums to the one whole conversion.**

## Standards
- CRM-generic
