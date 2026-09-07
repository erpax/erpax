---
name: deduplication
description: "Use when eliminating duplicate records — duplicate detection (exact/fuzzy), merge strategies, idempotency to prevent re-ingestion, duplicate scope (entity/transaction/field-level), dedup window/time-range."
atomPath: "vocabulary/deduplication"
coordinate: "vocabulary/deduplication · 2/share · 38b32223"
contentUuid: "6cf72f5d-7891-5d15-8426-725a440bcc1d"
diamondUuid: "d5c70bca-b8a1-8256-b357-29c6e02a24d2"
uuid: "38b32223-0fc3-8155-bd8e-5d472f7a8a13"
horo: 2
typography:
  partition: vocabulary
  bondDegree: 20
standards: []
bindings: []
signatures:
  computationUuid: "e48dc9ff-4177-84b0-a9cf-a929995ef522"
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
      stageUuid: "7266b6a0-411b-8532-b187-35667ffa157f"
    - stage: seal
      stageUuid: "48839d1e-b202-8b82-92c4-4eaeb873998c"
    - stage: uuid
      stageUuid: "4532fd04-ac89-8440-a1b0-0634767bced2"
version: 2
---
# deduplication

Use when eliminating duplicate records — duplicate detection (exact/fuzzy), merge strategies, idempotency to prevent re-ingestion, duplicate scope (entity/transaction/field-level), dedup window/time-range.

Composes: [[ingest]] · [[identity]] · [[merge]] · [[reconcile]] · [[idempotency]].

## Standards
- Data quality (ISO 8601 / 9001)
- Record linkage standards
