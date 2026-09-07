---
name: partition
description: "Use when dividing data for performance or governance — table partitioning (by range/hash/list), partition pruning, partition management (add/drop/compress), partitioning strategy for horizontal scaling."
atomPath: "vocabulary/partition"
coordinate: "vocabulary/partition · 7/descent · fb318a2b"
contentUuid: "5ae78e9b-9d5c-5454-915e-d63246ee4f3f"
diamondUuid: "fbd42950-b472-8d28-9231-617d40e31a5f"
uuid: "fb318a2b-70f1-836c-8770-44900ea27008"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "4e57d15f-dcc9-8ac0-be7c-136d99d86589"
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
      stageUuid: "49fe2710-96f5-889c-8f26-a874f06cd1c7"
    - stage: seal
      stageUuid: "eccdd077-911d-80b9-bd60-e05462d8cafa"
    - stage: uuid
      stageUuid: "5298fad1-c386-8886-9949-7960833ae2ce"
version: 2
---
# partition

Use when dividing data for performance or governance — table partitioning (by range/hash/list), partition pruning, partition management (add/drop/compress), partitioning strategy for horizontal scaling.

Composes: [[database]] · [[schema]].

## Standards
- SQL partitioning (SQL:2016)
- Data partitioning strategies

**Law — [[law]]: one logical table divides into partitions (by range/hash/list) so a query prunes to only the partitions it needs — physical division for performance/governance, the same rows.**
