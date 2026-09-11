---
name: task
description: Use when modelling one task — the singular model of the tasks collection (the plural store); a unit of work to be completed by an actor.
atomPath: task
coordinate: "task · 5/round · 91f342c0"
contentUuid: "aba16471-acea-5cba-8fdb-5d93a6878713"
diamondUuid: "e658e392-db20-89ea-aee2-71dff7d2934a"
uuid: "91f342c0-6867-82fc-b896-4ad433e2ea99"
horo: 5
typography:
  partition: task
  bondDegree: 13
standards: []
bindings: []
signatures:
  computationUuid: "770a5de8-0833-8a2c-9ab0-d7db64d33177"
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
      stageUuid: "5479c826-6c9d-8334-985e-f16d1fada030"
    - stage: seal
      stageUuid: "8cbbdb3b-dd35-8949-ad90-bb0f84095b20"
    - stage: uuid
      stageUuid: "64b98e0b-ddf1-855b-b4c8-3cde0184a972"
version: 2
---
# task — the model of one [[tasks]] row

A unit of work to be completed by an actor. The singular model whose plural store is the [[tasks]] collection ([[balance]]: every collection has its model).

Composes [[tasks]] · [[work]] · [[balance]].

**Law — [[law]]: one task is the singular model of one tasks row — a unit of [[work]] to be completed by an actor; every collection has its model ([[balance]]).**
