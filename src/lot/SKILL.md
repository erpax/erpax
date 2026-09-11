---
name: lot
description: Use when modelling one lot — the singular model of the lots collection (the plural store); a tracked batch of like units produced or handled together.
atomPath: lot
coordinate: "lot · 5/round · 59ccc2bc"
contentUuid: "7ab969fb-466c-52b1-bbba-3db2083f8efa"
diamondUuid: "561294a9-faa9-8e56-a1d1-18736dc92cff"
uuid: "59ccc2bc-98ac-8e16-8710-d7566bb4518c"
horo: 5
typography:
  partition: lot
  bondDegree: 12
standards:
  - "ISA-95"
  - "ISO-22400-2"
  - "UBL-2.1"
bindings: []
signatures:
  computationUuid: "ba910000-7906-8ada-af18-543d810fcf2a"
  stages:
    - stage: path
      stageUuid: "255a1157-5a61-83e0-b255-c02ca1728470"
    - stage: trinity
      stageUuid: "fd5b9f51-c3a7-8e67-a7bc-2e469a17af30"
    - stage: boundary
      stageUuid: "4025160e-14da-8b58-9931-bae6c0b7808d"
    - stage: links
      stageUuid: "46deba50-bf1a-8178-b222-3507cf314284"
    - stage: horo
      stageUuid: "61a6c0ad-841c-87c4-a6e9-848bfb88386a"
    - stage: seal
      stageUuid: "cc1a5d6a-4294-8f36-acc0-5c7983aabd20"
    - stage: uuid
      stageUuid: "abcf47db-d217-899b-894f-3be73229e051"
version: 2
---
# lot — the model of one [[lots]] row

A tracked batch of like units produced or handled together. The singular model whose plural store is the [[lots]] collection ([[balance]]: every collection has its model).

**Law — [[law]]: a lot is the singular model of one row — a tracked batch of like units produced or handled together — whose plural store is the [[lots]] collection ([[balance]]: every collection has its model).**

Composes [[lots]] · [[manufacturing]] · [[balance]].
