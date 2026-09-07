---
name: shipment
description: Use when modelling one shipment — the singular model of the shipments collection (the plural store); a consignment of goods moved from origin to destination.
atomPath: shipment
coordinate: "shipment · 5/round · 58dff45a"
contentUuid: "e15f4343-d0f5-57eb-be11-a4e0317dfdd6"
diamondUuid: "1179ddf3-5266-8d23-860c-654983274355"
uuid: "58dff45a-b3ff-8e12-8a46-227234ea409a"
horo: 5
typography:
  partition: shipment
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "1503919a-dd23-87ab-8df4-91c6d50fbcb2"
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
      stageUuid: "343e8a01-8e76-8fbf-9c67-293e209cddf0"
    - stage: seal
      stageUuid: "6fc8b80e-221d-8a21-88b4-5a008dee4f93"
    - stage: uuid
      stageUuid: "e4a793fb-ca51-8d29-aa92-a9dfa3a33022"
version: 2
---
# shipment — the model of one [[shipments]] row

A consignment of goods moved from origin to destination. The singular model whose plural store is the [[shipments]] collection ([[balance]]: every collection has its model).

Composes [[shipments]] · [[delivery]] · [[balance]].

**Law — [[law]]: a shipment is one consignment of goods moved from origin to destination — the singular model whose plural store is the [[shipments]] collection ([[balance]]: every collection has its model).**
