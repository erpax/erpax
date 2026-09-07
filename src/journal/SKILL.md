---
name: journal
description: Use when modelling one journal — the singular model of the journals collection (the plural store); the chronological book of original accounting entries.
atomPath: journal
coordinate: "journal · 1/base · 84601a9c"
contentUuid: "49e3c611-6ecc-5bc3-b934-c57c37650e44"
diamondUuid: "bbe78843-3cb4-8755-9f81-48a7a5bacf21"
uuid: "84601a9c-e864-8e82-86e4-e8110b272fae"
horo: 1
typography:
  partition: journal
  bondDegree: 12
standards:
  - "ECMA-262"
  - "IEEE-754"
  - "W3C-PROV-O"
bindings: []
signatures:
  computationUuid: "67fc8c7c-5c83-8239-8fee-dc05ceffe713"
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
      stageUuid: "335253d2-d8d7-80e3-aae3-a7badc3979dd"
    - stage: seal
      stageUuid: "f6131edc-b373-889f-94d1-2f42e8a25388"
    - stage: uuid
      stageUuid: "b6075ba8-547d-84e1-95d3-c2ad90f0847e"
version: 2
---
# journal — the model of one [[journals]] row

The chronological book of original accounting entries. The singular model whose plural store is the [[journals]] collection ([[balance]]: every collection has its model).

Composes [[journals]] · [[accounting]] · [[balance]].

**Law — [[law]]: the journal is the chronological book of original entry — events are recorded in the order they occur and never rewritten, so the journal is the append-only source the ledger is posted from.**
