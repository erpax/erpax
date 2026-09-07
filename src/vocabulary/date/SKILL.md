---
name: date
description: "Use when a document carries a temporal point — invoice date, transaction date, period-end date, expiry date, created-at, effective-at. An ISO-8601 datetime pinned at a point in time (the UTC timestamp + timezone context via versions). The temporal positioning twin of period."
atomPath: "vocabulary/date"
coordinate: "vocabulary/date · 5/round · c0701ff9"
contentUuid: "fc1b0e76-100e-5c99-9e18-cafec0eb4459"
diamondUuid: "1203db75-a717-8d3b-9e69-fa162b206fe1"
uuid: "c0701ff9-c84c-8006-a2fc-a645f20dcf2a"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 116
standards: []
bindings: []
signatures:
  computationUuid: "059f9f7b-5c64-86d3-8f7d-2ac150dd7d57"
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
      stageUuid: "f75fc867-8146-81be-9f41-bc1187a89c9a"
    - stage: seal
      stageUuid: "c637e1f0-a44e-85a7-bc87-b662ad54ea8d"
    - stage: uuid
      stageUuid: "7cec8c40-c155-8841-acea-2af9f9ea95db"
version: 2
---
# date

Use when a document carries a temporal point — invoice date, transaction date, period-end date, expiry date, created-at, effective-at. An ISO-8601 datetime pinned at a point in time (the UTC timestamp + timezone context via versions). The temporal positioning twin of period.

Composes: [[identity]] · [[versions]] · [[field]].

## Standards
- ISO-8601-1:2019

**Law — [[law]]: a date is an ISO-8601 datetime pinned at one point in time (UTC timestamp + timezone context via [[versions]]) — the temporal-positioning twin of [[period]].**
