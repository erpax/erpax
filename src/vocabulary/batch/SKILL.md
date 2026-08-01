---
name: batch
description: "Use when processing data in bulk — batch ETL jobs, bulk inserts/updates/deletes, batch transaction semantics, atomicity across a batch, partial failure handling and retry strategies in batch operations."
atomPath: "vocabulary/batch"
coordinate: "vocabulary/batch · 2/share · 754a0082"
contentUuid: "fd266501-fb94-512d-81d1-17b9f8d95461"
diamondUuid: "07375b2a-bf79-8e21-86a2-a475f6c09080"
uuid: "754a0082-673b-8936-8ef1-6111b4b2d42a"
horo: 2
typography:
  partition: vocabulary
  bondDegree: 15
standards: []
bindings: []
signatures:
  computationUuid: "6f066ba8-4a89-8eef-9f5b-576ce09dcbd7"
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
      stageUuid: "8a06ac25-1bea-875f-8b5a-e5dddc645908"
    - stage: seal
      stageUuid: "f74e64ca-e683-86c7-835c-46b52be2578c"
    - stage: uuid
      stageUuid: "225cb3dd-22d7-850e-9d76-4a4d3589146b"
version: 2
---
# batch

Use when processing data in bulk — batch ETL jobs, bulk inserts/updates/deletes, batch transaction semantics, atomicity across a batch, partial failure handling and retry strategies in batch operations.

Composes: [[jobs]] · [[ingest]] · [[transaction]] · [[reconcile]].

## Standards
- ISO 20022 batch payment (pain.001)
- EDI batch semantics
