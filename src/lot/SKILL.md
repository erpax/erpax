---
name: lot
description: Use when modelling one lot — the singular model of the lots collection (the plural store); a tracked batch of like units produced or handled together.
atomPath: lot
coordinate: "lot · 7/descent · c4f8ce80"
contentUuid: "e8ef13da-a1a2-54f4-8707-b6bf31281e55"
diamondUuid: "6c82c62d-3e24-8675-9ec1-a9fce1fe044f"
uuid: "c4f8ce80-faa9-81a0-a242-2c54d9617f19"
horo: 7
typography:
  partition: lot
  bondDegree: 14
standards:
  - "ISA-95"
  - "ISO-22400-2"
  - "UBL-2.1"
bindings: []
signatures:
  computationUuid: "773cb6a3-5fd5-8e42-a3bf-95b6985a82f4"
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
      stageUuid: "1d027b7a-0e8a-862e-99eb-3daad815c48f"
    - stage: seal
      stageUuid: "cc1a5d6a-4294-8f36-acc0-5c7983aabd20"
    - stage: uuid
      stageUuid: "b091a28f-6612-88e9-93a8-35d2cd7c9daf"
version: 2
---
# lot — the model of one [[lots]] row

A tracked batch of like units produced or handled together. The singular model whose plural store is the [[lots]] collection ([[balance]]: every collection has its model).

**Law — [[law]]: a lot is the singular model of one row — a tracked batch of like units produced or handled together — whose plural store is the [[lots]] collection ([[balance]]: every collection has its model).**

Composes [[lots]] · [[manufacturing]] · [[balance]].
