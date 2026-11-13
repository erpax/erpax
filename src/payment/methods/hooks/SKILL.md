---
name: hooks
description: "Use when reasoning about hooks — Every hook sibling is re-exported here, so a collection writes rather than naming each file."
atomPath: "payment/methods/hooks"
coordinate: "payment/methods/hooks · 9/unity · 8c60d6e9"
contentUuid: "1ca05dd2-b4e4-5375-9f7c-962edcb5e234"
diamondUuid: "69d2b194-7c05-8339-8a62-d7e37cb26dae"
uuid: "8c60d6e9-d37b-89f8-bb2b-4d6128259465"
horo: 9
typography:
  partition: payment
  bondDegree: 333
standards:
  - "NIST-SP-800-38D"
bindings: []
signatures:
  computationUuid: "cb2f197e-f42d-8d3d-955d-366cb97f36bb"
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
      stageUuid: "ece8bc1c-7248-86ac-bffe-d7da2d99d052"
    - stage: seal
      stageUuid: "d5c2fc87-3bab-8c33-b9c6-0035e4c30478"
    - stage: uuid
      stageUuid: "60e7b072-1a60-820f-84aa-e80c9dd24f2e"
version: 2
---
# payment/methods/hooks — the barrel that keeps a collection's imports one segment deep

Every hook sibling is re-exported here, so a collection writes `from './hooks'` rather than
naming each file. `encryptSensitiveFields` is the one that matters: payment credentials are
encrypted on the way in, so what the database holds is never the usable secret.

Composes: [[law]].
