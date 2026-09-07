---
name: task
description: Use when modelling one task — the singular model of the tasks collection (the plural store); a unit of work to be completed by an actor.
atomPath: task
coordinate: "task · 5/round · 3514d068"
contentUuid: "33874408-2056-5f6d-a613-c6afb6499e93"
diamondUuid: "a588bd80-e498-85dd-abe1-e4a94812d09c"
uuid: "3514d068-f7ce-8308-a32b-cdccb0ec39da"
horo: 5
typography:
  partition: task
  bondDegree: 13
standards: []
bindings: []
signatures:
  computationUuid: "6356602f-a95e-85be-bf1f-09787e49ca15"
  stages:
    - stage: path
      stageUuid: "7788cd4d-00a6-825b-8bea-e7ffba6e30ba"
    - stage: trinity
      stageUuid: "d277cb81-9b21-8e83-8223-4df0b6bfa871"
    - stage: boundary
      stageUuid: "132f41b9-ed95-8292-af27-97543b0ec4a6"
    - stage: links
      stageUuid: "818df5bb-f0a1-851c-9e10-22fafeb009be"
    - stage: horo
      stageUuid: "3c1b52e8-ecbe-8e2c-b1f1-6ba2be7f427c"
    - stage: seal
      stageUuid: "8cbbdb3b-dd35-8949-ad90-bb0f84095b20"
    - stage: uuid
      stageUuid: "d6a6dfa3-4c61-8ab5-b29d-5fa808cf02fc"
version: 2
---
# task — the model of one [[tasks]] row

A unit of work to be completed by an actor. The singular model whose plural store is the [[tasks]] collection ([[balance]]: every collection has its model).

Composes [[tasks]] · [[work]] · [[balance]].

**Law — [[law]]: one task is the singular model of one tasks row — a unit of [[work]] to be completed by an actor; every collection has its model ([[balance]]).**
