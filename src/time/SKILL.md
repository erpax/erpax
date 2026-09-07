---
name: time
description: "Use when tracking hours/minutes — labor hours, shift duration, production runtime per unit, throughput per time unit. A duration (number + time unit HUR/H87 code) or clock time. Pairs with rate (wage per hour, throughput per hour) in manufacturing/labor."
atomPath: time
coordinate: "time · 2/share · 57188e0d"
contentUuid: "9a5feddf-c97a-5053-959a-2669b1437ea5"
diamondUuid: "a20885ec-3fb2-8660-b1a2-7f0f95a0e878"
uuid: "57188e0d-959e-88d0-9add-44b0b0e1cc56"
horo: 2
typography:
  partition: time
  bondDegree: 136
standards: []
bindings: []
signatures:
  computationUuid: "16dcf964-34a7-8a4e-9422-2895f9e3ea71"
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
      stageUuid: "45710ed9-1fe2-8f03-aafb-e037dba55559"
    - stage: seal
      stageUuid: "7bcf8dbd-7c7a-8a6a-a164-e50f95de6ba3"
    - stage: uuid
      stageUuid: "2a8d33d7-c226-80e3-8668-5fbdf424d423"
version: 2
---
# time

Use when tracking hours/minutes — labor hours, shift duration, production runtime per unit, throughput per time unit. A duration (number + time unit HUR/H87 code) or clock time. Pairs with rate (wage per hour, throughput per hour) in manufacturing/labor.

Composes: [[measure]] · [[field]] · [[manufacturing]].

## Standards
- UN/CEFACT-Recommendation-20
