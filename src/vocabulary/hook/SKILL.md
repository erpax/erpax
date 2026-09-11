---
name: hook
description: Use when modelling one hook — the singular model of the hooks collection (the plural store); a lifecycle gateway where logic runs on a record event.
atomPath: "vocabulary/hook"
coordinate: "vocabulary/hook · 1/base · a38ba825"
contentUuid: "db3ea677-0956-53dd-bf55-8fb886226aa9"
diamondUuid: "3c9bc9e3-c37e-84a9-9d0b-486dfb5ba36e"
uuid: "a38ba825-ca9a-8e65-98a8-be77fabd1159"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "d456700e-ff07-89d7-b5d6-879008f366d1"
  stages:
    - stage: path
      stageUuid: "4664f217-4485-874f-885e-5f75d5089e1f"
    - stage: trinity
      stageUuid: "1df4e9f3-90fa-8dd8-b88d-1216554b24d4"
    - stage: boundary
      stageUuid: "39718cca-8ac8-8abd-8eae-3cef59b7eb09"
    - stage: links
      stageUuid: "c8effbd0-ba42-8c7f-a3ea-d339b276a63f"
    - stage: horo
      stageUuid: "9aee9d67-d0d0-838c-8fa8-efb18506451f"
    - stage: seal
      stageUuid: "ed06fb86-7f1c-80e3-b6fc-d63671eb50ac"
    - stage: uuid
      stageUuid: "ddaf2f95-dfcd-8436-82b4-ae3e90a18f3a"
version: 2
---
# hook — the model of one [[hooks]] row

A lifecycle gateway where logic runs on a record event. The singular model whose plural store is the [[hooks]] collection ([[balance]]: every collection has its model).

Composes [[hooks]] · [[event]] · [[balance]].

**Law — [[law]]: a hook is the one place logic runs on a record event — the singular model whose plural store is the [[hooks]] collection, so behaviour lives through the lifecycle gateway, never scattered ([[balance]]: every collection has its model).**
