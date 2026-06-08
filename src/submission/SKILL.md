---
name: submission
description: Use when modelling one submission — the singular model of the submissions collection (the plural store); a record sent in for review or processing.
atomPath: submission
coordinate: submission · 2/share · 0ad21a60
contentUuid: "2ceef665-f678-59af-82ba-aa2ad47d7790"
diamondUuid: "acf070ad-190e-819f-b4cd-f1674f10c5ed"
uuid: "0ad21a60-ce9f-89f8-a1cd-07695561ae07"
horo: 2
bonds:
  in:
    - balance
    - submissions
    - workflow
  out:
    - balance
    - submissions
    - workflow
typography:
  partition: submission
  bondDegree: 9
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - balance
    - submissions
    - workflow
  matrix:
    - balance
    - submissions
    - workflow
  backlinks:
    - balance
    - submissions
    - workflow
signatures:
  computationUuid: "9b84c684-f332-8ef7-a158-d1ad043a1014"
  stages:
    - stage: path
      stageUuid: "901a0970-6b71-8b98-ba09-0c7fd7a3f185"
    - stage: trinity
      stageUuid: "2828ff03-f05b-87eb-ade3-77e387a343f1"
    - stage: boundary
      stageUuid: "712c1451-8639-8184-8a9a-ad50a8f6430c"
    - stage: links
      stageUuid: "9c7e82c0-bccd-89ab-86ff-7cd8b5fdccc9"
    - stage: horo
      stageUuid: "71fbf93d-ae14-88ca-aa76-f9c6cce32a0a"
    - stage: seal
      stageUuid: "b1c2ff65-b279-8d37-b84a-05525e10ca6a"
    - stage: uuid
      stageUuid: "73a69151-7083-8564-8a50-6335b2c6a44c"
version: 2
---
# submission — the model of one [[submissions]] row

A record sent in for review or processing. The singular model whose plural store is the [[submissions]] collection ([[balance]]: every collection has its model).

Composes [[submissions]] · [[workflow]] · [[balance]].
