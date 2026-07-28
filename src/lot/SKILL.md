---
name: lot
description: Use when modelling one lot — the singular model of the lots collection (the plural store); a tracked batch of like units produced or handled together.
atomPath: lot
coordinate: "lot · 4/weave · b4441d0c"
contentUuid: "529579d3-299b-5aa3-a19d-20a55526f7b5"
diamondUuid: "eb282636-c628-8cb5-aec7-3f0d06b40bef"
uuid: "b4441d0c-6a08-869e-ab8a-8731fe4fb978"
horo: 4
bonds:
  in:
    - balance
    - law
    - lots
    - manufacturing
  out:
    - balance
    - law
    - lots
    - manufacturing
typography:
  partition: lot
  bondDegree: 0
  neighbors: []
standards:
  - "ISA-95"
  - "ISO-22400-2"
  - "UBL-2.1"
bindings: []
neighbors:
  wikilink:
    - balance
    - law
    - lots
    - manufacturing
  matrix:
    - balance
    - law
    - lots
    - manufacturing
  backlinks:
    - balance
    - law
    - lots
    - manufacturing
signatures:
  computationUuid: "ae2f0202-531d-8b50-98fa-ef9c16852daf"
  stages:
    - stage: path
      stageUuid: "255a1157-5a61-83e0-b255-c02ca1728470"
    - stage: trinity
      stageUuid: "63bff6de-57f7-8833-a2f9-e49ba38b4d94"
    - stage: boundary
      stageUuid: "c6d7f2f4-4421-8742-a32f-cf157f3d4daa"
    - stage: links
      stageUuid: "46deba50-bf1a-8178-b222-3507cf314284"
    - stage: horo
      stageUuid: "98fe9df0-63f8-828c-871b-37fb69b8954c"
    - stage: seal
      stageUuid: "a9e120f0-7650-8215-91c3-f9dc89c82f65"
    - stage: uuid
      stageUuid: "55ee115a-ce01-86cf-8fa9-7cfef354f80e"
version: 2
---
# lot — the model of one [[lots]] row

A tracked batch of like units produced or handled together. The singular model whose plural store is the [[lots]] collection ([[balance]]: every collection has its model).

**Law — [[law]]: a lot is the singular model of one row — a tracked batch of like units produced or handled together — whose plural store is the [[lots]] collection ([[balance]]: every collection has its model).**

Composes [[lots]] · [[manufacturing]] · [[balance]].
