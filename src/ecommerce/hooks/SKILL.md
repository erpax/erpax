---
name: hooks
description: "Use when reasoning about hooks — publishes the order's transitions from the collection, so an order moved by the storefront, the admin panel or a job emits the same event."
atomPath: "ecommerce/hooks"
coordinate: "ecommerce/hooks · 9/unity · fdf65bc7"
contentUuid: "5dc9198a-59b9-50cc-a512-6f00d4588eaa"
diamondUuid: "205be7cb-06cb-8597-9710-67c8b177d933"
uuid: "fdf65bc7-e27e-873c-9c1a-12df4b7b3fee"
horo: 9
typography:
  partition: ecommerce
  bondDegree: 288
standards: []
bindings: []
signatures:
  computationUuid: "798f0c61-43e6-8b31-b266-8385d404012b"
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
      stageUuid: "57c78cfb-242e-8607-8ee7-d20ced94cca0"
    - stage: seal
      stageUuid: "dd62d32b-042f-8a14-afe7-9e9f56f7f621"
    - stage: uuid
      stageUuid: "c840113c-0669-81fc-9eff-f0c8a7f0282c"
version: 2
---
# ecommerce/hooks — an order's lifecycle is announced where the order changes

`emitOrderLifecycleEvents` publishes the order's transitions from the collection, so an order moved
by the storefront, the admin panel or a job emits the same event. Emitting from the caller instead
means every new caller is a new place the event can be forgotten.

Composes: [[law]].
