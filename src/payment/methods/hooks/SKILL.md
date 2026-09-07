---
name: hooks
description: "Use when reasoning about hooks — Every hook sibling is re-exported here, so a collection writes rather than naming each file."
atomPath: "payment/methods/hooks"
coordinate: "payment/methods/hooks · 3/3 · be24770e"
contentUuid: "53962fe6-5891-5266-8cd4-85477ea2c0ce"
diamondUuid: "50129d73-4088-8039-8069-b08200d776e5"
uuid: "be24770e-3fbd-8642-9093-bd9dc18b6881"
horo: 3
typography:
  partition: payment
  bondDegree: 312
standards:
  - "NIST-SP-800-38D"
bindings: []
signatures:
  computationUuid: "b1cb9df2-e77e-875d-a6d8-4641ff5c60bd"
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
      stageUuid: "62d61731-53d2-8a6b-87fa-85e015393155"
    - stage: seal
      stageUuid: "d5c2fc87-3bab-8c33-b9c6-0035e4c30478"
    - stage: uuid
      stageUuid: "60919930-00b6-8e90-afef-51a178ee774f"
version: 2
---
# payment/methods/hooks — the barrel that keeps a collection's imports one segment deep

Every hook sibling is re-exported here, so a collection writes `from './hooks'` rather than
naming each file. `encryptSensitiveFields` is the one that matters: payment credentials are
encrypted on the way in, so what the database holds is never the usable secret.

Composes: [[law]].
