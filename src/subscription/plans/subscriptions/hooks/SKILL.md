---
name: hooks
description: "Use when reasoning about hooks — publishes the subscription's transitions and protects its credentials on the way in."
atomPath: "subscription/plans/subscriptions/hooks"
coordinate: "subscription/plans/subscriptions/hooks · 6/6 · fd73bb71"
contentUuid: "bb020f30-9031-599d-af8e-b98ec1ee4853"
diamondUuid: "d440a200-7846-8079-b85c-794b82e25e82"
uuid: "fd73bb71-cd9a-8a00-ba0b-5792009ac331"
horo: 6
typography:
  partition: subscription
  bondDegree: 348
standards:
  - "NIST-SP-800-38D"
bindings: []
signatures:
  computationUuid: "94658351-bf46-898d-895f-386419b007c3"
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
      stageUuid: "9d008492-e95d-8901-92f2-5a2ccae6f724"
    - stage: seal
      stageUuid: "d6466ada-ef38-8aca-a71f-b23330ba1187"
    - stage: uuid
      stageUuid: "af22629f-9c57-84e1-9890-88ca8281b138"
version: 2
---
# subscription/plans/subscriptions/hooks — lifecycle events are emitted where the row changes

`emitLifecycleEvents` publishes the subscription's transitions and `encryptSensitiveFields`
protects its credentials on the way in. Both run at the collection, so a subscription changed by
any route — admin, API or job — emits the same event.

Composes: [[law]].
