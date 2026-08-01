---
name: deduplication
description: "Use when eliminating duplicate records — duplicate detection (exact/fuzzy), merge strategies, idempotency to prevent re-ingestion, duplicate scope (entity/transaction/field-level), dedup window/time-range."
atomPath: "vocabulary/deduplication"
coordinate: "vocabulary/deduplication · 2/share · 3029e688"
contentUuid: "56e291c6-4567-5c84-9134-c8ea2de1be9d"
diamondUuid: "00e0184c-0a61-8631-82f8-02a0931d431a"
uuid: "3029e688-8102-848e-b0d4-9971e9ff0c5d"
horo: 2
typography:
  partition: vocabulary
  bondDegree: 20
standards: []
bindings: []
signatures:
  computationUuid: "c1be7223-7a9d-8241-a613-d6c865babc4d"
  stages:
    - stage: path
      stageUuid: "838ff753-b85c-807d-a761-e1cd4dcbc1f5"
    - stage: trinity
      stageUuid: "d68048b7-7451-8e0a-be8a-686dd7675085"
    - stage: boundary
      stageUuid: "2995e7d3-6ffb-8efc-9153-cb74a15f7b5d"
    - stage: links
      stageUuid: "4e7f5096-014b-82f8-ab6d-79a20f4a8c5a"
    - stage: horo
      stageUuid: "a9079519-e414-8e01-beca-93aeb67b1433"
    - stage: seal
      stageUuid: "dce388af-64d3-8018-9abd-a879ef4709e9"
    - stage: uuid
      stageUuid: "876ce08d-1654-8484-a884-8ccbafca248c"
version: 2
---
# deduplication

Use when eliminating duplicate records — duplicate detection (exact/fuzzy), merge strategies, idempotency to prevent re-ingestion, duplicate scope (entity/transaction/field-level), dedup window/time-range.

Composes: [[ingest]] · [[identity]] · [[merge]] · [[reconcile]] · [[idempotency]].

## Standards
- Data quality (ISO 8601 / 9001)
- Record linkage standards
