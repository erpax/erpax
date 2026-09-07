---
name: deduplication
description: "Use when eliminating duplicate records — duplicate detection (exact/fuzzy), merge strategies, idempotency to prevent re-ingestion, duplicate scope (entity/transaction/field-level), dedup window/time-range."
atomPath: "vocabulary/deduplication"
coordinate: "vocabulary/deduplication · 8/crest · f1da4a3a"
contentUuid: "9657f234-4371-5f54-ae3b-2d772115ab01"
diamondUuid: "297a4100-1650-8c01-955b-5e6479ee719c"
uuid: "f1da4a3a-9ec4-8256-9762-f9efd6391818"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 20
standards: []
bindings: []
signatures:
  computationUuid: "7704be7f-0741-8c5b-835a-d96d00370358"
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
      stageUuid: "be8a00b4-bcfc-8fa4-a8e8-32838ca70f4a"
    - stage: seal
      stageUuid: "48839d1e-b202-8b82-92c4-4eaeb873998c"
    - stage: uuid
      stageUuid: "1af9eeba-19c1-8175-a2fa-bcd56fdcdaa8"
version: 2
---
# deduplication

Use when eliminating duplicate records — duplicate detection (exact/fuzzy), merge strategies, idempotency to prevent re-ingestion, duplicate scope (entity/transaction/field-level), dedup window/time-range.

Composes: [[ingest]] · [[identity]] · [[merge]] · [[reconcile]] · [[idempotency]].

## Standards
- Data quality (ISO 8601 / 9001)
- Record linkage standards
