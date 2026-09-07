---
name: lot
description: Use when modelling one lot — the singular model of the lots collection (the plural store); a tracked batch of like units produced or handled together.
atomPath: lot
coordinate: "lot · 8/crest · 7fbcab56"
contentUuid: "128f9d56-7175-5301-8994-ae853df78683"
diamondUuid: "ac89a9e7-8af2-80c8-b7cb-c1874fada12b"
uuid: "7fbcab56-129a-810b-bd9d-45572b8c7b8d"
horo: 8
typography:
  partition: lot
  bondDegree: 12
standards:
  - "ISA-95"
  - "ISO-22400-2"
  - "UBL-2.1"
bindings: []
signatures:
  computationUuid: "e2c52b87-5ef0-86c8-9a7b-9edef5959b0b"
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
      stageUuid: "5c5dc1b0-df8c-8ba8-80f0-ddeaf16761a6"
    - stage: seal
      stageUuid: "cc1a5d6a-4294-8f36-acc0-5c7983aabd20"
    - stage: uuid
      stageUuid: "6920294e-2096-85b8-99b6-0cfef0c6297f"
version: 2
---
# lot — the model of one [[lots]] row

A tracked batch of like units produced or handled together. The singular model whose plural store is the [[lots]] collection ([[balance]]: every collection has its model).

**Law — [[law]]: a lot is the singular model of one row — a tracked batch of like units produced or handled together — whose plural store is the [[lots]] collection ([[balance]]: every collection has its model).**

Composes [[lots]] · [[manufacturing]] · [[balance]].
