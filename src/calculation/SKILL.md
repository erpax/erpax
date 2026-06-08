---
name: calculation
description: Use when modelling one calculation — the singular model of the calculations collection (the plural store); a computed numeric result derived from inputs.
atomPath: calculation
coordinate: calculation · 5/round · 3a09d447
contentUuid: "b12d5f7d-6e44-573c-926a-9463555d0d56"
diamondUuid: "23a59a59-a14c-8a28-a546-ae07d08f6e65"
uuid: "3a09d447-90fa-85b6-9214-a07139a6e79f"
horo: 5
bonds:
  in:
    - balance
    - calculations
    - math
  out:
    - balance
    - calculations
    - math
typography:
  partition: calculation
  bondDegree: 9
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - balance
    - calculations
    - math
  matrix:
    - balance
    - calculations
    - math
  backlinks:
    - balance
    - calculations
    - math
signatures:
  computationUuid: "5ece4846-b5d2-8221-9d96-bd9c394c996b"
  stages:
    - stage: path
      stageUuid: "20059d85-4d2c-8ff1-b8a8-caa005e5bec7"
    - stage: trinity
      stageUuid: "ee8124ce-dc48-8cd8-b1bd-2e4c579f6104"
    - stage: boundary
      stageUuid: "5abbc696-66dc-844d-bab0-9df05dabf3ae"
    - stage: links
      stageUuid: "b2cdc81d-5983-89ad-9dfd-3f82463fe7e0"
    - stage: horo
      stageUuid: "7ff29389-4c87-8ea7-8a9f-cc525aa45f94"
    - stage: seal
      stageUuid: "dbdb1203-e035-853a-83c5-057c48719be0"
    - stage: uuid
      stageUuid: "a7a102a8-2663-8c7a-9687-5551d18cbc48"
version: 2
---
# calculation — the model of one [[calculations]] row

A computed numeric result derived from inputs. The singular model whose plural store is the [[calculations]] collection ([[balance]]: every collection has its model).

Composes [[calculations]] · [[math]] · [[balance]].
