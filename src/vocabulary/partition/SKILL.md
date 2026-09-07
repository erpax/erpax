---
name: partition
description: "Use when dividing data for performance or governance — table partitioning (by range/hash/list), partition pruning, partition management (add/drop/compress), partitioning strategy for horizontal scaling."
atomPath: "vocabulary/partition"
coordinate: "vocabulary/partition · 4/weave · 20786fe9"
contentUuid: "2bd1e74a-6aed-556f-8c33-9419efeb32ae"
diamondUuid: "9dd3ac7d-d618-860f-9af6-9d4ab30333fe"
uuid: "20786fe9-6f98-8c82-8c59-59d77c116a35"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "c8bbd763-c26b-8e52-98c4-adf2882c9df8"
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
      stageUuid: "6095e025-dc3e-8e00-b5fe-d54bfc112875"
    - stage: seal
      stageUuid: "eccdd077-911d-80b9-bd60-e05462d8cafa"
    - stage: uuid
      stageUuid: "e9571f4d-3e7a-8e7c-93a0-ec1c077bda4e"
version: 2
---
# partition

Use when dividing data for performance or governance — table partitioning (by range/hash/list), partition pruning, partition management (add/drop/compress), partitioning strategy for horizontal scaling.

Composes: [[database]] · [[schema]].

## Standards
- SQL partitioning (SQL:2016)
- Data partitioning strategies

**Law — [[law]]: one logical table divides into partitions (by range/hash/list) so a query prunes to only the partitions it needs — physical division for performance/governance, the same rows.**
