---
name: scorecard
description: Use when modelling one scorecard — the singular model of the scorecards collection (the plural store); a structured summary of metrics against targets.
atomPath: scorecard
coordinate: "scorecard · 5/round · fd1e0a98"
contentUuid: "f05c08a9-bc04-517d-80a8-d6475b578ebc"
diamondUuid: "45f13db0-b484-8316-be54-a668cefc47bf"
uuid: "fd1e0a98-0445-8a38-8043-714dce228571"
horo: 5
typography:
  partition: scorecard
  bondDegree: 9
standards: []
bindings: []
signatures:
  computationUuid: "39dc4798-2f36-86b4-b25d-6c88aafaff60"
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
      stageUuid: "d05c7e4c-d6e6-81c9-bba5-5019d1cc053b"
    - stage: seal
      stageUuid: "012b8361-5ded-8b03-acdf-e097ef26c99b"
    - stage: uuid
      stageUuid: "5709f1f7-d477-85c6-8804-6d5ca4892c62"
version: 2
---
# scorecard — the model of one [[scorecards]] row

A structured summary of metrics against targets. The singular model whose plural store is the [[scorecards]] collection ([[balance]]: every collection has its model).

Composes [[scorecards]] · [[kpi]] · [[balance]].
