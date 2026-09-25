---
name: hooks
description: "Use when reasoning about hooks — publishes the subscription's transitions and protects its credentials on the way in."
atomPath: "subscription/plans/subscriptions/hooks"
coordinate: "subscription/plans/subscriptions/hooks · 6/6 · c9f3a742"
contentUuid: "e81ad9da-7707-5808-98dc-9adc40de8ea4"
diamondUuid: "c79c703e-3ec2-8c31-a96b-e752e9b8c9d6"
uuid: "c9f3a742-6119-89b4-8963-1d103c47801f"
horo: 6
typography:
  partition: subscription
  bondDegree: 345
standards:
  - "NIST-SP-800-38D"
bindings: []
signatures:
  computationUuid: "6e44b877-f811-8930-8a1a-51418cbfb319"
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
      stageUuid: "47fbc68b-8679-8602-a91c-033c3363201d"
    - stage: seal
      stageUuid: "d6466ada-ef38-8aca-a71f-b23330ba1187"
    - stage: uuid
      stageUuid: "a987b5fd-6ca3-8c9b-96c9-42ddfb424644"
version: 2
---
# subscription/plans/subscriptions/hooks — lifecycle events are emitted where the row changes

`emitLifecycleEvents` publishes the subscription's transitions and `encryptSensitiveFields`
protects its credentials on the way in. Both run at the collection, so a subscription changed by
any route — admin, API or job — emits the same event.

Composes: [[law]].
