---
name: deduplication
description: "Use when eliminating duplicate records — duplicate detection (exact/fuzzy), merge strategies, idempotency to prevent re-ingestion, duplicate scope (entity/transaction/field-level), dedup window/time-range."
atomPath: "vocabulary/deduplication"
coordinate: "vocabulary/deduplication · 4/weave · 5de5d12c"
contentUuid: "d5010287-4e04-5653-81c8-2500c99a047f"
diamondUuid: "8418d6ca-6b23-837b-9237-14e94ad9e39a"
uuid: "5de5d12c-4a5e-84e2-824e-6d5360b11f4b"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 20
standards: []
bindings: []
signatures:
  computationUuid: "9973d403-ff04-826e-b6b8-575c3f783f3d"
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
      stageUuid: "f783afcc-6b7e-8720-87f0-defab4e93b41"
    - stage: seal
      stageUuid: "48839d1e-b202-8b82-92c4-4eaeb873998c"
    - stage: uuid
      stageUuid: "efa5c755-c7f2-8810-aa17-5805b9c9ea0a"
version: 2
---
# deduplication

Use when eliminating duplicate records — duplicate detection (exact/fuzzy), merge strategies, idempotency to prevent re-ingestion, duplicate scope (entity/transaction/field-level), dedup window/time-range.

Composes: [[ingest]] · [[identity]] · [[merge]] · [[reconcile]] · [[idempotency]].

## Standards
- Data quality (ISO 8601 / 9001)
- Record linkage standards
