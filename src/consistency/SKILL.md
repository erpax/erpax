---
name: consistency
description: "Use when enforcing or auditing data consistency — ACID properties, eventual consistency vs strong consistency, consistency models (read-after-write, causal), constraint enforcement, synchronization guarantees across replicas or shards."
atomPath: consistency
coordinate: "consistency · 8/crest · e2fd771e"
contentUuid: "ac4893cd-961c-5b64-a0ce-a80297ccff6a"
diamondUuid: "40188f11-f9a0-8753-b624-1ee93408eade"
uuid: "e2fd771e-b6f8-8e5a-9fea-4eb564fc48e5"
horo: 8
typography:
  partition: consistency
  bondDegree: 29
standards: []
bindings: []
signatures:
  computationUuid: "80befa57-d712-8d92-9822-763e38263ed7"
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
      stageUuid: "2ca4b495-b047-8e77-86fc-e5cd746beff6"
    - stage: seal
      stageUuid: "675e26be-78a1-8589-8c73-6740f640795a"
    - stage: uuid
      stageUuid: "a2d4239a-54ec-8c69-95ab-69bf6633bdb6"
version: 2
---
# consistency

Use when enforcing or auditing data consistency — ACID properties, eventual consistency vs strong consistency, consistency models (read-after-write, causal), constraint enforcement, synchronization guarantees across replicas or shards.

Composes: [[database]] · [[identity]] · [[reconcile]] · [[anti/corruption]] · [[constraint]].

## Standards
- ACID (ISO/IEC 10026)
- Consistency models
- CAP theorem
