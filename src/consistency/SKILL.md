---
name: consistency
description: "Use when enforcing or auditing data consistency — ACID properties, eventual consistency vs strong consistency, consistency models (read-after-write, causal), constraint enforcement, synchronization guarantees across replicas or shards."
atomPath: consistency
coordinate: "consistency · 2/share · d9b576d8"
contentUuid: "4abba78c-491d-57de-b520-dc0df127a813"
diamondUuid: "da62cacd-c325-8a8f-9b47-618ec28a57f6"
uuid: "d9b576d8-4475-8a39-821a-d552cedcddf5"
horo: 2
typography:
  partition: consistency
  bondDegree: 33
standards: []
bindings: []
signatures:
  computationUuid: "07481f58-0666-8c80-b6c6-ad3633c8ae1f"
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
      stageUuid: "f2265817-233b-8841-9c57-2ea401101503"
    - stage: seal
      stageUuid: "675e26be-78a1-8589-8c73-6740f640795a"
    - stage: uuid
      stageUuid: "5d49e513-40aa-8904-b338-6126f1cd549a"
version: 2
---
# consistency

Use when enforcing or auditing data consistency — ACID properties, eventual consistency vs strong consistency, consistency models (read-after-write, causal), constraint enforcement, synchronization guarantees across replicas or shards.

Composes: [[database]] · [[identity]] · [[reconcile]] · [[anti/corruption]] · [[constraint]].

## Standards
- ACID (ISO/IEC 10026)
- Consistency models
- CAP theorem
