---
name: hooks
description: "Use when reasoning about hooks — publishes the subscription's transitions and protects its credentials on the way in."
atomPath: "subscription/plans/subscriptions/hooks"
coordinate: "subscription/plans/subscriptions/hooks · 6/6 · c9f3a742"
contentUuid: "9e190125-0924-5877-b95b-32f7e65db1ee"
diamondUuid: "c3418545-a803-87bc-aeaf-7f21fd529331"
uuid: "c9f3a742-6119-89b4-8963-1d103c47801f"
horo: 6
typography:
  partition: subscription
  bondDegree: 333
standards:
  - "NIST-SP-800-38D"
bindings: []
signatures:
  computationUuid: "af68e525-2e9b-89ac-a520-2c535733da56"
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
      stageUuid: "b24e025f-47c6-8b28-9c42-65733bd6fc2c"
    - stage: seal
      stageUuid: "d6466ada-ef38-8aca-a71f-b23330ba1187"
    - stage: uuid
      stageUuid: "6c7173d8-d331-80f0-9e16-acf0f3529384"
version: 2
---
# subscription/plans/subscriptions/hooks — lifecycle events are emitted where the row changes

`emitLifecycleEvents` publishes the subscription's transitions and `encryptSensitiveFields`
protects its credentials on the way in. Both run at the collection, so a subscription changed by
any route — admin, API or job — emits the same event.

Composes: [[law]].
