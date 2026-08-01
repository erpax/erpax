---
name: date
description: "Use when a document carries a temporal point — invoice date, transaction date, period-end date, expiry date, created-at, effective-at. An ISO-8601 datetime pinned at a point in time (the UTC timestamp + timezone context via versions). The temporal positioning twin of period."
atomPath: "vocabulary/date"
coordinate: "vocabulary/date · 8/crest · 878babff"
contentUuid: "f5bc3701-5f93-50de-9d26-850beb5e1367"
diamondUuid: "4101b04a-8968-8d37-b19f-e541301050f7"
uuid: "878babff-1931-8507-a01c-4bd43036d602"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 118
standards: []
bindings: []
signatures:
  computationUuid: "f8ffcaf0-7621-8988-a861-1502e017af9a"
  stages:
    - stage: path
      stageUuid: "9a7c6771-dac1-81c6-8efb-e6353854c55e"
    - stage: trinity
      stageUuid: "8bbde114-5f2c-8b08-8f94-62cf623b1333"
    - stage: boundary
      stageUuid: "3b7e124f-b233-87ea-b755-d17aa6e4ed7d"
    - stage: links
      stageUuid: "dcf30ea3-c811-8148-a5a0-f2cb95692d9a"
    - stage: horo
      stageUuid: "e1a5863a-7d9a-85a3-93ce-786ad56e3140"
    - stage: seal
      stageUuid: "2ea8497b-bd9f-876a-9a15-040fd81957c0"
    - stage: uuid
      stageUuid: "70eee30f-f964-881c-bd45-185c1ca5098e"
version: 2
---
# date

Use when a document carries a temporal point — invoice date, transaction date, period-end date, expiry date, created-at, effective-at. An ISO-8601 datetime pinned at a point in time (the UTC timestamp + timezone context via versions). The temporal positioning twin of period.

Composes: [[identity]] · [[versions]] · [[fields]].

## Standards
- ISO-8601-1:2019

**Law — [[law]]: a date is an ISO-8601 datetime pinned at one point in time (UTC timestamp + timezone context via [[versions]]) — the temporal-positioning twin of [[period]].**
