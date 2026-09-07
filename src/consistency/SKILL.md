---
name: consistency
description: "Use when enforcing or auditing data consistency — ACID properties, eventual consistency vs strong consistency, consistency models (read-after-write, causal), constraint enforcement, synchronization guarantees across replicas or shards."
atomPath: consistency
coordinate: "consistency · 5/round · 4ecfd8c5"
contentUuid: "33ead6c8-05b1-501a-a4e5-148851efd9a4"
diamondUuid: "bf9415e1-81c2-8133-b1cf-6d36444f3358"
uuid: "4ecfd8c5-be47-8cb1-acda-efe7fcf2f3f6"
horo: 5
typography:
  partition: consistency
  bondDegree: 29
standards: []
bindings: []
signatures:
  computationUuid: "705085d5-0c4a-8a61-a496-df5981de0424"
  stages:
    - stage: path
      stageUuid: "5a173b75-283c-8e8e-b372-6f955f1fa6ea"
    - stage: trinity
      stageUuid: "59ae2de8-4bb6-8da4-b62b-9e84f4d17788"
    - stage: boundary
      stageUuid: "1a46d5e3-b567-8203-a34e-dcb1e5a62b05"
    - stage: links
      stageUuid: "db809132-84c8-8992-9b57-7a4bc35ac1c6"
    - stage: horo
      stageUuid: "e18b2424-c67f-8c8e-a7f2-998f1583501b"
    - stage: seal
      stageUuid: "675e26be-78a1-8589-8c73-6740f640795a"
    - stage: uuid
      stageUuid: "db1881fa-6f5d-8ace-af98-c7e8c95f177a"
version: 2
---
# consistency

Use when enforcing or auditing data consistency — ACID properties, eventual consistency vs strong consistency, consistency models (read-after-write, causal), constraint enforcement, synchronization guarantees across replicas or shards.

Composes: [[database]] · [[identity]] · [[reconcile]] · [[anti/corruption]] · [[constraint]].

## Standards
- ACID (ISO/IEC 10026)
- Consistency models
- CAP theorem
