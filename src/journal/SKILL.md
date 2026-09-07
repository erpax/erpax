---
name: journal
description: Use when modelling one journal — the singular model of the journals collection (the plural store); the chronological book of original accounting entries.
atomPath: journal
coordinate: "journal · 4/weave · 39d8568b"
contentUuid: "3fafa6ba-41e7-53b7-934d-1f5b7d63f187"
diamondUuid: "62b823b5-1d14-8c75-83d7-8e19d40737a0"
uuid: "39d8568b-7d93-8061-8a50-ac7f264c6f0b"
horo: 4
typography:
  partition: journal
  bondDegree: 12
standards:
  - "ECMA-262"
  - "IEEE-754"
  - "W3C-PROV-O"
bindings: []
signatures:
  computationUuid: "a13d4c72-c0c9-8286-a507-23393ccbf02b"
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
      stageUuid: "36d7de2b-ef54-80c5-9f3b-b44b6dde68cd"
    - stage: seal
      stageUuid: "f6131edc-b373-889f-94d1-2f42e8a25388"
    - stage: uuid
      stageUuid: "e4ea2c27-79c8-8a14-b177-63c7df02444d"
version: 2
---
# journal — the model of one [[journals]] row

The chronological book of original accounting entries. The singular model whose plural store is the [[journals]] collection ([[balance]]: every collection has its model).

Composes [[journals]] · [[accounting]] · [[balance]].

**Law — [[law]]: the journal is the chronological book of original entry — events are recorded in the order they occur and never rewritten, so the journal is the append-only source the ledger is posted from.**
