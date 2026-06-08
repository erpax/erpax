---
name: mapping
description: Use when modelling one mapping — the singular model of the mappings collection (the plural store); a correspondence from one set of values to another.
atomPath: mapping
coordinate: mapping · 5/round · 6ae3eeeb
contentUuid: "f5f4c30a-94fd-5f26-af11-000af29f2d97"
diamondUuid: "5a2f4ade-77cc-8768-9ad8-fccc2ba58428"
uuid: "6ae3eeeb-48b6-853e-a78b-fb83333af635"
horo: 5
bonds:
  in:
    - balance
    - law
    - mappings
    - reference
  out:
    - balance
    - law
    - mappings
    - reference
typography:
  partition: mapping
  bondDegree: 12
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - balance
    - law
    - mappings
    - reference
  matrix:
    - balance
    - law
    - mappings
    - reference
  backlinks:
    - balance
    - law
    - mappings
    - reference
signatures:
  computationUuid: "f309d1fb-89b5-844d-a271-8f87c110b30e"
  stages:
    - stage: path
      stageUuid: "ec9c875a-7d73-8203-a28a-6dc6317ce071"
    - stage: trinity
      stageUuid: "8986c423-4e1e-82fa-93e7-4d23ad2c4e8f"
    - stage: boundary
      stageUuid: "0877bc1f-f018-8cbc-b374-511f98533398"
    - stage: links
      stageUuid: "32bad989-7974-8e10-a23a-91ed2ee4423a"
    - stage: horo
      stageUuid: "ce7dfb5a-646a-8ea1-9c05-9359afd74c24"
    - stage: seal
      stageUuid: "52c00382-8748-8094-9ad7-18847e077e2b"
    - stage: uuid
      stageUuid: "fc324b17-367b-8091-bd71-fda03a5dfab9"
version: 2
---
# mapping — the model of one [[mappings]] row

A correspondence from one set of values to another. The singular model whose plural store is the [[mappings]] collection ([[balance]]: every collection has its model).

Composes [[mappings]] · [[reference]] · [[balance]].

**Law — [[law]]: every source value resolves to exactly one target; an ambiguous or missing correspondence is not a mapping.**
