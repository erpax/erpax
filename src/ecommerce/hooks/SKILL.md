---
name: hooks
description: "Use when reasoning about hooks — publishes the order's transitions from the collection, so an order moved by the storefront, the admin panel or a job emits the same event."
atomPath: "ecommerce/hooks"
coordinate: "ecommerce/hooks · 6/6 · f8534d9e"
contentUuid: "cc83b245-2bd5-5fb0-ad1e-d390491a21b3"
diamondUuid: "7dfb6b45-776a-800a-9063-363fccb1a6fe"
uuid: "f8534d9e-0177-8d04-93d2-70a340ab676f"
horo: 6
typography:
  partition: ecommerce
  bondDegree: 312
standards: []
bindings: []
signatures:
  computationUuid: "4b0a996f-bebe-8587-9f76-dc7c2b3c61ea"
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
      stageUuid: "6b471265-3260-898c-89b8-4cef03d6db69"
    - stage: seal
      stageUuid: "dd62d32b-042f-8a14-afe7-9e9f56f7f621"
    - stage: uuid
      stageUuid: "0f4792b8-5b9d-8719-ad3c-4ac7db47ecd6"
version: 2
---
# ecommerce/hooks — an order's lifecycle is announced where the order changes

`emitOrderLifecycleEvents` publishes the order's transitions from the collection, so an order moved
by the storefront, the admin panel or a job emits the same event. Emitting from the caller instead
means every new caller is a new place the event can be forgotten.

Composes: [[law]].
