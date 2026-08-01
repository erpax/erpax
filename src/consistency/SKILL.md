---
name: consistency
description: "Use when enforcing or auditing data consistency — ACID properties, eventual consistency vs strong consistency, consistency models (read-after-write, causal), constraint enforcement, synchronization guarantees across replicas or shards."
atomPath: consistency
coordinate: "consistency · 2/share · 200a7e55"
contentUuid: "d0ec63c9-956b-538c-8032-f1a303c17bd4"
diamondUuid: "e20cc054-b7ff-8a03-935a-b33e58320deb"
uuid: "200a7e55-bbc7-83fa-bb47-a4f914d6716f"
horo: 2
typography:
  partition: consistency
  bondDegree: 33
standards: []
bindings: []
signatures:
  computationUuid: "71b055c5-617c-8cc0-9127-44a271fde349"
  stages:
    - stage: path
      stageUuid: "5a173b75-283c-8e8e-b372-6f955f1fa6ea"
    - stage: trinity
      stageUuid: "fa8e509b-3636-8ea5-9fe0-0dc7c6374fde"
    - stage: boundary
      stageUuid: "f57545a4-f5da-828c-bf3c-f8cdcec63a8a"
    - stage: links
      stageUuid: "db809132-84c8-8992-9b57-7a4bc35ac1c6"
    - stage: horo
      stageUuid: "116d4332-e61a-80f2-8e2b-a2fa3fdf7def"
    - stage: seal
      stageUuid: "675e26be-78a1-8589-8c73-6740f640795a"
    - stage: uuid
      stageUuid: "10043254-8c25-8091-ad13-43c87c5f4736"
version: 2
---
# consistency

Use when enforcing or auditing data consistency — ACID properties, eventual consistency vs strong consistency, consistency models (read-after-write, causal), constraint enforcement, synchronization guarantees across replicas or shards.

Composes: [[database]] · [[identity]] · [[reconcile]] · [[anti/corruption]] · [[constraint]].

## Standards
- ACID (ISO/IEC 10026)
- Consistency models
- CAP theorem
