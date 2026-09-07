---
name: lock
description: Use when modelling one lock — the singular model of the locks collection (the plural store); a hold that prevents change to a record or resource.
atomPath: "vocabulary/lock"
coordinate: "vocabulary/lock · 7/descent · 86a4ef75"
contentUuid: "eefe3b87-ac80-585e-b52d-74c9458ae0d0"
diamondUuid: "2ee84f2a-514d-8e70-b783-320a9f9cdd63"
uuid: "86a4ef75-ad91-84b6-ab34-dcba484bb72d"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 15
standards: []
bindings: []
signatures:
  computationUuid: "d5c88705-1399-8bb8-840c-4838cc8d6937"
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
      stageUuid: "2ba741ec-5c09-86ba-8466-20d6484d7cae"
    - stage: seal
      stageUuid: "2c789540-bc87-8dbb-a2b4-3d68cfdfb3fb"
    - stage: uuid
      stageUuid: "9d29e1cb-45a9-817e-86e9-3db7955e91f9"
version: 2
---
# lock — the model of one [[locks]] row

A hold that prevents change to a record or resource. The singular model whose plural store is the [[locks]] collection ([[balance]]: every collection has its model).

Composes [[locks]] · [[access]] · [[balance]].

**Law — [[law]]: a lock is the singular model of one locks row — a hold that prevents change to a record or resource, gated by [[access]].**
