---
name: batch
description: "Use when processing data in bulk — batch ETL jobs, bulk inserts/updates/deletes, batch transaction semantics, atomicity across a batch, partial failure handling and retry strategies in batch operations."
atomPath: "vocabulary/batch"
coordinate: "vocabulary/batch · 7/descent · 5e106330"
contentUuid: "1ef33f17-bdb8-58f5-83a0-27ea7e9567c8"
diamondUuid: "13a68674-2545-8d6c-8a20-e854777032ad"
uuid: "5e106330-ef50-88ef-8098-57acb9e298b7"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 13
standards: []
bindings: []
signatures:
  computationUuid: "003fdbd8-1598-83f1-8f5a-93125a33e8d2"
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
      stageUuid: "2631f94f-6297-8c85-858b-b9eefc2bb10a"
    - stage: seal
      stageUuid: "9736c399-701d-8907-ae17-5830aa881cfe"
    - stage: uuid
      stageUuid: "bc007eac-c929-8d88-a79e-83d30a782d65"
version: 2
---
# batch

Use when processing data in bulk — batch ETL jobs, bulk inserts/updates/deletes, batch transaction semantics, atomicity across a batch, partial failure handling and retry strategies in batch operations.

Composes: [[jobs]] · [[ingest]] · [[transaction]] · [[reconcile]].

## Standards
- ISO 20022 batch payment (pain.001)
- EDI batch semantics
