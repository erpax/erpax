---
name: batch
description: "Use when processing data in bulk — batch ETL jobs, bulk inserts/updates/deletes, batch transaction semantics, atomicity across a batch, partial failure handling and retry strategies in batch operations."
atomPath: "vocabulary/batch"
coordinate: "vocabulary/batch · 5/round · 459907ba"
contentUuid: "4fc58376-1b9f-5d87-b90d-c0230bc08646"
diamondUuid: "9dcb73f2-92ad-8aab-88f8-780376967b79"
uuid: "459907ba-4f5c-86de-a8a7-f35480fb78bc"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 13
standards: []
bindings: []
signatures:
  computationUuid: "fcdbd3d5-54f7-840e-a413-9ccddf9f4933"
  stages:
    - stage: path
      stageUuid: "0b412f95-bfbc-8cd6-b452-78e34dd331ad"
    - stage: trinity
      stageUuid: "4ac8b64a-d494-8332-b732-27b46a94c795"
    - stage: boundary
      stageUuid: "7407ed6d-afd4-8172-b98f-05698f734dd2"
    - stage: links
      stageUuid: "6b006e7c-b0cb-8ec8-af30-c35555c96792"
    - stage: horo
      stageUuid: "32016d84-99e9-8695-a35d-45022967a21f"
    - stage: seal
      stageUuid: "9736c399-701d-8907-ae17-5830aa881cfe"
    - stage: uuid
      stageUuid: "92300a2b-5aeb-882c-8898-9122f222f7b6"
version: 2
---
# batch

Use when processing data in bulk — batch ETL jobs, bulk inserts/updates/deletes, batch transaction semantics, atomicity across a batch, partial failure handling and retry strategies in batch operations.

Composes: [[jobs]] · [[ingest]] · [[transaction]] · [[reconcile]].

## Standards
- ISO 20022 batch payment (pain.001)
- EDI batch semantics
