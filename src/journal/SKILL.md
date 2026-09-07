---
name: journal
description: Use when modelling one journal — the singular model of the journals collection (the plural store); the chronological book of original accounting entries.
atomPath: journal
coordinate: "journal · 5/round · 5861fa4f"
contentUuid: "99926d2c-7045-5f0f-a140-ed71da3d0c77"
diamondUuid: "eac36f3f-8af6-8c70-ad85-8faca1344626"
uuid: "5861fa4f-8611-878d-b6cf-700ce71de7dc"
horo: 5
typography:
  partition: journal
  bondDegree: 12
standards:
  - "ECMA-262"
  - "IEEE-754"
  - "W3C-PROV-O"
bindings: []
signatures:
  computationUuid: "b09717ea-1d8b-85d2-a472-1936857977cf"
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
      stageUuid: "a1ab8876-e6fb-8c77-a86a-fd70c765ce96"
    - stage: seal
      stageUuid: "f6131edc-b373-889f-94d1-2f42e8a25388"
    - stage: uuid
      stageUuid: "c7c0f4e7-07ca-8d39-8d73-302a7556defe"
version: 2
---
# journal — the model of one [[journals]] row

The chronological book of original accounting entries. The singular model whose plural store is the [[journals]] collection ([[balance]]: every collection has its model).

Composes [[journals]] · [[accounting]] · [[balance]].

**Law — [[law]]: the journal is the chronological book of original entry — events are recorded in the order they occur and never rewritten, so the journal is the append-only source the ledger is posted from.**
