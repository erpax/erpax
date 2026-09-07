---
name: batch
description: "Use when processing data in bulk — batch ETL jobs, bulk inserts/updates/deletes, batch transaction semantics, atomicity across a batch, partial failure handling and retry strategies in batch operations."
atomPath: "vocabulary/batch"
coordinate: "vocabulary/batch · 2/share · f7288656"
contentUuid: "cd18c648-8f1b-5e69-ad0b-3128c683c6c3"
diamondUuid: "3b9a9a68-3e62-8ccc-b673-ee43a9aea72c"
uuid: "f7288656-14d0-895b-8eba-5effbc87864c"
horo: 2
typography:
  partition: vocabulary
  bondDegree: 15
standards: []
bindings: []
signatures:
  computationUuid: "bc5547d0-24f7-86c7-8c51-d17c781c36c7"
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
      stageUuid: "7ea648dc-6e34-8a87-a04b-62d34d579103"
    - stage: seal
      stageUuid: "9736c399-701d-8907-ae17-5830aa881cfe"
    - stage: uuid
      stageUuid: "8912423e-afeb-854e-9db7-d23de166cc56"
version: 2
---
# batch

Use when processing data in bulk — batch ETL jobs, bulk inserts/updates/deletes, batch transaction semantics, atomicity across a batch, partial failure handling and retry strategies in batch operations.

Composes: [[jobs]] · [[ingest]] · [[transaction]] · [[reconcile]].

## Standards
- ISO 20022 batch payment (pain.001)
- EDI batch semantics
