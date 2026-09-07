---
name: hooks
description: "Use when reasoning about hooks — publishes the subscription's transitions and protects its credentials on the way in."
atomPath: "subscription/plans/subscriptions/hooks"
coordinate: "subscription/plans/subscriptions/hooks · 9/unity · c53c1712"
contentUuid: "82cfcb5f-8285-57b1-8609-87dd968775d5"
diamondUuid: "6d2f1a5c-d996-85fc-8321-188424f990ad"
uuid: "c53c1712-5592-8f6d-97cd-fec362e3f0b9"
horo: 9
typography:
  partition: subscription
  bondDegree: 348
standards:
  - "NIST-SP-800-38D"
bindings: []
signatures:
  computationUuid: "f3eabd98-b278-8eab-919b-9d29c6586b8f"
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
      stageUuid: "1517052c-1d09-8b90-94d1-97179f7743b4"
    - stage: seal
      stageUuid: "d6466ada-ef38-8aca-a71f-b23330ba1187"
    - stage: uuid
      stageUuid: "c5718655-cde0-8269-97cf-81e229c85194"
version: 2
---
# subscription/plans/subscriptions/hooks — lifecycle events are emitted where the row changes

`emitLifecycleEvents` publishes the subscription's transitions and `encryptSensitiveFields`
protects its credentials on the way in. Both run at the collection, so a subscription changed by
any route — admin, API or job — emits the same event.

Composes: [[law]].
