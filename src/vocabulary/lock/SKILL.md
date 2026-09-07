---
name: lock
description: Use when modelling one lock — the singular model of the locks collection (the plural store); a hold that prevents change to a record or resource.
atomPath: "vocabulary/lock"
coordinate: "vocabulary/lock · 1/base · 8ab3557d"
contentUuid: "3024152a-1616-51c7-96e5-3ba5366e52a8"
diamondUuid: "35c73fa6-17e0-8c8f-92a2-814d7a0b304c"
uuid: "8ab3557d-7625-8bad-825d-b212ad8cb735"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 15
standards: []
bindings: []
signatures:
  computationUuid: "80f9cd71-c29c-810f-bb57-d01d66dfea04"
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
      stageUuid: "d862a67c-7193-8d29-ab2e-5dabe036ff2b"
    - stage: seal
      stageUuid: "2c789540-bc87-8dbb-a2b4-3d68cfdfb3fb"
    - stage: uuid
      stageUuid: "8937f6ed-b228-8aab-a79f-d5b0a0cf8346"
version: 2
---
# lock — the model of one [[locks]] row

A hold that prevents change to a record or resource. The singular model whose plural store is the [[locks]] collection ([[balance]]: every collection has its model).

Composes [[locks]] · [[access]] · [[balance]].

**Law — [[law]]: a lock is the singular model of one locks row — a hold that prevents change to a record or resource, gated by [[access]].**
