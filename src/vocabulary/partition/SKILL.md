---
name: partition
description: "Use when dividing data for performance or governance — table partitioning (by range/hash/list), partition pruning, partition management (add/drop/compress), partitioning strategy for horizontal scaling."
atomPath: "vocabulary/partition"
coordinate: "vocabulary/partition · 2/share · 7c39fcbf"
contentUuid: "507e31e1-850b-5346-9bca-34300f8a5905"
diamondUuid: "c3610f85-c358-8ffe-b928-a3c16ce16047"
uuid: "7c39fcbf-bb75-8cff-bbb0-8ccd17e80eb3"
horo: 2
typography:
  partition: vocabulary
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "0add4029-3d1a-816a-a5e8-fc40068f8c94"
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
      stageUuid: "1916115a-2f42-8c7a-8b27-f1f86a9eeeb8"
    - stage: seal
      stageUuid: "eccdd077-911d-80b9-bd60-e05462d8cafa"
    - stage: uuid
      stageUuid: "0c8c0f2e-b4b3-8a21-a339-01e4ca141729"
version: 2
---
# partition

Use when dividing data for performance or governance — table partitioning (by range/hash/list), partition pruning, partition management (add/drop/compress), partitioning strategy for horizontal scaling.

Composes: [[database]] · [[schema]].

## Standards
- SQL partitioning (SQL:2016)
- Data partitioning strategies

**Law — [[law]]: one logical table divides into partitions (by range/hash/list) so a query prunes to only the partitions it needs — physical division for performance/governance, the same rows.**
