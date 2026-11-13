---
name: hooks
description: "Use when reasoning about hooks — publishes the order's transitions from the collection, so an order moved by the storefront, the admin panel or a job emits the same event."
atomPath: "ecommerce/hooks"
coordinate: "ecommerce/hooks · 9/unity · fdf65bc7"
contentUuid: "af6b3be2-67a1-5fbf-9030-8bc678690270"
diamondUuid: "138cc60d-b59d-8465-b616-21192303f98b"
uuid: "fdf65bc7-e27e-873c-9c1a-12df4b7b3fee"
horo: 9
typography:
  partition: ecommerce
  bondDegree: 297
standards: []
bindings: []
signatures:
  computationUuid: "deca8427-2603-8d24-9860-a7d42a1838b4"
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
      stageUuid: "92f47e14-21e8-8053-9592-ed6dacfe4b19"
    - stage: seal
      stageUuid: "dd62d32b-042f-8a14-afe7-9e9f56f7f621"
    - stage: uuid
      stageUuid: "e99b2556-d29f-8872-96bb-4c2967f219ed"
version: 2
---
# ecommerce/hooks — an order's lifecycle is announced where the order changes

`emitOrderLifecycleEvents` publishes the order's transitions from the collection, so an order moved
by the storefront, the admin panel or a job emits the same event. Emitting from the caller instead
means every new caller is a new place the event can be forgotten.

Composes: [[law]].
