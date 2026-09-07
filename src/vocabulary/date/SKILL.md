---
name: date
description: "Use when a document carries a temporal point — invoice date, transaction date, period-end date, expiry date, created-at, effective-at. An ISO-8601 datetime pinned at a point in time (the UTC timestamp + timezone context via versions). The temporal positioning twin of period."
atomPath: "vocabulary/date"
coordinate: "vocabulary/date · 1/base · 80003af4"
contentUuid: "4f0a02d6-dc19-5a7f-93f2-1ab99016ae85"
diamondUuid: "66f32412-bc62-807f-8f9b-4c371134f970"
uuid: "80003af4-4b25-8bae-a285-d068176cd851"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 116
standards: []
bindings: []
signatures:
  computationUuid: "444ba4d4-aee4-88e5-9772-fb732d5d87e0"
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
      stageUuid: "c749cc8d-5fbd-8331-a5c6-a02083e2e52a"
    - stage: seal
      stageUuid: "c637e1f0-a44e-85a7-bc87-b662ad54ea8d"
    - stage: uuid
      stageUuid: "c8236dd4-8e62-8bc7-9acc-4de30131679b"
version: 2
---
# date

Use when a document carries a temporal point — invoice date, transaction date, period-end date, expiry date, created-at, effective-at. An ISO-8601 datetime pinned at a point in time (the UTC timestamp + timezone context via versions). The temporal positioning twin of period.

Composes: [[identity]] · [[versions]] · [[field]].

## Standards
- ISO-8601-1:2019

**Law — [[law]]: a date is an ISO-8601 datetime pinned at one point in time (UTC timestamp + timezone context via [[versions]]) — the temporal-positioning twin of [[period]].**
