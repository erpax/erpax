---
name: lot
description: Use when modelling one lot — the singular model of the lots collection (the plural store); a tracked batch of like units produced or handled together.
atomPath: lot
coordinate: "lot · 5/round · e3601954"
contentUuid: "c100e244-31cf-59c5-ba1a-0fc9fcb0c047"
diamondUuid: "d6944b44-95e7-8880-951e-18b638b69523"
uuid: "e3601954-4990-84f0-b6d2-3b6dcd15b7d3"
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
  computationUuid: "23bb4f3b-63c8-84ed-b233-ae196a2d7aeb"
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
      stageUuid: "cac2e9ea-01c1-81e2-86f0-52deceabd611"
    - stage: seal
      stageUuid: "cc1a5d6a-4294-8f36-acc0-5c7983aabd20"
    - stage: uuid
      stageUuid: "69deb9bc-ea23-8453-9810-2cea5ba86d51"
version: 2
---
# lot — the model of one [[lots]] row

A tracked batch of like units produced or handled together. The singular model whose plural store is the [[lots]] collection ([[balance]]: every collection has its model).

**Law — [[law]]: a lot is the singular model of one row — a tracked batch of like units produced or handled together — whose plural store is the [[lots]] collection ([[balance]]: every collection has its model).**

Composes [[lots]] · [[manufacturing]] · [[balance]].
