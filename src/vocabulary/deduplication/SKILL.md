---
name: deduplication
description: "Use when eliminating duplicate records — duplicate detection (exact/fuzzy), merge strategies, idempotency to prevent re-ingestion, duplicate scope (entity/transaction/field-level), dedup window/time-range."
atomPath: "vocabulary/deduplication"
coordinate: "vocabulary/deduplication · 2/share · 6384f9ea"
contentUuid: "91d6aa40-0719-512b-9e29-c903fa68a890"
diamondUuid: "ffa2f228-fa78-8e56-b0d8-b2b202f35bbf"
uuid: "6384f9ea-b75e-8cd5-9d86-0b2f1422f5a3"
horo: 2
typography:
  partition: vocabulary
  bondDegree: 20
standards: []
bindings: []
signatures:
  computationUuid: "3e4f1fbc-8ee1-841e-bfa9-7052fc14b587"
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
      stageUuid: "d81228ab-d30f-8dfd-958d-6243e0046f23"
    - stage: seal
      stageUuid: "48839d1e-b202-8b82-92c4-4eaeb873998c"
    - stage: uuid
      stageUuid: "a0427da1-cd43-8fd0-89a9-d9f7c537cac7"
version: 2
---
# deduplication

Use when eliminating duplicate records — duplicate detection (exact/fuzzy), merge strategies, idempotency to prevent re-ingestion, duplicate scope (entity/transaction/field-level), dedup window/time-range.

Composes: [[ingest]] · [[identity]] · [[merge]] · [[reconcile]] · [[idempotency]].

## Standards
- Data quality (ISO 8601 / 9001)
- Record linkage standards
