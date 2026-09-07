---
name: lot
description: Use when modelling one lot — the singular model of the lots collection (the plural store); a tracked batch of like units produced or handled together.
atomPath: lot
coordinate: "lot · 7/descent · 2a3dfca2"
contentUuid: "d5d9d825-143e-5b17-a07b-d74d71637a5a"
diamondUuid: "7c1d50b1-f495-80fd-ba5d-d662eb944862"
uuid: "2a3dfca2-d4bb-8b71-98d5-ac3cb4902ee3"
horo: 7
typography:
  partition: lot
  bondDegree: 12
standards:
  - "ISA-95"
  - "ISO-22400-2"
  - "UBL-2.1"
bindings: []
signatures:
  computationUuid: "eb68967a-fc51-8cbd-97f0-095b4b796542"
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
      stageUuid: "e52129da-c48e-8488-8e4f-006bb3948698"
    - stage: seal
      stageUuid: "cc1a5d6a-4294-8f36-acc0-5c7983aabd20"
    - stage: uuid
      stageUuid: "a901e93c-5e34-8f90-9a39-ebf8c4c56c0b"
version: 2
---
# lot — the model of one [[lots]] row

A tracked batch of like units produced or handled together. The singular model whose plural store is the [[lots]] collection ([[balance]]: every collection has its model).

**Law — [[law]]: a lot is the singular model of one row — a tracked batch of like units produced or handled together — whose plural store is the [[lots]] collection ([[balance]]: every collection has its model).**

Composes [[lots]] · [[manufacturing]] · [[balance]].
