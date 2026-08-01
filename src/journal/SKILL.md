---
name: journal
description: Use when modelling one journal — the singular model of the journals collection (the plural store); the chronological book of original accounting entries.
atomPath: journal
coordinate: "journal · 2/share · 6b5a0710"
contentUuid: "26c2abd5-1c4e-582c-9cff-51870ad6866b"
diamondUuid: "9857b525-67a6-8ef1-8feb-af324999b6a9"
uuid: "6b5a0710-ade5-8ecc-9590-3c8b25e32633"
horo: 2
typography:
  partition: journal
  bondDegree: 0
standards:
  - "ECMA-262"
  - "IEEE-754"
  - "W3C-PROV-O"
bindings: []
signatures:
  computationUuid: "0372133e-2271-8e82-a9f4-78becad15d25"
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
      stageUuid: "ba3588a0-a5bb-89b4-b970-aa5fb2ae46c7"
    - stage: seal
      stageUuid: "de9730a1-caaf-8904-8824-67d84a88a973"
    - stage: uuid
      stageUuid: "c6c3c0aa-27c4-8599-bf55-6308f9854fe0"
version: 2
---
# journal — the model of one [[journals]] row

The chronological book of original accounting entries. The singular model whose plural store is the [[journals]] collection ([[balance]]: every collection has its model).

Composes [[journals]] · [[accounting]] · [[balance]].

**Law — [[law]]: the journal is the chronological book of original entry — events are recorded in the order they occur and never rewritten, so the journal is the append-only source the ledger is posted from.**
