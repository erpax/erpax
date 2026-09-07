---
name: hooks
description: "Use when reasoning about hooks — publishes the order's transitions from the collection, so an order moved by the storefront, the admin panel or a job emits the same event."
atomPath: "ecommerce/hooks"
coordinate: "ecommerce/hooks · 9/unity · 5e5871f3"
contentUuid: "61c5f6b1-2f80-5dc3-aab7-fb4f309f29b6"
diamondUuid: "0a14a9e0-3e61-8de8-b445-1fa2bfed446b"
uuid: "5e5871f3-00ba-85d8-8fc1-9cb876f516eb"
horo: 9
typography:
  partition: ecommerce
  bondDegree: 312
standards: []
bindings: []
signatures:
  computationUuid: "bc5f0b78-fc15-8068-9ed0-48c6ec364ba2"
  stages:
    - stage: path
      stageUuid: "7dbf637a-b4c6-8f4d-b5ba-ddab50652c89"
    - stage: trinity
      stageUuid: "627d0bad-6f27-8104-b1ce-905e6d014517"
    - stage: boundary
      stageUuid: "458aca98-3f28-88d8-b624-d737e5b4ad87"
    - stage: links
      stageUuid: "c0d8d329-11cd-896c-9163-820181c5d244"
    - stage: horo
      stageUuid: "e317a525-5467-86c1-86cc-c83408ad02f1"
    - stage: seal
      stageUuid: "dd62d32b-042f-8a14-afe7-9e9f56f7f621"
    - stage: uuid
      stageUuid: "e0924f78-f1e6-86d8-b677-81e98bd47895"
version: 2
---
# ecommerce/hooks — an order's lifecycle is announced where the order changes

`emitOrderLifecycleEvents` publishes the order's transitions from the collection, so an order moved
by the storefront, the admin panel or a job emits the same event. Emitting from the caller instead
means every new caller is a new place the event can be forgotten.

Composes: [[law]].
