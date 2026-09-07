---
name: lock
description: Use when modelling one lock — the singular model of the locks collection (the plural store); a hold that prevents change to a record or resource.
atomPath: "vocabulary/lock"
coordinate: "vocabulary/lock · 8/crest · 882df28e"
contentUuid: "9aa0372e-737d-501d-8fa7-4bad69a83503"
diamondUuid: "19027d3c-5584-84be-a5a4-22c3f3becdb6"
uuid: "882df28e-99d1-8cda-b27d-1ee5d1431f27"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 15
standards: []
bindings: []
signatures:
  computationUuid: "fdd77ed3-22f6-8063-999f-3e8de6d11ce3"
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
      stageUuid: "51cd0229-ab8e-836f-85b3-5959dacfe992"
    - stage: seal
      stageUuid: "2c789540-bc87-8dbb-a2b4-3d68cfdfb3fb"
    - stage: uuid
      stageUuid: "166305c3-e48c-81aa-b558-1f43e28ac6b8"
version: 2
---
# lock — the model of one [[locks]] row

A hold that prevents change to a record or resource. The singular model whose plural store is the [[locks]] collection ([[balance]]: every collection has its model).

Composes [[locks]] · [[access]] · [[balance]].

**Law — [[law]]: a lock is the singular model of one locks row — a hold that prevents change to a record or resource, gated by [[access]].**
