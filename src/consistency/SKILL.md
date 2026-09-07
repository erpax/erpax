---
name: consistency
description: "Use when enforcing or auditing data consistency — ACID properties, eventual consistency vs strong consistency, consistency models (read-after-write, causal), constraint enforcement, synchronization guarantees across replicas or shards."
atomPath: consistency
coordinate: "consistency · 1/base · 179982e6"
contentUuid: "b6f95afa-1fad-572b-908d-25b93f69d3c7"
diamondUuid: "cea23e4d-adb1-8a5e-8679-811538b13ebe"
uuid: "179982e6-61b3-8114-810d-8f437b5ff4af"
horo: 1
typography:
  partition: consistency
  bondDegree: 33
standards: []
bindings: []
signatures:
  computationUuid: "c390c62a-22f9-8429-acb7-70cef8d0d130"
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
      stageUuid: "5a22e3d0-d620-8823-8875-a0fd38ecd021"
    - stage: seal
      stageUuid: "675e26be-78a1-8589-8c73-6740f640795a"
    - stage: uuid
      stageUuid: "51e9327e-ac71-81e1-95ef-3be8ac7b42d3"
version: 2
---
# consistency

Use when enforcing or auditing data consistency — ACID properties, eventual consistency vs strong consistency, consistency models (read-after-write, causal), constraint enforcement, synchronization guarantees across replicas or shards.

Composes: [[database]] · [[identity]] · [[reconcile]] · [[anti/corruption]] · [[constraint]].

## Standards
- ACID (ISO/IEC 10026)
- Consistency models
- CAP theorem
