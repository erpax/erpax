---
name: date
description: "Use when a document carries a temporal point — invoice date, transaction date, period-end date, expiry date, created-at, effective-at. An ISO-8601 datetime pinned at a point in time (the UTC timestamp + timezone context via versions). The temporal positioning twin of period."
atomPath: "vocabulary/date"
coordinate: "vocabulary/date · 8/crest · 4ba13bba"
contentUuid: "70292775-7439-54df-8518-00d60b649dd1"
diamondUuid: "ac3f73dd-0e43-86d8-a716-7e9e4d1be387"
uuid: "4ba13bba-d5eb-8575-b4eb-6358e12a0ea1"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 118
standards: []
bindings: []
signatures:
  computationUuid: "d59bccee-be72-8ef7-8b63-cb6a6213219b"
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
      stageUuid: "39873036-a192-8c01-a5e6-9cc41cb91b57"
    - stage: seal
      stageUuid: "c637e1f0-a44e-85a7-bc87-b662ad54ea8d"
    - stage: uuid
      stageUuid: "8fb4f8ab-a641-8772-b024-d56395657a3c"
version: 2
---
# date

Use when a document carries a temporal point — invoice date, transaction date, period-end date, expiry date, created-at, effective-at. An ISO-8601 datetime pinned at a point in time (the UTC timestamp + timezone context via versions). The temporal positioning twin of period.

Composes: [[identity]] · [[versions]] · [[field]].

## Standards
- ISO-8601-1:2019

**Law — [[law]]: a date is an ISO-8601 datetime pinned at one point in time (UTC timestamp + timezone context via [[versions]]) — the temporal-positioning twin of [[period]].**
