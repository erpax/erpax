---
name: task
description: Use when modelling one task — the singular model of the tasks collection (the plural store); a unit of work to be completed by an actor.
atomPath: task
coordinate: "task · 5/round · 5ac27c64"
contentUuid: "59f737c6-cc4d-5ed7-86a9-ea6ed989cca5"
diamondUuid: "632374c6-6e0e-82c4-b529-84fdf7f08baa"
uuid: "5ac27c64-59dc-8fb2-a60e-351cbd6f7fe1"
horo: 5
typography:
  partition: task
  bondDegree: 13
standards: []
bindings: []
signatures:
  computationUuid: "bae4e8f0-a5eb-8d50-80f2-ef64f914f31f"
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
      stageUuid: "65a1bd07-df3c-85cc-883b-d6f874ddadaf"
    - stage: seal
      stageUuid: "8cbbdb3b-dd35-8949-ad90-bb0f84095b20"
    - stage: uuid
      stageUuid: "1433b18f-5ae2-866f-b12e-74da8ff433c1"
version: 2
---
# task — the model of one [[tasks]] row

A unit of work to be completed by an actor. The singular model whose plural store is the [[tasks]] collection ([[balance]]: every collection has its model).

Composes [[tasks]] · [[work]] · [[balance]].

**Law — [[law]]: one task is the singular model of one tasks row — a unit of [[work]] to be completed by an actor; every collection has its model ([[balance]]).**
