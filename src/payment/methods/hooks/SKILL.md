---
name: hooks
description: "Use when reasoning about hooks — Every hook sibling is re-exported here, so a collection writes rather than naming each file."
atomPath: "payment/methods/hooks"
coordinate: "payment/methods/hooks · 3/3 · e6234c15"
contentUuid: "1c115b8f-6641-56e9-a6a4-381fc78d3027"
diamondUuid: "278cd630-453b-8df4-a6e1-ad7cfd12a3a0"
uuid: "e6234c15-3d1e-8f72-8dc7-fa982d9e0121"
horo: 3
typography:
  partition: payment
  bondDegree: 348
standards:
  - "NIST-SP-800-38D"
bindings: []
signatures:
  computationUuid: "0c5e4902-fa1d-814a-af19-4545a4530509"
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
      stageUuid: "b60107e1-eccb-8aaf-b085-7e9ed4ab8cb6"
    - stage: seal
      stageUuid: "d5c2fc87-3bab-8c33-b9c6-0035e4c30478"
    - stage: uuid
      stageUuid: "591e3473-f684-8578-9ceb-6c1bc3f4a6e6"
version: 2
---
# payment/methods/hooks — the barrel that keeps a collection's imports one segment deep

Every hook sibling is re-exported here, so a collection writes `from './hooks'` rather than
naming each file. `encryptSensitiveFields` is the one that matters: payment credentials are
encrypted on the way in, so what the database holds is never the usable secret.

Composes: [[law]].
