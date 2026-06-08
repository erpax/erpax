---
name: endpoint
description: Use when modelling one endpoint — the singular model of the endpoints collection (the plural store); an addressable interface where a service is reached.
atomPath: endpoint
coordinate: endpoint · 8/crest · 97250dab
contentUuid: "c935a820-3ec5-5a58-b602-34ab021062b2"
diamondUuid: "4d876cbb-d7cf-8ce7-82eb-187cf68ead60"
uuid: "97250dab-ea96-8e45-ae7e-68c2644edb8d"
horo: 8
bonds:
  in:
    - api
    - balance
    - endpoints
  out:
    - api
    - balance
    - endpoints
typography:
  partition: endpoint
  bondDegree: 9
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - api
    - balance
    - endpoints
  matrix:
    - api
    - balance
    - endpoints
  backlinks:
    - api
    - balance
    - endpoints
signatures:
  computationUuid: "d2a62803-a7f7-89d3-bf51-72f449a5b629"
  stages:
    - stage: path
      stageUuid: "3ca9fe6a-775b-83a9-b89e-7d5e1023e91a"
    - stage: trinity
      stageUuid: "6ecefae3-b282-892b-a54c-8f545ef331d9"
    - stage: boundary
      stageUuid: "38f014d9-6fef-861a-b7e7-b433ba35614b"
    - stage: links
      stageUuid: "c01136b6-b67e-879f-8138-cca14bc65536"
    - stage: horo
      stageUuid: "9e90bd0a-360d-8bee-8ec5-9e7ce1ccfbe0"
    - stage: seal
      stageUuid: "74d2a9eb-5aec-87dc-96e7-2a71dd1f1954"
    - stage: uuid
      stageUuid: "8a1f2a0d-c729-8c7a-a3ba-55354f9f1227"
version: 2
---
# endpoint — the model of one [[endpoints]] row

An addressable interface where a service is reached. The singular model whose plural store is the [[endpoints]] collection ([[balance]]: every collection has its model).

Composes [[endpoints]] · [[api]] · [[balance]].
