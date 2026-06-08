---
name: journal
description: Use when modelling one journal — the singular model of the journals collection (the plural store); the chronological book of original accounting entries.
atomPath: journal
coordinate: journal · 1/base · aa5d66c3
contentUuid: "4bec31c7-694d-5d95-a6df-e737c8d7d699"
diamondUuid: "0d824295-fd56-8527-a4ce-fd2a1591e4c8"
uuid: "aa5d66c3-253b-8d5b-ac99-8c8bcbf84570"
horo: 1
bonds:
  in:
    - accounting
    - balance
    - journals
    - law
  out:
    - accounting
    - balance
    - journals
    - law
typography:
  partition: journal
  bondDegree: 0
  neighbors: []
standards:
  - "ECMA-262"
  - "EU-2024/1183"
  - "EU-2024/1620"
  - "EU-2024/1624"
  - "EU-CSDDD-2024/1760"
  - "IEEE-754"
  - "W3C-PROV-O"
bindings: []
neighbors:
  wikilink:
    - accounting
    - balance
    - journals
    - law
  matrix:
    - accounting
    - balance
    - journals
    - law
  backlinks:
    - accounting
    - balance
    - journals
    - law
signatures:
  computationUuid: "43ad7f6a-3f1d-8c37-9e10-508893cec96f"
  stages:
    - stage: path
      stageUuid: "33c93eb0-813f-8b38-8044-062ba60ced27"
    - stage: trinity
      stageUuid: "ef7516bc-2a76-86ff-b2d2-8b017b22fa4f"
    - stage: boundary
      stageUuid: "a480614a-884d-82e5-98ef-55b6de21cb2b"
    - stage: links
      stageUuid: "718412fa-d731-85a7-8937-3be1d6907430"
    - stage: horo
      stageUuid: "29fcfda8-2db3-8a50-b5f2-40405e03f48f"
    - stage: seal
      stageUuid: "de9730a1-caaf-8904-8824-67d84a88a973"
    - stage: uuid
      stageUuid: "5ab97a31-6f00-8835-8a27-c88fd412b9b0"
version: 2
---
# journal — the model of one [[journals]] row

The chronological book of original accounting entries. The singular model whose plural store is the [[journals]] collection ([[balance]]: every collection has its model).

Composes [[journals]] · [[accounting]] · [[balance]].

**Law — [[law]]: the journal is the chronological book of original entry — events are recorded in the order they occur and never rewritten, so the journal is the append-only source the ledger is posted from.**
