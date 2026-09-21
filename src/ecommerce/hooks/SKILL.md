---
name: hooks
description: "Use when reasoning about hooks — publishes the order's transitions from the collection, so an order moved by the storefront, the admin panel or a job emits the same event."
atomPath: "ecommerce/hooks"
coordinate: "ecommerce/hooks · 9/unity · fdf65bc7"
contentUuid: "e231ecdd-c98d-511a-8ae9-62fcb6cadf94"
diamondUuid: "8e3b7b05-2e66-8eb6-8a7f-5b16ca9de871"
uuid: "fdf65bc7-e27e-873c-9c1a-12df4b7b3fee"
horo: 9
typography:
  partition: ecommerce
  bondDegree: 345
standards: []
bindings: []
signatures:
  computationUuid: "05ba7dcf-f924-88bd-b31a-8a5c7d8b8772"
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
      stageUuid: "cc262313-cdf4-8179-9d3d-25da94f7cd93"
    - stage: seal
      stageUuid: "dd62d32b-042f-8a14-afe7-9e9f56f7f621"
    - stage: uuid
      stageUuid: "9ba2dbb5-8aac-8687-940f-a9213aea00dd"
version: 2
---
# ecommerce/hooks — an order's lifecycle is announced where the order changes

`emitOrderLifecycleEvents` publishes the order's transitions from the collection, so an order moved
by the storefront, the admin panel or a job emits the same event. Emitting from the caller instead
means every new caller is a new place the event can be forgotten.

Composes: [[law]].
