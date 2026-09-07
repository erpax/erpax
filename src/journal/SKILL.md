---
name: journal
description: Use when modelling one journal — the singular model of the journals collection (the plural store); the chronological book of original accounting entries.
atomPath: journal
coordinate: "journal · 7/descent · 93b688df"
contentUuid: "945b32b7-37ae-5fc7-9584-a0725fdf1fbe"
diamondUuid: "79aad227-cfb3-8035-9128-f3b4ce68ef17"
uuid: "93b688df-dd24-8b90-876c-081fb237d6a5"
horo: 7
typography:
  partition: journal
  bondDegree: 12
standards:
  - "ECMA-262"
  - "IEEE-754"
  - "W3C-PROV-O"
bindings: []
signatures:
  computationUuid: "97668d6d-552e-8b60-a827-726b94a00902"
  stages:
    - stage: path
      stageUuid: "33c93eb0-813f-8b38-8044-062ba60ced27"
    - stage: trinity
      stageUuid: "4a1669bc-ebfd-86c5-9310-6b5a565a7cef"
    - stage: boundary
      stageUuid: "1de9ecb9-3a2d-838a-b46c-ebfbc5f24089"
    - stage: links
      stageUuid: "718412fa-d731-85a7-8937-3be1d6907430"
    - stage: horo
      stageUuid: "64de5595-78e4-8a8b-8ec0-35914941070d"
    - stage: seal
      stageUuid: "f6131edc-b373-889f-94d1-2f42e8a25388"
    - stage: uuid
      stageUuid: "5425fc9d-17fb-8da2-9624-33099275d88a"
version: 2
---
# journal — the model of one [[journals]] row

The chronological book of original accounting entries. The singular model whose plural store is the [[journals]] collection ([[balance]]: every collection has its model).

Composes [[journals]] · [[accounting]] · [[balance]].

**Law — [[law]]: the journal is the chronological book of original entry — events are recorded in the order they occur and never rewritten, so the journal is the append-only source the ledger is posted from.**
