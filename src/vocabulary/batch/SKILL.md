---
name: batch
description: "Use when processing data in bulk — batch ETL jobs, bulk inserts/updates/deletes, batch transaction semantics, atomicity across a batch, partial failure handling and retry strategies in batch operations."
atomPath: "vocabulary/batch"
coordinate: "vocabulary/batch · 8/crest · 55edc8fb"
contentUuid: "a3277707-4e61-57f0-802c-98f9f91bd04c"
diamondUuid: "fdd123b9-8876-8e2c-b16e-dc1f7d69840f"
uuid: "55edc8fb-88be-89a9-a571-3ef7adee2559"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 15
standards: []
bindings: []
signatures:
  computationUuid: "0b0adea7-4dcd-8057-97db-b77f53dc913c"
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
      stageUuid: "93c0b598-771e-847f-bde3-a32886ae3078"
    - stage: seal
      stageUuid: "9736c399-701d-8907-ae17-5830aa881cfe"
    - stage: uuid
      stageUuid: "cad185e0-404c-8661-8fdb-cbfb62dadbf7"
version: 2
---
# batch

Use when processing data in bulk — batch ETL jobs, bulk inserts/updates/deletes, batch transaction semantics, atomicity across a batch, partial failure handling and retry strategies in batch operations.

Composes: [[jobs]] · [[ingest]] · [[transaction]] · [[reconcile]].

## Standards
- ISO 20022 batch payment (pain.001)
- EDI batch semantics
