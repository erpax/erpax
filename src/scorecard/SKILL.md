---
name: scorecard
description: Use when modelling one scorecard — the singular model of the scorecards collection (the plural store); a structured summary of metrics against targets.
atomPath: scorecard
coordinate: "scorecard · 1/base · 5b7cc0bf"
contentUuid: "a7dbc25c-7097-57a4-a851-2e7a5837a61e"
diamondUuid: "183ae072-36ed-8968-aca5-b76acf5d9104"
uuid: "5b7cc0bf-f271-8bc9-89e8-e06f5970d402"
horo: 1
typography:
  partition: scorecard
  bondDegree: 9
standards: []
bindings: []
signatures:
  computationUuid: "883898e5-9a01-8268-84c0-6f68c7bccf69"
  stages:
    - stage: path
      stageUuid: "4d42dd9d-d6c4-870d-9c0f-9ca3b8d009a8"
    - stage: trinity
      stageUuid: "0583b411-a1dc-8a54-b84a-b3be6b5d5e09"
    - stage: boundary
      stageUuid: "c4078fd2-2380-8cc9-8b3d-ceff7a29b623"
    - stage: links
      stageUuid: "cb541b24-0d9b-885f-a6cb-f483f43a057d"
    - stage: horo
      stageUuid: "3f2e821d-fa7e-877c-9fd1-3b6c5fab23d1"
    - stage: seal
      stageUuid: "012b8361-5ded-8b03-acdf-e097ef26c99b"
    - stage: uuid
      stageUuid: "3db31b27-db89-8087-816b-1f900353faa4"
version: 2
---
# scorecard — the model of one [[scorecards]] row

A structured summary of metrics against targets. The singular model whose plural store is the [[scorecards]] collection ([[balance]]: every collection has its model).

Composes [[scorecards]] · [[kpi]] · [[balance]].
