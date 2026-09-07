---
name: hooks
description: "Use when reasoning about hooks — Every hook sibling is re-exported here, so a collection writes rather than naming each file."
atomPath: "payment/methods/hooks"
coordinate: "payment/methods/hooks · 6/6 · 0f216d6c"
contentUuid: "befd6124-34bc-593a-a900-660550fc00ba"
diamondUuid: "bc9658c3-d704-89a0-95e0-d9ad3ee17309"
uuid: "0f216d6c-c936-8480-be93-5b7f8719b793"
horo: 6
typography:
  partition: payment
  bondDegree: 312
standards:
  - "NIST-SP-800-38D"
bindings: []
signatures:
  computationUuid: "b30e195b-ae9a-835e-a51e-e82ce188cfed"
  stages:
    - stage: path
      stageUuid: "c4732e26-c9bd-8014-8335-4f269bd3fe4d"
    - stage: trinity
      stageUuid: "25afe84b-79a0-85cf-83e0-7b6f5a5eab9d"
    - stage: boundary
      stageUuid: "ee6744d5-9f62-8d42-8303-e63bcaf14ec0"
    - stage: links
      stageUuid: "ba1fdb40-701e-8a0c-ba8b-5ffe1db9d28e"
    - stage: horo
      stageUuid: "0620de04-639c-86d7-8b96-599c14c36049"
    - stage: seal
      stageUuid: "d5c2fc87-3bab-8c33-b9c6-0035e4c30478"
    - stage: uuid
      stageUuid: "9369a2b7-2aef-8796-9c9c-9c91b1f7e96b"
version: 2
---
# payment/methods/hooks — the barrel that keeps a collection's imports one segment deep

Every hook sibling is re-exported here, so a collection writes `from './hooks'` rather than
naming each file. `encryptSensitiveFields` is the one that matters: payment credentials are
encrypted on the way in, so what the database holds is never the usable secret.

Composes: [[law]].
