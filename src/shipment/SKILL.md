---
name: shipment
description: Use when modelling one shipment — the singular model of the shipments collection (the plural store); a consignment of goods moved from origin to destination.
atomPath: shipment
coordinate: "shipment · 2/share · 506a1b28"
contentUuid: "4522c9c6-13b8-55ac-816a-332148de94d8"
diamondUuid: "543010c6-afc9-816f-b815-707bdd35172b"
uuid: "506a1b28-9158-817d-9ae6-9518edf57567"
horo: 2
typography:
  partition: shipment
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "eea9d4d2-d3e0-8fc4-bf47-086aeedda39c"
  stages:
    - stage: path
      stageUuid: "2bcb56d3-97db-891a-ba4a-9d8a2dccf63f"
    - stage: trinity
      stageUuid: "c1ca2082-b06c-8b10-a6e6-bef5e909821f"
    - stage: boundary
      stageUuid: "250fa157-fbd2-8759-b48c-8b521584cfb3"
    - stage: links
      stageUuid: "f153b9a2-691d-8f61-9b24-c9147b96fa31"
    - stage: horo
      stageUuid: "e397f87d-4a7f-857f-9d51-2f19c7505733"
    - stage: seal
      stageUuid: "6fc8b80e-221d-8a21-88b4-5a008dee4f93"
    - stage: uuid
      stageUuid: "545c7aa6-e9ba-8f47-a61b-2b1c94aa71eb"
version: 2
---
# shipment — the model of one [[shipments]] row

A consignment of goods moved from origin to destination. The singular model whose plural store is the [[shipments]] collection ([[balance]]: every collection has its model).

Composes [[shipments]] · [[delivery]] · [[balance]].

**Law — [[law]]: a shipment is one consignment of goods moved from origin to destination — the singular model whose plural store is the [[shipments]] collection ([[balance]]: every collection has its model).**
