---
name: field
description: Use when modelling one field — the singular model of the fields collection (the plural store); one typed attribute of a record schema.
atomPath: field
coordinate: field · 4/weave · 357e27c9
contentUuid: "01bbc474-6de7-5c39-94d7-6480263f1f5e"
diamondUuid: "a45af76a-2d56-81f5-a768-ee690120adcd"
uuid: "357e27c9-0ba1-839e-8e4d-8a6f7ff4e348"
horo: 4
bonds:
  in:
    - balance
    - fields
    - schema
  out:
    - balance
    - fields
    - schema
typography:
  partition: field
  bondDegree: 15
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - balance
    - fields
    - schema
  matrix:
    - balance
    - fields
    - schema
  backlinks:
    - balance
    - fields
    - schema
signatures:
  computationUuid: "1e05c28d-18c8-8498-8465-4eaa17471eef"
  stages:
    - stage: path
      stageUuid: "34e19f8d-d527-8b60-a73b-a179118d4e36"
    - stage: trinity
      stageUuid: "7b24b40c-8cc1-8b2b-bc49-be233d23f0b3"
    - stage: boundary
      stageUuid: "3667d5af-9ff1-8ea8-846d-7395ec131992"
    - stage: links
      stageUuid: "f187654d-43f7-8179-8b70-b705a4314b5e"
    - stage: horo
      stageUuid: "48582712-8229-844d-bd3e-e0185c985fdb"
    - stage: seal
      stageUuid: "940856ac-8014-8e8e-b7e0-4f5010a00c47"
    - stage: uuid
      stageUuid: "031c755e-bb9c-85ce-878b-6e1ace1119ee"
version: 2
---
# field — the model of one [[fields]] row

One typed attribute of a record schema. The singular model whose plural store is the [[fields]] collection ([[balance]]: every collection has its model).

Composes [[fields]] · [[schema]] · [[balance]].
