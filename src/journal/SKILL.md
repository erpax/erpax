---
name: journal
description: Use when modelling one journal — the singular model of the journals collection (the plural store); the chronological book of original accounting entries.
atomPath: journal
coordinate: "journal · 8/crest · e917cb5d"
contentUuid: "ea01bfd2-4254-55d0-a4f7-627e462036f4"
diamondUuid: "7ee8adea-c376-852e-81e6-554ff6d50442"
uuid: "e917cb5d-f616-8943-9384-d787f4889628"
horo: 8
typography:
  partition: journal
  bondDegree: 18
standards:
  - "ECMA-262"
  - "IEEE-754"
bindings: []
signatures:
  computationUuid: "dd9f50f2-5f21-80be-b864-2cb1539d9a29"
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
      stageUuid: "b827cdec-9531-8eac-a808-5bb58fc03bba"
    - stage: seal
      stageUuid: "f6131edc-b373-889f-94d1-2f42e8a25388"
    - stage: uuid
      stageUuid: "3c51c367-e54a-8d05-9f24-439412b9490e"
version: 2
---
# journal — the model of one [[journals]] row

The chronological book of original accounting entries. The singular model whose plural store is the [[journals]] collection ([[balance]]: every collection has its model).

Composes [[journals]] · [[accounting]] · [[balance]].

**Law — [[law]]: the journal is the chronological book of original entry — events are recorded in the order they occur and never rewritten, so the journal is the append-only source the ledger is posted from.**
