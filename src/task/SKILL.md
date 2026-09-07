---
name: task
description: Use when modelling one task — the singular model of the tasks collection (the plural store); a unit of work to be completed by an actor.
atomPath: task
coordinate: "task · 5/round · e91327b5"
contentUuid: "ba3f459e-fed3-5809-bba7-cb19c14cc1b3"
diamondUuid: "31c75e84-b927-8753-9d0e-0c7017a07e32"
uuid: "e91327b5-7077-834d-9b7a-2c0b10a96980"
horo: 5
typography:
  partition: task
  bondDegree: 13
standards: []
bindings: []
signatures:
  computationUuid: "9b857417-d717-89fa-a5b4-e1dafca6492e"
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
      stageUuid: "f030bb33-fda9-89c4-b504-c959dda1d8eb"
    - stage: seal
      stageUuid: "8cbbdb3b-dd35-8949-ad90-bb0f84095b20"
    - stage: uuid
      stageUuid: "341c7331-6daa-87eb-9608-23054738dda0"
version: 2
---
# task — the model of one [[tasks]] row

A unit of work to be completed by an actor. The singular model whose plural store is the [[tasks]] collection ([[balance]]: every collection has its model).

Composes [[tasks]] · [[work]] · [[balance]].

**Law — [[law]]: one task is the singular model of one tasks row — a unit of [[work]] to be completed by an actor; every collection has its model ([[balance]]).**
