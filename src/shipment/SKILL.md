---
name: shipment
description: Use when modelling one shipment — the singular model of the shipments collection (the plural store); a consignment of goods moved from origin to destination.
atomPath: shipment
coordinate: "shipment · 5/round · 48ebb21d"
contentUuid: "f9da7656-20fc-5ca7-871f-ce71bfec8dbc"
diamondUuid: "3349fda7-251a-8fbf-9e89-1a0d83a57c56"
uuid: "48ebb21d-811d-8148-962b-ffd8178372fc"
horo: 5
typography:
  partition: shipment
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "43a9ad76-4f41-85d5-9bcb-ab69c00ca169"
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
      stageUuid: "bf200c64-a1ac-8cda-b0b8-41a162fcda9e"
    - stage: seal
      stageUuid: "6fc8b80e-221d-8a21-88b4-5a008dee4f93"
    - stage: uuid
      stageUuid: "9d6a2206-3ff0-8a4e-beab-713e93f2b6e4"
version: 2
---
# shipment — the model of one [[shipments]] row

A consignment of goods moved from origin to destination. The singular model whose plural store is the [[shipments]] collection ([[balance]]: every collection has its model).

Composes [[shipments]] · [[delivery]] · [[balance]].

**Law — [[law]]: a shipment is one consignment of goods moved from origin to destination — the singular model whose plural store is the [[shipments]] collection ([[balance]]: every collection has its model).**
