---
name: hooks
description: "Use when reasoning about hooks — publishes the subscription's transitions and protects its credentials on the way in."
atomPath: "subscription/plans/subscriptions/hooks"
coordinate: "subscription/plans/subscriptions/hooks · 3/3 · d7a15423"
contentUuid: "904f2f01-6ff5-5624-b777-a95d4a861b9a"
diamondUuid: "00edda6e-a4b2-820f-b78f-d26e992deead"
uuid: "d7a15423-ce8c-84cd-8119-81bde5eebe36"
horo: 3
typography:
  partition: subscription
  bondDegree: 312
standards:
  - "NIST-SP-800-38D"
bindings: []
signatures:
  computationUuid: "649c3861-1eb8-8439-8df9-d7fd5fa3e07c"
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
      stageUuid: "07f5980c-2eea-8def-8d17-453a5534cf4d"
    - stage: seal
      stageUuid: "d6466ada-ef38-8aca-a71f-b23330ba1187"
    - stage: uuid
      stageUuid: "35ceb180-3870-83c4-bc0c-06ce4b2d0444"
version: 2
---
# subscription/plans/subscriptions/hooks — lifecycle events are emitted where the row changes

`emitLifecycleEvents` publishes the subscription's transitions and `encryptSensitiveFields`
protects its credentials on the way in. Both run at the collection, so a subscription changed by
any route — admin, API or job — emits the same event.

Composes: [[law]].
