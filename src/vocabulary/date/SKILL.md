---
name: date
description: "Use when a document carries a temporal point — invoice date, transaction date, period-end date, expiry date, created-at, effective-at. An ISO-8601 datetime pinned at a point in time (the UTC timestamp + timezone context via versions). The temporal positioning twin of period."
atomPath: "vocabulary/date"
coordinate: "vocabulary/date · 1/base · f3f6ed68"
contentUuid: "ac9955ca-486b-5799-8d5d-5451de21068f"
diamondUuid: "8abbb83d-e92b-8385-a836-ce051616e062"
uuid: "f3f6ed68-5795-8941-861b-8a175826480c"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 118
standards: []
bindings: []
signatures:
  computationUuid: "9db0579b-bcc9-80b9-8c71-d9732757112f"
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
      stageUuid: "d914b94f-ba86-881d-8dd4-42a7af1bf99e"
    - stage: seal
      stageUuid: "c637e1f0-a44e-85a7-bc87-b662ad54ea8d"
    - stage: uuid
      stageUuid: "a8edfda6-b0ef-8008-9525-550cf6bc771c"
version: 2
---
# date

Use when a document carries a temporal point — invoice date, transaction date, period-end date, expiry date, created-at, effective-at. An ISO-8601 datetime pinned at a point in time (the UTC timestamp + timezone context via versions). The temporal positioning twin of period.

Composes: [[identity]] · [[versions]] · [[field]].

## Standards
- ISO-8601-1:2019

**Law — [[law]]: a date is an ISO-8601 datetime pinned at one point in time (UTC timestamp + timezone context via [[versions]]) — the temporal-positioning twin of [[period]].**
