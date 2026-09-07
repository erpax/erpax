---
name: batch
description: "Use when processing data in bulk — batch ETL jobs, bulk inserts/updates/deletes, batch transaction semantics, atomicity across a batch, partial failure handling and retry strategies in batch operations."
atomPath: "vocabulary/batch"
coordinate: "vocabulary/batch · 2/share · 815d6070"
contentUuid: "ade3c2c2-8080-5f0e-85df-d0b806818a2c"
diamondUuid: "adad6440-6761-8eed-bf8d-60a4e0752595"
uuid: "815d6070-558e-885d-a1ef-d65d42d0e2d4"
horo: 2
typography:
  partition: vocabulary
  bondDegree: 15
standards: []
bindings: []
signatures:
  computationUuid: "0e92ca34-901e-8050-938d-ef79065bedfc"
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
      stageUuid: "49eb9e63-61ab-80e1-ab8c-12f1eecf06b2"
    - stage: seal
      stageUuid: "9736c399-701d-8907-ae17-5830aa881cfe"
    - stage: uuid
      stageUuid: "f414e328-f4b1-8a4a-9bd4-c66d24c64a53"
version: 2
---
# batch

Use when processing data in bulk — batch ETL jobs, bulk inserts/updates/deletes, batch transaction semantics, atomicity across a batch, partial failure handling and retry strategies in batch operations.

Composes: [[jobs]] · [[ingest]] · [[transaction]] · [[reconcile]].

## Standards
- ISO 20022 batch payment (pain.001)
- EDI batch semantics
