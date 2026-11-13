---
name: hooks
description: "Use when reasoning about hooks — publishes the order's transitions from the collection, so an order moved by the storefront, the admin panel or a job emits the same event."
atomPath: "ecommerce/hooks"
coordinate: "ecommerce/hooks · 9/unity · fdf65bc7"
contentUuid: "1f6b7d6d-7037-5a78-b8f3-dd764342d73b"
diamondUuid: "0db90f62-7f7e-88a2-be54-8ce1acd2fed7"
uuid: "fdf65bc7-e27e-873c-9c1a-12df4b7b3fee"
horo: 9
typography:
  partition: ecommerce
  bondDegree: 333
standards: []
bindings: []
signatures:
  computationUuid: "c47d415e-1458-88e9-b7f2-ff8278bf1156"
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
      stageUuid: "0e6e9fb2-0398-8ec4-bc60-d78b014ce71c"
    - stage: seal
      stageUuid: "dd62d32b-042f-8a14-afe7-9e9f56f7f621"
    - stage: uuid
      stageUuid: "9874ed84-da53-8faf-8447-a124bb97e207"
version: 2
---
# ecommerce/hooks — an order's lifecycle is announced where the order changes

`emitOrderLifecycleEvents` publishes the order's transitions from the collection, so an order moved
by the storefront, the admin panel or a job emits the same event. Emitting from the caller instead
means every new caller is a new place the event can be forgotten.

Composes: [[law]].
