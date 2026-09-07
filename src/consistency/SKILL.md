---
name: consistency
description: "Use when enforcing or auditing data consistency — ACID properties, eventual consistency vs strong consistency, consistency models (read-after-write, causal), constraint enforcement, synchronization guarantees across replicas or shards."
atomPath: consistency
coordinate: "consistency · 7/descent · effeb3fe"
contentUuid: "eba42f07-7a2b-59e5-a495-a89dd1901caa"
diamondUuid: "330559e6-356c-89b6-bf45-7cf4de718c48"
uuid: "effeb3fe-271a-8f38-aaee-9635dada7c61"
horo: 7
typography:
  partition: consistency
  bondDegree: 29
standards: []
bindings: []
signatures:
  computationUuid: "ca7fa303-a7ff-8247-b0d4-68d32fb4b038"
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
      stageUuid: "48311455-70ce-8f67-aff2-31e5bdf4b763"
    - stage: seal
      stageUuid: "675e26be-78a1-8589-8c73-6740f640795a"
    - stage: uuid
      stageUuid: "01dc9829-d29b-8939-b002-78f100a8f261"
version: 2
---
# consistency

Use when enforcing or auditing data consistency — ACID properties, eventual consistency vs strong consistency, consistency models (read-after-write, causal), constraint enforcement, synchronization guarantees across replicas or shards.

Composes: [[database]] · [[identity]] · [[reconcile]] · [[anti/corruption]] · [[constraint]].

## Standards
- ACID (ISO/IEC 10026)
- Consistency models
- CAP theorem
