---
name: hooks
description: "Use when reasoning about hooks — publishes the subscription's transitions and protects its credentials on the way in."
atomPath: "subscription/plans/subscriptions/hooks"
coordinate: "subscription/plans/subscriptions/hooks · 6/6 · bb3d56f6"
contentUuid: "ecb47da1-f4e5-5b8b-a7f9-c3646898dc4c"
diamondUuid: "06340679-6b0d-8650-9bc8-771da52c9a2a"
uuid: "bb3d56f6-add6-86ac-a568-998cd01d7058"
horo: 6
typography:
  partition: subscription
  bondDegree: 348
standards:
  - "NIST-SP-800-38D"
bindings: []
signatures:
  computationUuid: "4b8d3cc1-969b-8e49-ac78-415ff830f5bd"
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
      stageUuid: "6cad5e25-7709-815d-a042-7a70ac698730"
    - stage: seal
      stageUuid: "d6466ada-ef38-8aca-a71f-b23330ba1187"
    - stage: uuid
      stageUuid: "7a8697da-3bec-8c1f-8295-551795bde39a"
version: 2
---
# subscription/plans/subscriptions/hooks — lifecycle events are emitted where the row changes

`emitLifecycleEvents` publishes the subscription's transitions and `encryptSensitiveFields`
protects its credentials on the way in. Both run at the collection, so a subscription changed by
any route — admin, API or job — emits the same event.

Composes: [[law]].
