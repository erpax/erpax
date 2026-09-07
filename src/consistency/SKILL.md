---
name: consistency
description: "Use when enforcing or auditing data consistency — ACID properties, eventual consistency vs strong consistency, consistency models (read-after-write, causal), constraint enforcement, synchronization guarantees across replicas or shards."
atomPath: consistency
coordinate: "consistency · 1/base · e76abe8b"
contentUuid: "880dcf4d-d227-5141-8569-82105694b747"
diamondUuid: "2731aaae-68ec-8e84-8166-94d1b36eadf9"
uuid: "e76abe8b-107b-8118-9f83-87db1fdd6321"
horo: 1
typography:
  partition: consistency
  bondDegree: 29
standards: []
bindings: []
signatures:
  computationUuid: "f50134e2-e943-8c43-acad-75412951f59b"
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
      stageUuid: "afd5bb63-b6e2-81cc-8ad0-275e6d352851"
    - stage: seal
      stageUuid: "675e26be-78a1-8589-8c73-6740f640795a"
    - stage: uuid
      stageUuid: "f0f314b0-0cb7-888f-9d35-6dd43a8569cd"
version: 2
---
# consistency

Use when enforcing or auditing data consistency — ACID properties, eventual consistency vs strong consistency, consistency models (read-after-write, causal), constraint enforcement, synchronization guarantees across replicas or shards.

Composes: [[database]] · [[identity]] · [[reconcile]] · [[anti/corruption]] · [[constraint]].

## Standards
- ACID (ISO/IEC 10026)
- Consistency models
- CAP theorem
