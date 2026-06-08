---
name: requisition
description: Use when modelling one requisition — the singular model of the requisitions collection (the plural store); a formal internal request to procure goods.
atomPath: requisition
coordinate: requisition · 4/weave · a75c3bb3
contentUuid: "d6ce0256-104e-571d-82e6-3ca269c7213d"
diamondUuid: "65f45b6c-e0f5-8f43-89ed-76a618791a68"
uuid: "a75c3bb3-2456-8271-9463-771d1d8eb531"
horo: 4
bonds:
  in:
    - balance
    - law
    - purchase
    - requisitions
  out:
    - balance
    - law
    - purchase
    - requisitions
typography:
  partition: requisition
  bondDegree: 12
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - balance
    - law
    - purchase
    - requisitions
  matrix:
    - balance
    - law
    - purchase
    - requisitions
  backlinks:
    - balance
    - law
    - purchase
    - requisitions
signatures:
  computationUuid: "be613f85-7bb3-8fba-8df7-a666207bfac6"
  stages:
    - stage: path
      stageUuid: "0449d497-77c8-83e7-8f33-1b0be64b404f"
    - stage: trinity
      stageUuid: "509be80d-bb2f-8b36-8af3-cac33ce72c6b"
    - stage: boundary
      stageUuid: "78d9e04d-2c21-8cf2-aab6-cf8eb60e5d8c"
    - stage: links
      stageUuid: "78f059a6-2dca-8ab4-a4cb-5a9704831f58"
    - stage: horo
      stageUuid: "dc3d400d-0792-8895-8805-d017734d1102"
    - stage: seal
      stageUuid: "ccc92945-6b04-8b5e-bbd9-dec0ec6158fe"
    - stage: uuid
      stageUuid: "5347c425-9b1b-89e5-b078-6415d65ac336"
version: 2
---
# requisition — the model of one [[requisitions]] row

A formal internal request to procure goods. The singular model whose plural store is the [[requisitions]] collection ([[balance]]: every collection has its model).

Composes [[requisitions]] · [[purchase]] · [[balance]].

**Law — [[law]]: a requisition is a request, never a purchase — it commits no funds and conserves no value until it is approved into one, so demand and procurement stay double-entry separate.**
