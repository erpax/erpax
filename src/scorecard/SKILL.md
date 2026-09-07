---
name: scorecard
description: Use when modelling one scorecard — the singular model of the scorecards collection (the plural store); a structured summary of metrics against targets.
atomPath: scorecard
coordinate: "scorecard · 5/round · 586a1f1b"
contentUuid: "ee93db65-7047-5bd1-a6a6-07a40b1bd0f8"
diamondUuid: "56727ebd-1d9f-8eac-90c2-f55c701814f0"
uuid: "586a1f1b-93d5-8f0a-b742-0d569e7cbf0f"
horo: 5
typography:
  partition: scorecard
  bondDegree: 9
standards: []
bindings: []
signatures:
  computationUuid: "0421f123-9cc8-89f2-8db3-af1dbfa4913b"
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
      stageUuid: "2f434057-9612-8391-bdc9-8dd7cc27f8d9"
    - stage: seal
      stageUuid: "012b8361-5ded-8b03-acdf-e097ef26c99b"
    - stage: uuid
      stageUuid: "77d83a56-4f03-812f-9665-4114ae10a1d7"
version: 2
---
# scorecard — the model of one [[scorecards]] row

A structured summary of metrics against targets. The singular model whose plural store is the [[scorecards]] collection ([[balance]]: every collection has its model).

Composes [[scorecards]] · [[kpi]] · [[balance]].
