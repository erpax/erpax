---
name: hooks
description: "Use when reasoning about hooks — Every hook sibling is re-exported here, so a collection writes rather than naming each file."
atomPath: "payment/methods/hooks"
coordinate: "payment/methods/hooks · 9/unity · 34147f12"
contentUuid: "18391033-befe-5d04-b7f6-daa051b0223f"
diamondUuid: "1ce3386d-cd08-84cf-9070-971edb3bf405"
uuid: "34147f12-80c7-87b5-a997-df324a84d1f3"
horo: 9
typography:
  partition: payment
  bondDegree: 312
standards:
  - "NIST-SP-800-38D"
bindings: []
signatures:
  computationUuid: "a8984281-c667-88d8-a26e-8ca76c1f474a"
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
      stageUuid: "23bd490f-5c64-8e33-ba4e-961611c49241"
    - stage: seal
      stageUuid: "d5c2fc87-3bab-8c33-b9c6-0035e4c30478"
    - stage: uuid
      stageUuid: "c93662a5-8245-8ccf-91bc-3b2118e94664"
version: 2
---
# payment/methods/hooks — the barrel that keeps a collection's imports one segment deep

Every hook sibling is re-exported here, so a collection writes `from './hooks'` rather than
naming each file. `encryptSensitiveFields` is the one that matters: payment credentials are
encrypted on the way in, so what the database holds is never the usable secret.

Composes: [[law]].
