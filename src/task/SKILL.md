---
name: task
description: Use when modelling one task — the singular model of the tasks collection (the plural store); a unit of work to be completed by an actor.
atomPath: task
coordinate: "task · 5/round · a5a7f44b"
contentUuid: "cb516416-2581-5263-ad37-5e8543eaaf08"
diamondUuid: "2c605f07-2a66-8e43-a0f4-42a47b70a7d8"
uuid: "a5a7f44b-951a-8333-9924-b398c68b183c"
horo: 5
typography:
  partition: task
  bondDegree: 13
standards: []
bindings: []
signatures:
  computationUuid: "c2f0691b-a5cb-8dd4-a23e-5eaae41b2774"
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
      stageUuid: "a83a2be4-e7b4-8821-9eb2-6889f4094f85"
    - stage: seal
      stageUuid: "8cbbdb3b-dd35-8949-ad90-bb0f84095b20"
    - stage: uuid
      stageUuid: "c5d07e02-72e5-8db3-9d43-98869709bfab"
version: 2
---
# task — the model of one [[tasks]] row

A unit of work to be completed by an actor. The singular model whose plural store is the [[tasks]] collection ([[balance]]: every collection has its model).

Composes [[tasks]] · [[work]] · [[balance]].

**Law — [[law]]: one task is the singular model of one tasks row — a unit of [[work]] to be completed by an actor; every collection has its model ([[balance]]).**
