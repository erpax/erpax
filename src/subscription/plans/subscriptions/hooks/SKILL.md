---
name: hooks
description: "Use when reasoning about hooks — publishes the subscription's transitions and protects its credentials on the way in."
atomPath: "subscription/plans/subscriptions/hooks"
coordinate: "subscription/plans/subscriptions/hooks · 6/6 · c9f3a742"
contentUuid: "0fca716f-62d7-5aeb-bf27-65935ae56e2d"
diamondUuid: "3b3b3857-3df2-88fa-9744-85bfeac09089"
uuid: "c9f3a742-6119-89b4-8963-1d103c47801f"
horo: 6
typography:
  partition: subscription
  bondDegree: 288
standards:
  - "NIST-SP-800-38D"
bindings: []
signatures:
  computationUuid: "fa8c7ea4-e20e-8b7c-9955-a17272e8bb2a"
  stages:
    - stage: path
      stageUuid: "66fe0035-69db-81b9-8a7f-d62629864a9f"
    - stage: trinity
      stageUuid: "18b66ae6-66a0-890e-809f-e3516487fe17"
    - stage: boundary
      stageUuid: "ac7bbfc8-ab6b-8476-9e45-f71a81e76eff"
    - stage: links
      stageUuid: "67b8b4ad-c7b5-8cb9-9f3e-8345dc57c12f"
    - stage: horo
      stageUuid: "8398184d-2bdb-87b0-bff7-bad275cee5d0"
    - stage: seal
      stageUuid: "d6466ada-ef38-8aca-a71f-b23330ba1187"
    - stage: uuid
      stageUuid: "7774914b-228a-83cd-8768-a628c9ab8eb6"
version: 2
---
# subscription/plans/subscriptions/hooks — lifecycle events are emitted where the row changes

`emitLifecycleEvents` publishes the subscription's transitions and `encryptSensitiveFields`
protects its credentials on the way in. Both run at the collection, so a subscription changed by
any route — admin, API or job — emits the same event.

Composes: [[law]].
