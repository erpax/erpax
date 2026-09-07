---
name: journal
description: Use when modelling one journal — the singular model of the journals collection (the plural store); the chronological book of original accounting entries.
atomPath: journal
coordinate: "journal · 8/crest · fbbdad6a"
contentUuid: "6a991890-9285-5292-8712-e216dcf0df00"
diamondUuid: "d846b944-fbfd-85cb-b06f-742ec40c56a0"
uuid: "fbbdad6a-5f9e-8016-824b-826849b74a44"
horo: 8
typography:
  partition: journal
  bondDegree: 12
standards:
  - "ECMA-262"
  - "IEEE-754"
  - "W3C-PROV-O"
bindings: []
signatures:
  computationUuid: "5fd478f9-bd7b-8f93-8234-3b49c8cee80f"
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
      stageUuid: "17b01700-da46-8895-a955-9cd60d032599"
    - stage: seal
      stageUuid: "f6131edc-b373-889f-94d1-2f42e8a25388"
    - stage: uuid
      stageUuid: "732e5b59-0546-8b58-9dde-0be7b52c2394"
version: 2
---
# journal — the model of one [[journals]] row

The chronological book of original accounting entries. The singular model whose plural store is the [[journals]] collection ([[balance]]: every collection has its model).

Composes [[journals]] · [[accounting]] · [[balance]].

**Law — [[law]]: the journal is the chronological book of original entry — events are recorded in the order they occur and never rewritten, so the journal is the append-only source the ledger is posted from.**
