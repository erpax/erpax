---
name: lot
description: Use when modelling one lot — the singular model of the lots collection (the plural store); a tracked batch of like units produced or handled together.
atomPath: lot
coordinate: lot · 8/crest · 3a5e6642
contentUuid: "cd5249c2-9241-5c4a-9294-31ee3ef17eac"
diamondUuid: "d781dbd5-2ff0-86c7-a491-9f67fc5e150e"
uuid: "3a5e6642-d721-8b13-9b07-cbdd2d44ba7e"
horo: 8
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
  - "EU-2014/55"
  - "EU-537/2014"
  - "EU-910/2014"
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
  computationUuid: "11408b58-a419-863a-aae1-ea3f46c25e41"
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
      stageUuid: "cddf0fb7-0843-89a7-91ed-0de690a87220"
    - stage: seal
      stageUuid: "a9e120f0-7650-8215-91c3-f9dc89c82f65"
    - stage: uuid
      stageUuid: "56c98946-558b-8e9d-867c-2ef303311883"
version: 2
---
# lot — the model of one [[lots]] row

A tracked batch of like units produced or handled together. The singular model whose plural store is the [[lots]] collection ([[balance]]: every collection has its model).

**Law — [[law]]: a lot is the singular model of one row — a tracked batch of like units produced or handled together — whose plural store is the [[lots]] collection ([[balance]]: every collection has its model).**

Composes [[lots]] · [[manufacturing]] · [[balance]].
