---
name: committee
description: Use when modelling one committee — the singular model of the committees collection (the plural store); a constituted group with delegated authority over a domain.
atomPath: committee
coordinate: committee · 5/round · 2109e484
contentUuid: "378d179c-6130-5dfd-94d6-65c3e49c86a0"
diamondUuid: "debd6576-2da5-815c-af00-6cc66bb2b620"
uuid: "2109e484-b4ca-8699-9fcc-ca8cceae1cfb"
horo: 5
bonds:
  in:
    - balance
    - committees
    - governance
    - law
  out:
    - balance
    - committees
    - governance
    - law
typography:
  partition: committee
  bondDegree: 12
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - balance
    - committees
    - governance
    - law
  matrix:
    - balance
    - committees
    - governance
    - law
  backlinks:
    - balance
    - committees
    - governance
    - law
signatures:
  computationUuid: "e5075f54-9c01-8ebf-855b-0cd3a67bcdb7"
  stages:
    - stage: path
      stageUuid: "7cf28df3-587c-8ac9-9d5c-af64af5dc0a4"
    - stage: trinity
      stageUuid: "a581c148-0318-8fae-87c5-40e2c2d3dff2"
    - stage: boundary
      stageUuid: "0f9bcf9f-9029-8c9e-9608-3efa168dae06"
    - stage: links
      stageUuid: "db3ce946-7660-8711-912b-23f60bfa261b"
    - stage: horo
      stageUuid: "2e204f22-d6ee-8b19-9538-7e6880dc5c8e"
    - stage: seal
      stageUuid: "1402500e-13d2-8647-8291-af1380610637"
    - stage: uuid
      stageUuid: "49b21ce7-e182-8403-a065-ce1060886615"
version: 2
---
# committee — the model of one [[committees]] row

A constituted group with delegated authority over a domain. The singular model whose plural store is the [[committees]] collection ([[balance]]: every collection has its model).

Composes [[committees]] · [[governance]] · [[balance]].

**Law — [[law]]: one committee is the singular model of exactly one committees row — a constituted group with delegated authority over a domain; every collection has its model ([[balance]]).**
