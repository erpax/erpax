---
name: lock
description: Use when modelling one lock — the singular model of the locks collection (the plural store); a hold that prevents change to a record or resource.
atomPath: "vocabulary/lock"
coordinate: "vocabulary/lock · 4/weave · 9717a989"
contentUuid: "48938cb5-74b3-5581-8c4b-645460217705"
diamondUuid: "c89ca96c-2622-8ab1-8738-f7814e8b5bc3"
uuid: "9717a989-6df0-87ab-a264-c7fedc22c163"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 15
standards: []
bindings: []
signatures:
  computationUuid: "6a3a31bd-d375-8d5e-a74d-7683a06eb739"
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
      stageUuid: "9639cbc5-f592-8dfb-98f1-7eea3c875ca9"
    - stage: seal
      stageUuid: "2c789540-bc87-8dbb-a2b4-3d68cfdfb3fb"
    - stage: uuid
      stageUuid: "c67d4bbc-4cbf-881d-bc4b-397afdb7d673"
version: 2
---
# lock — the model of one [[locks]] row

A hold that prevents change to a record or resource. The singular model whose plural store is the [[locks]] collection ([[balance]]: every collection has its model).

Composes [[locks]] · [[access]] · [[balance]].

**Law — [[law]]: a lock is the singular model of one locks row — a hold that prevents change to a record or resource, gated by [[access]].**
