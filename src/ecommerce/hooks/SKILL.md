---
name: hooks
description: "Use when reasoning about hooks — publishes the order's transitions from the collection, so an order moved by the storefront, the admin panel or a job emits the same event."
atomPath: "ecommerce/hooks"
coordinate: "ecommerce/hooks · 6/6 · da64c36e"
contentUuid: "64c7195d-f41d-541f-a6d8-a81e9d03fd87"
diamondUuid: "d830b830-be90-85ce-b8d4-f46f8a5e6407"
uuid: "da64c36e-d186-8cd5-a5ea-352ee54c2ade"
horo: 6
typography:
  partition: ecommerce
  bondDegree: 348
standards: []
bindings: []
signatures:
  computationUuid: "bae32a9d-2f56-823a-a142-53a515e629f1"
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
      stageUuid: "fc30e762-158c-8760-b4b3-77925c645be4"
    - stage: seal
      stageUuid: "dd62d32b-042f-8a14-afe7-9e9f56f7f621"
    - stage: uuid
      stageUuid: "017ad3b8-3baa-808d-83c0-057c4bab4d26"
version: 2
---
# ecommerce/hooks — an order's lifecycle is announced where the order changes

`emitOrderLifecycleEvents` publishes the order's transitions from the collection, so an order moved
by the storefront, the admin panel or a job emits the same event. Emitting from the caller instead
means every new caller is a new place the event can be forgotten.

Composes: [[law]].
