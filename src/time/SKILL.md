---
name: time
description: "Use when tracking hours/minutes — labor hours, shift duration, production runtime per unit, throughput per time unit. A duration (number + time unit HUR/H87 code) or clock time. Pairs with rate (wage per hour, throughput per hour) in manufacturing/labor."
atomPath: time
coordinate: "time · 4/weave · fec04ba3"
contentUuid: "3bd0c1e1-5da9-5840-b4af-f5d7f7fd2827"
diamondUuid: "e7704572-5bed-8040-9e57-42be054e9820"
uuid: "fec04ba3-da9c-87b9-b7d5-dad5b1ab6821"
horo: 4
typography:
  partition: time
  bondDegree: 138
standards: []
bindings: []
signatures:
  computationUuid: "d1ac28bf-1963-8dd2-be01-edb05ad792aa"
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
      stageUuid: "6233be12-f248-84ae-b1b3-6710e5322de5"
    - stage: seal
      stageUuid: "7bcf8dbd-7c7a-8a6a-a164-e50f95de6ba3"
    - stage: uuid
      stageUuid: "da5d1e94-2d98-8855-b083-f0bc02867cdb"
version: 2
---
# time

Use when tracking hours/minutes — labor hours, shift duration, production runtime per unit, throughput per time unit. A duration (number + time unit HUR/H87 code) or clock time. Pairs with rate (wage per hour, throughput per hour) in manufacturing/labor.

Composes: [[measure]] · [[field]] · [[manufacturing]].

## Standards
- UN/CEFACT-Recommendation-20
