---
name: time
description: "Use when tracking hours/minutes — labor hours, shift duration, production runtime per unit, throughput per time unit. A duration (number + time unit HUR/H87 code) or clock time. Pairs with rate (wage per hour, throughput per hour) in manufacturing/labor."
atomPath: time
coordinate: "time · 8/crest · bb4fdc77"
contentUuid: "0a0f614e-b8e6-5540-aa1d-647747e784df"
diamondUuid: "a5e34c35-12bc-8368-bce4-87aa9ca76986"
uuid: "bb4fdc77-c886-8e1e-8393-e241acb4a1ea"
horo: 8
typography:
  partition: time
  bondDegree: 136
standards: []
bindings: []
signatures:
  computationUuid: "c22b9e90-34c7-8211-b262-a3da3988ffc8"
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
      stageUuid: "437a39a6-643d-80d2-a4d5-88572defa5e8"
    - stage: seal
      stageUuid: "7bcf8dbd-7c7a-8a6a-a164-e50f95de6ba3"
    - stage: uuid
      stageUuid: "9d497a2f-639c-800f-ab4b-47be0ff598bd"
version: 2
---
# time

Use when tracking hours/minutes — labor hours, shift duration, production runtime per unit, throughput per time unit. A duration (number + time unit HUR/H87 code) or clock time. Pairs with rate (wage per hour, throughput per hour) in manufacturing/labor.

Composes: [[measure]] · [[field]] · [[manufacturing]].

## Standards
- UN/CEFACT-Recommendation-20
