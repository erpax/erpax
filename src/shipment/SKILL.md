---
name: shipment
description: Use when modelling one shipment — the singular model of the shipments collection (the plural store); a consignment of goods moved from origin to destination.
atomPath: shipment
coordinate: "shipment · 4/weave · 3e7a6c34"
contentUuid: "9f78417a-31d0-5492-bc01-621209028c17"
diamondUuid: "bbe22bd0-eb3a-87e3-a1d3-afde972b2c56"
uuid: "3e7a6c34-351a-8c81-8880-329da91d196e"
horo: 4
typography:
  partition: shipment
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "bda45683-a20e-86ad-a26b-52261344707e"
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
      stageUuid: "e9f83ba2-8f44-8ae5-9ed6-a48eb34f289d"
    - stage: seal
      stageUuid: "6fc8b80e-221d-8a21-88b4-5a008dee4f93"
    - stage: uuid
      stageUuid: "15ae1dc2-ac86-83ef-898e-0b744efe1c5b"
version: 2
---
# shipment — the model of one [[shipments]] row

A consignment of goods moved from origin to destination. The singular model whose plural store is the [[shipments]] collection ([[balance]]: every collection has its model).

Composes [[shipments]] · [[delivery]] · [[balance]].

**Law — [[law]]: a shipment is one consignment of goods moved from origin to destination — the singular model whose plural store is the [[shipments]] collection ([[balance]]: every collection has its model).**
