---
name: consistency
description: "Use when enforcing or auditing data consistency — ACID properties, eventual consistency vs strong consistency, consistency models (read-after-write, causal), constraint enforcement, synchronization guarantees across replicas or shards."
atomPath: consistency
coordinate: "consistency · 8/crest · 795f989c"
contentUuid: "46a92546-04eb-5d57-a77d-a822a93478c7"
diamondUuid: "09e6922e-c26a-8600-b1bb-5275a0a3a0bd"
uuid: "795f989c-3987-849a-a799-6043476a077a"
horo: 8
typography:
  partition: consistency
  bondDegree: 21
standards: []
bindings: []
signatures:
  computationUuid: "1cf2a46c-8201-8d90-b500-fdb222273a81"
  stages:
    - stage: path
      stageUuid: "5a173b75-283c-8e8e-b372-6f955f1fa6ea"
    - stage: trinity
      stageUuid: "59ae2de8-4bb6-8da4-b62b-9e84f4d17788"
    - stage: boundary
      stageUuid: "1a46d5e3-b567-8203-a34e-dcb1e5a62b05"
    - stage: links
      stageUuid: "3313fab7-2bf9-888c-85ca-8ddaca70e35b"
    - stage: horo
      stageUuid: "e95d5022-4039-872c-ac5b-dd51af49e1b6"
    - stage: seal
      stageUuid: "675e26be-78a1-8589-8c73-6740f640795a"
    - stage: uuid
      stageUuid: "3d2b109b-07ee-84ec-98d9-2023cd299efe"
version: 2
---
# consistency

Use when enforcing or auditing data consistency — ACID properties, eventual consistency vs strong consistency, consistency models (read-after-write, causal), constraint enforcement, synchronization guarantees across replicas or shards.

Composes: database · [[identity]] · reconcile · [[anti/corruption]] · constraint.

## Standards
- ACID (ISO/IEC 10026)
- Consistency models
- CAP theorem
