---
name: hooks
description: "Use when reasoning about hooks — Every hook sibling is re-exported here, so a collection writes rather than naming each file."
atomPath: "payment/methods/hooks"
coordinate: "payment/methods/hooks · 6/6 · 919d689d"
contentUuid: "b333bc8d-27fd-52fb-8f2e-4b6c2be95a85"
diamondUuid: "067478e7-0e33-83e2-886c-9f4aa8ac6cbb"
uuid: "919d689d-3985-83ef-ad35-af7ea4a122b3"
horo: 6
typography:
  partition: payment
  bondDegree: 348
standards:
  - "NIST-SP-800-38D"
bindings: []
signatures:
  computationUuid: "44d43456-7dec-8e72-a5af-7d8e49accdf5"
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
      stageUuid: "5d6d28d8-2a97-8e8c-ac75-42243059137a"
    - stage: seal
      stageUuid: "d5c2fc87-3bab-8c33-b9c6-0035e4c30478"
    - stage: uuid
      stageUuid: "07d8bc6a-6814-86ea-a384-43a5927915ae"
version: 2
---
# payment/methods/hooks — the barrel that keeps a collection's imports one segment deep

Every hook sibling is re-exported here, so a collection writes `from './hooks'` rather than
naming each file. `encryptSensitiveFields` is the one that matters: payment credentials are
encrypted on the way in, so what the database holds is never the usable secret.

Composes: [[law]].
