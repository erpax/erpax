---
name: planning
description: Use when modelling one planning — the singular model of the plannings collection (the plural store); the activity of arranging future work and resources.
atomPath: planning
coordinate: planning · 5/round · e0b86fe4
contentUuid: "0494e6a9-707c-52de-a398-17891a55f1fc"
diamondUuid: "a81adb8b-a363-8d21-b845-ed75954df7eb"
uuid: "e0b86fe4-c798-85fc-9317-f810d082b6c4"
horo: 5
bonds:
  in:
    - balance
    - plannings
    - project
  out:
    - balance
    - plannings
    - project
typography:
  partition: planning
  bondDegree: 9
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - balance
    - plannings
    - project
  matrix:
    - balance
    - plannings
    - project
  backlinks:
    - balance
    - plannings
    - project
signatures:
  computationUuid: "f699ed3e-4485-8c5d-a035-26328fc106c8"
  stages:
    - stage: path
      stageUuid: "b7c1c73f-8a27-8e02-b636-e73f0afaedb4"
    - stage: trinity
      stageUuid: "3babdea3-1418-849a-a862-f0f23fb5f4ab"
    - stage: boundary
      stageUuid: "cd700ff7-8a90-8386-8a06-9a280652925e"
    - stage: links
      stageUuid: "8435869e-cd0d-8728-b415-419e8cf24148"
    - stage: horo
      stageUuid: "48a0c4fb-b7d5-8eb0-bece-a01f74b09d6f"
    - stage: seal
      stageUuid: "3d580c19-e3c1-895c-8ac2-4008021b0c81"
    - stage: uuid
      stageUuid: "7a105974-992d-8718-88ca-aa058049cde3"
version: 2
---
# planning — the model of one [[plannings]] row

The activity of arranging future work and resources. The singular model whose plural store is the [[plannings]] collection ([[balance]]: every collection has its model).

Composes [[plannings]] · [[project]] · [[balance]].
