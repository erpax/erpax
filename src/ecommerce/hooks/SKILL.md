---
name: hooks
description: "Use when reasoning about hooks — publishes the order's transitions from the collection, so an order moved by the storefront, the admin panel or a job emits the same event."
atomPath: "ecommerce/hooks"
coordinate: "ecommerce/hooks · 9/unity · eac40a79"
contentUuid: "515ea2b8-e8e6-564b-95b9-af113f4f91ea"
diamondUuid: "54aaa803-8703-8597-a3fb-12a58cb49e7f"
uuid: "eac40a79-9ba8-8c2b-8d74-22071e5dac55"
horo: 9
typography:
  partition: ecommerce
  bondDegree: 312
standards: []
bindings: []
signatures:
  computationUuid: "87cbf6bb-9e5f-8c2c-8d65-a4b8d1fb2218"
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
      stageUuid: "6537f440-637b-840e-8b86-aece8c464663"
    - stage: seal
      stageUuid: "dd62d32b-042f-8a14-afe7-9e9f56f7f621"
    - stage: uuid
      stageUuid: "8fe0addd-2ed6-8772-aeab-db34b070a99c"
version: 2
---
# ecommerce/hooks — an order's lifecycle is announced where the order changes

`emitOrderLifecycleEvents` publishes the order's transitions from the collection, so an order moved
by the storefront, the admin panel or a job emits the same event. Emitting from the caller instead
means every new caller is a new place the event can be forgotten.

Composes: [[law]].
