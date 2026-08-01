---
name: lock
description: Use when modelling one lock — the singular model of the locks collection (the plural store); a hold that prevents change to a record or resource.
atomPath: "vocabulary/lock"
coordinate: "vocabulary/lock · 7/descent · f3938a23"
contentUuid: "c130c8ea-d412-5fc9-8637-2a5f4816f882"
diamondUuid: "e011c636-e1c0-8c7b-8db5-60282c175790"
uuid: "f3938a23-161e-869c-af12-e6074772b216"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "d9049499-81e2-8825-8a8a-2091937ba5ee"
  stages:
    - stage: path
      stageUuid: "3b412416-b859-8c6b-ab5b-735f334fd8ca"
    - stage: trinity
      stageUuid: "eeb843cc-c13f-8ce6-a845-21519b3235a6"
    - stage: boundary
      stageUuid: "b088ed28-e221-82c3-8a46-3bdceed72ebc"
    - stage: links
      stageUuid: "0960d7a5-c34c-8c5a-a30e-ef3acbdabe11"
    - stage: horo
      stageUuid: "7cae4d56-3d65-8afa-ab02-ca4ad3db5af3"
    - stage: seal
      stageUuid: "87c68f8a-26ad-8fed-918f-a04272f38112"
    - stage: uuid
      stageUuid: "a2c18e0d-64f7-8982-adec-790993ff1424"
version: 2
---
# lock — the model of one [[locks]] row

A hold that prevents change to a record or resource. The singular model whose plural store is the [[locks]] collection ([[balance]]: every collection has its model).

Composes [[locks]] · [[access]] · [[balance]].

**Law — [[law]]: a lock is the singular model of one locks row — a hold that prevents change to a record or resource, gated by [[access]].**
