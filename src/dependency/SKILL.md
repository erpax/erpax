---
name: dependency
description: Use when modelling one dependency — the singular model of the dependencies collection (the plural store); a relationship where one item requires another.
atomPath: dependency
coordinate: dependency · 5/round · 39296e30
contentUuid: "aa382ff3-a037-5e2a-a4a2-c8373666526d"
diamondUuid: "413b6c14-6ef1-86a4-aa18-a5b3dc1496dd"
uuid: "39296e30-bccb-826a-ad9d-3ea33936b674"
horo: 5
bonds:
  in:
    - balance
    - dependencies
    - reference
  out:
    - balance
    - dependencies
    - reference
typography:
  partition: dependency
  bondDegree: 9
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - balance
    - dependencies
    - reference
  matrix:
    - balance
    - dependencies
    - reference
  backlinks:
    - balance
    - dependencies
    - reference
signatures:
  computationUuid: "99ed0073-6d9e-8e5c-aa8a-4b2524a06069"
  stages:
    - stage: path
      stageUuid: "87356aee-803a-8b3f-94de-2a86faae394a"
    - stage: trinity
      stageUuid: "ab6bf504-9cb3-8116-86ea-6673a389ccda"
    - stage: boundary
      stageUuid: "2c2d0ddf-0fbe-8b15-84a1-59402528c710"
    - stage: links
      stageUuid: "55c1fd1a-3ed6-81cb-b46d-f3c3da0a01ee"
    - stage: horo
      stageUuid: "d0a34dae-b694-8288-89fd-26fc103fb4b4"
    - stage: seal
      stageUuid: "8a880a9b-ee76-8e60-bea7-62a2ef27f80d"
    - stage: uuid
      stageUuid: "ad2a45b2-21a3-8588-97af-75cebab4caa3"
version: 2
---
# dependency — the model of one [[dependencies]] row

A relationship where one item requires another. The singular model whose plural store is the [[dependencies]] collection ([[balance]]: every collection has its model).

Composes [[dependencies]] · [[reference]] · [[balance]].
