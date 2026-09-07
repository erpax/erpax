---
name: scorecard
description: Use when modelling one scorecard — the singular model of the scorecards collection (the plural store); a structured summary of metrics against targets.
atomPath: scorecard
coordinate: "scorecard · 1/base · 3c1a407e"
contentUuid: "28e05146-2067-58f4-8442-251a0855526d"
diamondUuid: "9e9d12f9-b5aa-8cd9-acf1-65dbb2c70ffb"
uuid: "3c1a407e-a467-8df2-a29c-93e8da17e048"
horo: 1
typography:
  partition: scorecard
  bondDegree: 9
standards: []
bindings: []
signatures:
  computationUuid: "09f5d434-bdff-87a8-aa37-26bbfabe481b"
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
      stageUuid: "91bb68aa-4436-8bbc-9ce8-b466ec2c5168"
    - stage: seal
      stageUuid: "012b8361-5ded-8b03-acdf-e097ef26c99b"
    - stage: uuid
      stageUuid: "79a5b004-cf07-8fdc-b0e6-bd9a8a103c40"
version: 2
---
# scorecard — the model of one [[scorecards]] row

A structured summary of metrics against targets. The singular model whose plural store is the [[scorecards]] collection ([[balance]]: every collection has its model).

Composes [[scorecards]] · [[kpi]] · [[balance]].
