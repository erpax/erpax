---
name: hooks
description: "Use when reasoning about hooks — publishes the order's transitions from the collection, so an order moved by the storefront, the admin panel or a job emits the same event."
atomPath: "ecommerce/hooks"
coordinate: "ecommerce/hooks · 3/3 · 12e8f8a5"
contentUuid: "2912e763-643e-593a-923c-5021d3b4004c"
diamondUuid: "93df98ad-962f-8733-8485-54296b0c5718"
uuid: "12e8f8a5-42b9-83e6-ba04-bf195585d623"
horo: 3
typography:
  partition: ecommerce
  bondDegree: 348
standards: []
bindings: []
signatures:
  computationUuid: "03bc79ae-d402-87d8-8f98-a8a3fa56be07"
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
      stageUuid: "a2c62b48-29d3-8225-b21a-04f68dee5206"
    - stage: seal
      stageUuid: "dd62d32b-042f-8a14-afe7-9e9f56f7f621"
    - stage: uuid
      stageUuid: "daa4336c-0fc2-8353-b7fb-89a1cd3dfa98"
version: 2
---
# ecommerce/hooks — an order's lifecycle is announced where the order changes

`emitOrderLifecycleEvents` publishes the order's transitions from the collection, so an order moved
by the storefront, the admin panel or a job emits the same event. Emitting from the caller instead
means every new caller is a new place the event can be forgotten.

Composes: [[law]].
