---
name: time
description: "Use when tracking hours/minutes — labor hours, shift duration, production runtime per unit, throughput per time unit. A duration (number + time unit HUR/H87 code) or clock time. Pairs with rate (wage per hour, throughput per hour) in manufacturing/labor."
atomPath: time
coordinate: "time · 1/base · fdcc737b"
contentUuid: "2d961c9f-96ba-5ec9-a3f1-23596dce9ddf"
diamondUuid: "9d3fdf09-5ba3-822f-83ec-07e02f5f9766"
uuid: "fdcc737b-a279-86ee-9db9-786f4974d692"
horo: 1
typography:
  partition: time
  bondDegree: 138
standards: []
bindings: []
signatures:
  computationUuid: "8dc70e08-972f-8391-a28e-2101039e30ba"
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
      stageUuid: "59245cdb-b315-81d1-b060-36297ff5b67e"
    - stage: seal
      stageUuid: "7bcf8dbd-7c7a-8a6a-a164-e50f95de6ba3"
    - stage: uuid
      stageUuid: "f8367f4d-f709-8b2d-9736-2ed13b9bf594"
version: 2
---
# time

Use when tracking hours/minutes — labor hours, shift duration, production runtime per unit, throughput per time unit. A duration (number + time unit HUR/H87 code) or clock time. Pairs with rate (wage per hour, throughput per hour) in manufacturing/labor.

Composes: [[measure]] · [[field]] · [[manufacturing]].

## Standards
- UN/CEFACT-Recommendation-20
