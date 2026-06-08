---
name: endorser
description: Use when modelling one endorser — the singular model of the endorsers collection (the plural store); a party who signs over or backs an instrument.
atomPath: endorser
coordinate: endorser · 4/weave · 8d507edd
contentUuid: "bcd2336b-6274-5c54-afc2-4b82bc1cdbaa"
diamondUuid: "04f53f72-e960-81b6-9108-8df833f49933"
uuid: "8d507edd-84b5-8226-862a-0f9069a50bf5"
horo: 4
bonds:
  in:
    - balance
    - endorsement
    - endorsers
    - law
  out:
    - balance
    - endorsement
    - endorsers
    - law
typography:
  partition: endorser
  bondDegree: 12
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - balance
    - endorsement
    - endorsers
    - law
  matrix:
    - balance
    - endorsement
    - endorsers
    - law
  backlinks:
    - balance
    - endorsement
    - endorsers
    - law
signatures:
  computationUuid: "f78df16f-0f21-89c7-aff5-22e78210d267"
  stages:
    - stage: path
      stageUuid: "f6e2a3db-d4ba-8ab5-bd56-fab1d2e82144"
    - stage: trinity
      stageUuid: "02c28734-20f4-89fb-81e0-9f93cde2ba63"
    - stage: boundary
      stageUuid: "9680ac25-e111-834b-ada9-91748e0743d7"
    - stage: links
      stageUuid: "d7f55158-c11a-8e1a-b1a2-4a8515a1c1fe"
    - stage: horo
      stageUuid: "fbf5e868-179f-87bd-b48f-15a82a23b3ac"
    - stage: seal
      stageUuid: "744526cf-3ff9-8d85-ad48-25d350390598"
    - stage: uuid
      stageUuid: "0831b09d-9eb9-87b0-a52e-75c642162a70"
version: 2
---
# endorser — the model of one [[endorsers]] row

A party who signs over or backs an instrument. The singular model whose plural store is the [[endorsers]] collection ([[balance]]: every collection has its model).

Composes [[endorsers]] · [[endorsement]] · [[balance]].

**Law — [[law]]: one endorser is the singular model of exactly one [[endorsers]] row — every collection has its model ([[balance]]), the plural store and its singular type two halves of one node.**
