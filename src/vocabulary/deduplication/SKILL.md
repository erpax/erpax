---
name: deduplication
description: "Use when eliminating duplicate records — duplicate detection (exact/fuzzy), merge strategies, idempotency to prevent re-ingestion, duplicate scope (entity/transaction/field-level), dedup window/time-range."
atomPath: "vocabulary/deduplication"
coordinate: "vocabulary/deduplication · 8/crest · 70542f0c"
contentUuid: "c21b92ca-6c5d-5732-898e-d52a3eac9438"
diamondUuid: "e05b0d73-6f50-84a5-b635-2b1948d5a8e5"
uuid: "70542f0c-806c-8c82-9b2e-61352de696ce"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 20
standards: []
bindings: []
signatures:
  computationUuid: "cfca9625-41fd-81ef-856a-076da8142495"
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
      stageUuid: "3094691b-d958-8c50-ba81-3a6824574b68"
    - stage: seal
      stageUuid: "48839d1e-b202-8b82-92c4-4eaeb873998c"
    - stage: uuid
      stageUuid: "60c5591d-22be-888f-932d-b25a0cf35182"
version: 2
---
# deduplication

Use when eliminating duplicate records — duplicate detection (exact/fuzzy), merge strategies, idempotency to prevent re-ingestion, duplicate scope (entity/transaction/field-level), dedup window/time-range.

Composes: [[ingest]] · [[identity]] · [[merge]] · [[reconcile]] · [[idempotency]].

## Standards
- Data quality (ISO 8601 / 9001)
- Record linkage standards
