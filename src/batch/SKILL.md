---
name: batch
description: "Use when processing data in bulk — batch ETL jobs, bulk inserts/updates/deletes, batch transaction semantics, atomicity across a batch, partial failure handling and retry strategies in batch operations."
atomPath: batch
coordinate: batch · 4/weave · a58f059f
contentUuid: "26450340-715c-540c-8c28-1123763b933a"
diamondUuid: "abcdd39b-6443-80d6-8c4a-5e57056b5db7"
uuid: "a58f059f-2eeb-8ac7-a9f8-b6ae92c5c67c"
horo: 4
bonds:
  in:
    - ingest
    - jobs
    - reconcile
    - run
    - transaction
  out:
    - ingest
    - jobs
    - reconcile
    - run
    - transaction
typography:
  partition: batch
  bondDegree: 15
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - ingest
    - jobs
    - reconcile
    - transaction
  matrix:
    - ingest
    - jobs
    - reconcile
    - run
    - transaction
  backlinks:
    - ingest
    - jobs
    - reconcile
    - run
    - transaction
signatures:
  computationUuid: "9404412b-a75d-8828-9374-dc8ec8c16f4f"
  stages:
    - stage: path
      stageUuid: "1d0997aa-67d4-8ade-a9b1-ddd452b1872f"
    - stage: trinity
      stageUuid: "58adf082-d1a3-89a3-b374-b3313a196482"
    - stage: boundary
      stageUuid: "defa7174-5518-8778-9d61-c5352ef28dde"
    - stage: links
      stageUuid: "39ba8702-0161-8520-a954-c259e23fb74c"
    - stage: horo
      stageUuid: "f574a131-700c-8f26-9de7-ecf20dfee99f"
    - stage: seal
      stageUuid: "c4baea7e-aefc-84a8-b5f6-989c809d046f"
    - stage: uuid
      stageUuid: "c6087bc1-653f-823d-86c0-6a5d1569ad87"
version: 2
---
# batch

Use when processing data in bulk — batch ETL jobs, bulk inserts/updates/deletes, batch transaction semantics, atomicity across a batch, partial failure handling and retry strategies in batch operations.

Composes: [[jobs]] · [[ingest]] · [[transaction]] · [[reconcile]].

## Standards
- ISO 20022 batch payment (pain.001)
- EDI batch semantics
