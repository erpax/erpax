---
name: date
description: "Use when a document carries a temporal point — invoice date, transaction date, period-end date, expiry date, created-at, effective-at. An ISO-8601 datetime pinned at a point in time (the UTC timestamp + timezone context via versions). The temporal positioning twin of period."
atomPath: "vocabulary/date"
coordinate: "vocabulary/date · 7/descent · e9b7cb6f"
contentUuid: "3e896af4-75cb-547d-a771-41fba184364b"
diamondUuid: "f27a652e-1bb4-8955-941c-f08d193fb458"
uuid: "e9b7cb6f-2f4d-8ca8-9112-9d0ea7b9c7f3"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 118
standards: []
bindings: []
signatures:
  computationUuid: "10f2ccc7-3d84-8d5f-9aad-c5537ac19ed1"
  stages:
    - stage: path
      stageUuid: "9a7c6771-dac1-81c6-8efb-e6353854c55e"
    - stage: trinity
      stageUuid: "8bbde114-5f2c-8b08-8f94-62cf623b1333"
    - stage: boundary
      stageUuid: "20855ba7-c107-8246-bb54-a94b49082da4"
    - stage: links
      stageUuid: "44b68593-6323-8d42-a1d1-c4f0312c14ef"
    - stage: horo
      stageUuid: "389bbfd5-cc21-8978-9a3e-e021cf00be93"
    - stage: seal
      stageUuid: "c637e1f0-a44e-85a7-bc87-b662ad54ea8d"
    - stage: uuid
      stageUuid: "e926ef97-561d-8f09-bad1-7be56fc92c86"
version: 2
---
# date

Use when a document carries a temporal point — invoice date, transaction date, period-end date, expiry date, created-at, effective-at. An ISO-8601 datetime pinned at a point in time (the UTC timestamp + timezone context via versions). The temporal positioning twin of period.

Composes: [[identity]] · [[versions]] · [[field]].

## Standards
- ISO-8601-1:2019

**Law — [[law]]: a date is an ISO-8601 datetime pinned at one point in time (UTC timestamp + timezone context via [[versions]]) — the temporal-positioning twin of [[period]].**
