---
name: time
description: "Use when tracking hours/minutes — labor hours, shift duration, production runtime per unit, throughput per time unit. A duration (number + time unit HUR/H87 code) or clock time. Pairs with rate (wage per hour, throughput per hour) in manufacturing/labor."
atomPath: time
coordinate: "time · 4/weave · bdbc2b1f"
contentUuid: "dc611f5b-4126-5c74-8d62-48cae11b93dd"
diamondUuid: "e50c51f3-6d01-815d-9d9d-1413f2a882d2"
uuid: "bdbc2b1f-fb80-8308-8a05-5f9e4a38da59"
horo: 4
typography:
  partition: time
  bondDegree: 138
standards: []
bindings: []
signatures:
  computationUuid: "96d5d29a-5e07-8589-bd7e-419e5966a124"
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
      stageUuid: "26db3a03-a9ed-8314-a18a-a7ca7227f68a"
    - stage: seal
      stageUuid: "7bcf8dbd-7c7a-8a6a-a164-e50f95de6ba3"
    - stage: uuid
      stageUuid: "b724ffd9-662d-83e1-8de0-5a1aeaccbf8b"
version: 2
---
# time

Use when tracking hours/minutes — labor hours, shift duration, production runtime per unit, throughput per time unit. A duration (number + time unit HUR/H87 code) or clock time. Pairs with rate (wage per hour, throughput per hour) in manufacturing/labor.

Composes: [[measure]] · [[field]] · [[manufacturing]].

## Standards
- UN/CEFACT-Recommendation-20
