---
name: hooks
description: "Use when reasoning about hooks — publishes the subscription's transitions and protects its credentials on the way in."
atomPath: "subscription/plans/subscriptions/hooks"
coordinate: "subscription/plans/subscriptions/hooks · 3/3 · 1b9e0943"
contentUuid: "1418d2c1-aa0c-5f8f-94ca-6e4f8cf78c48"
diamondUuid: "9333d30a-5c3d-8a12-9767-e6a79f5baad9"
uuid: "1b9e0943-5948-83a4-a7e8-6157408e63e1"
horo: 3
typography:
  partition: subscription
  bondDegree: 312
standards:
  - "NIST-SP-800-38D"
bindings: []
signatures:
  computationUuid: "34d8f59e-1cce-8783-b59f-1325395ef58e"
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
      stageUuid: "762b9149-3851-8e78-93dc-52ac0ba7eb46"
    - stage: seal
      stageUuid: "d6466ada-ef38-8aca-a71f-b23330ba1187"
    - stage: uuid
      stageUuid: "c3a48d0b-5b60-8a12-90a2-1e7938495afb"
version: 2
---
# subscription/plans/subscriptions/hooks — lifecycle events are emitted where the row changes

`emitLifecycleEvents` publishes the subscription's transitions and `encryptSensitiveFields`
protects its credentials on the way in. Both run at the collection, so a subscription changed by
any route — admin, API or job — emits the same event.

Composes: [[law]].
