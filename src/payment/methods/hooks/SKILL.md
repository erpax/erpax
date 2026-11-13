---
name: hooks
description: "Use when reasoning about hooks — Every hook sibling is re-exported here, so a collection writes rather than naming each file."
atomPath: "payment/methods/hooks"
coordinate: "payment/methods/hooks · 9/unity · 8c60d6e9"
contentUuid: "a4183830-502b-576d-a4f6-e68aed9dc109"
diamondUuid: "a85a02fd-71b7-831f-9968-4028785d5b90"
uuid: "8c60d6e9-d37b-89f8-bb2b-4d6128259465"
horo: 9
typography:
  partition: payment
  bondDegree: 288
standards:
  - "NIST-SP-800-38D"
bindings: []
signatures:
  computationUuid: "fcc954fb-8e6d-8778-a1ae-4b7023255850"
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
      stageUuid: "7036cc6d-8e7f-833b-bb5a-40b515ab77a9"
    - stage: seal
      stageUuid: "d5c2fc87-3bab-8c33-b9c6-0035e4c30478"
    - stage: uuid
      stageUuid: "4e199aa7-5a18-87f6-bca4-b992602ffb60"
version: 2
---
# payment/methods/hooks — the barrel that keeps a collection's imports one segment deep

Every hook sibling is re-exported here, so a collection writes `from './hooks'` rather than
naming each file. `encryptSensitiveFields` is the one that matters: payment credentials are
encrypted on the way in, so what the database holds is never the usable secret.

Composes: [[law]].
