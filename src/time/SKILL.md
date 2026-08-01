---
name: time
description: "Use when tracking hours/minutes — labor hours, shift duration, production runtime per unit, throughput per time unit. A duration (number + time unit HUR/H87 code) or clock time. Pairs with rate (wage per hour, throughput per hour) in manufacturing/labor."
atomPath: time
coordinate: "time · 4/weave · 168a721c"
contentUuid: "e568c4e6-7516-5569-9617-ada7065ea932"
diamondUuid: "19d8e3bd-7009-853d-9ed8-8f7a610c0d08"
uuid: "168a721c-96a1-8d2c-a584-e1b5de3e71e4"
horo: 4
typography:
  partition: time
  bondDegree: 138
standards: []
bindings: []
signatures:
  computationUuid: "2fb6decd-5dfc-8b7e-9eba-1a77964a84d3"
  stages:
    - stage: path
      stageUuid: "123be2fd-7985-8dab-9840-092763531f5a"
    - stage: trinity
      stageUuid: "7ec281a9-db8f-858a-9ba8-d9cd547309e4"
    - stage: boundary
      stageUuid: "5a432d05-143a-8b3d-930c-285e1590d9e2"
    - stage: links
      stageUuid: "0c32868e-08ca-8c52-a8d5-bbecb2997710"
    - stage: horo
      stageUuid: "654057a4-8266-80d4-b9d3-7ce1976cf7c1"
    - stage: seal
      stageUuid: "7bcf8dbd-7c7a-8a6a-a164-e50f95de6ba3"
    - stage: uuid
      stageUuid: "a1b8cbe0-86b3-8789-8724-8c39c1358352"
version: 2
---
# time

Use when tracking hours/minutes — labor hours, shift duration, production runtime per unit, throughput per time unit. A duration (number + time unit HUR/H87 code) or clock time. Pairs with rate (wage per hour, throughput per hour) in manufacturing/labor.

Composes: [[measure]] · [[fields]] · [[manufacturing]].

## Standards
- UN/CEFACT-Recommendation-20
