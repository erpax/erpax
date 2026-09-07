---
name: hooks
description: "Use when reasoning about hooks — publishes the order's transitions from the collection, so an order moved by the storefront, the admin panel or a job emits the same event."
atomPath: "ecommerce/hooks"
coordinate: "ecommerce/hooks · 6/6 · 8c103349"
contentUuid: "f6dbf15f-f1fa-542a-a133-8a3752b69d46"
diamondUuid: "59dee74b-c9a6-8939-bd65-ff4e840528f9"
uuid: "8c103349-cdc2-870b-a7b2-bd8a339a36bd"
horo: 6
typography:
  partition: ecommerce
  bondDegree: 348
standards: []
bindings: []
signatures:
  computationUuid: "b94ab01c-0818-840d-8604-c5bd48fe64ab"
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
      stageUuid: "1a1bad75-a794-8e8c-9897-a633715f8e74"
    - stage: seal
      stageUuid: "dd62d32b-042f-8a14-afe7-9e9f56f7f621"
    - stage: uuid
      stageUuid: "29798c82-d484-8c61-8ef8-54a3b262a54c"
version: 2
---
# ecommerce/hooks — an order's lifecycle is announced where the order changes

`emitOrderLifecycleEvents` publishes the order's transitions from the collection, so an order moved
by the storefront, the admin panel or a job emits the same event. Emitting from the caller instead
means every new caller is a new place the event can be forgotten.

Composes: [[law]].
