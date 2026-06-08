---
name: reconciliation
description: Use when modelling one reconciliation — the singular model of the reconciliations collection (the plural store); the matching of two records to confirm they agree.
atomPath: reconciliation
coordinate: reconciliation · 4/weave · f0d502ee
contentUuid: "58358a81-7aa5-5faf-864b-1b8ceec58d46"
diamondUuid: "e507cca2-e607-8900-b86a-6f16fbbf08aa"
uuid: "f0d502ee-ae76-8f3d-a86c-1684181365b7"
horo: 4
bonds:
  in:
    - accounting
    - balance
    - law
    - reconciliations
  out:
    - accounting
    - balance
    - law
    - reconciliations
typography:
  partition: reconciliation
  bondDegree: 17
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - accounting
    - balance
    - law
    - reconciliations
  matrix:
    - accounting
    - balance
    - law
    - reconciliations
  backlinks:
    - accounting
    - balance
    - law
    - reconciliations
signatures:
  computationUuid: "95223e29-de06-86b6-a25c-344106ca107e"
  stages:
    - stage: path
      stageUuid: "bdb8eb41-0a82-85d5-86e7-b99711ba9090"
    - stage: trinity
      stageUuid: "eb9710f9-87b0-8997-877d-c4d9f070645c"
    - stage: boundary
      stageUuid: "c11b509c-3c94-8320-8df9-f1e6ca50fc2e"
    - stage: links
      stageUuid: "d50d37ff-8e92-84bc-aa9a-1ed1fcf995d4"
    - stage: horo
      stageUuid: "267a80fb-1762-8f07-8362-acf7cb04b510"
    - stage: seal
      stageUuid: "d7dda75e-18a9-83ef-9312-51c47c180641"
    - stage: uuid
      stageUuid: "63e3daa3-376a-802b-b2bb-7686c226acfd"
version: 2
---
# reconciliation — the model of one [[reconciliations]] row

The matching of two records to confirm they agree. The singular model whose plural store is the [[reconciliations]] collection ([[balance]]: every collection has its model).

Composes [[reconciliations]] · [[accounting]] · [[balance]].

**Law — [[law]]: a reconciliation closes only when the two records it matches net to zero difference; any residual stays open as a flagged exception.**
