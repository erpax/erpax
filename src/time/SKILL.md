---
name: time
description: "Use when tracking hours/minutes — labor hours, shift duration, production runtime per unit, throughput per time unit. A duration (number + time unit HUR/H87 code) or clock time. Pairs with rate (wage per hour, throughput per hour) in manufacturing/labor."
atomPath: time
coordinate: "time · 5/round · 03fc3009"
contentUuid: "2400149a-9e6d-5edd-b7dc-296502212750"
diamondUuid: "21aac635-6e71-80c2-8b55-afcb0a07a170"
uuid: "03fc3009-6c78-8e3a-8bd3-cc45726bec7b"
horo: 5
typography:
  partition: time
  bondDegree: 138
standards: []
bindings: []
signatures:
  computationUuid: "cb214544-f46b-807c-ab72-f645a4630baa"
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
      stageUuid: "8ca6cc87-c3e6-8b8d-ac41-aa9221924768"
    - stage: seal
      stageUuid: "7bcf8dbd-7c7a-8a6a-a164-e50f95de6ba3"
    - stage: uuid
      stageUuid: "3878c317-9196-8047-8e6c-86aa4c7885dc"
version: 2
---
# time

Use when tracking hours/minutes — labor hours, shift duration, production runtime per unit, throughput per time unit. A duration (number + time unit HUR/H87 code) or clock time. Pairs with rate (wage per hour, throughput per hour) in manufacturing/labor.

Composes: [[measure]] · [[field]] · [[manufacturing]].

## Standards
- UN/CEFACT-Recommendation-20
