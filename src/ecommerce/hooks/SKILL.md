---
name: hooks
description: "Use when reasoning about hooks — publishes the order's transitions from the collection, so an order moved by the storefront, the admin panel or a job emits the same event."
atomPath: "ecommerce/hooks"
coordinate: "ecommerce/hooks · 6/6 · c77532b3"
contentUuid: "309bda6f-0aa4-5789-b579-8e7f53e45140"
diamondUuid: "6f3c05b8-66a8-8054-946c-343e4ec3d098"
uuid: "c77532b3-10ff-8a77-a2dc-2ff1ac4e926a"
horo: 6
typography:
  partition: ecommerce
  bondDegree: 348
standards: []
bindings: []
signatures:
  computationUuid: "64a589a4-215e-81c4-a5fc-44a52098a339"
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
      stageUuid: "9ce848aa-ec8f-8a6a-9b11-8886617fa645"
    - stage: seal
      stageUuid: "dd62d32b-042f-8a14-afe7-9e9f56f7f621"
    - stage: uuid
      stageUuid: "b74db26c-a596-8575-bd42-3798e133c43f"
version: 2
---
# ecommerce/hooks — an order's lifecycle is announced where the order changes

`emitOrderLifecycleEvents` publishes the order's transitions from the collection, so an order moved
by the storefront, the admin panel or a job emits the same event. Emitting from the caller instead
means every new caller is a new place the event can be forgotten.

Composes: [[law]].
