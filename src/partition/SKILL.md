---
name: partition
description: "Use when dividing data for performance or governance — table partitioning (by range/hash/list), partition pruning, partition management (add/drop/compress), partitioning strategy for horizontal scaling."
atomPath: partition
coordinate: partition · 7/descent · a41f195c
contentUuid: "3dc7b495-e486-5d06-8e68-9a54582233b6"
diamondUuid: "25e51b40-52ea-8af3-b4cf-1ea00752636e"
uuid: "a41f195c-b89d-84e3-9903-6c6b1c0bb422"
horo: 7
bonds:
  in:
    - database
    - law
    - schema
    - sparsity
  out:
    - database
    - law
    - schema
    - sparsity
typography:
  partition: partition
  bondDegree: 12
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - database
    - law
    - schema
  matrix:
    - database
    - law
    - schema
    - sparsity
  backlinks:
    - database
    - law
    - schema
    - sparsity
signatures:
  computationUuid: "8efff840-9c6c-8950-8387-6e9431f3d554"
  stages:
    - stage: path
      stageUuid: "e5717fb1-586a-8e08-94eb-29cad73bb66e"
    - stage: trinity
      stageUuid: "74388446-1e5b-8141-8a3e-eec0d95bdd0b"
    - stage: boundary
      stageUuid: "de16dc15-8093-8da3-a31a-c0a3f4ae04a4"
    - stage: links
      stageUuid: "b715c9b8-24cc-8a04-a565-d211bcf772e5"
    - stage: horo
      stageUuid: "3a59c1cc-d60b-83af-9b2a-d6e07852fbe4"
    - stage: seal
      stageUuid: "ecd3fa77-0c87-8760-81b4-14a347d32b40"
    - stage: uuid
      stageUuid: "4fa87e50-d4cd-87fc-8fbe-fca70d34e71f"
version: 2
---
# partition

Use when dividing data for performance or governance — table partitioning (by range/hash/list), partition pruning, partition management (add/drop/compress), partitioning strategy for horizontal scaling.

Composes: [[database]] · [[schema]].

## Standards
- SQL partitioning (SQL:2016)
- Data partitioning strategies

**Law — [[law]]: one logical table divides into partitions (by range/hash/list) so a query prunes to only the partitions it needs — physical division for performance/governance, the same rows.**
