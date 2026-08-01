---
name: attribution
description: "Use when tracking which touchpoint/channel caused a conversion — first-touch, last-touch, multi-touch models; credit value allocation across channels."
atomPath: "vocabulary/attribution"
coordinate: "vocabulary/attribution · 2/share · 9c77084c"
contentUuid: "583840b9-269f-5878-92ee-5ab4ed43e9ae"
diamondUuid: "56e685fb-dc21-8147-a87b-9c9d4bf25989"
uuid: "9c77084c-2d34-82a8-818a-bbe01b0cce6a"
horo: 2
typography:
  partition: vocabulary
  bondDegree: 21
standards: []
bindings: []
signatures:
  computationUuid: "d3e0ae2c-7235-8c42-91c9-82f4400f1f78"
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
      stageUuid: "df4b3184-60e8-8fdd-918f-71b9d2832010"
    - stage: seal
      stageUuid: "cffddaec-e372-8779-a8d7-3b94a9394a25"
    - stage: uuid
      stageUuid: "de291309-ca3a-807a-abae-6ce6ebfe7485"
version: 2
---
# attribution

Use when tracking which touchpoint/channel caused a conversion — first-touch, last-touch, multi-touch models; credit value allocation across channels.

Composes: [[campaign]] · [[Activities]] · [[customers/sales/orders]] · [[Opportunities]] · [[conversion]].

**Law — [[law]]: a [[conversion]]'s credit is allocated back across the touchpoints that caused it (first/last/multi-touch) — every attributed share sums to the one whole conversion.**

## Standards
- CRM-generic
