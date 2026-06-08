---
name: visit
description: Use when modelling one visit — the singular model of the visits collection (the plural store); one recorded instance of an actor attending a place or service.
atomPath: visit
coordinate: visit · 1/base · ecf8c6f8
contentUuid: "5d397eaa-abef-58d9-95ca-48dee0adb8e0"
diamondUuid: "2b99d3d6-02f9-8eb1-873d-7e4a309a6def"
uuid: "ecf8c6f8-ef99-8975-85ac-24ac53faa6ac"
horo: 1
bonds:
  in:
    - balance
    - event
    - visits
  out:
    - balance
    - event
    - visits
typography:
  partition: visit
  bondDegree: 9
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - balance
    - event
    - visits
  matrix:
    - balance
    - event
    - visits
  backlinks:
    - balance
    - event
    - visits
signatures:
  computationUuid: "a04f6867-b2ee-88e5-bd48-fa5ce4ddb52d"
  stages:
    - stage: path
      stageUuid: "a4e2f38f-5249-8216-b662-e95d4f8941a2"
    - stage: trinity
      stageUuid: "15bee799-c16c-82da-9408-92d851577aed"
    - stage: boundary
      stageUuid: "928da5a4-50c0-8bdd-b728-ff72d21c5e4b"
    - stage: links
      stageUuid: "0746de2c-49b6-853e-8976-d5f8d9b4a170"
    - stage: horo
      stageUuid: "c0e0eb7e-34bb-8213-ad2e-9704e677ae18"
    - stage: seal
      stageUuid: "74e8765b-050a-8a16-a687-33e4d3876b68"
    - stage: uuid
      stageUuid: "396b8610-0832-8de0-8910-64b2c8fab3f8"
version: 2
---
# visit — the model of one [[visits]] row

One recorded instance of an actor attending a place or service. The singular model whose plural store is the [[visits]] collection ([[balance]]: every collection has its model).

Composes [[visits]] · [[event]] · [[balance]].
