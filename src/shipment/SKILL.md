---
name: shipment
description: Use when modelling one shipment — the singular model of the shipments collection (the plural store); a consignment of goods moved from origin to destination.
atomPath: shipment
coordinate: shipment · 1/base · a92e8cfb
contentUuid: "255cdbf6-535f-588a-822f-1adfaa95fc55"
diamondUuid: "b377ef3f-68aa-8bf2-99bd-cb0410571b97"
uuid: "a92e8cfb-239d-8b91-b398-fc28c2efbe78"
horo: 1
bonds:
  in:
    - balance
    - delivery
    - law
    - shipments
  out:
    - balance
    - delivery
    - law
    - shipments
typography:
  partition: shipment
  bondDegree: 12
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - balance
    - delivery
    - law
    - shipments
  matrix:
    - balance
    - delivery
    - law
    - shipments
  backlinks:
    - balance
    - delivery
    - law
    - shipments
signatures:
  computationUuid: "aa3e0153-1fdf-8245-89a2-d6453c8f757c"
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
      stageUuid: "e0d24086-9463-89d4-8d13-939b8890e700"
    - stage: seal
      stageUuid: "3a0a6d42-6e4f-811d-a91d-8c1945c96488"
    - stage: uuid
      stageUuid: "59e5e57f-187d-8f74-9677-63599ee36eb5"
version: 2
---
# shipment — the model of one [[shipments]] row

A consignment of goods moved from origin to destination. The singular model whose plural store is the [[shipments]] collection ([[balance]]: every collection has its model).

Composes [[shipments]] · [[delivery]] · [[balance]].

**Law — [[law]]: a shipment is one consignment of goods moved from origin to destination — the singular model whose plural store is the [[shipments]] collection ([[balance]]: every collection has its model).**
