---
name: consistency
description: "Use when enforcing or auditing data consistency — ACID properties, eventual consistency vs strong consistency, consistency models (read-after-write, causal), constraint enforcement, synchronization guarantees across replicas or shards."
atomPath: consistency
coordinate: "consistency · 8/crest · 765a317d"
contentUuid: "1f1c8489-e6b7-5713-b616-402719781d91"
diamondUuid: "0255ff2c-7643-8ed2-854a-343e6f54e679"
uuid: "765a317d-1e56-84f0-92e7-241130ccc9f2"
horo: 8
typography:
  partition: consistency
  bondDegree: 33
standards: []
bindings: []
signatures:
  computationUuid: "c82f1ef8-6507-878f-89e4-5e9b17f6d87f"
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
      stageUuid: "f8837058-682a-8e00-bb2d-b6ff7d760ab1"
    - stage: seal
      stageUuid: "675e26be-78a1-8589-8c73-6740f640795a"
    - stage: uuid
      stageUuid: "f9610073-237c-823b-95be-cf981aca3cc2"
version: 2
---
# consistency

Use when enforcing or auditing data consistency — ACID properties, eventual consistency vs strong consistency, consistency models (read-after-write, causal), constraint enforcement, synchronization guarantees across replicas or shards.

Composes: [[database]] · [[identity]] · [[reconcile]] · [[anti/corruption]] · [[constraint]].

## Standards
- ACID (ISO/IEC 10026)
- Consistency models
- CAP theorem
