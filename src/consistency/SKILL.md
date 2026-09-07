---
name: consistency
description: "Use when enforcing or auditing data consistency — ACID properties, eventual consistency vs strong consistency, consistency models (read-after-write, causal), constraint enforcement, synchronization guarantees across replicas or shards."
atomPath: consistency
coordinate: "consistency · 7/descent · a93f60b1"
contentUuid: "6e38f7ab-6250-5d40-82e6-e47d4360f0e3"
diamondUuid: "6669795d-825b-87a1-80a9-d3766fc55320"
uuid: "a93f60b1-cc08-8cd9-8d84-0a525a09fee4"
horo: 7
typography:
  partition: consistency
  bondDegree: 33
standards: []
bindings: []
signatures:
  computationUuid: "c542c49b-918c-82c8-9966-e90b4452c27d"
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
      stageUuid: "5868fc2a-5c66-81dc-9e88-a19bd2a2d2b6"
    - stage: seal
      stageUuid: "675e26be-78a1-8589-8c73-6740f640795a"
    - stage: uuid
      stageUuid: "22d8f824-9253-8e2f-bd1e-08c1efe22269"
version: 2
---
# consistency

Use when enforcing or auditing data consistency — ACID properties, eventual consistency vs strong consistency, consistency models (read-after-write, causal), constraint enforcement, synchronization guarantees across replicas or shards.

Composes: [[database]] · [[identity]] · [[reconcile]] · [[anti/corruption]] · [[constraint]].

## Standards
- ACID (ISO/IEC 10026)
- Consistency models
- CAP theorem
