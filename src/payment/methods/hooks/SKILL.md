---
name: hooks
description: "Use when reasoning about hooks — Every hook sibling is re-exported here, so a collection writes rather than naming each file."
atomPath: "payment/methods/hooks"
coordinate: "payment/methods/hooks · 9/unity · 8c60d6e9"
contentUuid: "55ef3564-ad8c-570f-903d-dcedcd17d596"
diamondUuid: "58728378-27f4-8659-aae2-5794a1381355"
uuid: "8c60d6e9-d37b-89f8-bb2b-4d6128259465"
horo: 9
typography:
  partition: payment
  bondDegree: 297
standards:
  - "NIST-SP-800-38D"
bindings: []
signatures:
  computationUuid: "4435a215-1542-8c13-bb1f-1871d8f69714"
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
      stageUuid: "eb1d5dcc-7f90-8b0d-949f-92e808f039b9"
    - stage: seal
      stageUuid: "d5c2fc87-3bab-8c33-b9c6-0035e4c30478"
    - stage: uuid
      stageUuid: "483362a1-b32f-8afb-a22d-1ab348886262"
version: 2
---
# payment/methods/hooks — the barrel that keeps a collection's imports one segment deep

Every hook sibling is re-exported here, so a collection writes `from './hooks'` rather than
naming each file. `encryptSensitiveFields` is the one that matters: payment credentials are
encrypted on the way in, so what the database holds is never the usable secret.

Composes: [[law]].
