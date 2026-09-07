---
name: lock
description: Use when modelling one lock — the singular model of the locks collection (the plural store); a hold that prevents change to a record or resource.
atomPath: "vocabulary/lock"
coordinate: "vocabulary/lock · 7/descent · b8521cf6"
contentUuid: "a622d1c6-a522-5e32-ad81-899225cdf875"
diamondUuid: "76671f83-c401-833f-95f0-4e5761b8dffa"
uuid: "b8521cf6-003f-81bf-92d4-fee9b133e523"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 15
standards: []
bindings: []
signatures:
  computationUuid: "64a1c4ac-789a-870f-b0d9-fb515083693c"
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
      stageUuid: "816ff64d-347a-836e-bd16-70e69077f0a4"
    - stage: seal
      stageUuid: "2c789540-bc87-8dbb-a2b4-3d68cfdfb3fb"
    - stage: uuid
      stageUuid: "f035b150-eed1-80bb-8c9f-a79aaf3b07a0"
version: 2
---
# lock — the model of one [[locks]] row

A hold that prevents change to a record or resource. The singular model whose plural store is the [[locks]] collection ([[balance]]: every collection has its model).

Composes [[locks]] · [[access]] · [[balance]].

**Law — [[law]]: a lock is the singular model of one locks row — a hold that prevents change to a record or resource, gated by [[access]].**
