---
name: scorecard
description: Use when modelling one scorecard — the singular model of the scorecards collection (the plural store); a structured summary of metrics against targets.
atomPath: scorecard
coordinate: "scorecard · 5/round · 315f427d"
contentUuid: "3424e3b7-a28a-51d6-b27f-01ea41a8ab82"
diamondUuid: "1f8090b3-9a17-8226-9ebd-40baea574cc1"
uuid: "315f427d-54dc-8605-bb28-54a57eee4d2c"
horo: 5
typography:
  partition: scorecard
  bondDegree: 9
standards: []
bindings: []
signatures:
  computationUuid: "b336cb22-410b-8277-a06e-5b7d587726ee"
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
      stageUuid: "62914db1-f80e-884b-a5ba-3b344079d802"
    - stage: seal
      stageUuid: "012b8361-5ded-8b03-acdf-e097ef26c99b"
    - stage: uuid
      stageUuid: "c2ec3a23-8ecb-839f-b6ee-66da0541386f"
version: 2
---
# scorecard — the model of one [[scorecards]] row

A structured summary of metrics against targets. The singular model whose plural store is the [[scorecards]] collection ([[balance]]: every collection has its model).

Composes [[scorecards]] · [[kpi]] · [[balance]].
