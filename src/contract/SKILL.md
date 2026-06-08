---
name: contract
description: Use when modelling one contract — the singular model of the contracts collection (the plural store); a legally binding agreement between parties.
atomPath: contract
coordinate: contract · 5/round · f88c4370
contentUuid: "1a032860-2a1a-57a0-8b93-3d1a7c59bad9"
diamondUuid: "551de4e8-6fe2-86e3-b15d-7745968b6372"
uuid: "f88c4370-a82f-8cad-9c09-03711081c04a"
horo: 5
bonds:
  in:
    - balance
    - contracts
    - law
    - legal
  out:
    - balance
    - contracts
    - law
    - legal
typography:
  partition: contract
  bondDegree: 12
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - balance
    - contracts
    - law
    - legal
  matrix:
    - balance
    - contracts
    - law
    - legal
  backlinks:
    - balance
    - contracts
    - law
    - legal
signatures:
  computationUuid: "64762b6c-d7ce-88ac-96ea-356eb5a29ed0"
  stages:
    - stage: path
      stageUuid: "9dfcabb2-b46f-895d-ae4e-ab396f4e3538"
    - stage: trinity
      stageUuid: "e8f9b902-1cbc-80fd-8436-378b0f46bdca"
    - stage: boundary
      stageUuid: "f13a0680-ad81-8bc1-9d96-f0a4badb9d94"
    - stage: links
      stageUuid: "864e0992-3cb1-88a5-9e4d-13867fb23a0d"
    - stage: horo
      stageUuid: "d6a288b9-f219-8999-a014-d739991b239f"
    - stage: seal
      stageUuid: "f6af3955-64fe-86cb-bdc6-1842ac0bbf49"
    - stage: uuid
      stageUuid: "386dd87e-7889-8cc5-b009-0372da36a805"
version: 2
---
# contract — the model of one [[contracts]] row

A legally binding agreement between parties. The singular model whose plural store is the [[contracts]] collection ([[balance]]: every collection has its model).

Composes [[contracts]] · [[legal]] · [[balance]].

**Law — [[law]]: one contract is the singular model of exactly one contracts row — a legally binding agreement between parties; every collection has its model ([[balance]]).**
