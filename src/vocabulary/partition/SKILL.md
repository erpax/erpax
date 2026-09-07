---
name: partition
description: "Use when dividing data for performance or governance — table partitioning (by range/hash/list), partition pruning, partition management (add/drop/compress), partitioning strategy for horizontal scaling."
atomPath: "vocabulary/partition"
coordinate: "vocabulary/partition · 8/crest · 31d081fb"
contentUuid: "60616e68-caf2-5b11-9c38-cb974ce9df7f"
diamondUuid: "4bbb0b10-88c5-852a-9f5c-d04646cc6aea"
uuid: "31d081fb-3b9c-8bb0-a968-f3bb5189e475"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "182c3b4e-4044-89f2-9d21-0224b4b3028c"
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
      stageUuid: "c7ee0a5c-333a-8053-b242-13d397c2c71a"
    - stage: seal
      stageUuid: "eccdd077-911d-80b9-bd60-e05462d8cafa"
    - stage: uuid
      stageUuid: "438c87c5-a5ce-82f0-b001-55f3a337aad2"
version: 2
---
# partition

Use when dividing data for performance or governance — table partitioning (by range/hash/list), partition pruning, partition management (add/drop/compress), partitioning strategy for horizontal scaling.

Composes: [[database]] · [[schema]].

## Standards
- SQL partitioning (SQL:2016)
- Data partitioning strategies

**Law — [[law]]: one logical table divides into partitions (by range/hash/list) so a query prunes to only the partitions it needs — physical division for performance/governance, the same rows.**
