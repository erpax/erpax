---
name: time
description: "Use when tracking hours/minutes — labor hours, shift duration, production runtime per unit, throughput per time unit. A duration (number + time unit HUR/H87 code) or clock time. Pairs with rate (wage per hour, throughput per hour) in manufacturing/labor."
atomPath: time
coordinate: "time · 1/base · 5e524517"
contentUuid: "e567ad33-21be-5897-8cdc-ff4733e320d8"
diamondUuid: "ca15ec8a-d1e4-8799-8807-8e07775b27ac"
uuid: "5e524517-2609-8c8a-8c05-8650ed13e44c"
horo: 1
typography:
  partition: time
  bondDegree: 136
standards: []
bindings: []
signatures:
  computationUuid: "c51b8821-7aa9-83ff-a55f-89c33c83fca6"
  stages:
    - stage: path
      stageUuid: "123be2fd-7985-8dab-9840-092763531f5a"
    - stage: trinity
      stageUuid: "7ec281a9-db8f-858a-9ba8-d9cd547309e4"
    - stage: boundary
      stageUuid: "ce27eb5f-1fc5-886a-b50e-16333695e95b"
    - stage: links
      stageUuid: "e881e1e1-caf0-8510-8649-b973addb9b56"
    - stage: horo
      stageUuid: "7644fbe7-822b-86f4-85d2-96d16d8f4eaa"
    - stage: seal
      stageUuid: "7bcf8dbd-7c7a-8a6a-a164-e50f95de6ba3"
    - stage: uuid
      stageUuid: "8ba8e324-cb3d-8ff3-ab5e-75a20ff0e019"
version: 2
---
# time

Use when tracking hours/minutes — labor hours, shift duration, production runtime per unit, throughput per time unit. A duration (number + time unit HUR/H87 code) or clock time. Pairs with rate (wage per hour, throughput per hour) in manufacturing/labor.

Composes: [[measure]] · [[field]] · [[manufacturing]].

## Standards
- UN/CEFACT-Recommendation-20
