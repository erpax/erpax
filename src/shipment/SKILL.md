---
name: shipment
description: Use when modelling one shipment — the singular model of the shipments collection (the plural store); a consignment of goods moved from origin to destination.
atomPath: shipment
coordinate: "shipment · 1/base · 9c116f3e"
contentUuid: "341df77c-8f1c-5fd0-b3ef-71a11fbf6cf5"
diamondUuid: "edf4a36a-0301-837a-b0ff-566469421d5e"
uuid: "9c116f3e-4078-8c47-af2e-2599a98ac6e9"
horo: 1
typography:
  partition: shipment
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "3e45cd04-4cc1-8519-98ea-ce8e21b7bf03"
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
      stageUuid: "5a67167e-45f5-8fd5-90bc-33ec7c633e3c"
    - stage: seal
      stageUuid: "6fc8b80e-221d-8a21-88b4-5a008dee4f93"
    - stage: uuid
      stageUuid: "d4cc24cf-c2d9-86e9-99b1-b354000801ce"
version: 2
---
# shipment — the model of one [[shipments]] row

A consignment of goods moved from origin to destination. The singular model whose plural store is the [[shipments]] collection ([[balance]]: every collection has its model).

Composes [[shipments]] · [[delivery]] · [[balance]].

**Law — [[law]]: a shipment is one consignment of goods moved from origin to destination — the singular model whose plural store is the [[shipments]] collection ([[balance]]: every collection has its model).**
