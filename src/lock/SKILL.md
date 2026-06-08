---
name: lock
description: Use when modelling one lock — the singular model of the locks collection (the plural store); a hold that prevents change to a record or resource.
atomPath: lock
coordinate: lock · 5/round · 52e322ef
contentUuid: "1e2d7f6b-3c4e-5ae3-b3a1-94d58b4b2856"
diamondUuid: "84b1e28e-ba4a-875f-9722-8e0748d34b4c"
uuid: "52e322ef-a32a-8a83-bc0f-8dde558ffc6f"
horo: 5
bonds:
  in:
    - access
    - balance
    - law
    - locks
  out:
    - access
    - balance
    - law
    - locks
typography:
  partition: lock
  bondDegree: 12
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - access
    - balance
    - law
    - locks
  matrix:
    - access
    - balance
    - law
    - locks
  backlinks:
    - access
    - balance
    - law
    - locks
signatures:
  computationUuid: "cec7c036-4eb0-89d8-892d-8189deec27d3"
  stages:
    - stage: path
      stageUuid: "aee7d48f-33e1-8677-8d6d-31099f041b04"
    - stage: trinity
      stageUuid: "699e68fd-fd48-88cc-8720-10c21f05b88f"
    - stage: boundary
      stageUuid: "93f2cc3a-0486-8a37-a780-3fae03002d08"
    - stage: links
      stageUuid: "0c939142-7756-8b3e-9b96-4445314f9199"
    - stage: horo
      stageUuid: "2e38a3ae-bf8e-8e37-ac74-5e00e86d3c3e"
    - stage: seal
      stageUuid: "d3761dcd-b687-80a1-a8cb-217d9d0a7dc6"
    - stage: uuid
      stageUuid: "e6048569-ecd7-82d5-9f12-0b0cf0d4597f"
version: 2
---
# lock — the model of one [[locks]] row

A hold that prevents change to a record or resource. The singular model whose plural store is the [[locks]] collection ([[balance]]: every collection has its model).

Composes [[locks]] · [[access]] · [[balance]].

**Law — [[law]]: a lock is the singular model of one locks row — a hold that prevents change to a record or resource, gated by [[access]].**
