---
name: partition
description: "Use when dividing data for performance or governance — table partitioning (by range/hash/list), partition pruning, partition management (add/drop/compress), partitioning strategy for horizontal scaling."
atomPath: "vocabulary/partition"
coordinate: "vocabulary/partition · 7/descent · 16c3b7d5"
contentUuid: "1bb1a7e1-13d7-5499-ab33-47f43d1a0fcd"
diamondUuid: "f06f050e-3e09-8040-aa18-1fcb95089381"
uuid: "16c3b7d5-8109-8c60-8e05-5dc02708a77b"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "3282520b-fd75-8281-a7bd-0ce3d7cae8a5"
  stages:
    - stage: path
      stageUuid: "de42580b-03c4-82eb-a170-847ff7c29f4c"
    - stage: trinity
      stageUuid: "67ed7c02-9135-8bd7-8ade-c5206a3f1f58"
    - stage: boundary
      stageUuid: "d6847260-80f7-816b-a906-8e3b7c116268"
    - stage: links
      stageUuid: "7005ea87-259a-8711-8265-8e1a8e3aa9e3"
    - stage: horo
      stageUuid: "d8012be0-52de-8fa3-8e29-6e8755184ff5"
    - stage: seal
      stageUuid: "7d7a6d23-dd6c-8fe1-979b-821ebf1030a2"
    - stage: uuid
      stageUuid: "f1939cb8-ac68-8ffa-b46e-d5569bb411e6"
version: 2
---
# partition

Use when dividing data for performance or governance — table partitioning (by range/hash/list), partition pruning, partition management (add/drop/compress), partitioning strategy for horizontal scaling.

Composes: [[database]] · [[schema]].

## Standards
- SQL partitioning (SQL:2016)
- Data partitioning strategies

**Law — [[law]]: one logical table divides into partitions (by range/hash/list) so a query prunes to only the partitions it needs — physical division for performance/governance, the same rows.**
