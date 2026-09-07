---
name: lot
description: Use when modelling one lot — the singular model of the lots collection (the plural store); a tracked batch of like units produced or handled together.
atomPath: lot
coordinate: "lot · 7/descent · c4f8ce80"
contentUuid: "ae15e853-aa45-5791-8419-90bf118be3e9"
diamondUuid: "6a9ea11a-2e50-8a06-a11b-29d2e19944c2"
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
  computationUuid: "ad317f7f-03b7-842f-8886-c6ae98bd9c40"
  stages:
    - stage: path
      stageUuid: "255a1157-5a61-83e0-b255-c02ca1728470"
    - stage: trinity
      stageUuid: "fd5b9f51-c3a7-8e67-a7bc-2e469a17af30"
    - stage: boundary
      stageUuid: "4025160e-14da-8b58-9931-bae6c0b7808d"
    - stage: links
      stageUuid: "5a9a7676-32ba-8aed-b8b7-b55c2429e973"
    - stage: horo
      stageUuid: "1d027b7a-0e8a-862e-99eb-3daad815c48f"
    - stage: seal
      stageUuid: "cc1a5d6a-4294-8f36-acc0-5c7983aabd20"
    - stage: uuid
      stageUuid: "4818cf5f-271a-81f1-9d37-559c29e5752e"
version: 2
---
# lot — the model of one [[lots]] row

A tracked batch of like units produced or handled together. The singular model whose plural store is the [[lots]] collection ([[balance]]: every collection has its model).

**Law — [[law]]: a lot is the singular model of one row — a tracked batch of like units produced or handled together — whose plural store is the [[lots]] collection ([[balance]]: every collection has its model).**

Composes [[lots]] · [[manufacturing]] · [[balance]].
