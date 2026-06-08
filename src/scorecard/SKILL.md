---
name: scorecard
description: Use when modelling one scorecard — the singular model of the scorecards collection (the plural store); a structured summary of metrics against targets.
atomPath: scorecard
coordinate: scorecard · 7/descent · 1791fa36
contentUuid: "37c9201f-9690-54f8-81b6-b9504fbb860d"
diamondUuid: "b8623f66-492d-84c8-8551-4d22183c7a8f"
uuid: "1791fa36-ca52-88b6-bc41-a2e73f5eea05"
horo: 7
bonds:
  in:
    - balance
    - kpi
    - scorecards
  out:
    - balance
    - kpi
    - scorecards
typography:
  partition: scorecard
  bondDegree: 9
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - balance
    - kpi
    - scorecards
  matrix:
    - balance
    - kpi
    - scorecards
  backlinks:
    - balance
    - kpi
    - scorecards
signatures:
  computationUuid: "81c72ff7-2242-8986-ba5d-ed8e4698f2f5"
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
      stageUuid: "91474fa8-5345-8ce5-8357-3443d3ce8143"
    - stage: seal
      stageUuid: "29db2ebf-94d1-867c-b4de-32ac948326fb"
    - stage: uuid
      stageUuid: "f55b324d-70f0-8cc8-9649-91dd774f4179"
version: 2
---
# scorecard — the model of one [[scorecards]] row

A structured summary of metrics against targets. The singular model whose plural store is the [[scorecards]] collection ([[balance]]: every collection has its model).

Composes [[scorecards]] · [[kpi]] · [[balance]].
