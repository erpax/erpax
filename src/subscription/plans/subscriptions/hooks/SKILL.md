---
name: hooks
description: "Use when reasoning about hooks — publishes the subscription's transitions and protects its credentials on the way in."
atomPath: "subscription/plans/subscriptions/hooks"
coordinate: "subscription/plans/subscriptions/hooks · 6/6 · c9f3a742"
contentUuid: "60302674-269b-5a3b-b7c5-7c399c1abce3"
diamondUuid: "e1eb5397-6b0f-8525-adfd-1ab7ed851594"
uuid: "c9f3a742-6119-89b4-8963-1d103c47801f"
horo: 6
typography:
  partition: subscription
  bondDegree: 297
standards:
  - "NIST-SP-800-38D"
bindings: []
signatures:
  computationUuid: "9155e22a-b312-8e8e-ba45-f6050360a26b"
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
      stageUuid: "a089aa05-676c-80c5-af4c-af7afd1fab74"
    - stage: seal
      stageUuid: "d6466ada-ef38-8aca-a71f-b23330ba1187"
    - stage: uuid
      stageUuid: "38d78f77-7c04-8484-83c2-0568282f5038"
version: 2
---
# subscription/plans/subscriptions/hooks — lifecycle events are emitted where the row changes

`emitLifecycleEvents` publishes the subscription's transitions and `encryptSensitiveFields`
protects its credentials on the way in. Both run at the collection, so a subscription changed by
any route — admin, API or job — emits the same event.

Composes: [[law]].
