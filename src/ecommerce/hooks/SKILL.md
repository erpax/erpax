---
name: hooks
description: "Use when reasoning about hooks — publishes the order's transitions from the collection, so an order moved by the storefront, the admin panel or a job emits the same event."
atomPath: "ecommerce/hooks"
coordinate: "ecommerce/hooks · 6/6 · c49dfd71"
contentUuid: "0dcbea56-4570-5c24-8cb4-621ff82d8c56"
diamondUuid: "d34ac41d-51dc-8622-8d3c-9f8651a826ec"
uuid: "c49dfd71-98d9-8aa8-9f03-ccd3150f8611"
horo: 6
typography:
  partition: ecommerce
  bondDegree: 348
standards: []
bindings: []
signatures:
  computationUuid: "55dd9df9-958a-822e-a4ac-0661f8352718"
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
      stageUuid: "e7855022-0cf2-8f46-afc9-5c214cec99ed"
    - stage: seal
      stageUuid: "dd62d32b-042f-8a14-afe7-9e9f56f7f621"
    - stage: uuid
      stageUuid: "e73a76e2-eecf-8231-bf9b-714e5b87d009"
version: 2
---
# ecommerce/hooks — an order's lifecycle is announced where the order changes

`emitOrderLifecycleEvents` publishes the order's transitions from the collection, so an order moved
by the storefront, the admin panel or a job emits the same event. Emitting from the caller instead
means every new caller is a new place the event can be forgotten.

Composes: [[law]].
