---
name: partition
description: "Use when dividing data for performance or governance — table partitioning (by range/hash/list), partition pruning, partition management (add/drop/compress), partitioning strategy for horizontal scaling."
atomPath: "vocabulary/partition"
coordinate: "vocabulary/partition · 8/crest · 3fe317c5"
contentUuid: "e083bb72-b103-5a13-a8ca-b5d4dfde60b6"
diamondUuid: "0cadf527-8457-869e-b456-bcc7bd06a997"
uuid: "3fe317c5-7d37-896e-a150-2e902011cfdd"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "f5f5d5aa-adbc-8c45-83db-844a1968fdb8"
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
      stageUuid: "55fd07f1-acd9-8a30-912f-d3b3b0f8bbef"
    - stage: seal
      stageUuid: "eccdd077-911d-80b9-bd60-e05462d8cafa"
    - stage: uuid
      stageUuid: "645e0610-0746-85f9-8a2c-9785bdc73257"
version: 2
---
# partition

Use when dividing data for performance or governance — table partitioning (by range/hash/list), partition pruning, partition management (add/drop/compress), partitioning strategy for horizontal scaling.

Composes: [[database]] · [[schema]].

## Standards
- SQL partitioning (SQL:2016)
- Data partitioning strategies

**Law — [[law]]: one logical table divides into partitions (by range/hash/list) so a query prunes to only the partitions it needs — physical division for performance/governance, the same rows.**
