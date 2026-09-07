---
name: hooks
description: "Use when reasoning about hooks — publishes the subscription's transitions and protects its credentials on the way in."
atomPath: "subscription/plans/subscriptions/hooks"
coordinate: "subscription/plans/subscriptions/hooks · 3/3 · c9e0c2ef"
contentUuid: "386fad25-fc3b-5385-a769-4915fb518ce8"
diamondUuid: "c7f5e9f6-ce40-8bdf-a3d8-727a6e636bc0"
uuid: "c9e0c2ef-c6e7-86b7-b8a6-bd02498586e3"
horo: 3
typography:
  partition: subscription
  bondDegree: 312
standards:
  - "NIST-SP-800-38D"
bindings: []
signatures:
  computationUuid: "797e7f93-c882-881b-ba67-3066e624c569"
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
      stageUuid: "2e1edf7e-3d50-8e25-aded-b8afe8877a15"
    - stage: seal
      stageUuid: "d6466ada-ef38-8aca-a71f-b23330ba1187"
    - stage: uuid
      stageUuid: "7fc962cd-1c59-88b7-b953-92c9e2cd397f"
version: 2
---
# subscription/plans/subscriptions/hooks — lifecycle events are emitted where the row changes

`emitLifecycleEvents` publishes the subscription's transitions and `encryptSensitiveFields`
protects its credentials on the way in. Both run at the collection, so a subscription changed by
any route — admin, API or job — emits the same event.

Composes: [[law]].
